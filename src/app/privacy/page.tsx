import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Back
          </Link>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Privacy Policy
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          This page is a placeholder. Update with Aqount’s privacy policy for the
          Financial Clarity Diagnostic (clarity.aqount.tech).
        </p>
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6 text-sm leading-6 text-zinc-600">
          <p className="font-semibold text-zinc-950">Key principle</p>
          <p className="mt-2">
            The diagnostic is intended to run as a <span className="font-medium">read-only</span> analysis
            of your Xero accounting structure.
          </p>
        </div>
      </div>
    </div>
  );
}
