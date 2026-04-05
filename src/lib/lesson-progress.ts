/** Order follows stakeholder outline: Emergency first, then level-by-level. */
export const LESSON_ORDER = [
  "emergency",
  "alphabet",
  "numbers",
  "greetings",
  "time-date",
  "family",
  "phrases",
  "health-body",
  "shopping-money",
  "emotions",
  "transportation",
] as const;

export type LessonId = (typeof LESSON_ORDER)[number];

export const LESSON_LABEL: Record<LessonId, string> = {
  emergency: "Emergency Situations",
  alphabet: "Alphabet",
  numbers: "Numbers",
  greetings: "Greetings and Introduction",
  "time-date": "Time, Date, and Scheduling",
  family: "Family and Relationship",
  phrases: "Common Phrases and Grammar Basics",
  "health-body": "Health and Body Parts",
  "shopping-money": "Shopping and Money",
  emotions: "Describing Emotions and Feelings",
  transportation: "Transportation and Directions",
};

const STORAGE_KEY = "gesturo-progress-v2";
/** @deprecated Legacy single-set storage; not read after v2. */
const LEGACY_STORAGE_KEY = "gesturo-lesson-progress";

export type ProgressState = {
  learn: Set<LessonId>;
  challenges: Set<LessonId>;
  comprehensive: boolean;
};

type StoredShape = {
  learn: string[];
  challenges: string[];
  comprehensive?: boolean;
};

function isLessonId(id: string): id is LessonId {
  return LESSON_ORDER.includes(id as LessonId);
}

function normalizeLessonSet(arr: unknown): Set<LessonId> {
  const out = new Set<LessonId>();
  if (!Array.isArray(arr)) return out;
  for (const id of arr) {
    if (typeof id === "string" && isLessonId(id)) out.add(id);
  }
  return out;
}

export function getProgress(): ProgressState {
  if (typeof window === "undefined") {
    return { learn: new Set(), challenges: new Set(), comprehensive: false };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw) as StoredShape;
      return {
        learn: normalizeLessonSet(data.learn),
        challenges: normalizeLessonSet(data.challenges),
        comprehensive: Boolean(data.comprehensive),
      };
    }
  } catch {
    /* fall through */
  }
  return { learn: new Set(), challenges: new Set(), comprehensive: false };
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  const payload: StoredShape = {
    learn: Array.from(state.learn),
    challenges: Array.from(state.challenges),
    comprehensive: state.comprehensive,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

/** Next lesson tab unlocks only after previous is marked on Learn AND its challenge is done. */
export function isLessonUnlocked(lessonId: LessonId, p: ProgressState): boolean {
  if (lessonId === "emergency") return true;
  const idx = LESSON_ORDER.indexOf(lessonId);
  if (idx <= 0) return false;
  const prev = LESSON_ORDER[idx - 1];
  return p.learn.has(prev) && p.challenges.has(prev);
}

/** Playable challenge: Emergency always; others need prior lesson learn + prior challenge done; comprehensive needs all 11 challenges. */
export function isPracticeChallengeUnlocked(
  challengeId: LessonId | "comprehensive",
  p: ProgressState
): boolean {
  if (challengeId === "comprehensive") {
    return LESSON_ORDER.every((id) => p.challenges.has(id));
  }
  if (challengeId === "emergency") return true;
  const idx = LESSON_ORDER.indexOf(challengeId);
  if (idx <= 0) return false;
  const prev = LESSON_ORDER[idx - 1];
  return p.learn.has(prev) && p.challenges.has(prev);
}

export function markLearnComplete(lessonId: LessonId, p: ProgressState): ProgressState {
  const next: ProgressState = {
    learn: new Set(p.learn),
    challenges: new Set(p.challenges),
    comprehensive: p.comprehensive,
  };
  next.learn.add(lessonId);
  saveProgress(next);
  return next;
}

export function markChallengeComplete(lessonId: LessonId, p: ProgressState): ProgressState {
  const next: ProgressState = {
    learn: new Set(p.learn),
    challenges: new Set(p.challenges),
    comprehensive: p.comprehensive,
  };
  next.challenges.add(lessonId);
  saveProgress(next);
  return next;
}

export function markComprehensiveComplete(p: ProgressState): ProgressState {
  const next: ProgressState = {
    learn: new Set(p.learn),
    challenges: new Set(p.challenges),
    comprehensive: true,
  };
  saveProgress(next);
  return next;
}

export function resetLessonProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}
