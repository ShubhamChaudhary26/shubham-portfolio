"use client";

import Image from "next/image";
import { createContext, useContext, type ReactNode } from "react";

const LogoContext = createContext<string | null>(null);

export function BrandLogoProvider({
  src,
  children,
}: {
  src: string | null;
  children: ReactNode;
}) {
  return <LogoContext.Provider value={src}>{children}</LogoContext.Provider>;
}

export function BrandMark({ className = "h-11 w-11" }: { className?: string }) {
  const src = useContext(LogoContext);

  if (src) {
    return (
      <Image
        unoptimized
        alt=""
        className={`shrink-0 rounded-full object-cover ${className}`}
        height={44}
        src={src}
        width={44}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal-300 via-cyan-200 to-violet-500 text-sm font-bold text-slate-950 shadow-[0_8px_24px_-12px_rgba(139,92,246,0.9)] ${className}`}
    >
      AI
    </span>
  );
}
