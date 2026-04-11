"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";

const TOP_LAYER_Z = 2147483646;

type LoadingOverlayModalProps = {
  open: boolean;
};

export function LoadingOverlayModal({ open }: LoadingOverlayModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
      style={{ zIndex: TOP_LAYER_Z }}
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-[10px] dark:bg-black/65 dark:backdrop-blur-md"
        aria-hidden
      />
      <div
        className="relative w-full max-w-[min(100%,18rem)] origin-center animate-scale-in overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/[0.04] dark:border-slate-600/90 dark:bg-slate-900/95 dark:shadow-black/40 dark:ring-white/[0.06] sm:max-w-sm sm:rounded-3xl sm:p-9"
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-labelledby="loading-overlay-title"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-sky-400/20 to-amber-400/15 blur-2xl dark:from-sky-500/15 dark:to-amber-500/10"
          aria-hidden
        />
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white px-5 py-3 dark:border-slate-600 dark:from-slate-800 dark:to-slate-900/80">
            <BrandLogo size="md" alt="" className="opacity-95 dark:brightness-110" />
          </div>

          <div className="mb-5 flex h-14 w-14 items-center justify-center" aria-hidden>
            <span className="relative flex h-12 w-12">
              <span className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-600" />
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-sky-500 border-r-sky-400 dark:border-t-sky-400 dark:border-r-sky-500" />
            </span>
          </div>

          <h2
            id="loading-overlay-title"
            className="text-base font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-lg"
          >
            Loading
          </h2>
          <p className="mt-1.5 max-w-[240px] text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Preparing your experience — this will only take a moment.
          </p>

          <div
            className="mt-6 flex h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
            aria-hidden
          >
            <div className="h-full w-[32%] animate-loading-bar rounded-full bg-gradient-to-r from-sky-400 to-sky-600 dark:from-sky-500 dark:to-sky-400" />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
