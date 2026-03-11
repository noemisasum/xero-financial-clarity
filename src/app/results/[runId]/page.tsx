import Container from "@/components/Container";
import { prisma } from "@/lib/db";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
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
    ? (dims as Array<{ key: string; name: string; score10: number }> )
    : [];
  const topIssues =
    findings &&
    typeof findings === "object" &&
    Array.isArray((findings as { topIssues?: unknown }).topIssues)
      ? ((findings as { topIssues: string[] }).topIssues as string[])
      : [];

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
          Your Financial Clarity Score
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          Preview results. Full email report and lead capture will be implemented
          next.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
            <div className="text-sm text-zinc-500">Overall</div>
            <div className="mt-2 text-4xl font-semibold text-[color:var(--heading)]">
              {run.result.overallScore} / 10
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
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
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
      </Container>
    </div>
  );
}
