import Container from "@/components/Container";
import OrgRunWizard from "@/components/OrgRunWizard";
import { prisma } from "@/lib/db";
import { XERO_CONNECTIONS_URL } from "@/lib/xero";

type XeroConnectionItem = {
  id: string;
  tenantId: string;
  tenantName: string;
};

async function fetchConnections(accessToken: string): Promise<XeroConnectionItem[]> {
  const res = await fetch(XERO_CONNECTIONS_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = (await res.json()) as unknown;
  if (!Array.isArray(json)) return [];

  return (json as Array<{ id?: unknown; tenantId?: unknown; tenantName?: unknown }> )
    .map((x) => ({
      id: String(x.id || ""),
      tenantId: String(x.tenantId || ""),
      tenantName: String(x.tenantName || ""),
    }))
    .filter((x) => x.tenantId);
}

export default async function OrgSelectPage({
  searchParams,
}: {
  searchParams: Promise<{ connectionId?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const connectionId = sp.connectionId || "";

  if (!connectionId) {
    return (
      <div className="py-14 sm:py-20">
        <Container>
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
            Ready to Run
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            Missing connection id. Please start again from the Connect Xero
            button.
          </p>
        </Container>
      </div>
    );
  }

  const conn = await prisma.xeroConnection.findUnique({
    where: { id: connectionId },
  });

  const tenants = conn ? await fetchConnections(conn.accessTokenEncrypted) : [];

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
          Ready to Run
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          Select your Xero organisation, then run the diagnostic.
        </p>

        {sp.error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            Something is missing. Please select an organisation and try again.
          </div>
        ) : null}

        <OrgRunWizard
          connectionId={connectionId}
          tenants={tenants.map((t) => ({
            tenantId: t.tenantId,
            tenantName: t.tenantName,
          }))}
          defaultTenantId={tenants.length === 1 ? tenants[0]?.tenantId : ""}
        />
      </Container>
    </div>
  );
}
