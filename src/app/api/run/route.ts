import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { refreshAccessToken, xeroFetch } from "@/lib/xeroApi";
import { runDiagnosticV1 } from "@/lib/diagnostic/v1";
import { getAnonSessionIdFromCookie } from "@/lib/session";

type AccountsResponse = {
  Accounts?: Array<{ Status?: string }>;
};

type TrackingResponse = {
  TrackingCategories?: Array<{ Status?: string }>;
};

type ManualJournalsResponse = {
  ManualJournals?: Array<{ ManualJournalID?: string }>;
};

async function revokeAndDeleteConnection(connectionId: string) {
  // v1: enforce the promise by deleting tokens from DB. Token revocation endpoint can be added later.
  await prisma.xeroConnection.delete({ where: { id: connectionId } });
}

export async function POST(req: Request) {
  const sessionId = await getAnonSessionIdFromCookie();
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const connectionId =
    body &&
    typeof body === "object" &&
    typeof (body as { connectionId?: unknown }).connectionId === "string"
      ? ((body as { connectionId: string }).connectionId as string)
      : "";

  if (!connectionId) {
    return NextResponse.json({ error: "Missing connectionId" }, { status: 400 });
  }

  const conn = await prisma.xeroConnection.findUnique({ where: { id: connectionId } });
  if (!conn) {
    return NextResponse.json({ error: "Connection not found" }, { status: 404 });
  }

  if (conn.sessionId !== sessionId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!conn.tenantId) {
    return NextResponse.json(
      { error: "Missing tenant selection" },
      { status: 400 },
    );
  }

  if (conn.usedAt) {
    return NextResponse.json(
      { error: "This connection has already been used" },
      { status: 409 },
    );
  }

  let runId: string | null = null;

  try {
    // Mark used early to enforce one-run-per-connection.
    await prisma.xeroConnection.update({
      where: { id: connectionId },
      data: { usedAt: new Date() },
    });

    const run = await prisma.diagnosticRun.create({
      data: {
        sessionId: conn.sessionId,
        tenantId: conn.tenantId,
        tenantName: conn.tenantName,
        status: "RUNNING",
        startedAt: new Date(),
        diagnosticVersion: "v1",
      },
    });
    runId = run.id;

    // Refresh token to ensure we have valid access
    const tok = await refreshAccessToken(conn.refreshTokenEncrypted);
    const accessToken = tok.access_token;

    const accounts = await xeroFetch<AccountsResponse>(
      "https://api.xero.com/api.xro/2.0/Accounts",
      { accessToken, tenantId: conn.tenantId },
    );

    const tracking = await xeroFetch<TrackingResponse>(
      "https://api.xero.com/api.xro/2.0/TrackingCategories",
      { accessToken, tenantId: conn.tenantId },
    );

    // Manual journals might be restricted; treat failures as optional.
    let manualJournalCount = 0;
    try {
      const mj = await xeroFetch<ManualJournalsResponse>(
        "https://api.xero.com/api.xro/2.0/ManualJournals",
        { accessToken, tenantId: conn.tenantId },
      );
      manualJournalCount = (mj.ManualJournals || []).length;
    } catch {
      manualJournalCount = 0;
    }

    const accountCount = (accounts.Accounts || []).filter(
      (a) => (a.Status || "").toUpperCase() === "ACTIVE",
    ).length;
    const trackingCategoryCount = (tracking.TrackingCategories || []).filter(
      (t) => (t.Status || "").toUpperCase() !== "DELETED",
    ).length;

    const v1 = runDiagnosticV1({
      accountCount,
      trackingCategoryCount,
      manualJournalCount,
    });

    await prisma.diagnosticResult.create({
      data: {
        runId,
        overallScore: v1.overallScore100,
        dimensionsJson: v1.dimensions,
        findingsJson: { topIssues: v1.topIssues },
      },
    });

    await prisma.diagnosticRun.update({
      where: { id: runId },
      data: { status: "COMPLETED", finishedAt: new Date() },
    });

    // Auto-revoke promise: delete tokens/connection row
    await revokeAndDeleteConnection(connectionId);

    return NextResponse.json({ runId });
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e);

    if (runId) {
      try {
        await prisma.diagnosticRun.update({
          where: { id: runId },
          data: { status: "FAILED", finishedAt: new Date(), error },
        });
      } catch {
        // ignore
      }
    }

    try {
      await revokeAndDeleteConnection(connectionId);
    } catch {
      // ignore
    }

    console.error("/api/run failed", e);
    return NextResponse.json({ error: "Diagnostic failed", message: error }, { status: 500 });
  }
}
