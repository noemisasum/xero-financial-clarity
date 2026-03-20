import type { FullReport } from "@/lib/report/types";

function escapeHtml(s: string) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function pill(text: string) {
  return `<span style="display:inline-flex;align-items:center;border-radius:999px;background:#e5f3ff;color:#0f172a;padding:4px 10px;font-size:12px;font-weight:800">${escapeHtml(text)}</span>`;
}

function statusLabel(status: string) {
  const s = String(status || "").trim().toLowerCase();
  if (s === "pass") return "Pass";
  if (s === "warn") return "Warn";
  if (s === "fail") return "Fail";
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}

function scoreBar(score100: number) {
  const clamped = Math.max(0, Math.min(100, Number(score100) || 0));
  return `
<div style="margin-top:10px;width:100%">
  <div style="height:10px;width:100%;min-width:360px;border-radius:999px;border:1px solid #e5e7eb;background:#ffffff">
    <div style="height:100%;width:${clamped}%;border-radius:999px;background:#b88b2e"></div>
  </div>
</div>`;
}

export function renderReportEmailHtml(args: {
  report: FullReport;
  recipientName?: string;
  brandTitle?: string;
}): string {
  const { report, recipientName } = args;

  const bookCallUrl = process.env.NEXT_PUBLIC_BOOK_CALL_URL || "";
  const bookCallButton = bookCallUrl
    ? `<a href="${escapeHtml(bookCallUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#365b6d;border:1px solid #365b6d;color:#ffffff !important;text-decoration:none;padding:8px 12px;border-radius:12px;font-weight:800;font-size:13px">Book a call</a>`
    : "";

  const eyebrow = "Financial Clarity Diagnostic";
  const titleLine2 = report.company ? report.company : "";

  const topIssues = report.topIssues.length
    ? report.topIssues
        .map((x) => {
          const ev = (x.evidence || []).length
            ? `<div style="margin-top:6px;color:#64748b;font-size:12px">${x.evidence
                .map((e) => `• ${escapeHtml(e)}`)
                .join("<br>")}</div>`
            : "";
          return `<li style="margin:10px 0"><div style="font-weight:700;color:#0f172a">${escapeHtml(
            x.title,
          )}</div>${ev}</li>`;
        })
        .join("")
    : "<li>No major issues detected.</li>";

  const nextSteps = report.nextSteps
    .map(
      (s) => `<li style="margin:10px 0">
  <div style="font-weight:800;color:#0f172a">${escapeHtml(s.title)}</div>
  <div style="margin-top:4px;color:#334155">${escapeHtml(s.detail)}</div>
  <div style="margin-top:6px;color:#64748b;font-size:12px">Effort: ${escapeHtml(
    s.effort,
  )} • Timeframe: ${escapeHtml(s.timeframe)}</div>
</li>`,
    )
    .join("");

  const dimensionBlocks = report.dimensions
    .map((d) => {
      const findings = (d.findings || [])
        .map((f) => {
          const ev = (f.evidence || []).length
            ? `<div style="margin-top:6px;color:#64748b;font-size:12px">${f.evidence
                .map((e) => `• ${escapeHtml(e)}`)
                .join("<br>")}</div>`
            : "";

          const actions = (f.recommendedActions || []).length
            ? `<div style="margin-top:8px">
  <div style="font-size:12px;font-weight:800;color:#0f172a">Recommended actions</div>
  <div style="margin-top:6px;color:#334155;font-size:13px">${f.recommendedActions
    .map((a) => `• ${escapeHtml(a)}`)
    .join("<br>")}</div>
</div>`
            : "";

          return `<div style="border-top:1px solid #e5e7eb;padding-top:12px;margin-top:12px">
  <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
    <tr>
      <td style="font-weight:800;color:#0f172a;padding-right:10px">${escapeHtml(f.title)}</td>
      <td align="right" style="white-space:nowrap">
        ${pill(statusLabel(f.status))}&nbsp;${pill(f.severity)}
      </td>
    </tr>
  </table>
  <div style="margin-top:6px;color:#334155;font-size:13px;line-height:1.6">
    <div><span style="font-weight:800;color:#0f172a">What we saw:</span> ${escapeHtml(
      f.whatWeSaw,
    )}</div>
    <div style="margin-top:4px"><span style="font-weight:800;color:#0f172a">Why it matters:</span> ${escapeHtml(
      f.whyItMatters,
    )}</div>
  </div>
  ${ev}
  ${actions}
</div>`;
        })
        .join("");

      return `<div style="margin-top:18px">
  <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
    <tr>
      <td style="font-size:16px;font-weight:900;color:#0f172a;padding-right:10px">${escapeHtml(
        d.name,
      )}</td>
      <td align="right" style="font-size:16px;font-weight:700;color:#0f172a;white-space:nowrap">${d.score10} / 10</td>
    </tr>
  </table>
  <div style="margin-top:6px;color:#475569;font-size:13px;line-height:1.6">${escapeHtml(
    d.summary,
  )}</div>
  ${findings}
</div>`;
    })
    .join("");

  const notes = (report.notes || []).length
    ? report.notes
        .filter((n) => {
          const t = String(n || "").trim();
          // Email already has a copyright footer line.
          return !/^copyright\s+©/i.test(t);
        })
        .map((n) => `• ${escapeHtml(n)}`)
        .join("<br>")
    : "";

  return `
<div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
  <div style="max-width:760px;margin:0 auto;padding:24px">
    <div style="background:#365b6d;border-radius:12px 12px 0 0;padding:18px 20px">
      <div style="font-size:14px;font-weight:700;color:#dbeafe;letter-spacing:0.06em;text-transform:uppercase">${escapeHtml(
        eyebrow,
      )}</div>
      ${titleLine2 ? `<div style="margin-top:6px;font-size:22px;font-weight:900;color:#ffffff;line-height:1.2">${escapeHtml(titleLine2)}</div>` : ""}
      <div style="margin-top:10px;font-size:14px;color:#dbeafe">Aqount</div>
    </div>

    <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px;padding:20px">
      <div style="font-size:14px;line-height:1.7;color:#334155">
        Hi${recipientName ? ` ${escapeHtml(recipientName)}` : ""},<br>
        Here is your Financial Clarity Diagnostic report.
      </div>

      <div style="height:14px"></div>

      <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:14px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
          <div style="flex:1">
            <div style="font-size:12px;color:#334155">Overall score</div>
            <div style="font-size:28px;font-weight:900;color:#0f172a;margin-top:6px">${
              report.overall.score100
            } / 100</div>
          </div>
          <div style="flex:none">${pill(report.overall.band)}</div>
        </div>

        ${scoreBar(report.overall.score100)}

        <div style="margin-top:10px;font-size:13px;line-height:1.7;color:#475569">${escapeHtml(
          report.overall.meaning,
        )}</div>

        ${
          bookCallButton
            ? `<div style="margin-top:14px">
              <div style="font-size:13px;font-weight:800;color:#0f172a;line-height:1.6">Want a quick walkthrough of your results?</div>
              <div style="margin-top:10px;text-align:right">${bookCallButton}</div>
            </div>`
            : ""
        }
      </div>

      <div style="height:18px"></div>

      <div style="font-size:16px;font-weight:900;color:#0f172a">Score breakdown</div>
      <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:10px;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <tbody>
          ${report.dimensions
            .map(
              (d) => `
<tr>
  <td style="padding:10px 12px;border-top:1px solid #e5e7eb;color:#0f172a;font-weight:700">${escapeHtml(
    d.name,
  )}</td>
  <td align="right" style="padding:10px 12px;border-top:1px solid #e5e7eb;color:#0f172a;font-weight:900">${
    d.score10
  } / 10</td>
</tr>`,
            )
            .join("")}
        </tbody>
      </table>

      <div style="height:18px"></div>

      <div style="font-size:16px;font-weight:900;color:#0f172a">Top issues detected</div>
      <ul style="padding-left:18px;margin:10px 0 0 0;font-size:14px;color:#334155;line-height:1.6">
        ${topIssues}
      </ul>

      <div style="height:18px"></div>

      <div style="font-size:16px;font-weight:900;color:#0f172a">Your next steps</div>
      <ul style="padding-left:18px;margin:10px 0 0 0;font-size:14px;color:#334155;line-height:1.6">
        ${nextSteps}
      </ul>

      ${
        bookCallButton
          ? `<div style="margin-top:14px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:12px">
              <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                <tr>
                  <td style="font-size:13px;font-weight:800;color:#0f172a;line-height:1.6;padding-right:10px">Want help prioritising these into a 30‑day plan?</td>
                  <td align="right" style="white-space:nowrap">${bookCallButton}</td>
                </tr>
              </table>
            </div>`
          : ""
      }

      <div style="height:18px"></div>

      <div style="font-size:16px;font-weight:900;color:#0f172a">Detailed results</div>
      ${dimensionBlocks}

      <div style="height:18px"></div>

      <div style="font-size:12px;color:#64748b;line-height:1.7">
        ${notes}
      </div>

      <div style="margin-top:16px;font-size:12px;color:#94a3b8;line-height:1.6">
        © ${new Date().getFullYear()} Aqount. All rights reserved.
      </div>
    </div>
  </div>
</div>`;
}
