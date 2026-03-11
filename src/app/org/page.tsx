import Container from "@/components/Container";

export default async function OrgSelectPage({
  searchParams,
}: {
  searchParams: Promise<{ connectionId?: string; tenants?: string }>;
}) {
  const sp = await searchParams;
  const tenants = Number(sp.tenants || 0);

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
          Select Organisation
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          {tenants > 1
            ? "We found multiple Xero organisations available for this connection. Tenant selection will be implemented next."
            : "Tenant selection will be implemented next."}
        </p>
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-5 text-sm text-zinc-700">
          <div>
            Connection ID: <span className="font-mono">{sp.connectionId || "(missing)"}</span>
          </div>
          <div className="mt-2">Tenants found: {Number.isFinite(tenants) ? tenants : "(unknown)"}</div>
        </div>
      </Container>
    </div>
  );
}
