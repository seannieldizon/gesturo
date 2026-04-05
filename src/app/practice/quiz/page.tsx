"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, CircleAlert, CircleCheck, Trophy } from "lucide-react";
import {
  LESSON_LABEL,
  LESSON_ORDER,
  getProgress,
  isLessonUnlocked,
  markChallengeComplete,
  markComprehensiveComplete,
  type LessonId,
} from "@/lib/lesson-progress";
import {
  PRACTICE_CHALLENGES,
  type PracticeChallengeId,
} from "@/assets/data/practice-challenges";
import { recordChallengeScore } from "@/lib/practice-scores";

type Feedback = "idle" | "correct" | "wrong" | "complete";

const YOU_GOT_THIS_GIF = "/gif/you-got-this.gif";
const GOOD_JOB_GIF = "/gif/good-job.gif";

export default function QuizPage() {
  const [challengeId, setChallengeId] = useState<PracticeChallengeId>("emergency");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [encourageGifFailed, setEncourageGifFailed] = useState(false);
  const [completeGifFailed, setCompleteGifFailed] = useState(false);
  /** Final correct count after each answer; used when finishing the last question (avoids stale state). */
  const finalScoreRef = useRef(0);

  useEffect(() => {
    const lessonParam = new URLSearchParams(window.location.search).get("lesson") as
      | PracticeChallengeId
      | null;
    const nextChallenge: PracticeChallengeId =
      lessonParam === "comprehensive" || LESSON_ORDER.includes(lessonParam as LessonId)
        ? (lessonParam as PracticeChallengeId)
        : "emergency";
    setChallengeId(nextChallenge);
  }, []);

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setFeedback("idle");
    setScore(0);
    setEncourageGifFailed(false);
    setCompleteGifFailed(false);
    finalScoreRef.current = 0;
  }, [challengeId]);

  const challenge = PRACTICE_CHALLENGES[challengeId];
  const questions = challenge.questions;

  const unlockableLesson: LessonId | null = LESSON_ORDER.includes(challengeId as LessonId)
    ? (challengeId as LessonId)
    : null;

  const q = questions[index];
  const total = questions.length;
  const isLast = index >= total - 1;

  const pick = useCallback(
    (optionIndex: number) => {
      if (!q || answered) return;
      setSelected(optionIndex);
      setAnswered(true);
      const ok = optionIndex === q.correctIndex;
      if (ok) {
        setScore((s) => {
          const n = s + 1;
          finalScoreRef.current = n;
          return n;
        });
      } else {
        finalScoreRef.current = score;
      }
      setFeedback(ok ? "correct" : "wrong");
    },
    [q, answered, score]
  );

  const next = () => {
    if (isLast) {
      recordChallengeScore(challengeId, finalScoreRef.current, total);
      const p = getProgress();
      if (challengeId === "comprehensive") {
        markComprehensiveComplete(p);
      } else if (unlockableLesson) {
        markChallengeComplete(unlockableLesson, p);
      }
      setCompleteGifFailed(false);
      setFeedback("complete");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
    setFeedback("idle");
  };

  if (feedback === "complete") {
    const progressSnapshot = getProgress();
    let unlockBlurb: string;
    if (challengeId === "comprehensive") {
      unlockBlurb = "Comprehensive challenge completed. Great consolidation run!";
    } else {
      const lid = challengeId as LessonId;
      const idx = LESSON_ORDER.indexOf(lid);
      const nextId = idx >= 0 && idx < LESSON_ORDER.length - 1 ? LESSON_ORDER[idx + 1] : null;
      if (nextId && isLessonUnlocked(nextId, progressSnapshot)) {
        unlockBlurb = `${LESSON_LABEL[lid]} challenge complete. ${LESSON_LABEL[nextId]} is now unlocked on Learn and in Practice.`;
      } else if (nextId) {
        unlockBlurb = `${LESSON_LABEL[lid]} saved. To unlock ${LESSON_LABEL[nextId]}, also tap “Mark lesson complete” for ${LESSON_LABEL[lid]} on the Learn page.`;
      } else {
        unlockBlurb = `${LESSON_LABEL[lid]} challenge complete — you’ve finished the lesson track challenges.`;
      }
    }

    return (
      <div className="mx-auto w-full max-w-content px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-[#dccfba]/90 bg-gradient-to-br from-white via-filipino-cream/80 to-sky-50/40 p-10 text-center shadow-soft-lg">
          <div className="mx-auto mb-6 flex min-h-[9rem] max-h-48 items-center justify-center overflow-hidden rounded-2xl bg-white/90 p-3 shadow-inner ring-2 ring-white">
            {completeGifFailed ? (
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-sky-100">
                <Trophy className="h-20 w-20 text-filipino-earth" strokeWidth={1.5} aria-hidden />
              </div>
            ) : (
              <img
                src={GOOD_JOB_GIF}
                alt="Good job"
                className="max-h-44 w-auto max-w-full object-contain"
                onError={() => setCompleteGifFailed(true)}
              />
            )}
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-800">Quiz complete!</h1>
          <p className="mb-2 text-slate-600">
            You scored <span className="font-bold text-sky-700">{score}</span> out of{" "}
            <span className="font-bold">{total}</span>
          </p>
          <p className="mb-4 text-sm font-medium text-filipino-earth">{unlockBlurb}</p>
          <p className="mb-8 text-sm text-slate-500">{challenge.description}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => window.location.assign(`/practice/quiz?lesson=${challengeId}`)}
              className="rounded-2xl bg-gradient-to-r from-amber-200 to-sky-300 px-6 py-3 text-sm font-bold text-slate-900 shadow"
            >
              Play again
            </button>
            <Link
              href="/practice"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm"
            >
              Back to Practice
            </Link>
            <Link
              href="/learn"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm"
            >
              Go to Learn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-content px-6 py-10 sm:px-8 lg:px-12">
      <Link
        href="/practice"
        className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Practice
      </Link>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700/90">{q?.category}</p>
          <h1 className="text-2xl font-bold text-slate-800">
            {challenge.title}
          </h1>
        </div>
        <p className="rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-900">
          Question {index + 1} / {total}
        </p>
      </div>

      <div className="mb-6 flex justify-center lg:hidden">
        <div className="flex max-h-36 w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl border border-[#e5d9ce] bg-gradient-to-b from-filipino-cream to-white p-3 shadow-sm">
          {encourageGifFailed ? (
            <p className="px-2 text-center text-xs text-slate-500">You’ve got this — keep going!</p>
          ) : (
            <img
              src={YOU_GOT_THIS_GIF}
              alt="Encouragement: you’ve got this"
              className="max-h-32 w-auto max-w-full object-contain"
              onError={() => setEncourageGifFailed(true)}
            />
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
        <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-soft sm:p-8">
          <p className="mb-6 text-lg font-medium leading-relaxed text-slate-800">{q?.question}</p>
          <ul className="space-y-3">
            {q?.options.map((option, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.correctIndex;
              let cls =
                "w-full rounded-2xl border-2 px-4 py-4 text-left text-sm font-medium transition ";
              if (answered) {
                if (isCorrect) cls += "border-emerald-400 bg-emerald-50 text-emerald-900";
                else if (isSelected && !isCorrect) cls += "border-rose-300 bg-rose-50 text-rose-900";
                else cls += "border-slate-100 bg-slate-50/50 opacity-60";
              } else {
                cls += isSelected ? "border-sky-400 bg-sky-50" : "border-slate-100 bg-slate-50/80 hover:border-sky-200 hover:bg-white";
              }
              return (
                <li key={i}>
                  <button type="button" disabled={answered} onClick={() => pick(i)} className={cls}>
                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-600 ring-1 ring-slate-200">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>

          {feedback === "correct" && (
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-100">
                  <CircleCheck className="h-12 w-12 text-emerald-700" strokeWidth={2} aria-hidden />
                </div>
                <p className="font-semibold text-emerald-800">Correct — great job!</p>
              </div>
              <button
                type="button"
                onClick={next}
                className="rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-8 py-3 text-sm font-bold text-white shadow"
              >
                {isLast ? "See results" : "Next question"}
              </button>
            </div>
          )}

          {feedback === "wrong" && (
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-rose-100">
                  <CircleAlert className="h-12 w-12 text-rose-700" strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <p className="font-semibold text-rose-800">Not quite.</p>
                  <p className="text-sm text-slate-600">
                    Correct answer: <strong>{q?.options[q.correctIndex]}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={next}
                className="rounded-2xl bg-gradient-to-r from-rose-300 to-amber-200 px-8 py-3 text-sm font-bold text-slate-900 shadow"
              >
                {isLast ? "See results" : "Next question"}
              </button>
            </div>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-[1.5rem] border border-[#e5d9ce] bg-gradient-to-b from-filipino-cream to-filipino-sand/60 p-4 text-center shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase text-filipino-earth/80">You’ve got this</p>
            <div className="mx-auto flex min-h-[7rem] max-h-40 items-center justify-center overflow-hidden rounded-2xl bg-white/80 p-2 shadow-inner ring-1 ring-[#5c4033]/10">
              {encourageGifFailed ? (
                <p className="px-2 text-xs text-slate-600">Keep going — read each choice calmly.</p>
              ) : (
                <img
                  src={YOU_GOT_THIS_GIF}
                  alt="Encouragement: you’ve got this"
                  className="max-h-36 w-full object-contain"
                  onError={() => setEncourageGifFailed(true)}
                />
              )}
            </div>
            <p className="mt-3 text-xs text-slate-600">
              Your score is saved when you finish. Unlock the next lesson by marking it complete on Learn and finishing each challenge here.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
