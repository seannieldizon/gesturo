"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

const TIPS = [
  "Lessons follow the approved outline: Emergency first (always open), then Alphabet through Transportation.",
  "The next lesson unlocks only after you mark the previous lesson complete on Learn and complete that lesson’s challenge in Practice.",
  "Expand “Show Tips” on any card for extra guidance.",
  "Use keyboard navigation and visible focus rings — every screen is built for clarity and inclusion.",
];

export function InstructionPanel() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-warm-200/90 bg-cream-50/95 shadow-[0_-4px_24px_rgba(74,59,50,0.08)] backdrop-blur-md md:left-auto md:right-6 md:bottom-6 md:max-w-md md:rounded-2xl md:border md:shadow-xl"
      role="region"
      aria-label="How to use GesTURO"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left font-semibold text-warm-900 md:rounded-t-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-600"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-warm-200 text-warm-800" aria-hidden>
            <Info className="h-4 w-4" />
          </span>
          How to use GesTURO
        </span>
        {open ? <ChevronDown className="h-5 w-5 shrink-0" aria-hidden /> : <ChevronUp className="h-5 w-5 shrink-0" aria-hidden />}
      </button>
      {open && (
        <ul className="space-y-2 border-t border-warm-100 px-4 pb-4 pt-2 text-sm text-warm-800">
          {TIPS.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="text-warm-600" aria-hidden>•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
