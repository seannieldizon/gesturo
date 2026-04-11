"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LoadingOverlayModal } from "@/components/LoadingOverlayModal";

type LoadingContextValue = {
  isLoading: boolean;
  show: () => void;
  hide: () => void;
  /** Run async work with loading overlay until it finishes */
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>;
};

const LoadingOverlayContext = createContext<LoadingContextValue | null>(null);

export function LoadingOverlayProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const show = useCallback(() => setIsLoading(true), []);
  const hide = useCallback(() => setIsLoading(false), []);

  const withLoading = useCallback(async <T,>(fn: () => Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      return await fn();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ isLoading, show, hide, withLoading }),
    [isLoading, show, hide, withLoading]
  );

  return (
    <LoadingOverlayContext.Provider value={value}>
      {children}
      <LoadingOverlayModal open={isLoading} />
    </LoadingOverlayContext.Provider>
  );
}

export function useLoadingOverlay() {
  const ctx = useContext(LoadingOverlayContext);
  if (!ctx) {
    throw new Error("useLoadingOverlay must be used within LoadingOverlayProvider");
  }
  return ctx;
}
