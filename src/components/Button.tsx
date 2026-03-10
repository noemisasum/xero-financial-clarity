import Link from "next/link";

export default function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]";

  if (variant === "secondary") {
    return (
      <Link
        href={href}
        className={`${base} border border-[var(--border)] bg-white text-[color:var(--link)] hover:bg-zinc-50`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} bg-[color:var(--link)] text-white hover:opacity-90`}
    >
      {children}
    </Link>
  );
}
