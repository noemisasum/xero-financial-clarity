export type DimensionKey =
  | "chart_of_accounts_structure"
  | "categorisation_consistency"
  | "reporting_clarity"
  | "cash_flow_visibility"
  | "bookkeeping_hygiene";

export type DimensionResult = {
  key: DimensionKey;
  name: string;
  score10: number;
  summary: string;
};

export type DiagnosticV1Result = {
  overallScore100: number;
  dimensions: DimensionResult[];
  topIssues: string[];
};

export function runDiagnosticV1(inputs: {
  accountCount: number;
  trackingCategoryCount: number;
  manualJournalCount?: number;
}): DiagnosticV1Result {
  // v1 skeleton: conservative defaults and simple structure-based scoring.
  // We'll replace with DIAGNOSTIC_SPEC-driven signals next.

  const coaScore = inputs.accountCount > 300 ? 4 : inputs.accountCount > 150 ? 6 : 8;
  const trackingScore = inputs.trackingCategoryCount >= 1 ? 7 : 5;
  const hygieneScore = (inputs.manualJournalCount ?? 0) > 50 ? 5 : 8;

  const reportingScore = 7;
  const cashScore = 6;

  const dimensions: DimensionResult[] = [
    {
      key: "chart_of_accounts_structure",
      name: "Chart of Accounts Structure",
      score10: coaScore,
      summary: "Chart structure indicators based on active accounts and naming patterns.",
    },
    {
      key: "categorisation_consistency",
      name: "Categorisation Consistency",
      score10: trackingScore,
      summary: "Early signals from tracking category presence (transaction-based checks next).",
    },
    {
      key: "reporting_clarity",
      name: "Reporting Clarity",
      score10: reportingScore,
      summary: "Report-readiness checks using P&L, Balance Sheet, and Trial Balance availability.",
    },
    {
      key: "cash_flow_visibility",
      name: "Cash Flow Visibility",
      score10: cashScore,
      summary: "Cash flow visibility signals (bank summary, aged reports) will be expanded.",
    },
    {
      key: "bookkeeping_hygiene",
      name: "Bookkeeping Hygiene",
      score10: hygieneScore,
      summary: "Hygiene proxy based on manual journal volume (more checks to follow).",
    },
  ];

  const overallScore10 =
    dimensions.reduce((a, d) => a + d.score10, 0) / dimensions.length;

  const overallScore100 = Math.round(overallScore10 * 10);

  const topIssues: string[] = [];
  if (inputs.trackingCategoryCount === 0) topIssues.push("Tracking categories not set up");
  if (inputs.accountCount > 200) topIssues.push("Chart of accounts may be overly granular");
  if ((inputs.manualJournalCount ?? 0) > 50) topIssues.push("High manual journal volume");

  return { overallScore100, dimensions, topIssues };
}
