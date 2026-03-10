import Icon from "@/components/Icon";

export default function TrustChips() {
  const chips = [
    { icon: "shield" as const, text: "Read-only access" },
    { icon: "clock" as const, text: "~1 minute" },
    { icon: "scan" as const, text: "Access auto-revoked" },
    { icon: "spark" as const, text: "Built by Certified Accounting Professionals" },
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {chips.map((c) => (
        <div
          key={c.text}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-zinc-600"
        >
          <Icon name={c.icon} className="h-4 w-4" />
          <span>{c.text}</span>
        </div>
      ))}
    </div>
  );
}
