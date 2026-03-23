/** Lesson order: complete each before the next unlocks. */
export const LESSON_ORDER = [
  "alphabet",
  "numbers",
  "greetings",
  "emergency",
  "phrases",
] as const;

export type LessonId = (typeof LESSON_ORDER)[number];

const STORAGE_KEY = "gesturo-lesson-progress";

export function getCompletedLessons(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr.filter((id) => LESSON_ORDER.includes(id as LessonId)));
  } catch {
    return new Set();
  }
}

export function saveCompletedLessons(completed: Set<string>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completed)));
}

export function isLessonUnlocked(
  lessonId: LessonId,
  completed: Set<string>
): boolean {
  const idx = LESSON_ORDER.indexOf(lessonId);
  if (idx <= 0) return true;
  const prev = LESSON_ORDER[idx - 1];
  return completed.has(prev);
}

export function markLessonComplete(
  lessonId: LessonId,
  completed: Set<string>
): Set<string> {
  const next = new Set(completed);
  next.add(lessonId);
  saveCompletedLessons(next);
  return next;
}

export function resetLessonProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
