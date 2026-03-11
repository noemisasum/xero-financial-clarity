"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type LoadingCtx = {
  show: () => void;
  hide: () => void;
};

const Ctx = createContext<LoadingCtx | null>(null);

export function useLoadingOverlay(): LoadingCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLoadingOverlay must be used within LoadingOverlayProvider");
  return v;
}

export default function LoadingOverlayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <Ctx.Provider value={value}>
      {children}

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/65 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/brand/favicon.png"
              alt="Aqount"
              width={44}
              height={44}
              className="h-9 w-9 opacity-90"
              priority
            />

            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-[color:var(--link)]" />

            <div className="text-[11px] text-zinc-500">Just a moment…</div>
          </div>
        </div>
      ) : null}
    </Ctx.Provider>
  );
}
