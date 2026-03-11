import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { formatFromHeader, postmarkSend } from "@/lib/postmark";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function buildReportHtml(params: {
  overall: number;
  dimensions: Array<{ name: string; score10: number; summary?: string }>;
  topIssues: string[];
  company?: string | null;
}) {
  const { overall, dimensions, topIssues, company } = params;
  const title = company
    ? `Financial Clarity Diagnostic Report — ${company}`
    : "Financial Clarity Diagnostic Report";

  const dimRows = dimensions
    .map(
      (d) => `
<tr>
  <td style="padding:10px 12px;border-top:1px solid #e5e7eb">${escapeHtml(d.name)}</td>
  <td align="right" style="padding:10px 12px;border-top:1px solid #e5e7eb;font-weight:700">${d.score10} / 10</td>
</tr>`,
    )
    .join("");

  const issues = (topIssues || [])
    .map((x) => `<li style="margin:6px 0">${escapeHtml(x)}</li>`)
    .join("");

  return `
<div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
  <div style="max-width:720px;margin:0 auto;padding:24px">
    <div style="background:#365b6d;border-radius:12px 12px 0 0;padding:18px 20px">
      <div style="font-size:22px;font-weight:800;color:#ffffff;line-height:1.2">${escapeHtml(
        title,
      )}</div>
      <div style="margin-top:8px;font-size:14px;color:#dbeafe">Aqount Diagnostic</div>
    </div>

    <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px;padding:20px">
      <div style="font-size:14px;line-height:1.6">
        Hi,<br>
        Here is your Financial Clarity Diagnostic report.
      </div>

      <div style="height:16px"></div>

      <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:14px">
        <div style="font-size:12px;color:#334155">Overall score</div>
        <div style="font-size:28px;font-weight:900;color:#0f172a;margin-top:6px">${overall} / 100</div>
      </div>

      <div style="height:18px"></div>

      <div style="font-size:16px;font-weight:800;color:#0f172a;margin-bottom:10px">Breakdown</div>
      <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <tbody>
          ${dimRows}
        </tbody>
      </table>

      <div style="height:18px"></div>

      <div style="font-size:16px;font-weight:800;color:#0f172a">Top issues detected</div>
      <ul style="padding-left:18px;margin:10px 0 0 0;font-size:14px;color:#334155;line-height:1.6">
        ${issues || "<li>No major issues detected.</li>"}
      </ul>

      <div style="height:18px"></div>
      <div style="font-size:12px;color:#64748b;line-height:1.6">
        This report is generated from read-only signals in your Xero organisation. It does not change your books.
      </div>

      <div style="margin-top:16px;font-size:12px;color:#64748b;line-height:1.6">
        © ${new Date().getFullYear()} Aqount. Financial Clarity Diagnostic is a product by Aqount. All rights reserved.
      </div>
    </div>
  </div>
</div>`;
}

export async function POST(req: Request) {
  const form = await req.formData();
  const runId = String(form.get("runId") || "").trim();
  const email = String(form.get("email") || "").trim();
  const name = String(form.get("name") || "").trim();
  const company = String(form.get("company") || "").trim();
  const consent = String(form.get("consent") || "").trim() === "on";

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

  const html = buildReportHtml({
    overall: run.result.overallScore,
    dimensions: dims,
    topIssues,
    company: company || run.tenantName || null,
  });

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
}
