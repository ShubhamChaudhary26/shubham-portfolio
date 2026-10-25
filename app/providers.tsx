"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { ToastProvider } from "@heroui/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <MotionConfig reducedMotion="user">
        <ToastProvider />
        <ThemeProvider {...themeProps}>{children}</ThemeProvider>
      </MotionConfig>
    </HeroUIProvider>
  );
}
