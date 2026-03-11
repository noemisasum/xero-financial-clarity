"use client";

import { useMemo, useState } from "react";
import RunWizardModal from "@/components/RunWizardModal";

type Tenant = { tenantId: string; tenantName: string };

export default function OrgRunWizard({
  connectionId,
  tenants,
  defaultTenantId,
}: {
  connectionId: string;
  tenants: Tenant[];
  defaultTenantId?: string | null;
}) {
  const [tenantId, setTenantId] = useState<string>(defaultTenantId || "");
  const selectedTenant = useMemo(
    () => tenants.find((t) => t.tenantId === tenantId) || null,
    [tenants, tenantId],
  );

  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function postForm(url: string, data: Record<string, string>) {
    const body = new URLSearchParams(data);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    return res;
  }

  async function handleRun() {
    setError(null);
    setOpen(true);
    setStepIndex(0);

    if (!tenantId) {
      setError("Please select an organisation.");
      return;
    }

    try {
      // Step 1: persist tenant choice (server uses this later for run records)
      setStepIndex(0);
      const sel = await postForm("/api/xero/select-tenant", {
        connectionId,
        tenantId,
      });
      if (!sel.ok) {
        const txt = await sel.text();
        throw new Error(txt || "Could not select organisation");
      }

      // Step 2: start the diagnostic
      setStepIndex(1);

      // small delay so the UI feels responsive/premium
      await new Promise((r) => setTimeout(r, 400));

      const runRes = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectionId }),
      });

      if (!runRes.ok) {
        const txt = await runRes.text();
        throw new Error(txt || "Diagnostic failed");
      }

      setStepIndex(3);
      const json = (await runRes.json()) as { runId?: string };
      if (!json.runId) throw new Error("Missing run id");

      window.location.href = `/results/${json.runId}`;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-zinc-600">Connected via Xero</div>
          <div className="mt-1 text-xs text-zinc-500">
            Read-only access · One run per connection · Auto-revoked after run
          </div>
        </div>
        {selectedTenant ? (
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Organisation selected
          </span>
        ) : null}
      </div>

      <div className="mt-5">
        {tenants.length <= 1 ? (
          <div className="rounded-xl border border-[var(--border)] bg-zinc-50 p-4">
            <div className="text-sm font-medium text-zinc-900">Organisation</div>
            <div className="mt-1 text-sm text-zinc-700">
              {tenants[0]?.tenantName || "(Unknown)"}
            </div>
          </div>
        ) : (
          <div>
            <label
              htmlFor="tenantId"
              className="block text-sm font-medium text-zinc-900"
            >
              Organisation
            </label>
            <select
              id="tenantId"
              name="tenantId"
              className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm"
              required
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
            >
              <option value="" disabled>
                Select an organisation
              </option>
              {tenants.map((t) => (
                <option key={t.tenantId} value={t.tenantId}>
                  {t.tenantName || t.tenantId}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="pt-4">
          <button
            type="button"
            onClick={handleRun}
            className="inline-flex items-center justify-center rounded-xl bg-[color:var(--link)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
          >
            Run Diagnostic
          </button>
        </div>

        <div className="mt-3 text-xs text-zinc-500">
          We only read your settings and ledger structure. We do not create,
          edit, or delete anything in Xero.
        </div>
      </div>

      <RunWizardModal
        open={open}
        stepIndex={stepIndex}
        error={error}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
