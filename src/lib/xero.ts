import crypto from "crypto";

export const XERO_AUTH_URL = "https://login.xero.com/identity/connect/authorize";
export const XERO_TOKEN_URL = "https://identity.xero.com/connect/token";
export const XERO_CONNECTIONS_URL = "https://api.xero.com/connections";

export const XERO_SCOPES = (
  process.env.XERO_SCOPES ||
  [
    // Minimal, reliable read-only scope set.
    // We can expand later once the Xero app is confirmed to accept additional granular scopes.
    "openid",
    "profile",
    "email",
    "offline_access",
    "accounting.settings.read",

    // Step 1 expansion (Reporting Clarity): Profit & Loss report
    "accounting.reports.profitandloss.read",
  ].join(" ")
).trim();

export function base64Url(buf: Buffer) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function sha256Base64Url(input: string) {
  return base64Url(crypto.createHash("sha256").update(input).digest());
}

export function randomString(bytes = 32) {
  return base64Url(crypto.randomBytes(bytes));
}

export function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}
