"use client";

import Link from "next/link";
import { useLoadingOverlay } from "@/components/LoadingOverlayProvider";

export default function LoadingLink({
  href,
  children,
  className,
  prefetch,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
  prefetch?: boolean;
}) {
  const { show } = useLoadingOverlay();

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={className}
      onClick={() => {
        // Show immediately so the UI never feels "stuck".
        show();
      }}
    >
      {children}
    </Link>
  );
}
