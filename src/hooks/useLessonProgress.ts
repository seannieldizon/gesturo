"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type LessonId,
  getProgress,
  isLessonUnlocked,
  isPracticeChallengeUnlocked,
  markLearnComplete,
  type ProgressState,
} from "@/lib/lesson-progress";
import type { PracticeChallengeId } from "@/assets/data/practice-challenges";

export function useLessonProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => ({
    learn: new Set(),
    challenges: new Set(),
    comprehensive: false,
  }));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
    setMounted(true);
  }, []);

  const completeLearn = useCallback((lessonId: LessonId) => {
    setProgress((prev) => markLearnComplete(lessonId, prev));
  }, []);

  const unlocked = useCallback(
    (lessonId: LessonId) => {
      if (!mounted) return lessonId === "emergency";
      return isLessonUnlocked(lessonId, progress);
    },
    [progress, mounted]
  );

  const practiceUnlocked = useCallback(
    (challengeId: PracticeChallengeId) => {
      if (!mounted) return challengeId === "emergency";
      return isPracticeChallengeUnlocked(challengeId, progress);
    },
    [progress, mounted]
  );

  return {
    progress,
    /** Mark studied on the Learn page only (does not complete Practice challenges). */
    completeLearn,
    /** Lesson tab “you marked this complete” */
    learnCompleted: progress.learn,
    /** Challenge finished in Practice quiz */
    challengeCompleted: progress.challenges,
    comprehensiveDone: progress.comprehensive,
    unlocked,
    practiceUnlocked,
    mounted,
  };
}
