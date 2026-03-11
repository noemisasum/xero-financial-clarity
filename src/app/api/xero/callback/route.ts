import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  requireEnv,
  XERO_CONNECTIONS_URL,
  XERO_TOKEN_URL,
} from "@/lib/xero";

async function fetchJson(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.json();
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(new URL("/?xero=missing_params", req.url));
  }

  const oauthState = await prisma.oAuthState.findUnique({ where: { state } });
  if (!oauthState || oauthState.usedAt) {
    return NextResponse.redirect(new URL("/?xero=invalid_state", req.url));
  }

  const clientId = requireEnv("XERO_CLIENT_ID");
  const clientSecret = requireEnv("XERO_CLIENT_SECRET");
  const redirectUri = requireEnv("XERO_REDIRECT_URI");

  // Exchange code for tokens
  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("code", code);
  body.set("redirect_uri", redirectUri);
  body.set("client_id", clientId);
  body.set("code_verifier", oauthState.codeVerifier);

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const token = await fetchJson(XERO_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const accessToken = token.access_token as string;
  const refreshToken = token.refresh_token as string;
  const expiresIn = Number(token.expires_in || 1800);
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  // Fetch connections/tenants
  const connections = await fetchJson(XERO_CONNECTIONS_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  await prisma.oAuthState.update({
    where: { id: oauthState.id },
    data: { usedAt: new Date() },
  });

  const conn = await prisma.xeroConnection.create({
    data: {
      sessionId: oauthState.sessionId,
      accessTokenEncrypted: accessToken, // TODO: encrypt
      refreshTokenEncrypted: refreshToken, // TODO: encrypt
      expiresAt,
    },
  });

  // Persist tenants list temporarily in cookie via redirect query? We'll store in DB next.
  // For now, redirect to /org to select.
  const url = new URL("/org", req.url);
  url.searchParams.set("connectionId", conn.id);
  // Store tenant list in DB later; for now include short hint.
  url.searchParams.set("tenants", String(Array.isArray(connections) ? connections.length : 0));

  return NextResponse.redirect(url);
}
