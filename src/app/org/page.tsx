import Container from "@/components/Container";
import LoadingForm from "@/components/LoadingForm";
import Image from "next/image";
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
    <div className="min-h-[calc(100vh-120px)] py-14 sm:py-20">
      <Container>
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
                Ready to Run
              </h1>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Confirm your organisation and run the diagnostic.
              </p>
            </div>
            <Image
              src="/brand/aqount-lockup-transparent.png"
              alt="Aqount"
              width={140}
              height={40}
              className="mt-1 h-8 w-auto opacity-95"
              priority
            />
          </div>

          {sp.error ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              Something is missing. Please select an organisation and try again.
            </div>
          ) : null}

          <LoadingForm
            action="/api/xero/select-tenant"
            method="post"
            className="mt-6 space-y-4"
          >
            <input type="hidden" name="connectionId" value={connectionId} />

            {tenants.length <= 1 ? (
              <>
                <input
                  type="hidden"
                  name="tenantId"
                  value={tenants[0]?.tenantId || ""}
                />

                <div className="rounded-xl border border-[var(--border)] bg-zinc-50 p-4">
                  <div className="text-sm font-medium text-zinc-900">
                    Organisation
                  </div>
                  <div className="mt-1 text-sm text-zinc-700">
                    {tenants[0]?.tenantName || "(Unknown)"}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label
                  htmlFor="tenantId"
                  className="block text-sm font-medium text-zinc-900"
                >
                  Organisation
                </label>
                <select
                  id="tenantId"
                  name="tenantId"
                  className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an organisation
                  </option>
                  {tenants.map((t) => (
                    <option key={t.tenantId} value={t.tenantId}>
                      {t.tenantName || t.tenantId}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-[color:var(--link)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
              >
                Run Diagnostic
              </button>
            </div>
          </LoadingForm>

          <div className="mt-4 text-xs text-zinc-500">
            You’ll be able to run this once. Access is revoked after the diagnostic.
          </div>
        </div>
      </Container>
    </div>
  );
}
