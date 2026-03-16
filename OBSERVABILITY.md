# Observability (clarity.aqount.tech)

This project uses **structured JSON logs** for key events.

## What to look for

All logs are emitted as JSON lines (via `console.log/warn/error`) so they can be queried in Vercel/Datadog/etc.

Common fields:
- `ts` ISO timestamp
- `level`: debug|info|warn|error
- `event`: event name
- `requestId`: from `x-request-id` (if present)
- `vercelId`: from `x-vercel-id` (if present)
- `route`, `method`
- correlation fields as applicable: `sessionId`, `runId`, `connectionId`, `tenantId`

## Key events

- `request.start`, `request.ok`, `request.error` (wrapper)
- `xero.callback.received`, `xero.callback.ok`
- `report.email.requested`
- `report.resend.requested`

## Troubleshooting runbook

### Report email send fails
1. Search logs for `event=report.email.requested` and `event=request.error` with same `runId`.
2. Check Postmark configuration (`POSTMARK_SERVER_TOKEN`, From address).
3. Confirm lead record exists for the run.

### Xero auth fails
1. Search logs for `event=xero.callback.received`.
2. Validate `XERO_REDIRECT_URI` matches deployed callback URL.
3. Check token exchange errors (HTTP status / response text).

## Sentry / error monitoring

Not wired yet in code. If we choose Sentry later, use `@sentry/nextjs` and gate it behind `SENTRY_DSN` so local dev remains simple.
