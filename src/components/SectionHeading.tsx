export default function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-base leading-7 text-zinc-600">{lead}</p>
      ) : null}
    </div>
  );
}
