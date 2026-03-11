import Container from "@/components/Container";
import { prisma } from "@/lib/db";

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ runId: string }>;
  searchParams: Promise<{ sent?: string; full?: string }>;
}) {
  const { runId } = await params;
  const sp = await searchParams;

  const run = await prisma.diagnosticRun.findUnique({
    where: { id: runId },
    include: { result: true },
  });

  if (!run || !run.result) {
    return (
      <div className="py-14 sm:py-20">
        <Container>
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
            Results Not Found
          </h1>
          <p className="mt-3 text-sm text-zinc-600">
            This diagnostic run could not be found.
          </p>
        </Container>
      </div>
    );
  }

  const dims = run.result.dimensionsJson as unknown;
  const findings = run.result.findingsJson as unknown;

  const dimList = Array.isArray(dims)
    ? (dims as Array<{ key: string; name: string; score10: number }>)
    : [];

  const topIssues =
    findings &&
    typeof findings === "object" &&
    Array.isArray((findings as { topIssues?: unknown }).topIssues)
      ? ((findings as { topIssues: string[] }).topIssues as string[])
      : [];

  const sentOk = sp.sent === "1";
  const sentNo = sp.sent === "0";
  const wantFull = sp.full === "1";

  const score = run.result.overallScore;
  const band =
    score >= 80
      ? "Strong"
      : score >= 65
        ? "Good"
        : score >= 45
          ? "Moderate"
          : "Needs Improvement";

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
          Your Financial Clarity Score
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          Preview your results below. Enter your email to receive the full
          diagnostic report.
        </p>

        {sentOk ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            Report sent. Please check your inbox.
          </div>
        ) : null}

        {sentNo ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            Could not send the report. Please try again.
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-500">Overall</div>
              <span className="inline-flex items-center rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--heading)]">
                {band}
              </span>
            </div>
            <div className="mt-2 text-4xl font-semibold text-[color:var(--heading)]">
              <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Financial Clarity Score
              </span>
              <span>{run.result.overallScore}</span>
              <span className="text-zinc-500"> / 100</span>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-[color:var(--heading)]">
                Breakdown
              </div>
              <div className="mt-3 space-y-2">
                {dimList.map((d) => (
                  <div
                    key={d.key}
                    className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-zinc-50 px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-zinc-900">{d.name}</span>
                    <span className="text-zinc-600">{d.score10} / 10</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-sm font-semibold text-[color:var(--heading)]">
                Top Issues Detected
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {topIssues.length ? (
                  topIssues.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent)]" />
                      <span>{x}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-zinc-500">No major issues detected.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
            {wantFull ? (
              <>
                <div className="text-sm font-semibold text-[color:var(--heading)]">
                  Full Report
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  You can read the full report here, and we have also emailed a copy.
                </p>

                <form action="/api/report/resend" method="post" className="mt-4">
                  <input type="hidden" name="runId" value={runId} />
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--link)] hover:bg-zinc-50"
                  >
                    Resend Email
                  </button>
                  <div className="mt-2 text-xs text-zinc-500">
                    If the email landed in spam, this will resend (rate-limited).
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="text-sm font-semibold text-[color:var(--heading)]">
                  Email Me the Full Report
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Get the full breakdown and recommended next steps.
                </p>

                <form
                  action="/api/report/email"
                  method="post"
                  className="mt-5 space-y-3"
                >
              <input type="hidden" name="runId" value={runId} />

              <div>
                <label className="text-sm font-medium text-zinc-900" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-900" htmlFor="name">
                  Name (optional)
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label
                  className="text-sm font-medium text-zinc-900"
                  htmlFor="company"
                >
                  Company (optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  defaultValue={run.tenantName || ""}
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm"
                />
              </div>

              <label className="mt-2 flex items-start gap-2 text-xs text-zinc-600">
                <input
                  type="checkbox"
                  name="consent"
                  className="mt-0.5 h-4 w-4 rounded border-[var(--border)]"
                />
                <span>
                  I agree to receive this report by email and understand Aqount
                  may follow up.
                </span>
              </label>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[color:var(--link)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Send My Report
              </button>

              <div className="text-xs text-zinc-500">
                Read-only access. No bookkeeping changes.
              </div>
            </form>
              </>
            )}
          </div>
        </div>

        {wantFull ? (
          <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6">
            <div className="text-sm font-semibold text-[color:var(--heading)]">
              Recommended Next Steps
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {[
                "Tighten chart of accounts rollups for management reporting",
                "Define and enforce expense coding rules for repeat vendors",
                "Reduce manual journal dependency with a close checklist",
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent)]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-[var(--border)] bg-zinc-50 p-4 text-sm text-zinc-700">
              <div className="font-medium text-zinc-900">Want help improving this?</div>
              <div className="mt-1 text-zinc-600">
                Reply to the email you received from Aqount Diagnostic and we will suggest the fastest path to improve reporting clarity.
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
