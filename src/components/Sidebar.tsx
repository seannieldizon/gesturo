"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  Lock,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LEVELS } from "@/assets/data/levels";
import { useLevelProgress } from "@/hooks/useLevelProgress";

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isSectionCompleted, isLevelDone, unlockedLevel, mounted } =
    useLevelProgress();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const previousHighestUnlockedRef = useRef<number | null>(null);

  const toggleLevel = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isLevelActive = (levelId: number) =>
    pathname.startsWith(`/level/${levelId}`);
  const currentTab = searchParams.get("tab");
  const currentVideoId = Number(searchParams.get("video"));

  const highestUnlockedLevel = useMemo(() => {
    if (!mounted) return 1;
    let highest = 1;
    for (const level of LEVELS) {
      if (unlockedLevel(level.id)) highest = level.id;
    }
    return highest;
  }, [mounted, unlockedLevel]);

  useEffect(() => {
    if (!mounted) return;
    const previous = previousHighestUnlockedRef.current;
    if (previous !== null && highestUnlockedLevel > previous) {
      setExpanded((prev) => ({ ...prev, [highestUnlockedLevel]: true }));
    }
    previousHighestUnlockedRef.current = highestUnlockedLevel;
  }, [highestUnlockedLevel, mounted]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={[
          "flex w-72 shrink-0 flex-col border-slate-200/90 bg-white dark:border-slate-700/90 dark:bg-slate-900",
          /* Mobile: slide-over drawer */
          "fixed inset-y-0 left-0 z-50 border-r pt-16 shadow-xl shadow-slate-900/10 transition-transform duration-300 ease-out dark:shadow-black/40",
          open ? "translate-x-0" : "-translate-x-full",
          /* Desktop: in-flow column — scrolls with the page (not sticky) */
          "lg:relative lg:inset-auto lg:z-0 lg:h-auto lg:min-h-full lg:translate-x-0 lg:border-r lg:pt-0 lg:shadow-none",
          "lg:bg-gradient-to-b lg:from-slate-50/90 lg:to-white lg:dark:from-slate-950 lg:dark:to-slate-900",
        ].join(" ")}
        aria-label="Course levels navigation"
      >
        <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-slate-800 lg:hidden">
          <span className="text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-100">
            Levels
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-200 dark:focus-visible:ring-offset-slate-900"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 lg:overflow-visible lg:px-4 lg:py-5">
          <div className="mb-4 flex items-center gap-2 px-1 lg:px-0">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Curriculum
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
          </div>

          <nav className="space-y-1.5" aria-label="Levels">
            {LEVELS.map((level) => {
              const active = isLevelActive(level.id);
              const levelDone = isLevelDone(level.id, level.lessons);
              const locked = !unlockedLevel(level.id);
              const isExpanded = expanded[level.id] || active;

              return (
                <div key={level.id} className="rounded-xl">
                  <button
                    type="button"
                    disabled={locked}
                    onClick={() => toggleLevel(level.id)}
                    className={[
                      "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
                      active
                        ? "border-sky-200/80 bg-sky-50/90 text-sky-950 shadow-sm dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-100"
                        : locked
                          ? "cursor-not-allowed border-transparent bg-transparent text-slate-400 dark:text-slate-600"
                          : "border-transparent text-slate-700 hover:border-slate-200/80 hover:bg-white/80 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/50",
                    ].join(" ")}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg transition group-hover:bg-white dark:bg-slate-800 dark:group-hover:bg-slate-700"
                      aria-hidden
                    >
                      {level.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Level {level.id}
                      </span>
                      <span className="block truncate font-medium leading-snug">
                        {level.title}
                      </span>
                    </span>
                    {locked ? (
                      <Lock
                        className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600"
                        aria-hidden
                      />
                    ) : levelDone ? (
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400"
                        aria-hidden
                      />
                    ) : isExpanded ? (
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-slate-600 dark:group-hover:text-slate-300"
                        aria-hidden
                      />
                    ) : (
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-slate-600 dark:group-hover:text-slate-300"
                        aria-hidden
                      />
                    )}
                  </button>

                  {isExpanded && !locked && (
                    <div className="relative mt-1.5 space-y-0.5 pl-3 lg:pl-4">
                      <span
                        className="absolute bottom-1 left-[1.15rem] top-1 w-px bg-slate-200 dark:bg-slate-700 lg:left-[1.25rem]"
                        aria-hidden
                      />
                      <Link
                        href={`/level/${level.id}`}
                        onClick={onClose}
                        className={[
                          "relative flex items-center gap-2 rounded-lg py-2 pl-3 pr-2 text-xs font-medium transition",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
                          pathname === `/level/${level.id}`
                            ? "bg-sky-100 font-semibold text-sky-900 dark:bg-sky-900/50 dark:text-sky-100"
                            : "text-slate-600 hover:bg-white/90 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100",
                        ].join(" ")}
                      >
                        <span
                          className={`absolute -left-px top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${
                            pathname === `/level/${level.id}`
                              ? "bg-sky-500"
                              : "bg-slate-300 dark:bg-slate-600"
                          }`}
                          aria-hidden
                        />
                        Overview
                      </Link>
                      {level.lessons.map((lesson) => {
                        const lessonPath = `/level/${level.id}/lesson/${lesson.id}`;
                        const lessonActive = pathname === lessonPath;
                        const contentDone = isSectionCompleted(
                          level.id,
                          lesson.id,
                          "content"
                        );
                        const videosDone = isSectionCompleted(
                          level.id,
                          lesson.id,
                          "videos"
                        );
                        const quizDone = isSectionCompleted(level.id, lesson.id, "quiz");
                        const videoSections = lesson.videos.reduce<
                          Array<{ title: string; firstVideoId: number; videoIds: number[] }>
                        >((sections, video) => {
                          const sectionTitle = video.groupTitle ?? video.title;
                          const existing = sections.find((s) => s.title === sectionTitle);
                          if (!existing) {
                            sections.push({
                              title: sectionTitle,
                              firstVideoId: video.id,
                              videoIds: [video.id],
                            });
                            return sections;
                          }
                          existing.videoIds.push(video.id);
                          return sections;
                        }, []);
                        const contentActive = lessonActive && currentTab === "content";
                        const videosActive = lessonActive && currentTab === "videos";
                        const quizActive = lessonActive && currentTab === "quiz";

                        return (
                          <div key={lesson.id} className="space-y-1 rounded-lg">
                            <Link
                              href={lessonPath}
                              onClick={onClose}
                              className={[
                                "relative flex items-center gap-2 rounded-lg py-2 pl-3 pr-2 text-xs font-medium transition",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
                                lessonActive
                                  ? "bg-sky-100 font-semibold text-sky-900 dark:bg-sky-900/50 dark:text-sky-100"
                                  : "text-slate-600 hover:bg-white/90 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100",
                              ].join(" ")}
                            >
                              <span
                                className={`absolute -left-px top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${
                                  lessonActive
                                    ? "bg-sky-500"
                                    : "bg-slate-300 dark:bg-slate-600"
                                }`}
                                aria-hidden
                              />
                              <BookOpen
                                className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500"
                                aria-hidden
                              />
                              <span className="truncate">{lesson.title}</span>
                            </Link>

                            <div className="ml-5 rounded-lg border border-slate-200/70 bg-white/80 p-1.5 dark:border-slate-700 dark:bg-slate-900/70">
                              <Link
                                href={`${lessonPath}?tab=content`}
                                onClick={onClose}
                                className={[
                                  "flex items-center justify-between rounded-md px-2 py-1 text-[11px] font-medium transition",
                                  contentActive
                                    ? "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                                ].join(" ")}
                              >
                                <span>Lesson Content</span>
                                {contentDone && (
                                  <CheckCircle2
                                    className="h-3.5 w-3.5 shrink-0 text-emerald-500 dark:text-emerald-400"
                                    aria-hidden
                                  />
                                )}
                              </Link>
                              <Link
                                href={`${lessonPath}?tab=videos`}
                                onClick={onClose}
                                className={[
                                  "mt-1 flex items-center justify-between rounded-md px-2 py-1 text-[11px] font-medium transition",
                                  videosActive
                                    ? "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                                ].join(" ")}
                              >
                                <span>Videos</span>
                                {videosDone && (
                                  <CheckCircle2
                                    className="h-3.5 w-3.5 shrink-0 text-emerald-500 dark:text-emerald-400"
                                    aria-hidden
                                  />
                                )}
                              </Link>
                              <div className="mt-1 space-y-0.5">
                                {videoSections.map((section) => {
                                  const sectionActive =
                                    videosActive &&
                                    !Number.isNaN(currentVideoId) &&
                                    section.videoIds.includes(currentVideoId);

                                  return (
                                    <Link
                                      key={section.title}
                                      href={`${lessonPath}?tab=videos&video=${section.firstVideoId}`}
                                      onClick={onClose}
                                      className={[
                                        "ml-2 flex items-center rounded-md px-2 py-1 text-[10px] font-medium leading-snug transition",
                                        sectionActive
                                          ? "bg-sky-50 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200"
                                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300",
                                      ].join(" ")}
                                    >
                                      {section.title}
                                    </Link>
                                  );
                                })}
                              </div>
                              <Link
                                href={`${lessonPath}?tab=quiz`}
                                onClick={onClose}
                                className={[
                                  "mt-1 flex items-center justify-between rounded-md px-2 py-1 text-[11px] font-medium transition",
                                  quizActive
                                    ? "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                                ].join(" ")}
                              >
                                <span>Activity / Quiz</span>
                                {quizDone && (
                                  <CheckCircle2
                                    className="h-3.5 w-3.5 shrink-0 text-emerald-500 dark:text-emerald-400"
                                    aria-hidden
                                  />
                                )}
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="shrink-0 border-t border-slate-200/80 bg-white/60 px-3 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 lg:px-4">
          <Link
            href="/learn"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:bg-sky-50/50 hover:text-sky-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-sky-700 dark:hover:bg-sky-950/40 dark:hover:text-sky-100 dark:focus-visible:ring-offset-slate-900"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden />
            Back to all levels
          </Link>
        </div>
      </aside>
    </>
  );
}
