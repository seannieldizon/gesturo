"use client";

import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Lock,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LEVELS } from "@/assets/data/levels";
import { useLevelProgress } from "@/hooks/useLevelProgress";

const LEVEL_COLORS: Record<string, string> = {
  sky: "from-sky-400 to-sky-600 shadow-sky-200/50 dark:shadow-sky-900/30",
  emerald:
    "from-emerald-400 to-emerald-600 shadow-emerald-200/50 dark:shadow-emerald-900/30",
  rose: "from-rose-400 to-rose-600 shadow-rose-200/50 dark:shadow-rose-900/30",
  amber:
    "from-amber-400 to-amber-600 shadow-amber-200/50 dark:shadow-amber-900/30",
  violet:
    "from-violet-400 to-violet-600 shadow-violet-200/50 dark:shadow-violet-900/30",
  red: "from-red-400 to-red-600 shadow-red-200/50 dark:shadow-red-900/30",
  indigo:
    "from-indigo-400 to-indigo-600 shadow-indigo-200/50 dark:shadow-indigo-900/30",
};

const LEVEL_BG: Record<string, string> = {
  sky: "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800",
  emerald:
    "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800",
  rose: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800",
  amber:
    "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800",
  violet:
    "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800",
  red: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
  indigo:
    "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800",
};

export default function LearnPage() {
  const { isLevelDone, unlockedLevel, progressPercent, completedCount, totalLessons } =
    useLevelProgress();

  return (
    <div className="mx-auto w-full max-w-content px-4 py-8 sm:px-8 lg:px-12">
      {/* Hero */}
      <section className="mb-12">
        <ScrollReveal animation="fade-up" duration={500}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 via-white to-amber-50 p-5 shadow-soft dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 sm:rounded-3xl sm:p-8 lg:p-12">
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="mb-4 text-5xl animate-bounce-hand">🤟</span>
              <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-3xl lg:text-5xl">
                Learn Filipino Sign Language Easily
              </h1>
              <p className="mb-6 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base lg:text-lg">
                Progress through 7 structured levels — from alphabet basics to
                advanced glossing. Each level builds on the previous one with
                video lessons, interactive content, and quizzes.
              </p>

              <div className="mb-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/80 sm:gap-4 sm:px-6">
                <GraduationCap className="hidden h-5 w-5 text-sky-600 dark:text-sky-400 sm:block" />
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-xs">
                    Your Progress
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {completedCount} of {totalLessons} lessons
                  </p>
                </div>
                <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-700 sm:block" />
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-20 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 sm:w-24">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-sky-400 transition-all duration-700"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-sky-700 dark:text-sky-400">
                    {progressPercent}%
                  </span>
                </div>
              </div>

              <Link
                href="/level/1"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Sparkles className="h-5 w-5" />
                Start Learning
              </Link>
            </div>

            <div
              className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full bg-gradient-to-br from-sky-200/40 to-amber-200/30 blur-3xl dark:from-sky-800/20 dark:to-amber-800/10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-gradient-to-br from-amber-200/30 to-sky-200/20 blur-3xl dark:from-amber-800/10 dark:to-sky-800/10"
              aria-hidden
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Level Cards */}
      <section>
        <ScrollReveal animation="fade-up" duration={400} className="mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              All Levels
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {LEVELS.map((level, i) => {
            const done = isLevelDone(level.id, level.lessons);
            const locked = !unlockedLevel(level.id);
            return (
              <ScrollReveal
                key={level.id}
                animation="scale"
                delay={i * 80}
                duration={400}
              >
                <Link
                  href={locked ? "#" : `/level/${level.id}`}
                  aria-disabled={locked}
                  onClick={(e) => {
                    if (locked) e.preventDefault();
                  }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                    LEVEL_BG[level.color] ?? LEVEL_BG.sky
                  } ${locked ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  <div
                    className={`flex h-28 items-center justify-center bg-gradient-to-br shadow-lg ${
                      LEVEL_COLORS[level.color] ?? LEVEL_COLORS.sky
                    }`}
                  >
                    <span className="text-4xl transition-transform duration-300 group-hover:scale-125">
                      {level.icon}
                    </span>
                    {done && (
                      <div className="absolute right-3 top-3 rounded-full bg-white/90 p-1 dark:bg-slate-800/90">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      </div>
                    )}
                    {locked && (
                      <div className="absolute left-3 top-3 rounded-full bg-black/35 p-1.5 text-white">
                        <Lock className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Level {level.id}
                    </p>
                    <h3 className="mb-1 text-base font-bold text-slate-800 dark:text-white">
                      {level.title}
                    </h3>
                    <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
                      {level.subtitle}
                    </p>
                    <p className="flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {level.description.slice(0, 100)}
                      {level.description.length > 100 ? "..." : ""}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {level.lessons.length}{" "}
                        {level.lessons.length === 1 ? "lesson" : "lessons"}
                      </span>
                      {locked ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Locked
                          <Lock className="h-3.5 w-3.5" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:text-sky-700 dark:text-sky-400 dark:group-hover:text-sky-300">
                          Start
                          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
