"use client";

import { useEffect, useState } from "react";
import { HandHeart } from "lucide-react";

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
      className="fixed inset-0 z-[110] flex items-center justify-center bg-gradient-to-br from-amber-50/95 via-white to-sky-50/95 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="relative w-full max-w-lg rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-2xl shadow-sky-200/50">
        <div className="mx-auto mb-6 flex min-h-[12rem] max-h-56 w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-filipino-cream to-filipino-sand p-3 shadow-inner sm:min-h-[14rem] sm:max-w-sm">
          {helloGifFailed ? (
            <HandHeart className="h-24 w-24 text-filipino-earth sm:h-28 sm:w-28" aria-hidden />
          ) : (
            <img
              src={HELLO_GIF}
              alt=""
              className="h-auto max-h-52 w-full object-contain"
              onError={() => setHelloGifFailed(true)}
            />
          )}
        </div>
        <h2 id="welcome-title" className="mb-2 text-center text-2xl font-bold text-slate-800">
          Welcome to GesTURO
        </h2>
        <p className="mb-8 text-center text-slate-600">
          Learn Filipino Sign Language with structured lessons, practice quizzes, and an inclusive design built for everyone.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="w-full rounded-2xl bg-gradient-to-r from-amber-300 via-sky-200 to-sky-400 py-4 text-base font-bold text-slate-900 shadow-lg transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
