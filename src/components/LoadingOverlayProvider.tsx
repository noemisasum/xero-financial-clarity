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
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-sm"
          style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex flex-col items-center">
            <Image
              src="/icon.png"
              alt="Aqount"
              width={64}
              height={64}
              className="h-10 w-10 sm:h-9 sm:w-9 motion-safe:animate-[spin_1.4s_linear_infinite] opacity-90"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      ) : null}
    </Ctx.Provider>
  );
}
