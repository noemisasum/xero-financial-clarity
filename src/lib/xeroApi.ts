import { requireEnv, XERO_TOKEN_URL } from "@/lib/xero";

const XERO_REVOCATION_URL = "https://identity.xero.com/connect/revocation";

export type XeroToken = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope?: string;
};

async function parseJsonOrThrow<T>(res: Response, context: string): Promise<T> {
  const ctype = res.headers.get("content-type") || "";
  if (!ctype.toLowerCase().includes("application/json")) {
    const txt = await res.text();
    throw new Error(
      `${context}: expected JSON but got '${ctype || "unknown"}'. Body: ${txt.slice(0, 300)}`,
    );
  }

  try {
    return (await res.json()) as T;
  } catch {
    const txt = await res.text();
    throw new Error(`${context}: invalid JSON. Body: ${txt.slice(0, 300)}`);
  }
}

export async function xeroFetch<T>(
  url: string,
  {
    accessToken,
    tenantId,
    method,
    headers,
    body,
  }: {
    accessToken: string;
    tenantId?: string;
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
  },
): Promise<T> {
  const res = await fetch(url, {
    method: method || "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      ...(tenantId ? { "xero-tenant-id": tenantId } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Xero API HTTP ${res.status}: ${txt.slice(0, 300)}`);
  }

  return parseJsonOrThrow<T>(res, "Xero API response");
}

export async function refreshAccessToken(refreshToken: string): Promise<XeroToken> {
  const clientId = requireEnv("XERO_CLIENT_ID");
  const clientSecret = requireEnv("XERO_CLIENT_SECRET");

  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", refreshToken);

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(XERO_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Xero token refresh failed ${res.status}: ${txt.slice(0, 300)}`);
  }

  return parseJsonOrThrow<XeroToken>(res, "Xero token refresh");
}

export async function revokeRefreshToken(refreshToken: string): Promise<void> {
  const clientId = requireEnv("XERO_CLIENT_ID");
  const clientSecret = requireEnv("XERO_CLIENT_SECRET");

  // Xero revocation uses Basic auth + form-encoded body.
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const body = new URLSearchParams();
  body.set("token", refreshToken);
  body.set("token_type_hint", "refresh_token");

  const res = await fetch(XERO_REVOCATION_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Xero token revocation failed ${res.status}: ${txt.slice(0, 300)}`);
  }
}
