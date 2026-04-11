"use client";

import { BookOpen, Zap } from "lucide-react";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export function HomeCtaButtons() {
  const { push } = useAppNavigation(420);

  const go = (path: string) => {
    void push(path);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-300">
      <button
        type="button"
        onClick={() => go("/learn")}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <BookOpen className="h-5 w-5" aria-hidden />
        Start Learning
      </button>
      <button
        type="button"
        onClick={() => go("/practice")}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:from-amber-500 hover:to-amber-600 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
      >
        <Zap className="h-5 w-5" aria-hidden />
        Practice Now
      </button>
    </div>
  );
}
