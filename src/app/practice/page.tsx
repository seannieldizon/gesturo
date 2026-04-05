"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2, Lock, X } from "lucide-react";
import { useLoadingOverlay } from "@/contexts/LoadingOverlayContext";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useChallengeScores } from "@/hooks/useChallengeScores";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { LESSON_LABEL, LESSON_ORDER, type LessonId } from "@/lib/lesson-progress";
import {
  PRACTICE_CHALLENGES,
  type PracticeChallengeId,
} from "@/assets/data/practice-challenges";

const CHALLENGE_ORDER: PracticeChallengeId[] = [...LESSON_ORDER, "comprehensive"];

const GOOD_LUCK_GIF = "/gif/good-luck.gif";

export default function PracticePage() {
  const router = useRouter();
  const { withLoading } = useLoadingOverlay();
  const { practiceUnlocked, challengeCompleted, comprehensiveDone } = useLessonProgress();
  const { getScore } = useChallengeScores();
  const [previewId, setPreviewId] = useState<PracticeChallengeId | null>(null);
  const [gifFailed, setGifFailed] = useState(false);
  const beginBtnRef = useRef<HTMLButtonElement>(null);

  const closePreview = useCallback(() => setPreviewId(null), []);

  useEffect(() => {
    if (!previewId) return;
    setGifFailed(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKey);
    beginBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [previewId, closePreview]);

  const openPreview = (challengeId: PracticeChallengeId) => {
    if (!practiceUnlocked(challengeId)) return;
    setPreviewId(challengeId);
  };

  const confirmStart = () => {
    if (!previewId) return;
    const id = previewId;
    setPreviewId(null);
    void withLoading(async () => {
      await new Promise((r) => setTimeout(r, 350));
      router.push(`/practice/quiz?lesson=${id}`);
    });
  };

  const preview = previewId ? PRACTICE_CHALLENGES[previewId] : null;

  return (
    <div className="mx-auto w-full max-w-content px-6 py-12 sm:px-8 lg:px-12">
      {previewId && preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePreview();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="challenge-preview-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#dccfba] bg-gradient-to-b from-white via-filipino-cream/90 to-sky-50/40 shadow-soft-lg"
          >
            <button
              type="button"
              onClick={closePreview}
              className="absolute right-3 top-3 rounded-full p-2 text-slate-500 transition hover:bg-white/80 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <div className="px-6 pb-6 pt-10 text-center">
              <div className="mx-auto mb-4 flex min-h-[7rem] max-h-40 items-center justify-center overflow-hidden rounded-2xl bg-white/80 p-3 shadow-inner ring-1 ring-[#5c4033]/10">
                {gifFailed ? (
                  <p className="px-2 text-sm text-slate-500">Good luck — the animation could not be loaded.</p>
                ) : (
                  <img
                    src={GOOD_LUCK_GIF}
                    alt="Good luck"
                    className="max-h-36 w-auto max-w-full object-contain"
                    onError={() => setGifFailed(true)}
                  />
                )}
              </div>
              <p className="text-xs font-bold uppercase tracking-wide text-filipino-earth/90">Good luck</p>
              <h2 id="challenge-preview-title" className="mt-2 text-xl font-bold text-slate-800">
                {preview.title}
              </h2>
              <p className="mt-3 text-left text-sm leading-relaxed text-slate-600">{preview.description}</p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  ref={beginBtnRef}
                  onClick={confirmStart}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-200 to-sky-300 px-6 py-3 text-sm font-bold text-slate-900 shadow-md hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <Gamepad2 className="h-4 w-4" aria-hidden />
                  Begin challenge
                </button>
                <button
                  type="button"
                  onClick={closePreview}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="text-center">
        <h1 className="mb-3 text-3xl font-bold text-slate-800 sm:text-4xl">
          Practice Challenges
        </h1>
        <p className="mb-10 max-w-2xl mx-auto text-lg text-slate-600">
          Only the Emergency challenge starts unlocked. Each next challenge opens after you finish the previous one here{" "}
          <strong className="font-semibold text-slate-700">and</strong> mark that previous lesson complete on Learn. Challenge
          12 (comprehensive) opens after all 11 lesson challenges are done.
        </p>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGE_ORDER.map((id, i) => {
            const isOpen = practiceUnlocked(id);
            const isDone =
              id === "comprehensive" ? comprehensiveDone : challengeCompleted.has(id as LessonId);
            const label =
              id === "comprehensive" ? "Comprehensive (All Lessons)" : LESSON_LABEL[id as LessonId];
            const scoreRow = getScore(id);
            return (
              <ScrollReveal key={id} animation="scale" delay={i * 60} duration={400}>
                <article className="rounded-3xl border border-[#dccfba]/80 bg-white/90 p-6 text-left shadow-soft">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-filipino-earth/80">
                    Challenge {i + 1}
                  </p>
                  <h2 className="mb-4 text-xl font-bold text-slate-800">{label}</h2>
                  {scoreRow && (
                    <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl border border-sky-100 bg-sky-50/60 px-3 py-2.5 text-sm">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-sky-800/80">
                          Best score
                        </p>
                        <p className="font-bold text-sky-950">
                          {scoreRow.bestScore}/{scoreRow.bestTotal}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-sky-800/80">
                          Last score
                        </p>
                        <p className="font-bold text-sky-950">
                          {scoreRow.lastScore}/{scoreRow.lastTotal}
                        </p>
                      </div>
                    </div>
                  )}
                  {isDone && (
                    <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                      Completed
                    </p>
                  )}
                  <button
                    type="button"
                    disabled={!isOpen}
                    onClick={() => openPreview(id)}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition ${
                      isOpen
                        ? "bg-gradient-to-r from-amber-200 via-amber-100 to-sky-200 text-slate-900 shadow-md hover:brightness-105"
                        : "cursor-not-allowed border border-dashed border-slate-300 bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isOpen ? <Gamepad2 className="h-4 w-4" aria-hidden /> : <Lock className="h-4 w-4" aria-hidden />}
                    {isOpen ? "Start challenge" : "Locked"}
                  </button>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
