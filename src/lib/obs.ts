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

function getRequestContext(req?: Request) {
  // Next.js 16+ treats request headers APIs as async in some contexts.
  // For observability, rely on the Request object (available in route handlers).
  if (!req) return {};
  return {
    requestId: req.headers.get("x-request-id") || undefined,
    vercelId: req.headers.get("x-vercel-id") || undefined,
    // Vercel/Next may provide a matched route header, but it's not guaranteed.
    route: req.headers.get("x-matched-path") || undefined,
  };
}

export function obs(
  level: ObsLevel,
  event: string,
  fields: Omit<ObsBase, "level" | "event" | "ts"> & Record<string, unknown> = {},
) {
  const payload: ObsBase & Record<string, unknown> = {
    level,
    event,
    ts: nowIso(),
    ...fields,
  };

  const line = JSON.stringify(payload);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export function scrubError(err: unknown) {
  if (!err || typeof err !== "object") return { name: "Error", message: String(err) };
  const e = err as { name?: unknown; message?: unknown; stack?: unknown };
  return {
    name: typeof e.name === "string" ? e.name : "Error",
    message: typeof e.message === "string" ? e.message : "(no message)",
    stack: typeof e.stack === "string" ? e.stack.slice(0, 2000) : undefined,
  };
}

export async function withObs<T>(
  req: Request,
  meta: { route: string; method: string } & Record<string, unknown>,
  fn: () => Promise<T>,
) {
  const start = Date.now();
  const ctx = getRequestContext(req);

  obs("info", "request.start", { ...ctx, ...meta });
  try {
    const out = await fn();
    obs("info", "request.ok", { ...ctx, ...meta, durMs: Date.now() - start });
    return out;
  } catch (err) {
    obs("error", "request.error", {
      ...ctx,
      ...meta,
      durMs: Date.now() - start,
      error: scrubError(err),
    });
    throw err;
  }
}
