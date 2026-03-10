export default function Card({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_1px_0_rgba(17,24,39,0.02),0_10px_30px_rgba(17,24,39,0.05)]">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--accent-soft)] ring-1 ring-[color:var(--border)]">
          {icon}
        </div>
        <div className="min-h-[40px] w-full text-center text-sm font-semibold leading-5 text-[color:var(--heading)]">
          <div className="flex min-h-[40px] items-center justify-center">
            <span className="line-clamp-2">{title}</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p>
    </div>
  );
}
