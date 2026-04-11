const STORAGE_KEY = "gesturo-level-progress-v1";
export const LEVEL_PROGRESS_UPDATED_EVENT = "gesturo-level-progress-updated";

export type LessonSection = "content" | "videos" | "quiz";

export type LevelProgressState = {
  completedLessons: Set<string>;
  quizScores: Record<string, { score: number; total: number }>;
  sectionCompletion: Record<string, Record<LessonSection, boolean>>;
};

type StoredShape = {
  completedLessons: string[];
  quizScores: Record<string, { score: number; total: number }>;
  sectionCompletion?: Record<string, Partial<Record<LessonSection, boolean>>>;
};

function makeLessonKey(levelId: number, lessonId: number): string {
  return `${levelId}-${lessonId}`;
}

export function getLevelProgress(): LevelProgressState {
  if (typeof window === "undefined") {
    return { completedLessons: new Set(), quizScores: {}, sectionCompletion: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw) as StoredShape;
      const completedLegacy = new Set(data.completedLessons ?? []);
      const sectionCompletion: LevelProgressState["sectionCompletion"] = {};
      for (const key of Array.from(completedLegacy)) {
        sectionCompletion[key] = { content: true, videos: true, quiz: true };
      }
      for (const [key, sections] of Object.entries(data.sectionCompletion ?? {})) {
        sectionCompletion[key] = {
          content: Boolean(sections.content),
          videos: Boolean(sections.videos),
          quiz: Boolean(sections.quiz),
        };
      }
      return {
        completedLessons: completedLegacy,
        quizScores: data.quizScores ?? {},
        sectionCompletion,
      };
    }
  } catch {
    /* fall through */
  }
  return { completedLessons: new Set(), quizScores: {}, sectionCompletion: {} };
}

function saveLevelProgress(state: LevelProgressState): void {
  if (typeof window === "undefined") return;
  const payload: StoredShape = {
    completedLessons: Array.from(state.completedLessons),
    quizScores: state.quizScores,
    sectionCompletion: state.sectionCompletion,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event(LEVEL_PROGRESS_UPDATED_EVENT));
}

function normalizeSectionState(
  key: string,
  state: LevelProgressState
): Record<LessonSection, boolean> {
  const existing = state.sectionCompletion[key];
  return {
    content: Boolean(existing?.content),
    videos: Boolean(existing?.videos),
    quiz: Boolean(existing?.quiz),
  };
}

function recomputeLessonCompletion(
  key: string,
  next: LevelProgressState
): void {
  const sectionState = normalizeSectionState(key, next);
  const fullyDone = sectionState.content && sectionState.videos && sectionState.quiz;
  if (fullyDone) next.completedLessons.add(key);
}

export function markLessonComplete(
  levelId: number,
  lessonId: number,
  state: LevelProgressState
): LevelProgressState {
  return markLessonSectionComplete(levelId, lessonId, "content", state);
}

export function markLessonSectionComplete(
  levelId: number,
  lessonId: number,
  section: LessonSection,
  state: LevelProgressState
): LevelProgressState {
  const key = makeLessonKey(levelId, lessonId);
  const next: LevelProgressState = {
    completedLessons: new Set(state.completedLessons),
    quizScores: { ...state.quizScores },
    sectionCompletion: { ...state.sectionCompletion },
  };
  const sectionState = normalizeSectionState(key, state);
  next.sectionCompletion[key] = { ...sectionState, [section]: true };
  recomputeLessonCompletion(key, next);
  saveLevelProgress(next);
  return next;
}

export function saveQuizScore(
  levelId: number,
  lessonId: number,
  score: number,
  total: number,
  state: LevelProgressState
): LevelProgressState {
  const key = makeLessonKey(levelId, lessonId);
  const prev = state.quizScores[key];
  const prevPct = prev ? prev.score / prev.total : -1;
  const newPct = total > 0 ? score / total : 0;
  const isBetter = !prev || newPct > prevPct;

  const next: LevelProgressState = {
    completedLessons: new Set(state.completedLessons),
    quizScores: {
      ...state.quizScores,
      [key]: isBetter ? { score, total } : prev!,
    },
    sectionCompletion: { ...state.sectionCompletion },
  };

  const sectionState = normalizeSectionState(key, state);
  next.sectionCompletion[key] = { ...sectionState, quiz: true };

  if (newPct >= 0.6) {
    recomputeLessonCompletion(key, next);
  }

  saveLevelProgress(next);
  return next;
}

export function isLessonCompleted(
  levelId: number,
  lessonId: number,
  state: LevelProgressState
): boolean {
  return state.completedLessons.has(makeLessonKey(levelId, lessonId));
}

export function isLessonSectionCompleted(
  levelId: number,
  lessonId: number,
  section: LessonSection,
  state: LevelProgressState
): boolean {
  const key = makeLessonKey(levelId, lessonId);
  return Boolean(state.sectionCompletion[key]?.[section]);
}

export function isLevelCompleted(
  levelId: number,
  lessons: { id: number }[],
  state: LevelProgressState
): boolean {
  return lessons.every((l) =>
    state.completedLessons.has(makeLessonKey(levelId, l.id))
  );
}

export function getQuizScore(
  levelId: number,
  lessonId: number,
  state: LevelProgressState
): { score: number; total: number } | null {
  return state.quizScores[makeLessonKey(levelId, lessonId)] ?? null;
}

export function getCompletedCount(state: LevelProgressState): number {
  return state.completedLessons.size;
}

export function hasPassedQuiz(
  levelId: number,
  lessonId: number,
  state: LevelProgressState
): boolean {
  const key = makeLessonKey(levelId, lessonId);
  const row = state.quizScores[key];
  if (!row || row.total <= 0) return false;
  return row.score / row.total >= 0.6;
}

export function isLevelUnlocked(
  targetLevelId: number,
  lessonsByLevel: Record<number, { id: number }[]>,
  state: LevelProgressState
): boolean {
  if (targetLevelId <= 1) return true;
  const previousLevelId = targetLevelId - 1;
  const previousLessons = lessonsByLevel[previousLevelId] ?? [];
  if (previousLessons.length === 0) return false;
  // Quiz pass (≥60%) is the gate; passing also records the lesson complete in saveQuizScore.
  // Using quiz scores only avoids edge cases where UI saved a wrong score or progress steps desynced.
  return previousLessons.every((lesson) =>
    hasPassedQuiz(previousLevelId, lesson.id, state)
  );
}

export function resetLevelProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
