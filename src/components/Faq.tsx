const items = [
  {
    q: "Is this read-only?",
    a: "Yes. The diagnostic is designed for secure, read-only analysis of your accounting structure.",
  },
  {
    q: "Will it change my books?",
    a: "No. We do not post, edit, or reclassify transactions. This is a diagnostic only.",
  },
  {
    q: "What do you analyse?",
    a: "Your chart of accounts and coding patterns that affect reporting clarity and cash visibility signals.",
  },
];

export default function Faq() {
  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-3">
      {items.map((x) => (
        <div
          key={x.q}
          className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
        >
          <div className="text-sm font-semibold text-[color:var(--heading)]">
            {x.q}
          </div>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{x.a}</p>
        </div>
      ))}
    </div>
  );
}
