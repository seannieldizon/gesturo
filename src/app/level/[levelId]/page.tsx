"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Target,
  ArrowLeft,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getLevelById } from "@/assets/data/levels";
import { useLevelProgress } from "@/hooks/useLevelProgress";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function LevelPage() {
  const params = useParams();
  const { replace } = useAppNavigation(280);
  const levelId = Number(params.levelId);
  const level = getLevelById(levelId);
  const { mounted, isCompleted, isLevelDone, unlockedLevel, getScore } =
    useLevelProgress();

  useEffect(() => {
    if (!mounted || !levelId || Number.isNaN(levelId)) return;
    if (!unlockedLevel(levelId)) {
      void replace("/learn");
    }
  }, [mounted, levelId, unlockedLevel, replace]);

  if (!level) return notFound();
  if (mounted && !unlockedLevel(level.id)) return null;

  const done = isLevelDone(level.id, level.lessons);

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/learn"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" />
        All Levels
      </Link>

      <ScrollReveal animation="fade-up" duration={400}>
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${level.gradient} p-5 text-white shadow-xl sm:rounded-3xl sm:p-8 lg:p-10`}
        >
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-4xl">{level.icon}</span>
              {done && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />
                  Completed
                </span>
              )}
            </div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/80">
              Level {level.id}
            </p>
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
              {level.title}
            </h1>
            <p className="text-lg font-medium text-white/90">
              {level.subtitle}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
              {level.description}
            </p>
          </div>
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
            aria-hidden
          />
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={100} duration={400}>
        <div className="mt-8 flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Lessons
          </h2>
        </div>
      </ScrollReveal>

      <div className="mt-4 space-y-4">
        {level.lessons.map((lesson, i) => {
          const lessonDone = isCompleted(level.id, lesson.id);
          const score = getScore(level.id, lesson.id);
          return (
            <ScrollReveal
              key={lesson.id}
              animation="fade-up"
              delay={150 + i * 80}
              duration={400}
            >
              <Link
                href={`/level/${level.id}/lesson/${lesson.id}`}
                className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-sky-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-700 sm:gap-4 sm:rounded-2xl sm:p-5"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    lessonDone
                      ? "bg-emerald-100 dark:bg-emerald-900/30"
                      : "bg-sky-100 dark:bg-sky-900/30"
                  }`}
                >
                  {lessonDone ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <BookOpen className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Lesson {lesson.id}
                      </p>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        {lesson.title}
                      </h3>
                    </div>
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {lesson.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {lesson.videos.length} videos
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-3.5 w-3.5" />
                      {lesson.quiz.length} quiz questions
                    </span>
                    {score && (
                      <span className="font-semibold text-sky-700 dark:text-sky-400">
                        Best: {score.score}/{score.total}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      {level.id < 7 && (
        <ScrollReveal animation="fade-up" delay={300} duration={400}>
          <div className="mt-8 text-center">
            <Link
              href={`/level/${level.id + 1}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
              Next: Level {level.id + 1}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
