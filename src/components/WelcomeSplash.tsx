"use client";

import { useEffect, useState } from "react";
import { HandHeart } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const STORAGE_KEY = "gesTURO-welcome-dismissed";
const HELLO_GIF = "/gif/hello.gif";

export function WelcomeSplash() {
  const [open, setOpen] = useState(false);
  const [helloGifFailed, setHelloGifFailed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && !sessionStorage.getItem(STORAGE_KEY)) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-gradient-to-br from-amber-50/95 via-white to-sky-50/95 p-4 backdrop-blur-md dark:from-slate-950/95 dark:via-slate-900/98 dark:to-slate-950/95"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-white/90 bg-white/95 p-5 shadow-2xl shadow-sky-200/40 ring-1 ring-slate-900/[0.03] dark:border-slate-600/80 dark:bg-slate-900/95 dark:shadow-slate-950/60 dark:ring-white/[0.05] sm:rounded-[2rem] sm:p-8 lg:p-9">
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/90 px-7 py-4 shadow-md shadow-slate-200/25 ring-1 ring-slate-900/[0.04] dark:border-slate-600 dark:from-slate-800 dark:to-slate-900/90 dark:shadow-none dark:ring-white/[0.06]">
            <BrandLogo
              size="lg"
              priority
              className="dark:brightness-110 dark:contrast-95"
            />
          </div>
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Filipino Sign Language
          </p>
        </div>

        <div className="mx-auto mb-6 flex min-h-[12rem] max-h-56 w-full max-w-xs items-center justify-center overflow-hidden rounded-xl border border-slate-200/70 bg-gradient-to-br from-filipino-cream to-filipino-sand p-2 shadow-inner dark:border-slate-600 dark:from-slate-800/80 dark:to-slate-900/90 sm:min-h-[14rem] sm:max-w-sm sm:p-2.5">
          {helloGifFailed ? (
            <HandHeart
              className="h-24 w-24 text-filipino-earth sm:h-28 sm:w-28"
              aria-hidden
            />
          ) : (
            <img
              src={HELLO_GIF}
              alt=""
              className="h-auto max-h-52 w-full object-contain"
              onError={() => setHelloGifFailed(true)}
            />
          )}
        </div>
        <h2
          id="welcome-title"
          className="mb-2 text-center text-2xl font-bold text-slate-800 dark:text-slate-50"
        >
          Welcome to GesTURO
        </h2>
        <p className="mb-8 text-center text-slate-600 dark:text-slate-300">
          Learn Filipino Sign Language with structured lessons, practice quizzes,
          and an inclusive design built for everyone.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="w-full rounded-2xl bg-gradient-to-r from-amber-300 via-sky-200 to-sky-400 py-4 text-base font-bold text-slate-900 shadow-lg transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:from-amber-500/90 dark:via-sky-600/90 dark:to-sky-600/90 dark:text-white dark:shadow-sky-950/30 dark:hover:brightness-110"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
