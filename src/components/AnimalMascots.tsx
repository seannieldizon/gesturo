"use client";

import { LottiePlayer } from "@/components/lottie/LottiePlayer";
import { LOTTIE_ANIMALS } from "@/constants/lottie-animals";

const items = [
  {
    src: LOTTIE_ANIMALS.toucan,
    label: "Learn at your pace",
    bg: "from-teal-100 to-blue-100",
  },
  {
    src: LOTTIE_ANIMALS.monkey,
    label: "Clear visuals",
    bg: "from-pink-100 to-rose-100",
  },
  {
    src: LOTTIE_ANIMALS.cat,
    label: "Inclusive & kind",
    bg: "from-amber-100 to-yellow-100",
  },
] as const;

/**
 * Playful sticker-style mascot row — Lottie animals from `lottie-animals`.
 */
export function AnimalMascots() {
  return (
    <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-4">
      {items.map(({ src, label, bg }) => (
        <div
          key={label}
          className={`flex min-w-[160px] items-center gap-3 rounded-2xl bg-gradient-to-br ${bg} px-4 py-3 shadow-sm ring-1 ring-black/5`}
        >
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/60 shadow-inner" aria-hidden>
            <LottiePlayer src={src} loop className="h-full w-full" />
          </span>
          <span className="text-sm font-semibold text-slate-800">{label}</span>
        </div>
      ))}
    </div>
  );
}
