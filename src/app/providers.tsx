"use client";

import type { ReactNode } from "react";
import { LoadingOverlayProvider } from "@/contexts/LoadingOverlayContext";
import { WelcomeSplash } from "@/components/WelcomeSplash";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LoadingOverlayProvider>
      {children}
      <WelcomeSplash />
    </LoadingOverlayProvider>
  );
}
