import Container from "@/components/Container";

export default async function RunPage({
  searchParams,
}: {
  searchParams: Promise<{ connectionId?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
          Running Diagnostic
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          Diagnostic execution will be implemented next. This page is the target
          after tenant selection.
        </p>
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-5 text-sm text-zinc-700">
          <div>
            Connection ID: <span className="font-mono">{sp.connectionId || "(missing)"}</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
