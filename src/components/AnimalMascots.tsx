"use client";

import { Hand, HeartHandshake, Users } from "lucide-react";

const items = [
  {
    Icon: HeartHandshake,
    label: "Real human connection",
    caption: "Gestures people use every day",
    bg: "from-[#ede8e0] to-[#e8ddd4]",
    iconClass: "text-[#6b4f3b]",
  },
  {
    Icon: Users,
    label: "Community-centered",
    caption: "Designed with learners and educators",
    bg: "from-[#f3ebe3] to-[#e5d9ce]",
    iconClass: "text-[#5c4033]",
  },
  {
    Icon: Hand,
    label: "Clear hands-on learning",
    caption: "Focus on shape, movement, meaning",
    bg: "from-[#f0e8dc] to-[#dccfba]",
    iconClass: "text-[#6b4423]",
  },
] as const;

/**
 * Human-centered highlights (per stakeholder feedback: figures & social gestures over cartoon animals).
 */
export function HumanGestureStrip() {
  return (
    <div className="mx-auto mt-10 grid w-full max-w-4xl grid-cols-3 gap-2 sm:gap-4">
      {items.map(({ Icon, label, caption, bg, iconClass }) => (
        <div
          key={label}
          className={`flex min-w-0 flex-col gap-2 rounded-2xl bg-gradient-to-br ${bg} px-3 py-3 shadow-sm ring-1 ring-[#5c4033]/10 sm:px-4 sm:py-4`}
        >
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/70 shadow-inner"
            aria-hidden
          >
            <Icon className={`h-7 w-7 ${iconClass}`} strokeWidth={2} />
          </span>
          <span className="text-xs font-bold leading-tight text-[#3d2a1f] sm:text-sm">{label}</span>
          <span className="text-[10px] leading-snug text-[#5c4033]/90 sm:text-xs">{caption}</span>
        </div>
      ))}
    </div>
  );
}

/** @deprecated Use HumanGestureStrip — kept alias for gradual migration */
export const AnimalMascots = HumanGestureStrip;
