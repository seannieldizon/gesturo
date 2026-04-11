"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  ListChecks,
  Play,
  Target,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { QuizSection } from "@/components/QuizSection";
import { getLessonByIds, LEVELS } from "@/assets/data/levels";
import { useLevelProgress } from "@/hooks/useLevelProgress";
import { useAppNavigation } from "@/hooks/useAppNavigation";

type Tab = "content" | "videos" | "quiz";

export default function LessonPage() {
  const params = useParams();
  const { replace } = useAppNavigation(280);
  const searchParams = useSearchParams();
  const levelId = Number(params.levelId);
  const lessonId = Number(params.lessonId);
  const result = getLessonByIds(levelId, lessonId);
  const {
    mounted,
    isCompleted,
    isSectionCompleted,
    unlockedLevel,
    completeSection,
    submitQuizScore,
    getScore,
  } = useLevelProgress();

  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [videoPage, setVideoPage] = useState(1);
  const firstVideoSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mounted || !levelId || Number.isNaN(levelId)) return;
    if (!unlockedLevel(levelId)) {
      void replace("/learn");
    }
  }, [mounted, levelId, unlockedLevel, replace]);

  const onQuizComplete = useCallback(
    (score: number, total: number) => {
      // saveQuizScore persists the attempt and, when ≥60%, marks the lesson complete.
      submitQuizScore(levelId, lessonId, score, total);
    },
    [levelId, lessonId, submitQuizScore]
  );

  const lessonVideos = useMemo(() => result?.lesson.videos ?? [], [result]);
  const videosPerPage = 8;
  const videoPages = useMemo(() => {
    // Special pagination for Level 1 Lesson 1:
    // page 1 = Video 1 (4 clips) + first 4 clips of Video 2,
    // then remaining Video 2 pages, then Video 3 pages.
    if (levelId === 1 && lessonId === 1) {
      const v1 = lessonVideos.filter((v) => v.groupTitle === "Video 1");
      const v2 = lessonVideos.filter((v) => v.groupTitle === "Video 2");
      const v3 = lessonVideos.filter((v) => v.groupTitle === "Video 3");
      const pages: typeof lessonVideos[] = [];

      const firstPage = [...v1, ...v2.slice(0, Math.max(0, videosPerPage - v1.length))];
      if (firstPage.length > 0) pages.push(firstPage);

      let i = Math.max(0, videosPerPage - v1.length);
      while (i < v2.length) {
        pages.push(v2.slice(i, i + videosPerPage));
        i += videosPerPage;
      }

      let j = 0;
      while (j < v3.length) {
        pages.push(v3.slice(j, j + videosPerPage));
        j += videosPerPage;
      }

      return pages.length > 0 ? pages : [[]];
    }

    // Default pagination for other lessons.
    const pages: typeof lessonVideos[] = [];
    for (let i = 0; i < lessonVideos.length; i += videosPerPage) {
      pages.push(lessonVideos.slice(i, i + videosPerPage));
    }
    return pages.length > 0 ? pages : [[]];
  }, [levelId, lessonId, lessonVideos]);

  const totalVideoPages = Math.max(1, videoPages.length);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "content" || tab === "videos" || tab === "quiz") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get("tab") !== "videos") return;
    const videoId = Number(searchParams.get("video"));
    if (Number.isNaN(videoId)) {
      setVideoPage(1);
      return;
    }
    const pageIndex = videoPages.findIndex((page) =>
      page.some((video) => video.id === videoId)
    );
    if (pageIndex >= 0) {
      setVideoPage(pageIndex + 1);
    }
  }, [searchParams, videoPages]);

  const paginatedVideos = useMemo(() => {
    const page = videoPages[videoPage - 1];
    return page ?? [];
  }, [videoPages, videoPage]);

  const groupedVideos = useMemo(
    () =>
      paginatedVideos.reduce(
        (acc, video) => {
          const group = video.groupTitle ?? "Videos";
          if (!acc[group]) acc[group] = [];
          acc[group].push(video);
          return acc;
        },
        {} as Record<string, typeof lessonVideos>
      ),
    [paginatedVideos]
  );

  useEffect(() => {
    if (activeTab !== "videos") return;
    if (videoPage > totalVideoPages) {
      setVideoPage(totalVideoPages);
    }
  }, [activeTab, totalVideoPages, videoPage]);

  useEffect(() => {
    if (activeTab !== "videos") return;
    firstVideoSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [videoPage, activeTab]);

  if (!result) return notFound();
  const { level, lesson } = result;
  if (mounted && !unlockedLevel(level.id)) return null;
  const done = isCompleted(level.id, lesson.id);
  const contentDone = isSectionCompleted(level.id, lesson.id, "content");
  const videosDone = isSectionCompleted(level.id, lesson.id, "videos");
  const score = getScore(level.id, lesson.id);

  const nextLevel = LEVELS.find((l) => l.id === level.id + 1);
  const nextLesson = level.lessons.find((l) => l.id === lesson.id + 1);
  const contentTopics =
    level.id === 1 && lesson.id === 1
      ? [
          {
            id: 1,
            title: "Video 1 - Basics of Fingerspelling",
            description:
              "Ano ang ibig sabihin ng fingerspelling, tamang taas ng kamay, right/left-handed orientation, at tamang bilis kapag nag-sisign.",
          },
          {
            id: 2,
            title: "Video 2 - Alphabet (A–Z, Ñ, NG)",
            description:
              "Complete demonstration of all FSL alphabet letters from A to Z, including Ñ and NG.",
          },
          {
            id: 3,
            title: "Video 3 - Numbers (1–Trillions)",
            description:
              "Numbers 1–100 (easy), 101–999 (moderate), and thousands to trillions (hard).",
          },
        ]
      : level.id === 2 && lesson.id === 1
        ? [
            {
              id: 1,
              title: "Greetings",
              description:
                "Magandang Umaga, Gabi, Hapon, Araw; Kumusta ka?; Ikinagagalak kong makilala ka; Hi! Ako si ___.",
            },
            {
              id: 2,
              title: "Common Phrases",
              description:
                "Pasensya/Patawad, Salamat, Walang anuman, Naiintindihan ko, Hindi ko naiintindihan, Kumain ka na?, Ayos lang ako, Makikiraan po.",
            },
          ]
        : level.id === 3 && lesson.id === 1
          ? [
              {
                id: 1,
                title: "Positive and Negative Emotions",
                description:
                  "Positive: excited through brave. Negative: angry through worried — each with English and Filipino gloss.",
              },
              {
                id: 2,
                title: "Relationships",
                description:
                  "Father, mother, grandfather, aunt, older sister, and friend — Tatay, Nanay, Lolo, Tita, Ate, Kaibigan.",
              },
              {
                id: 3,
                title: "Connecting Relationships and Emotions",
                description:
                  "Short sentences combining family or friend terms with emotions (e.g. Masaya ang nanay ko.).",
              },
            ]
          : lesson.videos;

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: "content", label: "Lesson Content", icon: BookOpen },
    { id: "videos", label: "Videos", icon: Play },
    { id: "quiz", label: "Activity / Quiz", icon: Target },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <Link
          href="/learn"
          className="hover:text-slate-700 dark:hover:text-slate-200"
        >
          Learn
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/level/${level.id}`}
          className="hover:text-slate-700 dark:hover:text-slate-200"
        >
          Level {level.id}: {level.title}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {lesson.title}
        </span>
      </div>

      {/* Lesson Header */}
      <ScrollReveal animation="fade-up" duration={400}>
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-800 sm:rounded-2xl sm:p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">{level.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Level {level.id} — Lesson {lesson.id}
                </span>
                {done && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </span>
                )}
              </div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white sm:text-2xl lg:text-3xl">
                {lesson.title}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {lesson.description}
              </p>
            </div>
          </div>

          {score && (
            <div className="mt-4 inline-flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-2 dark:border-sky-800 dark:bg-sky-900/20">
              <GraduationCap className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              <span className="text-sm font-semibold text-sky-800 dark:text-sky-300">
                Best Score: {score.score}/{score.total}
              </span>
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Tabs */}
      <div className="mt-4 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800 sm:mt-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== "videos") return;
                setVideoPage(1);
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2.5 text-xs font-medium transition-all sm:gap-2 sm:px-3 sm:text-sm ${
                isActive
                  ? "bg-white text-slate-800 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden min-[480px]:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "content" && (
          <ScrollReveal animation="fade-up" duration={350}>
            <div className="space-y-6">
              {/* Objectives */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-4 flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    Learning Objectives
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {lesson.objectives.map((obj, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Topics from Videos */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-800">
                <h2 className="mb-4 text-lg font-bold text-slate-800 dark:text-white">
                  Topics Covered
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {contentTopics.map((video) => (
                    <div
                      key={video.id}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50"
                    >
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {level.id === 2 && lesson.id === 1
                          ? `Topic ${video.id}`
                          : `Video ${video.id}`}
                      </p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {video.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {video.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mark Complete Button */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={contentDone}
                  onClick={() => completeSection(level.id, lesson.id, "content")}
                  className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition ${
                    contentDone
                      ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {contentDone ? "Section Completed" : "Mark as Complete"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("videos");
                    setVideoPage(1);
                  }}
                  className="text-sm font-semibold text-sky-600 underline underline-offset-2 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                >
                  View the Videos
                </button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {activeTab === "videos" && (
          <ScrollReveal animation="fade-up" duration={350}>
            <div className="space-y-6" ref={firstVideoSectionRef}>
              {Object.entries(groupedVideos).map(([groupTitle, videos]) => (
                <section key={groupTitle}>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {groupTitle}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {videos.map((video) => (
                      <VideoPlaceholder key={video.id} video={video} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </ScrollReveal>
        )}

        {activeTab === "quiz" && (
          <ScrollReveal animation="fade-up" duration={350}>
            <QuizSection
              key={`quiz-${level.id}-${lesson.id}`}
              questions={lesson.quiz}
              levelId={level.id}
              lessonId={lesson.id}
              onComplete={onQuizComplete}
            />
          </ScrollReveal>
        )}
      </div>

      {activeTab === "videos" && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Page {videoPage} of {totalVideoPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={videoPage <= 1}
              onClick={() => setVideoPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Prev
            </button>
            <button
              type="button"
              disabled={videoPage >= totalVideoPages}
              onClick={() =>
                setVideoPage((p) => Math.min(totalVideoPages, p + 1))
              }
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {activeTab === "videos" && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={videosDone}
            onClick={() => completeSection(level.id, lesson.id, "videos")}
            className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition ${
              videosDone
                ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
                : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {videosDone ? "Section Completed" : "Mark as Complete"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("quiz")}
            className="text-sm font-semibold text-sky-600 underline underline-offset-2 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            Take the Quiz
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-700">
        <Link
          href={`/level/${level.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Level {level.id}
        </Link>
        {nextLesson ? (
          <Link
            href={`/level/${level.id}/lesson/${nextLesson.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 transition hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            Next Lesson
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : nextLevel ? (
          <Link
            href={`/level/${nextLevel.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 transition hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            Next: Level {nextLevel.id} — {nextLevel.title}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
