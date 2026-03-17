import type { DiagnosticV1Result, DimensionResult } from "@/lib/diagnostic/v1";
import type { FullReport } from "@/lib/report/types";

function bandFromScore(score100: number): FullReport["overall"]["band"] {
  if (score100 >= 80) return "Strong";
  if (score100 >= 65) return "Good";
  if (score100 >= 45) return "Moderate";
  return "Needs Improvement";
}

function meaningFromBand(band: FullReport["overall"]["band"]): string {
  switch (band) {
    case "Strong":
      return "Your Xero setup looks well-structured for decision-making. A few targeted cleanups can make reporting even faster and more consistent.";
    case "Good":
      return "Your reporting foundation is solid, but there are a few structural gaps that can create noise or inconsistencies. Fixing the top issues will make your numbers easier to trust month to month.";
    case "Moderate":
      return "Your data can produce reports, but common structural issues may be hiding the real story. Addressing the top items below will quickly improve clarity and reduce rework.";
    case "Needs Improvement":
      return "Your current structure is likely making reporting harder than it needs to be. The good news: a small set of focused changes can significantly improve clarity and reduce confusion.";
  }
}

// (reserved for future: map finding status to severity)

function ensure2to3<T>(items: T[]): T[] {
  if (items.length <= 3) return items;
  return items.slice(0, 3);
}

