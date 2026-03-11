"use client";

import { useLoadingOverlay } from "@/components/LoadingOverlayProvider";

export default function LoadingForm({
  action,
  method,
  className,
  children,
}: {
  action: string;
  method: "post" | "get";
  className?: string;
  children: React.ReactNode;
}) {
  const { show } = useLoadingOverlay();

  return (
    <form
      action={action}
      method={method}
      className={className}
      onSubmit={() => {
        show();
      }}
    >
      {children}
    </form>
  );
}
