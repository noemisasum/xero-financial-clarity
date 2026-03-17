export default function ScoreBar({
  score100,
}: {
  score100: number;
}) {
  const clamped = Math.max(0, Math.min(100, Number(score100) || 0));

  return (
    <div
      className="h-3 w-full rounded-full border border-zinc-200 bg-white"
      role="progressbar"
      aria-label="Financial Clarity Score"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
    >
      <div
        className="h-full rounded-full bg-[color:var(--accent)]"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
