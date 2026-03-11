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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--border)] bg-white px-8 py-7 shadow-[0_25px_70px_rgba(17,24,39,0.12)]">
            <Image
              src="/brand/aqount-lockup-transparent.png"
              alt="Aqount"
              width={170}
              height={48}
              className="h-7 w-auto opacity-95"
              priority
            />

            <div className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-200 border-t-[color:var(--link)]" />

            <div className="text-xs text-zinc-500">Just a moment…</div>
          </div>
        </div>
      ) : null}
    </Ctx.Provider>
  );
}
