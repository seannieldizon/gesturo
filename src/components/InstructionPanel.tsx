"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

const TIPS = [
  "Use the lesson tabs in order: Alphabet → Numbers → Greetings → Emergency Response → Phrases.",
  "Each lesson stays locked until you mark the previous lesson complete.",
  "Tap \"Mark lesson complete\" at the bottom of a section when you’re ready to move on.",
  "Expand Show Tips on any card for extra guidance.",
  "Use keyboard navigation and focus rings for accessibility—every screen is designed for clarity.",
];

export function InstructionPanel() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-primary-200/80 bg-white/95 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md md:left-auto md:right-6 md:bottom-6 md:max-w-md md:rounded-2xl md:border md:shadow-xl"
      role="region"
      aria-label="How to use GesTURO"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left font-semibold text-slate-800 md:rounded-t-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600" aria-hidden>
            <Info className="h-4 w-4" />
          </span>
          How to use GesTURO
        </span>
        {open ? <ChevronDown className="h-5 w-5 shrink-0" aria-hidden /> : <ChevronUp className="h-5 w-5 shrink-0" aria-hidden />}
      </button>
      {open && (
        <ul className="space-y-2 border-t border-primary-100 px-4 pb-4 pt-2 text-sm text-slate-600">
          {TIPS.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="text-primary-500" aria-hidden>•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
