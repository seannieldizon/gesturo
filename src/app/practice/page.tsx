"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Lock,
  Target,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LEVELS, type Level, type Lesson } from "@/assets/data/levels";
import { useLevelProgress } from "@/hooks/useLevelProgress";

type LevelLesson = { level: Level; lesson: Lesson };

export default function PracticePage() {
  const { unlockedLevel, mounted, getScore, isSectionCompleted } =
    useLevelProgress();

  const lessonEntries = useMemo<LevelLesson[]>(
    () =>
      LEVELS.flatMap((level) =>
        level.lessons.map((lesson) => ({ level, lesson }))
      ),
    []
  );

  return (
    <div className="mx-auto w-full max-w-content px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
      <section className="mb-8 text-center sm:mb-14">
        <ScrollReveal animation="fade-up" duration={450}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 shadow-inner dark:from-sky-900/40 dark:to-indigo-900/40">
            <Target
              className="h-7 w-7 text-sky-600 dark:text-sky-400"
              aria-hidden
            />
          </div>
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-3xl lg:text-4xl">
            Practice quizzes
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Each card opens the same{" "}
            <strong className="font-semibold text-slate-800 dark:text-slate-200">
              Activity / Quiz
            </strong>{" "}
            tab for that lesson on Learn — all seven levels, in order.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 underline-offset-4 hover:underline dark:text-sky-400"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            Open Learn overview
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </ScrollReveal>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {lessonEntries.map(({ level, lesson }, index) => {
          const levelLocked = mounted
            ? !unlockedLevel(level.id)
            : level.id !== 1;
          const href = `/level/${level.id}/lesson/${lesson.id}?tab=quiz`;
          const qCount = lesson.quiz.length;
          const score = mounted ? getScore(level.id, lesson.id) : null;
          const quizDone =
            mounted && isSectionCompleted(level.id, lesson.id, "quiz");

          const inner = (
            <>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <span className="text-lg leading-none" aria-hidden>
                  {level.icon}
                </span>
                <span>
                  Level {level.id} · {level.title}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Lesson {lesson.id}
                  </p>
                  <h3 className="mt-0.5 text-lg font-bold text-slate-800 dark:text-white">
                    {lesson.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                    {lesson.description}
                  </p>
                </div>
                {levelLocked ? (
                  <Lock
                    className="h-5 w-5 shrink-0 text-slate-300 dark:text-slate-600"
                    aria-hidden
                  />
                ) : (
                  <Target
                    className="h-5 w-5 shrink-0 text-sky-500 dark:text-sky-400"
                    aria-hidden
                  />
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-700/80">
                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <GraduationCap className="h-3.5 w-3.5" aria-hidden />
                  {qCount} question{qCount === 1 ? "" : "s"}
                </span>
                {quizDone && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                    Quiz done
                  </span>
                )}
                {score && (
                  <span className="text-xs font-semibold text-sky-700 dark:text-sky-400">
                    Best: {score.score}/{score.total}
                  </span>
                )}
              </div>
              {!levelLocked && (
                <p className="mt-3 text-xs font-semibold text-sky-600 dark:text-sky-400">
                  Open Activity / Quiz
                  <ArrowRight className="ml-1 inline h-3.5 w-3.5" aria-hidden />
                </p>
              )}
            </>
          );

          const cardClass =
            "block h-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-sky-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-700";

          return (
            <ScrollReveal
              key={`${level.id}-${lesson.id}`}
              animation="fade-up"
              delay={index * 35}
              duration={400}
            >
              {levelLocked ? (
                <div
                  className={`${cardClass} cursor-not-allowed opacity-60`}
                  aria-disabled
                >
                  {inner}
                </div>
              ) : (
                <Link href={href} className={cardClass}>
                  {inner}
                </Link>
              )}
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
