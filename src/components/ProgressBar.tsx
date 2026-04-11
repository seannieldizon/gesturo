"use client";

import { useLevelProgress } from "@/hooks/useLevelProgress";

export function ProgressBar() {
  const { progressPercent, completedCount, totalLessons } = useLevelProgress();

  return (
    <div className="flex items-center gap-2">
      <div className="hidden min-[480px]:block">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Progress
        </p>
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          {completedCount}/{totalLessons}
        </p>
      </div>
      <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 min-[480px]:w-20 sm:w-24">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-sky-400 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 min-[480px]:hidden">
        {progressPercent}%
      </span>
    </div>
  );
}
