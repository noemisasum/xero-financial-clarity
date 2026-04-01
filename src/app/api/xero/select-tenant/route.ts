import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { XERO_CONNECTIONS_URL } from "@/lib/xero";

async function fetchTenantName(accessToken: string, tenantId: string) {
  const res = await fetch(XERO_CONNECTIONS_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as unknown;
  if (!Array.isArray(json)) return null;
  const hit = (json as Array<{ tenantId?: unknown; tenantName?: unknown }>).find(
    (x) => String(x.tenantId || "") === tenantId,
  );
  return hit?.tenantName ? String(hit.tenantName) : null;
}

export async function POST(req: Request) {
  const form = await req.formData();
  const connectionId = String(form.get("connectionId") || "").trim();
  const tenantId = String(form.get("tenantId") || "").trim();

  if (!connectionId || !tenantId) {
    return NextResponse.redirect(
      new URL(
        `/org?error=missing_fields&connectionId=${encodeURIComponent(connectionId)}`,
        req.url,
      ),
    );
  }

  const conn = await prisma.xeroConnection.findUnique({ where: { id: connectionId } });
  if (!conn) {
    return NextResponse.redirect(new URL(`/?xero=missing_connection`, req.url));
  }

  const tenantName = await fetchTenantName(conn.accessTokenEncrypted, tenantId);

  await prisma.xeroConnection.update({
    where: { id: connectionId },
    data: {
      tenantId,
      tenantName,
    },
  });

  // Fix A (auditability): log selected tenant so Vercel logs can be searched.
  console.info("xero.tenant.selected", {
    connectionId,
    tenantId,
    tenantName,
  });

  return NextResponse.redirect(
    new URL(`/run?connectionId=${encodeURIComponent(connectionId)}`, req.url),
  );
}
