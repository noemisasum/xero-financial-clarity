import Icon from "@/components/Icon";

export default function Stepper() {
  const steps = [
    {
      icon: "link" as const,
      title: "Connect your Xero organisation",
      bullets: [
        "Secure, read-only authorisation",
        "No posting, no changes",
        "Authorisation auto-revoked after the diagnostic",
      ],
    },
    {
      icon: "scan" as const,
      title: "We analyse your financial structure",
      bullets: [
        "Review chart of accounts and expense coding patterns",
        "Flag issues that reduce reporting clarity and cash visibility",
      ],
    },
    {
      icon: "score" as const,
      title: "Receive your Scorecard",
      bullets: [
        "Financial clarity score and breakdown",
        "Top issues detected",
        "Recommended next steps",
      ],
    },
  ];

  return (
    <div className="mt-10">
      <div className="grid gap-6 lg:grid-cols-3">
        {steps.map((s, idx) => (
          <div
            key={s.title}
            className="relative rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--accent-soft)] ring-1 ring-[color:var(--border)]">
                <Icon name={s.icon} className="h-4 w-4" />
              </div>
              <div className="text-sm font-semibold text-[color:var(--heading)]">
                {idx + 1}. {s.title}
              </div>
            </div>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {idx < steps.length - 1 ? (
              <div aria-hidden className="hidden lg:block">
                <div className="absolute right-[-14px] top-1/2 h-[2px] w-7 -translate-y-1/2 bg-[color:var(--border)]" />
                <div className="absolute right-[-18px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[color:var(--accent)]" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