function normalizeName(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function detectDuplicateAccountNames(accounts: Array<{ name: string }>): Array<{ name: string; duplicates: string[] }> {
  const map = new Map<string, string[]>();
  for (const a of accounts) {
    const n = normalizeName(a.name);
    if (!n) continue;
    const arr = map.get(n) || [];
    arr.push(a.name);
    map.set(n, arr);
  }
  return [...map.entries()]
    .filter(([, v]) => v.length >= 2)
    .slice(0, 10)
    .map(([k, v]) => ({ name: k, duplicates: v }));
}

function detectVagueAccounts(accounts: Array<{ name: string }>): string[] {
  const rx = /(misc|other|general|sundry|various)/i;
  return accounts
    .map((a) => a.name)
    .filter((n) => rx.test(n))
    .slice(0, 12);
}

// (reserved for future: expense-type counts by account type)

function hasCogsStructure(accounts: Array<{ type: string | null; name: string }>): boolean {
  // Xero uses DIRECTCOSTS for COGS-like accounts in many orgs.
  const hasDirect = accounts.some((a) => String(a.type || "").toUpperCase() === "DIRECTCOSTS");
  if (hasDirect) return true;

  // Fallback heuristic: names include cogs/cost of sales
  const rx = /(cogs|cost of sales|cost of goods)/i;
  return accounts.some((a) => rx.test(a.name));
}

function buildDimensionFindings(args: {
  dim: DimensionResult;
  accountCount: number;
  trackingCategoryCount: number;
  manualJournalCount: number;
  accounts: Array<{ name: string; code: string | null; type: string | null }>;
}): FullReport["dimensions"][number] {
  const { dim, accountCount, trackingCategoryCount, manualJournalCount, accounts } = args;

  // Founder-friendly: keep findings short, concrete, and action-led.
  const findings: FullReport["dimensions"][number]["findings"] = [];

  if (dim.key === "chart_of_accounts_structure") {
    const granularStatus = accountCount > 300 ? "fail" : accountCount > 180 ? "warn" : "pass";
    findings.push({
      title: "Chart of accounts may be too detailed",
      status: granularStatus,
      severity: granularStatus === "pass" ? "Minor" : "Major",
      whatWeSaw: "Your organisation has a high number of active accounts, which can make P&L reports long and harder to read.",
      whyItMatters: "When categories are too granular, trends get hidden and coding becomes inconsistent across the team.",
      evidence: [`Active accounts: ${accountCount}`],
      recommendedActions: [
        "Group similar expense accounts into reporting-friendly rollups",
        "Keep detail in notes/tracking, not in dozens of near-duplicate accounts",
      ],
    });

    const dups = detectDuplicateAccountNames(accounts);
    const vague = detectVagueAccounts(accounts);
    const namingStatus = dups.length || vague.length ? "warn" : "pass";

    findings.push({
      title: "Account names may be inconsistent (duplicates or vague buckets)",
      status: namingStatus,
      severity: namingStatus === "pass" ? "Minor" : "Major",
      whatWeSaw:
        "We found signs that account names may not be standardised (e.g., duplicate-looking accounts or ‘misc/other’ style buckets).",
      whyItMatters:
        "When names aren’t consistent, coding drifts over time and reports become harder to compare month to month.",
      evidence: [
        ...(dups.length
          ? [`Possible duplicate names (examples): ${dups
              .slice(0, 3)
              .map((x) => x.duplicates.join(" / "))
              .join("; ")}`]
          : []),
        ...(vague.length
          ? [`Vague accounts (examples): ${vague.slice(0, 6).join(", ")}`]
          : []),
      ],
      recommendedActions: [
        "Consolidate duplicate/overlapping accounts",
        "Rename ‘misc/other’ accounts into clear categories (or limit their usage)",
        "Adopt a simple naming standard for new accounts going forward",
      ],
    });
  }

  if (dim.key === "categorisation_consistency") {
    const trackingStatus = trackingCategoryCount === 0 ? "warn" : "pass";
    findings.push({
      title: "Tracking categories are not set up",
      status: trackingStatus,
      severity: trackingStatus === "pass" ? "Minor" : "Major",
      whatWeSaw: "No tracking categories were detected.",
      whyItMatters: "If you want visibility by department, project, location, or channel, tracking is the simplest way to get it without exploding your chart of accounts.",
      evidence: [`Tracking categories: ${trackingCategoryCount}`],
      recommendedActions: [
        "Define one tracking category that matches how you run the business (e.g., Department or Project)",
        "Start with 3–6 options and expand only when needed",
      ],
    });

    findings.push({
      title: "Coding rules may not be standardised",
      status: "warn",
      severity: "Minor",
      whatWeSaw: "Fast-growing teams often code the same type of spend differently depending on who enters it.",
      whyItMatters: "Inconsistent coding makes month-to-month comparisons unreliable and creates extra clean-up work at month end.",
      evidence: [],
      recommendedActions: [
        "Create a short ‘coding guide’ for top 20 repeat vendors",
        "Add monthly review: top 10 categories + ‘other/misc’ checks",
      ],
    });
  }

  if (dim.key === "reporting_clarity") {
    findings.push({
      title: "P&L may be harder to read than it needs to be",
      status: accountCount > 180 ? "warn" : "pass",
      severity: accountCount > 180 ? "Major" : "Minor",
      whatWeSaw: "A high number of expense accounts tends to create long reports with too many small lines.",
      whyItMatters: "Founders need quick answers: what changed, why, and what to do. Long P&Ls slow that down.",
      evidence: [`Active accounts: ${accountCount}`],
      recommendedActions: [
        "Compress the P&L into 12–20 meaningful operating expense lines",
        "Keep deeper detail in the ledger, not the report structure",
      ],
    });

    const cogsOk = hasCogsStructure(accounts);
    const cogsStatus = cogsOk ? "pass" : "warn";
    findings.push({
      title: "Direct costs vs operating costs may not be clearly separated",
      status: cogsStatus,
      severity: cogsStatus === "pass" ? "Minor" : "Major",
      whatWeSaw:
        cogsOk
          ? "We detected a direct-cost / COGS structure in your accounts."
          : "We did not detect an obvious direct-cost / COGS structure in your accounts.",
      whyItMatters:
        "A clear gross margin view helps founders make pricing, hiring, and marketing decisions with confidence.",
      evidence: [
        cogsOk ? "Direct cost / COGS accounts detected" : "No clear direct cost / COGS accounts detected",
      ],
      recommendedActions: [
        "Define what counts as direct cost vs operating expense",
        "Add a small COGS/direct cost section if your business has delivery/service costs",
      ],
    });
  }

  if (dim.key === "cash_flow_visibility") {
    findings.push({
      title: "Cash visibility depends on reconciliation discipline",
      status: "warn",
      severity: "Major",
      whatWeSaw: "Cashflow clarity is usually limited when bank feeds/reconciliation aren’t reviewed on a consistent cadence.",
      whyItMatters: "If the books lag reality, you can’t confidently decide what you can spend or invest this month.",
      evidence: [],
      recommendedActions: [
        "Set a weekly 20-minute reconciliation routine",
        "Aim for month-end close within 5 business days",
      ],
    });

    findings.push({
      title: "AR/AP hygiene impacts short-term cash surprises",
      status: "warn",
      severity: "Major",
      whatWeSaw: "Overdue invoices and bills (if present) typically drive unexpected cash pressure.",
      whyItMatters: "A clear view of what’s coming in and going out prevents last-minute cash squeezes.",
      evidence: [],
      recommendedActions: [
        "Review aged receivables weekly and follow up on overdue items",
        "Schedule payables so you’re not paying late or too early",
      ],
    });
  }

  if (dim.key === "bookkeeping_hygiene") {
    const mjStatus = manualJournalCount > 50 ? "warn" : "pass";
    findings.push({
      title: "Manual journals may be doing too much work",
      status: mjStatus,
      severity: mjStatus === "pass" ? "Minor" : "Major",
      whatWeSaw: "A high volume of manual journals often means month-end fixes are happening outside normal workflows.",
      whyItMatters: "More manual journals usually means more risk of mistakes and slower closes.",
      evidence: [`Manual journals (count): ${manualJournalCount}`],
      recommendedActions: [
        "Turn repeat journals into recurring templates/automations",
        "Create a simple month-end close checklist and stick to it",
      ],
    });

    findings.push({
      title: "Suspense/clearing should be routinely cleared",
      status: "warn",
      severity: "Major",
      whatWeSaw: "When suspense accounts aren’t cleared monthly, small issues accumulate into bigger cleanups.",
      whyItMatters: "Uncleared suspense reduces trust in reports and makes cash/expense lines harder to interpret.",
      evidence: [],
      recommendedActions: [
        "Add a monthly ‘suspense cleared to zero’ checkpoint",
        "Assign one owner for clearing decisions",
      ],
    });
  }

  return {
    key: dim.key,
    name: dim.name,
    score10: dim.score10,
    summary: dim.summary,
    findings: ensure2to3(findings),
  };
}

export function buildFullReportV1(args: {
  v1: DiagnosticV1Result;
  diagnosticVersion: string;
  generatedAt: Date;
  company?: string | null;
  accountCount: number;
  trackingCategoryCount: number;
  manualJournalCount: number;
  accounts: Array<{ name: string; code: string | null; type: string | null }>;
}): FullReport {
  const {
    v1,
    diagnosticVersion,
    generatedAt,
    company,
    accountCount,
    trackingCategoryCount,
    manualJournalCount,
    accounts,
  } = args;

  const band = bandFromScore(v1.overallScore100);

  const dimensions = v1.dimensions.map((dim) =>
    buildDimensionFindings({
      dim,
      accountCount,
      trackingCategoryCount,
      manualJournalCount,
      accounts,
    }),
  );

  const topIssues = (v1.topIssues || []).slice(0, 6).map((t) => ({
    title: t,
    severity: "Major" as const,
    evidence: [],
  }));

  // Founder-friendly, limited list, prioritised.
  const nextSteps: FullReport["nextSteps"] = [
    {
      title: "Simplify your chart of accounts for faster reporting",
      detail: "Consolidate overly-detailed expense accounts into clear rollups so your P&L tells a story at a glance.",
      effort: "Med",
      timeframe: "Next",
    },
    {
      title: "Create a simple coding guide for repeat vendors",
      detail: "Decide where the top 20 vendors should be coded and review ‘other/misc’ monthly.",
      effort: "Low",
      timeframe: "Now",
    },
    {
      title: "Set up one tracking category (only if you need reporting splits)",
      detail: "Use tracking for department/project/channel reporting instead of creating lots of new accounts.",
      effort: "Low",
      timeframe: "Next",
    },
    {
      title: "Adopt a weekly reconciliation routine",
      detail: "A consistent reconciliation cadence improves cash visibility and reduces month-end surprises.",
      effort: "Low",
      timeframe: "Now",
    },
    {
      title: "Use a month-end close checklist",
      detail: "Reduce manual journals and ensure suspense/clearing is resolved every month.",
      effort: "Low",
      timeframe: "Next",
    },
  ];

  const filteredNextSteps = nextSteps
    .filter((s) => !(trackingCategoryCount >= 1 && s.title.startsWith("Set up one tracking category")))
    .slice(0, 8);

  return {
    diagnosticVersion,
    generatedAtISO: generatedAt.toISOString(),
    company,
    overall: {
      score100: v1.overallScore100,
      band,
      meaning: meaningFromBand(band),
    },
    topIssues,
    dimensions,
    nextSteps: filteredNextSteps,
    notes: [
      "This diagnostic uses read-only signals from your Xero organisation.",
      "We prioritise structure and consistency checks (not transaction amounts) to keep your data private.",
      `Diagnostic version: ${diagnosticVersion}.`,
    ],
  };
}
