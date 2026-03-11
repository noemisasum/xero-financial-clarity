import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { formatFromHeader, postmarkSend } from "@/lib/postmark";

function buildMinimalText(runId: string) {
  return `Your report is also available on this page:\nhttps://clarity.aqount.tech/results/${runId}?full=1`;
}

export async function POST(req: Request) {
  const form = await req.formData();
  const runId = String(form.get("runId") || "").trim();

  if (!runId) {
    return NextResponse.redirect(new URL(`/results/${encodeURIComponent(runId)}?sent=0`, req.url));
  }

  const run = await prisma.diagnosticRun.findUnique({
    where: { id: runId },
    include: { result: true },
  });

  if (!run || !run.result) {
    return NextResponse.redirect(new URL(`/results/${encodeURIComponent(runId)}?sent=0`, req.url));
  }

  const lead = await prisma.lead.findFirst({ where: { runId } });
  if (!lead) {
    return NextResponse.redirect(new URL(`/results/${encodeURIComponent(runId)}?sent=0`, req.url));
  }

  // Rate limit resends (5 minutes)
  if (lead.reportSentAt) {
    const ms = Date.now() - new Date(lead.reportSentAt).getTime();
    if (ms < 5 * 60 * 1000) {
      return NextResponse.redirect(
        new URL(`/results/${encodeURIComponent(runId)}?sent=1&full=1`, req.url),
      );
    }
  }

  const subject = run.tenantName
    ? `Your Financial Clarity Diagnostic Report — ${run.tenantName}`
    : "Your Financial Clarity Diagnostic Report";

  const findings = run.result.findingsJson as unknown;
  const html =
    findings &&
    typeof findings === "object" &&
    typeof (findings as { emailHtml?: unknown }).emailHtml === "string"
      ? ((findings as { emailHtml: string }).emailHtml as string)
      : undefined;

  await postmarkSend({
    From: formatFromHeader(),
    To: lead.email,
    Subject: subject,
    HtmlBody:
      html || `<p>Your report is ready.</p><p><a href="https://clarity.aqount.tech/results/${runId}?full=1">View report</a></p>`,
    TextBody: buildMinimalText(runId),
  });

  await prisma.lead.update({
    where: { id: lead.id },
    data: {
      reportSentAt: new Date(),
      reportSendCount: { increment: 1 },
    },
  });

  return NextResponse.redirect(
    new URL(`/results/${encodeURIComponent(runId)}?sent=1&full=1`, req.url),
  );
}
