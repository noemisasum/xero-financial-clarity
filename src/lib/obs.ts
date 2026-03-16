import { headers } from "next/headers";

export type ObsLevel = "debug" | "info" | "warn" | "error";

type ObsBase = {
  level: ObsLevel;
  event: string;
  ts: string;
  requestId?: string;
  vercelId?: string;
  route?: string;
  method?: string;
  sessionId?: string;
  runId?: string;
  connectionId?: string;
  tenantId?: string;
};

function nowIso() {
  return new Date().toISOString();
}

export function getRequestContext() {
  // In Next App Router, headers() is available in server components/route handlers.
  const h = headers();
  const requestId = h.get("x-request-id") || undefined;
  const vercelId = h.get("x-vercel-id") || undefined;
  const route = h.get("x-matched-path") || undefined;
  return { requestId, vercelId, route };
}

export function obs(
  level: ObsLevel,
  event: string,
  fields: Omit<ObsBase, "level" | "event" | "ts"> & Record<string, unknown> = {},
) {
  const ctx = getRequestContext();
  const payload: ObsBase & Record<string, unknown> = {
    level,
    event,
    ts: nowIso(),
    ...ctx,
    ...fields,
  };

  // JSON logs are easiest to query in Vercel/Datadog/etc.
  const line = JSON.stringify(payload);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export function scrubError(err: unknown) {
  // Avoid logging tokens/secrets by accident.
  if (!err || typeof err !== "object") return { name: "Error", message: String(err) };
  const e = err as { name?: unknown; message?: unknown; stack?: unknown };
  return {
    name: typeof e.name === "string" ? e.name : "Error",
    message: typeof e.message === "string" ? e.message : "(no message)",
    // keep stack short
    stack: typeof e.stack === "string" ? e.stack.slice(0, 2000) : undefined,
  };
}

export async function withObs<T>(
  meta: { route: string; method: string } & Record<string, unknown>,
  fn: () => Promise<T>,
) {
  const start = Date.now();
  obs("info", "request.start", meta);
  try {
    const out = await fn();
    obs("info", "request.ok", { ...meta, durMs: Date.now() - start });
    return out;
  } catch (err) {
    obs("error", "request.error", { ...meta, durMs: Date.now() - start, error: scrubError(err) });
    throw err;
  }
}
