"use client";

import { useMemo } from "react";

type Step = {
  key: string;
  label: string;
  hint?: string;
};

export default function RunWizardModal({
  open,
  stepIndex,
  error,
  onClose,
}: {
  open: boolean;
  stepIndex: number;
  error?: string | null;
  onClose: () => void;
}) {
  const steps: Step[] = useMemo(
    () => [
      { key: "prepare", label: "Preparing connection" },
      { key: "fetch", label: "Fetching your Xero data", hint: "Read-only" },
      { key: "score", label: "Computing your clarity score" },
      { key: "finish", label: "Finalising report" },
    ],
    [],
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-[color:var(--heading)]">
              Running Diagnostic
            </div>
            <div className="mt-1 text-sm text-zinc-600">
              This usually takes about 1–3 minutes.
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-zinc-500 hover:bg-zinc-50"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {steps.map((s, idx) => {
            const done = idx < stepIndex;
            const active = idx === stepIndex;
            return (
              <div
                key={s.key}
                className={
                  "flex items-start gap-3 rounded-xl border p-3 " +
                  (active
                    ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)]"
                    : "border-[var(--border)] bg-white")
                }
              >
                <div
                  className={
                    "mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center text-xs font-bold " +
                    (done
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : active
                        ? "border-[color:var(--accent)] bg-white text-[color:var(--heading)]"
                        : "border-zinc-200 bg-white text-zinc-400")
                  }
                >
                  {done ? "✓" : idx + 1}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-zinc-900">
                    {s.label}
                  </div>
                  {s.hint ? (
                    <div className="text-xs text-zinc-600">{s.hint}</div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {error ? (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        ) : (
          <div className="mt-5 text-xs text-zinc-500">
            We will revoke access immediately after the diagnostic completes.
          </div>
        )}
      </div>
    </div>
  );
}
