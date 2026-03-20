import ScoreBar from "@/components/ScoreBar";
import type { FullReport } from "@/lib/report/types";

const BOOK_CALL_URL = process.env.NEXT_PUBLIC_BOOK_CALL_URL || "";

function Pill({
  children,
  fixed,
}: {
  children: React.ReactNode;
  fixed?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--heading)]${
        fixed ? " min-w-[92px]" : ""
      }`}
    >
      {children}
    </span>
  );
}

export default function FullReportView({
  report,
  showOverall = true,
}: {
  report: FullReport;
  showOverall?: boolean;
}) {
  return (
    <div className="mt-8 space-y-6">
      {showOverall ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-zinc-500">Overall</div>
              <div className="mt-1 text-3xl font-semibold text-[color:var(--heading)]">
                {report.overall.score100}
                <span className="text-zinc-500"> / 100</span>
              </div>

              <div className="mt-3 max-w-2xl text-sm leading-6 text-zinc-700">
                {report.overall.meaning}
              </div>

              <div className="mt-4 max-w-xl">
                <ScoreBar score100={report.overall.score100} />
              </div>

              {BOOK_CALL_URL ? (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="text-sm text-zinc-600">
                    Optional: book a 15‑min walkthrough.
                  </div>
                  <a
                    href={BOOK_CALL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--heading)] hover:bg-zinc-50"
                  >
                    Book a call
                  </a>
                </div>
              ) : null}
            </div>
            <Pill>{report.overall.band}</Pill>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
        <div className="text-sm font-semibold text-[color:var(--heading)]">
          Your next steps
        </div>
        <ul className="mt-3 space-y-3 text-sm text-zinc-700">
          {(report.nextSteps || []).map((s) => (
            <li
              key={s.title}
              className="rounded-xl border border-[var(--border)] bg-zinc-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="font-medium text-zinc-900">{s.title}</div>
                <div className="flex gap-2">
                  <Pill fixed>{s.effort}</Pill>
                  <Pill fixed>{s.timeframe}</Pill>
                </div>
              </div>
              <div className="mt-2 text-sm leading-6 text-zinc-700">{s.detail}</div>
            </li>
          ))}
        </ul>

        {BOOK_CALL_URL ? (
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-zinc-50 p-4">
            <div className="text-sm text-zinc-700">
              Want help prioritising these into a 30‑day plan?
            </div>
            <div className="mt-3">
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--heading)] hover:bg-zinc-50"
              >
                Book a call
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
        <div className="text-sm font-semibold text-[color:var(--heading)]">
          Detailed results
        </div>

        <div className="mt-4 space-y-6">
          {(report.dimensions || []).map((d) => (
            <div
              key={d.key}
              className="rounded-2xl border border-[var(--border)] bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-zinc-900">{d.name}</div>
                  <div className="mt-1 text-sm text-zinc-600">{d.summary}</div>
                </div>
                <div className="whitespace-nowrap text-base font-semibold text-zinc-900">
                  {d.score10} / 10
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {(d.findings || []).map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl border border-[var(--border)] bg-zinc-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-medium text-zinc-900">{f.title}</div>
                      <div className="ml-auto flex flex-none items-center justify-end gap-2">
                        <Pill>
                          {f.status === "pass"
                            ? "Pass"
                            : f.status === "warn"
                              ? "Warn"
                              : "Fail"}
                        </Pill>
                        <Pill>{f.severity}</Pill>
                      </div>
                    </div>

                    <div className="mt-2 space-y-2 text-sm leading-6 text-zinc-700">
                      <div>
                        <span className="font-semibold text-zinc-900">What we saw:</span>{" "}
                        {f.whatWeSaw}
                      </div>
                      <div>
                        <span className="font-semibold text-zinc-900">Why it matters:</span>{" "}
                        {f.whyItMatters}
                      </div>
                    </div>

                    {f.evidence?.length ? (
                      <div className="mt-3">
                        <div className="text-xs font-semibold text-zinc-900">Evidence</div>
                        <ul className="mt-2 space-y-1 text-xs text-zinc-600">
                          {f.evidence.map((e) => (
                            <li key={e}>• {e}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {f.recommendedActions?.length ? (
                      <div className="mt-3">
                        <div className="text-xs font-semibold text-zinc-900">
                          Recommended actions
                        </div>
                        <ul className="mt-2 space-y-1 text-xs text-zinc-600">
                          {f.recommendedActions.map((a) => (
                            <li key={a}>• {a}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {report.notes?.length ? (
        <div className="rounded-2xl border border-[var(--border)] bg-zinc-50 p-5 text-xs leading-6 text-zinc-600">
          {report.notes.map((n) => (
            <div key={n}>• {n}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
