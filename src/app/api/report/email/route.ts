import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { formatFromHeader, postmarkSend } from "@/lib/postmark";
import type { FullReport } from "@/lib/report/types";
import { renderReportEmailHtml } from "@/lib/report/renderEmailHtml";
import { withObs, obs } from "@/lib/obs";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function bandFromScore(score100: number): FullReport["overall"]["band"] {
  if (score100 >= 80) return "Strong";
  if (score100 >= 65) return "Good";
  if (score100 >= 45) return "Moderate";
  return "Needs Improvement";
}

function fallbackReport(args: {
  overallScore: number;
  company?: string | null;
  dimensions: Array<{ name: string; score10: number; summary?: string }>;
  topIssues: string[];
  diagnosticVersion: string;
}): FullReport {
  return {
    diagnosticVersion: args.diagnosticVersion,
    generatedAtISO: new Date().toISOString(),
    company: args.company || null,
    overall: {
      score100: args.overallScore,
      band: bandFromScore(args.overallScore),
      meaning: "Here is your diagnostic summary. For a deeper breakdown, rerun the diagnostic on the latest version.",
    },
    topIssues: (args.topIssues || []).map((t) => ({ title: t, severity: "Major", evidence: [] })),
    dimensions: (args.dimensions || []).map((d) => ({
      key: d.name.toLowerCase().replace(/\s+/g, "_"),
      name: d.name,
      score10: d.score10,
      summary: d.summary || "",
      findings: [],
    })),
    nextSteps: [],
    notes: ["This diagnostic uses read-only signals from your Xero organisation."],
  };
}

export async function POST(req: Request) {
  return withObs({ route: "/api/report/email", method: "POST" }, async () => {
    const form = await req.formData();
    const runId = String(form.get("runId") || "").trim();
    const email = String(form.get("email") || "").trim();
    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const consent = String(form.get("consent") || "").trim() === "on";

    obs("info", "report.email.requested", { route: "/api/report/email", method: "POST", runId });

  if (!runId || !email || !isEmail(email) || !name || !consent) {
    return NextResponse.redirect(
      new URL(`/results/${encodeURIComponent(runId)}?sent=0`, req.url),
    );
  }

  const run = await prisma.diagnosticRun.findUnique({
    where: { id: runId },
    include: { result: true },
  });

  if (!run || !run.result) {
    return NextResponse.redirect(new URL(`/results/${encodeURIComponent(runId)}?sent=0`, req.url));
  }

  const dims = Array.isArray(run.result.dimensionsJson)
    ? (run.result.dimensionsJson as Array<{ name: string; score10: number; summary?: string }> )
    : [];
  const findings = run.result.findingsJson as unknown;
  const topIssues =
    findings &&
    typeof findings === "object" &&
    Array.isArray((findings as { topIssues?: unknown }).topIssues)
      ? ((findings as { topIssues: string[] }).topIssues as string[])
      : [];

  // Capture lead (one per run+email)
  const lead = await prisma.lead.create({
    data: {
      sessionId: run.sessionId,
      runId: run.id,
      email,
      name,
      company: company || run.tenantName || null,
      consent,
    },
  });

  const subject = run.tenantName
    ? `Your Financial Clarity Diagnostic Report — ${run.tenantName}`
    : "Your Financial Clarity Diagnostic Report";

  const reportFromDb =
    findings &&
    typeof findings === "object" &&
    (findings as { report?: unknown }).report &&
    typeof (findings as { report?: unknown }).report === "object"
      ? ((findings as { report: FullReport }).report as FullReport)
      : null;

  const report: FullReport =
    reportFromDb ||
    fallbackReport({
      overallScore: run.result.overallScore,
      company: company || run.tenantName || null,
      dimensions: dims,
      topIssues,
      diagnosticVersion: run.diagnosticVersion || "v1",
    });

  const html = renderReportEmailHtml({ report });

  await postmarkSend({
    From: formatFromHeader(),
    To: email,
    Subject: subject,
    HtmlBody: html,
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
  });
}
