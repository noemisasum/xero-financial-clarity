import { cookies } from "next/headers";
import crypto from "crypto";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "aqount_anon_session";

function randomId(len = 24) {
  return crypto.randomBytes(len).toString("hex");
}

export async function getAnonSessionIdFromCookie(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value || null;
}

export async function getOrCreateAnonSessionId(): Promise<string> {
  const jar = await cookies();
  const existing = jar.get(COOKIE_NAME)?.value;
  if (existing) {
    // Best-effort touch / self-heal if DB was reset and cookie remains.
    try {
      await prisma.anonSession.update({
        where: { id: existing },
        data: { lastSeenAt: new Date() },
      });
    } catch {
      try {
        await prisma.anonSession.create({ data: { id: existing } });
      } catch {
        // ignore
      }
    }
    return existing;
  }

  const id = `sess_${randomId(16)}`;
  await prisma.anonSession.create({ data: { id } });

  jar.set({
    name: COOKIE_NAME,
    value: id,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return id;
}
