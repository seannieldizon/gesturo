"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type LessonId,
  getCompletedLessons,
  isLessonUnlocked,
  markLessonComplete,
} from "@/lib/lesson-progress";

export function useLessonProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCompleted(getCompletedLessons());
    setMounted(true);
  }, []);

  const complete = useCallback((lessonId: LessonId) => {
    setCompleted((prev) => markLessonComplete(lessonId, prev));
  }, []);

  const unlocked = useCallback(
    (lessonId: LessonId) => {
      if (!mounted) return lessonId === "alphabet";
      return isLessonUnlocked(lessonId, completed);
    },
    [completed, mounted]
  );

  return { completed, complete, unlocked, mounted };
}
