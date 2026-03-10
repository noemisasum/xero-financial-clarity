export default function ScorecardMock() {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_1px_0_rgba(17,24,39,0.02),0_25px_70px_rgba(17,24,39,0.12)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-[color:var(--heading)]">
            Example Trading Pte. Ltd.
          </div>
          <div className="mt-1 text-xs text-zinc-500">Generated on: 10 Mar 2026</div>
        </div>
        <div className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold text-zinc-900">
          Sample output
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-zinc-50 p-5">
          <div className="flex items-end justify-between">
            <div className="text-4xl font-semibold tracking-tight text-[color:var(--heading)]">
              64 <span className="text-lg text-zinc-500">/ 100</span>
            </div>
            <div className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
              Moderate clarity
            </div>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white ring-1 ring-[color:var(--border)]">
            <div
              className="h-full rounded-full bg-[color:var(--accent)]"
              style={{ width: "64%" }}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-zinc-600">
            Your accounting structure provides partial reporting visibility, but
            several areas may limit decision-making clarity.
          </p>

          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Recommended Next Steps
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
              {[
                "Consolidate overlapping expense accounts and standardise coding rules",
                "Define consistent reporting categories and monthly review routines",
                "Introduce basic cash visibility hygiene (AP/AR tracking and forecasting cadence)",
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent)]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Breakdown
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Chart of Accounts Structure", "7 / 10"],
              ["Categorisation Consistency", "5 / 10"],
              ["Reporting Clarity", "6 / 10"],
              ["Cash Flow Visibility", "4 / 10"],
              ["Bookkeeping Hygiene", "8 / 10"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-zinc-50 px-4 py-3"
              >
                <div className="text-sm font-medium text-zinc-900">{k}</div>
                <div className="text-sm font-semibold text-zinc-950">{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Top issues detected
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent)]" />
                Duplicate expense categories across teams
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent)]" />
                Inconsistent account naming conventions
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent)]" />
                Missing reporting groupings for cash-critical spend areas
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-zinc-600">
        Scope: structure + coding patterns. We do not post, edit, or change your
        books.
      </p>
    </div>
  );
}
