export type Severity = "Minor" | "Major";
export type FindingStatus = "pass" | "warn" | "fail";

export type FullReport = {
  diagnosticVersion: string;
  generatedAtISO: string;
  company?: string | null;

  overall: {
    score100: number;
    band: "Strong" | "Good" | "Moderate" | "Needs Improvement";
    meaning: string;
  };

  topIssues: Array<{
    title: string;
    severity: Severity;
    evidence: string[];
  }>;

  dimensions: Array<{
    key: string;
    name: string;
    score10: number;
    summary: string;
    findings: Array<{
      title: string;
      status: FindingStatus;
      severity: Severity;
      whatWeSaw: string;
      whyItMatters: string;
      evidence: string[];
      recommendedActions: string[];
    }>;
  }>;

  nextSteps: Array<{
    title: string;
    detail: string;
    effort: "Low" | "Med" | "High";
    timeframe: "Now" | "Next" | "Later";
  }>;

  notes: string[];
};
