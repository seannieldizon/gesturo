"use client";

import type { ReactNode } from "react";
import { LoadingOverlayProvider } from "@/contexts/LoadingOverlayContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NavigationLoadingListener } from "@/components/NavigationLoadingListener";
import { WelcomeSplash } from "@/components/WelcomeSplash";
import { ToastContainer } from "@/components/Toast";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingOverlayProvider>
        {children}
        <NavigationLoadingListener />
        <WelcomeSplash />
        <ToastContainer />
      </LoadingOverlayProvider>
    </ThemeProvider>
  );
}
