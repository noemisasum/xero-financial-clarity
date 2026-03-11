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
      onSubmit={(e) => {
        const form = e.currentTarget;

        // If the form is invalid (e.g. required org not selected), let the browser show validation
        // and do NOT show the overlay (otherwise it looks "stuck").
        if (!form.reportValidity()) return;

        // Ensure the overlay renders before the browser navigates.
        e.preventDefault();
        show();
        requestAnimationFrame(() => {
          // Submit after one paint frame.
          // We already validated above, so submit() is safe and avoids any double-validation loops.
          form.submit();
        });
      }}
    >
      {children}
    </form>
  );
}
