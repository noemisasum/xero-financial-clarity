import Container from "@/components/Container";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { refreshAccessToken, xeroFetch } from "@/lib/xeroApi";
import { runDiagnosticV1 } from "@/lib/diagnostic/v1";

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

export default async function RunPage({
  searchParams,
}: {
  searchParams: Promise<{ connectionId?: string }>;
}) {
  const sp = await searchParams;
  const connectionId = sp.connectionId || "";

  if (!connectionId) {
    return (
      <div className="py-14 sm:py-20">
        <Container>
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
            Cannot Run
          </h1>
          <p className="mt-3 text-sm text-zinc-600">Missing connection id.</p>
        </Container>
      </div>
    );
  }

  const conn = await prisma.xeroConnection.findUnique({ where: { id: connectionId } });
  if (!conn || !conn.tenantId) {
    return (
      <div className="py-14 sm:py-20">
        <Container>
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
            Cannot Run
          </h1>
          <p className="mt-3 text-sm text-zinc-600">
            Missing connection or tenant selection. Please connect again.
          </p>
        </Container>
      </div>
    );
  }

  if (conn.usedAt) {
    return (
      <div className="py-14 sm:py-20">
        <Container>
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
            Already Used
          </h1>
          <p className="mt-3 text-sm text-zinc-600">
            This connection has already been used. Please reconnect to run the
            diagnostic again.
          </p>
        </Container>
      </div>
    );
  }

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

  let error: string | null = null;
  let successRunId: string | null = null;

  try {
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
        runId: run.id,
        overallScore: v1.overallScore10,
        dimensionsJson: v1.dimensions,
        findingsJson: { topIssues: v1.topIssues },
      },
    });

    await prisma.diagnosticRun.update({
      where: { id: run.id },
      data: { status: "COMPLETED", finishedAt: new Date() },
    });

    // Auto-revoke promise: delete tokens/connection row
    await revokeAndDeleteConnection(connectionId);

    successRunId = run.id;
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : String(e);

    await prisma.diagnosticRun.update({
      where: { id: run.id },
      data: {
        status: "FAILED",
        finishedAt: new Date(),
        error,
      },
    });

    // Best-effort cleanup of tokens
    try {
      await revokeAndDeleteConnection(connectionId);
    } catch {
      // ignore
    }
  }

  if (successRunId) {
    redirect(`/results/${successRunId}`);
  }

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
          Diagnostic Failed
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          {error || "Unknown error"}
        </p>
      </Container>
    </div>
  );
}
