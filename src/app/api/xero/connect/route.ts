import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateAnonSessionId } from "@/lib/session";
import {
  XERO_AUTH_URL,
  XERO_SCOPES,
  randomString,
  requireEnv,
  sha256Base64Url,
} from "@/lib/xero";

export async function GET() {
  const clientId = requireEnv("XERO_CLIENT_ID");
  const redirectUri = requireEnv("XERO_REDIRECT_URI");

  const sessionId = await getOrCreateAnonSessionId();

  const state = `st_${randomString(16)}`;
  const codeVerifier = randomString(32);
  const codeChallenge = sha256Base64Url(codeVerifier);

  await prisma.oAuthState.create({
    data: {
      sessionId,
      state,
      codeVerifier,
    },
  });

  const url = new URL(XERO_AUTH_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", XERO_SCOPES);
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");

  return NextResponse.redirect(url.toString());
}
