"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAllChallengeScoreRecords,
  type ChallengeScoreRecord,
} from "@/lib/practice-scores";
import type { PracticeChallengeId } from "@/assets/data/practice-challenges";

export function useChallengeScores() {
  const [scores, setScores] = useState<Record<string, ChallengeScoreRecord>>({});

  const load = useCallback(() => {
    setScores(getAllChallengeScoreRecords());
  }, []);

  useEffect(() => {
    load();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "gesturo-practice-scores" || e.key === null) load();
    };
    const onCustom = () => load();
    window.addEventListener("storage", onStorage);
    window.addEventListener("gesturo-practice-score", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("gesturo-practice-score", onCustom);
    };
  }, [load]);

  const getScore = useCallback(
    (id: PracticeChallengeId) => scores[id] ?? null,
    [scores]
  );

  return { getScore, refresh: load };
}
