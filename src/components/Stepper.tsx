import Icon from "@/components/Icon";

export default function Stepper() {
  const steps = [
    {
      icon: "link" as const,
      title: "Connect your Xero organisation",
      desc: "Secure read-only authorisation. No posting, no changes.",
    },
    {
      icon: "scan" as const,
      title: "We analyse your financial structure",
      desc: "Automated checks across accounts, categories, reporting design, and cash visibility signals.",
    },
    {
      icon: "score" as const,
      title: "Receive your Financial Clarity Scorecard",
      desc: "Score + breakdown + top structural issues to prioritise.",
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--accent-soft)] ring-1 ring-[color:var(--border)]">
                <Icon name={s.icon} />
              </div>
              <div className="text-sm font-semibold text-[color:var(--heading)]">
                {idx + 1}. {s.title}
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{s.desc}</p>

            {idx < steps.length - 1 ? (
              <div
                aria-hidden
                className="hidden lg:block"
              >
                <div className="absolute right-[-14px] top-1/2 h-[2px] w-7 -translate-y-1/2 bg-[color:var(--border)]" />
                <div className="absolute right-[-18px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[color:var(--accent)]" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-zinc-500">
        Typical completion: <span className="font-medium">3–5 minutes</span>.
      </div>
    </div>
  );
}
