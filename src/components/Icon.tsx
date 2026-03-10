export default function Icon({
  name,
  className = "",
}: {
  name:
    | "spark"
    | "grid"
    | "tag"
    | "chart"
    | "link"
    | "scan"
    | "score"
    | "shield"
    | "clock";
  className?: string;
}) {
  const common =
    `h-5 w-5 text-[color:var(--accent)] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] ${className}`.trim();

  let paths: React.ReactNode = null;
  switch (name) {
    case "spark":
      paths = (
        <>
          <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
          <path d="M19 14l.8 2.6L22 18l-2.2.7L19 21l-.8-2.3L16 18l2.2-.4L19 14z" />
        </>
      );
      break;
    case "grid":
      paths = (
        <>
          <path d="M4 4h7v7H4V4z" />
          <path d="M13 4h7v7h-7V4z" />
          <path d="M4 13h7v7H4v-7z" />
          <path d="M13 13h7v7h-7v-7z" />
        </>
      );
      break;
    case "tag":
      paths = (
        <>
          <path d="M20 12l-8 8-10-10V2h8L20 12z" />
          <path d="M7 7h.01" />
        </>
      );
      break;
    case "chart":
      paths = (
        <>
          <path d="M3 3v18h18" />
          <path d="M7 14l3-3 4 4 6-8" />
        </>
      );
      break;
    case "link":
      paths = (
        <>
          <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
          <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 1 1-7-7l1-1" />
        </>
      );
      break;
    case "scan":
      paths = (
        <>
          <path d="M4 7V6a2 2 0 0 1 2-2h1" />
          <path d="M17 4h1a2 2 0 0 1 2 2v1" />
          <path d="M20 17v1a2 2 0 0 1-2 2h-1" />
          <path d="M7 20H6a2 2 0 0 1-2-2v-1" />
          <path d="M7 12h10" />
        </>
      );
      break;
    case "score":
      paths = (
        <>
          <path d="M12 20a8 8 0 1 0-8-8" />
          <path d="M12 12l4-2" />
          <path d="M12 12v-6" />
        </>
      );
      break;
    case "shield":
      paths = (
        <>
          <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
          <path d="M9 12l2 2 4-5" />
        </>
      );
      break;
    case "clock":
      paths = (
        <>
          <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10z" />
          <path d="M12 6v6l4 2" />
        </>
      );
      break;
    default:
      return null;
  }

  return (
    <svg
      className={common}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths}
    </svg>
  );
}

