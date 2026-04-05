"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Loader2 } from "lucide-react";

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
      {isLoading && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-white/85 backdrop-blur-md"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-inner sm:h-36 sm:w-36">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600 sm:h-16 sm:w-16" aria-hidden />
          </div>
          <p className="text-sm font-semibold text-slate-600">Loading…</p>
        </div>
      )}
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
