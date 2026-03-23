"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { LottiePlayer } from "@/components/lottie/LottiePlayer";
import { LOTTIE_ANIMALS } from "@/constants/lottie-animals";
import { ChevronLeft } from "lucide-react";
import quizData from "@/assets/data/fsl-quiz.json";

type QuizData = {
  title: string;
  description: string;
  questions: {
    id: string;
    category: string;
    question: string;
    options: string[];
    correctIndex: number;
  }[];
};

type Feedback = "idle" | "correct" | "wrong" | "complete";

export default function QuizPage() {
  const quiz = quizData as QuizData;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const q = quiz.questions[index];
  const total = quiz.questions.length;
  const isLast = index >= total - 1;

  const pick = useCallback(
    (optionIndex: number) => {
      if (!q || answered) return;
      setSelected(optionIndex);
      setAnswered(true);
      const ok = optionIndex === q.correctIndex;
      if (ok) setScore((s) => s + 1);
      setFeedback(ok ? "correct" : "wrong");
    },
    [q, answered]
  );

  const next = () => {
    if (isLast) {
      setFeedback("complete");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
    setFeedback("idle");
  };

  if (feedback === "complete") {
    return (
      <div className="mx-auto w-full max-w-content px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-amber-100/80 bg-gradient-to-br from-white via-sky-50/50 to-amber-50/40 p-10 text-center shadow-soft-lg">
          <div className="mx-auto mb-6 h-40 w-40">
            <LottiePlayer src={LOTTIE_ANIMALS.dancingCrab} loop className="h-full w-full" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-800">Quiz complete!</h1>
          <p className="mb-2 text-slate-600">
            You scored <span className="font-bold text-sky-700">{score}</span> out of{" "}
            <span className="font-bold">{total}</span>
          </p>
          <p className="mb-8 text-sm text-slate-500">{quiz.description}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => window.location.assign("/practice/quiz")}
              className="rounded-2xl bg-gradient-to-r from-amber-200 to-sky-300 px-6 py-3 text-sm font-bold text-slate-900 shadow"
            >
              Retake quiz
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
              Review lessons
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
          <h1 className="text-2xl font-bold text-slate-800">{quiz.title}</h1>
        </div>
        <p className="rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-900">
          Question {index + 1} / {total}
        </p>
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
                <div className="h-20 w-20 shrink-0">
                  <LottiePlayer key={`ok-${index}`} src={LOTTIE_ANIMALS.toucan} loop className="h-full w-full" />
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
                <div className="h-20 w-20 shrink-0">
                  <LottiePlayer key={`bad-${index}`} src={LOTTIE_ANIMALS.crocodileOnScooter} loop className="h-full w-full" />
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
          <div className="sticky top-28 rounded-[1.5rem] border border-sky-100 bg-gradient-to-b from-sky-50/80 to-amber-50/40 p-4 text-center shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase text-slate-500">Quiz tips</p>
            <div className="mx-auto h-28 w-28">
              <LottiePlayer src={LOTTIE_ANIMALS.cat} loop className="h-full w-full" />
            </div>
            <p className="mt-3 text-xs text-slate-600">
              Take your time on each question — you can retake the quiz anytime to improve your score.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
