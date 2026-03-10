import Icon from "@/components/Icon";

type Item = {
  q: string;
  a: React.ReactNode;
};

export default function FaqAccordion({
  eyebrow = "FAQ",
  title,
  lead,
  items,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  items: Item[];
}) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {eyebrow}
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 text-base leading-7 text-zinc-600">{lead}</p>
        ) : null}
      </div>

      <div className="mt-8 divide-y divide-[color:var(--border)]">
        {items.map((it) => (
          <details key={it.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <span className="text-sm font-semibold text-[color:var(--heading)] sm:text-base">
                {it.q}
              </span>
              <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-xl border border-[var(--border)] bg-white text-zinc-600 transition group-open:rotate-180">
                <Icon name="chevron" className="h-4 w-4" />
              </span>
            </summary>
            <div className="mt-3 text-sm leading-6 text-zinc-600">{it.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
