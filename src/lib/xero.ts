import crypto from "crypto";

export const XERO_AUTH_URL = "https://login.xero.com/identity/connect/authorize";
export const XERO_TOKEN_URL = "https://identity.xero.com/connect/token";
export const XERO_CONNECTIONS_URL = "https://api.xero.com/connections";

export const XERO_SCOPES = (
  process.env.XERO_SCOPES ||
  [
    // Identity
    "openid",
    "profile",
    "email",

    // Refresh token for short-lived, one-run diagnostic (read-only)
    "offline_access",

    // Settings / structure
    "accounting.settings.read",
    "accounting.contacts.read",

    // Transactional read (future-proof granular scopes)
    "accounting.invoices.read",
    "accounting.banktransactions.read",
    "accounting.payments.read",
    "accounting.journals.read",
    "accounting.manualjournals.read",

    // Reports (new granular report scopes)
    "accounting.reports.profitandloss.read",
    "accounting.reports.balancesheet.read",
    "accounting.reports.trialbalance.read",
    "accounting.reports.aged.read",
    "accounting.reports.banksummary.read",
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
