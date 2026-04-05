import type { PracticeChallengeId } from "@/assets/data/practice-challenges";

const STORAGE_KEY = "gesturo-practice-scores";

export type ChallengeScoreRecord = {
  bestScore: number;
  bestTotal: number;
  lastScore: number;
  lastTotal: number;
};

function parseStore(): Record<string, ChallengeScoreRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, ChallengeScoreRecord> = {};
    for (const [k, v] of Object.entries(data)) {
      if (!v || typeof v !== "object") continue;
      const o = v as Record<string, unknown>;
      const bestScore = Number(o.bestScore);
      const bestTotal = Number(o.bestTotal);
      const lastScore = Number(o.lastScore);
      const lastTotal = Number(o.lastTotal);
      if ([bestScore, bestTotal, lastScore, lastTotal].some((n) => Number.isNaN(n))) continue;
      if (bestTotal <= 0 || lastTotal <= 0) continue;
      out[k] = { bestScore, bestTotal, lastScore, lastTotal };
    }
    return out;
  } catch {
    return {};
  }
}

function saveStore(data: Record<string, ChallengeScoreRecord>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function percent(score: number, total: number): number {
  return total > 0 ? score / total : 0;
}

/** Updates last run; replaces best when the new percentage is higher, or same % with more raw correct. */
export function recordChallengeScore(
  challengeId: PracticeChallengeId,
  score: number,
  total: number
): void {
  if (typeof window === "undefined" || total <= 0) return;
  const data = parseStore();
  const prev = data[challengeId];
  const pNew = percent(score, total);
  const pBest = prev ? percent(prev.bestScore, prev.bestTotal) : -1;
  const isBetter =
    !prev || pNew > pBest || (pNew === pBest && score > prev.bestScore);

  data[challengeId] = {
    bestScore: isBetter ? score : prev!.bestScore,
    bestTotal: isBetter ? total : prev!.bestTotal,
    lastScore: score,
    lastTotal: total,
  };
  saveStore(data);
  window.dispatchEvent(new CustomEvent("gesturo-practice-score"));
}

export function getChallengeScoreRecord(
  challengeId: PracticeChallengeId
): ChallengeScoreRecord | null {
  const data = parseStore();
  return data[challengeId] ?? null;
}

export function getAllChallengeScoreRecords(): Record<string, ChallengeScoreRecord> {
  return parseStore();
}
