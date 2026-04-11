"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getLevelProgress,
  isLessonCompleted,
  isLessonSectionCompleted,
  isLevelCompleted,
  isLevelUnlocked,
  markLessonComplete,
  markLessonSectionComplete,
  saveQuizScore,
  getQuizScore,
  getCompletedCount,
  type LessonSection,
  LEVEL_PROGRESS_UPDATED_EVENT,
  type LevelProgressState,
} from "@/lib/level-progress";
import { LEVELS, getTotalLessons } from "@/assets/data/levels";

export function useLevelProgress() {
  const [progress, setProgress] = useState<LevelProgressState>({
    completedLessons: new Set(),
    quizScores: {},
    sectionCompletion: {},
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress(getLevelProgress());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const refreshProgress = () => setProgress(getLevelProgress());
    window.addEventListener(LEVEL_PROGRESS_UPDATED_EVENT, refreshProgress);
    window.addEventListener("storage", refreshProgress);
    return () => {
      window.removeEventListener(LEVEL_PROGRESS_UPDATED_EVENT, refreshProgress);
      window.removeEventListener("storage", refreshProgress);
    };
  }, [mounted]);

  const completeLesson = useCallback(
    (levelId: number, lessonId: number) => {
      setProgress((prev) => markLessonComplete(levelId, lessonId, prev));
    },
    []
  );

  const completeSection = useCallback(
    (levelId: number, lessonId: number, section: LessonSection) => {
      setProgress((prev) =>
        markLessonSectionComplete(levelId, lessonId, section, prev)
      );
    },
    []
  );

  const submitQuizScore = useCallback(
    (levelId: number, lessonId: number, score: number, total: number) => {
      setProgress((prev) =>
        saveQuizScore(levelId, lessonId, score, total, prev)
      );
    },
    []
  );

  const isCompleted = useCallback(
    (levelId: number, lessonId: number) =>
      mounted ? isLessonCompleted(levelId, lessonId, progress) : false,
    [progress, mounted]
  );

  const isLevelDone = useCallback(
    (levelId: number, lessons: { id: number }[]) =>
      mounted ? isLevelCompleted(levelId, lessons, progress) : false,
    [progress, mounted]
  );

  const isSectionCompleted = useCallback(
    (levelId: number, lessonId: number, section: LessonSection) =>
      mounted ? isLessonSectionCompleted(levelId, lessonId, section, progress) : false,
    [mounted, progress]
  );

  const getScore = useCallback(
    (levelId: number, lessonId: number) =>
      getQuizScore(levelId, lessonId, progress),
    [progress]
  );

  const unlockedLevel = useCallback(
    (levelId: number) => {
      if (!mounted) return levelId === 1;
      const lessonsByLevel = Object.fromEntries(
        LEVELS.map((level) => [level.id, level.lessons.map((l) => ({ id: l.id }))])
      ) as Record<number, { id: number }[]>;
      return isLevelUnlocked(levelId, lessonsByLevel, progress);
    },
    [mounted, progress]
  );

  const completedCount = mounted ? getCompletedCount(progress) : 0;
  const totalLessons = getTotalLessons();
  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return {
    progress,
    mounted,
    completeLesson,
    completeSection,
    submitQuizScore,
    isCompleted,
    isSectionCompleted,
    isLevelDone,
    unlockedLevel,
    getScore,
    completedCount,
    totalLessons,
    progressPercent,
  };
}
