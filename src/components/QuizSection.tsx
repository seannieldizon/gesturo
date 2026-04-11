"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  Trophy,
  RotateCcw,
} from "lucide-react";
import { showToast } from "@/components/Toast";
import type {
  QuizQuestion,
  MultipleChoiceQuestion,
  MatchingQuestion,
  ConstructionQuestion,
} from "@/assets/data/levels";

type QuizState = "answering" | "feedback" | "complete";

function PromptVideo({ src }: { src: string }) {
  return (
    <div className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-black/5 dark:border-slate-600 dark:bg-black/20">
      <video
        className="mx-auto max-h-64 w-full max-w-md object-contain"
        controls
        playsInline
        preload="metadata"
        src={src}
      />
    </div>
  );
}

function normalizeAnswer(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Letters/Ññ only; long enough for a name part (e.g. hyphen letters or a surname word). */
const FINGERSPELL_TOKEN = /^[A-Za-zÑñ]{1,40}$/;

/**
 * Accepts many ways to type a full name in fingerspelling (answer varies per user):
 * hyphen-separated, space-separated, periods (e.g. J.P.), or one uninterrupted word.
 */
function isValidFingerspelling(s: string): boolean {
  const raw = s.trim();
  if (raw.length < 2) return false;

  const normalized = raw.replace(/\u2013|\u2014/g, "-");
  const segments = normalized
    .split(/[\s._-]+/)
    .map((x) => x.trim())
    .filter(Boolean);

  if (segments.length >= 2) {
    return segments.every((seg) => FINGERSPELL_TOKEN.test(seg));
  }

  const compact = segments[0]?.replace(/\s/g, "") ?? "";
  return FINGERSPELL_TOKEN.test(compact) && compact.length >= 2;
}

/** Gloss intro: HI, then I-AM / I AM / IAM, then learner’s name (any non-empty tail). */
function isValidHiIamIntroduction(s: string): boolean {
  const raw = s.trim();
  if (raw.length < 8) return false;
  const normalized = raw.replace(/\s*\+\s*/gi, " ").replace(/\s+/g, " ").trim();
  const lower = normalized.toLowerCase();
  if (!/^hi(\s|\+|$)/.test(lower)) return false;
  let afterHi = lower.replace(/^hi/, "").trim();
  if (afterHi.startsWith("+")) afterHi = afterHi.slice(1).trim();
  if (!afterHi.startsWith("i")) return false;
  const iamMatch = /^(i-am|i am|iam)(?:\s+|$)/.exec(afterHi);
  if (!iamMatch) return false;
  let rest = afterHi.slice(iamMatch[0].trimEnd().length).trim();
  rest = rest.replace(/^\+/, "").trim();
  return rest.length >= 1;
}

/** Deterministic permutation (Fisher–Yates with seeded PRNG). Same seed → same order. */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let state = seed >>> 0;
  const next = () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    const t = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = t;
  }
  return arr;
}

function MCQuestion({
  q,
  onAnswer,
}: {
  q: MultipleChoiceQuestion;
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const pick = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    onAnswer(idx === q.correctIndex);
  };

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {q.instruction}
      </p>
      {q.promptVideoUrl && <PromptVideo src={q.promptVideoUrl} />}
      <p className="mb-5 text-lg font-medium text-slate-800 dark:text-slate-100">
        {q.question}
      </p>
      <ul className="space-y-3">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.correctIndex;
          let cls =
            "w-full rounded-xl border-2 px-3 py-3 text-left text-sm font-medium transition-all duration-200 sm:px-4 sm:py-3.5 ";
          if (answered) {
            if (isCorrect)
              cls +=
                "border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-200";
            else if (isSelected && !isCorrect)
              cls +=
                "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-500 dark:bg-rose-900/30 dark:text-rose-200";
            else
              cls +=
                "border-slate-100 bg-slate-50/50 opacity-50 dark:border-slate-700 dark:bg-slate-800/50";
          } else {
            cls += isSelected
              ? "border-sky-400 bg-sky-50 dark:border-sky-500 dark:bg-sky-900/30"
              : "border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/50 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-sky-700 dark:hover:bg-sky-900/20";
          }
          return (
            <li key={i}>
              <button
                type="button"
                disabled={answered}
                onClick={() => pick(i)}
                className={cls}
              >
                <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
      {answered && (
        <div className="mt-4 flex items-center gap-2">
          {selected === q.correctIndex ? (
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-semibold">Correct!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
              <XCircle className="h-5 w-5" />
              <span className="text-sm font-semibold">
                Incorrect. Answer: {q.options[q.correctIndex]}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MatchQuestion({
  q,
  onAnswer,
}: {
  q: MatchingQuestion;
  onAnswer: (correct: boolean) => void;
}) {
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const textOptions = q.options ?? [];
  const rawVideoChoices = q.videoChoices;
  const useVideos = (rawVideoChoices?.length ?? 0) > 0;

  /** Stable order per question; A–D labels. Shuffle only when requested (seeded by question id so it’s deterministic). */
  const displayVideoChoices = useMemo(() => {
    const raw = q.videoChoices;
    if (!raw?.length) return [];
    const copy = [...raw];
    const base = q.shuffleVideoChoices
      ? seededShuffle(copy, (q.id + 17) * 2654435761)
      : copy;
    return base.map((c, idx) => ({
      url: c.url,
      label: idx < 26 ? String.fromCharCode(65 + idx) : `Option ${idx + 1}`,
    }));
  }, [q.shuffleVideoChoices, q.id, q.videoChoices]);

  const allSelected = q.pairs.every((_, i) => selections[i] !== undefined);

  const handleSelect = (pairIdx: number, value: string) => {
    if (submitted) return;
    setSelections((prev) => ({ ...prev, [pairIdx]: value }));
  };

  const submit = () => {
    if (!allSelected || submitted) return;
    setSubmitted(true);
    const correctCount = q.pairs.filter(
      (pair, i) => selections[i] === pair.answer
    ).length;
    onAnswer(correctCount === q.pairs.length);
  };

  const correctLabelForUrl = (url: string) =>
    displayVideoChoices.find((c) => c.url === url)?.label ?? "the matching sign";

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {q.instruction}
      </p>
      {useVideos && (
        <div className="mb-5 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 lg:grid-cols-4">
          {displayVideoChoices.map((c, idx) => (
            <div
              key={c.url}
              className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-900/40"
              aria-label={`Video option ${c.label}`}
            >
              <span className="absolute left-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-xs font-bold text-white backdrop-blur-sm">
                {c.label}
              </span>
              <video
                className="aspect-video w-full object-cover"
                controls
                playsInline
                preload="metadata"
                src={c.url}
              />
            </div>
          ))}
        </div>
      )}
      <div className="space-y-4">
        {q.pairs.map((pair, i) => {
          const isCorrect = submitted && selections[i] === pair.answer;
          const isWrong =
            submitted && selections[i] !== undefined && !isCorrect;
          return (
            <div
              key={i}
              className={`rounded-xl border-2 p-4 transition-all ${
                isCorrect
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/20"
                  : isWrong
                    ? "border-rose-300 bg-rose-50 dark:border-rose-600 dark:bg-rose-900/20"
                    : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800"
              }`}
            >
              {pair.promptVideoUrl && (
                <div className="mb-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Prompt
                  </p>
                  <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600">
                    <video
                      className="mx-auto max-h-48 w-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      src={pair.promptVideoUrl}
                    />
                  </div>
                </div>
              )}
              <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                {pair.prompt}
              </p>
              <select
                value={selections[i] ?? ""}
                onChange={(e) => handleSelect(i, e.target.value)}
                disabled={submitted}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
              >
                <option value="">Select an answer...</option>
                {useVideos
                  ? displayVideoChoices.map((c) => (
                      <option key={c.url} value={c.url}>
                        {c.label}
                      </option>
                    ))
                  : textOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
              </select>
              {selections[i] && useVideos && !submitted && (
                <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600">
                  <video
                    className="max-h-40 w-full object-contain"
                    controls
                    playsInline
                    key={selections[i]}
                    src={selections[i]}
                  />
                </div>
              )}
              {submitted && isWrong && (
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                  Correct:{" "}
                  {useVideos
                    ? correctLabelForUrl(pair.answer)
                    : pair.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {!submitted && (
        <button
          type="button"
          onClick={submit}
          disabled={!allSelected}
          className={`mt-4 w-full rounded-xl px-6 py-3 text-sm font-semibold transition-all sm:w-auto sm:py-2.5 ${
            allSelected
              ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md hover:shadow-lg"
              : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
          }`}
        >
          Check Matches
        </button>
      )}
    </div>
  );
}

function ConstructQuestion({
  q,
  onAnswer,
}: {
  q: ConstructionQuestion;
  onAnswer: (correct: boolean) => void;
}) {
  const parts = q.parts;
  const [input, setInput] = useState("");
  const [partInputs, setPartInputs] = useState<string[]>(
    () => parts?.map(() => "") ?? []
  );
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkSingleAnswer = (raw: string) => {
    const normalizedInput = normalizeAnswer(raw);
    if (q.acceptHiIamGlossFormat) {
      if (isValidHiIamIntroduction(raw)) return true;
      return q.acceptedAnswers.some(
        (a) => normalizeAnswer(a) === normalizedInput
      );
    }
    if (q.acceptFingerspellingFormat) {
      if (isValidFingerspelling(raw)) return true;
      return q.acceptedAnswers.some(
        (a) => normalizeAnswer(a) === normalizedInput
      );
    }
    return q.acceptedAnswers.some(
      (a) => normalizeAnswer(a) === normalizedInput
    );
  };

  const submit = () => {
    if (submitted) return;
    if (parts && parts.length > 0) {
      const filled = partInputs.every((p) => p.trim());
      if (!filled) return;
      setSubmitted(true);
      const ok = parts.every((part, idx) => {
        const raw = partInputs[idx];
        const normalizedInput = normalizeAnswer(raw);
        return part.acceptedAnswers.some(
          (a) => normalizeAnswer(a) === normalizedInput
        );
      });
      setIsCorrect(ok);
      onAnswer(ok);
      return;
    }
    if (!input.trim()) return;
    setSubmitted(true);
    const correct = checkSingleAnswer(input);
    setIsCorrect(correct);
    onAnswer(correct);
  };

  const singleDisabled =
    !parts &&
    (!input.trim() ||
      (q.acceptedAnswers.length === 0 &&
        !q.acceptFingerspellingFormat &&
        !q.acceptHiIamGlossFormat));

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {q.instruction}
      </p>
      {q.exampleVideoUrl && (
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            Example
          </p>
          <PromptVideo src={q.exampleVideoUrl} />
        </div>
      )}
      <p className="mb-4 text-lg font-medium text-slate-800 dark:text-slate-100">
        {q.prompt}
      </p>
      {q.hint && !submitted && (
        <p className="mb-3 text-xs text-slate-500 italic dark:text-slate-400">
          Hint: {q.hint}
        </p>
      )}
      {parts && parts.length > 0 ? (
        <div className="space-y-6">
          {parts.map((part, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 p-4 dark:border-slate-600"
            >
              {part.videoUrl && <PromptVideo src={part.videoUrl} />}
              {part.prompt.trim() !== "" && (
                <p className="mb-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {part.prompt}
                </p>
              )}
              <input
                type="text"
                value={partInputs[idx] ?? ""}
                onChange={(e) =>
                  setPartInputs((prev) => {
                    const next = [...prev];
                    next[idx] = e.target.value;
                    return next;
                  })
                }
                disabled={submitted}
                placeholder="Type the number…"
                className={`w-full rounded-xl border-2 px-4 py-3 text-sm transition-all focus:outline-none ${
                  submitted
                    ? isCorrect ||
                      (part.acceptedAnswers.some((a) =>
                        normalizeAnswer(a) ===
                        normalizeAnswer(partInputs[idx] ?? "")
                      ))
                      ? "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/20"
                      : "border-rose-300 bg-rose-50 dark:border-rose-600 dark:bg-rose-900/20"
                    : "border-slate-200 bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-sky-500"
                }`}
              />
              {submitted &&
                !part.acceptedAnswers.some(
                  (a) =>
                    normalizeAnswer(a) ===
                    normalizeAnswer(partInputs[idx] ?? "")
                ) && (
                  <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">
                    Accepted: {part.acceptedAnswers.slice(0, 3).join(" · ")}
                  </p>
                )}
            </div>
          ))}
          {!submitted && (
            <button
              type="button"
              onClick={submit}
              disabled={!partInputs.every((p) => p.trim())}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Submit
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            disabled={submitted}
            placeholder="Type your answer..."
            className={`w-full rounded-xl border-2 px-4 py-3 text-sm transition-all focus:outline-none sm:flex-1 ${
              submitted
                ? isCorrect
                  ? "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/20"
                  : "border-rose-300 bg-rose-50 dark:border-rose-600 dark:bg-rose-900/20"
                : "border-slate-200 bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-sky-500"
            }`}
          />
          {!submitted && (
            <button
              type="button"
              onClick={submit}
              disabled={!!singleDisabled}
              className="shrink-0 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit
            </button>
          )}
        </div>
      )}
      {submitted && (
        <div className="mt-3 flex items-center gap-2">
          {isCorrect ? (
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-semibold">Correct!</span>
            </div>
          ) : (
            <div className="text-rose-700 dark:text-rose-400">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-semibold">Not quite.</span>
              </div>
              {!parts && q.acceptHiIamGlossFormat && (
                <p className="mt-1 text-xs">
                  Use gloss order: <strong>HI</strong>, then <strong>I-AM</strong>{" "}
                  (or I AM / IAM), then <strong>your name</strong>. Example:{" "}
                  HI + I-AM + MARIA or HI + I-AM + M-A-R-I-A.
                </p>
              )}
              {!parts && q.acceptFingerspellingFormat && (
                <p className="mt-1 text-xs">
                  Use letters only (A–Z, Ñ). Separate with hyphens, spaces, or
                  periods (e.g. J-U-A-N, J U A N, Juan, or J.P.R.).
                </p>
              )}
              {!parts &&
                !q.acceptFingerspellingFormat &&
                !q.acceptHiIamGlossFormat &&
                q.acceptedAnswers.length > 0 && (
                  <p className="mt-1 text-xs">
                    Accepted answers:{" "}
                    {q.acceptedAnswers.slice(0, 2).join(" or ")}
                  </p>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function QuizSection({
  questions,
  levelId,
  lessonId,
  onComplete,
}: {
  questions: QuizQuestion[];
  levelId: number;
  lessonId: number;
  onComplete: (score: number, total: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [state, setState] = useState<QuizState>("answering");
  /** Always matches `score` after updates — avoids stale closure when finishing the last question. */
  const scoreRef = useRef(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const total = questions.length;
  const q = questions[currentIndex];
  const isLast = currentIndex >= total - 1;

  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (answered) return;
      setAnswered(true);
      if (correct) {
        setScore((s) => {
          const next = s + 1;
          scoreRef.current = next;
          return next;
        });
      }
      setState("feedback");
    },
    [answered]
  );

  const handleNext = () => {
    if (isLast) {
      const finalScore = scoreRef.current;
      setState("complete");
      onComplete(finalScore, total);
      showToast(
        `Quiz complete! You scored ${finalScore}/${total}`,
        finalScore >= total * 0.6 ? "success" : "info"
      );
      return;
    }
    setCurrentIndex((i) => i + 1);
    setAnswered(false);
    setState("answering");
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    scoreRef.current = 0;
    setScore(0);
    setAnswered(false);
    setState("answering");
  };

  if (state === "complete") {
    const percent = total > 0 ? Math.round((score / total) * 100) : 0;
    const passed = percent >= 60;
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-soft dark:border-slate-700 dark:bg-slate-800 sm:rounded-2xl sm:p-8">
        <div
          className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
            passed
              ? "bg-emerald-100 dark:bg-emerald-900/30"
              : "bg-amber-100 dark:bg-amber-900/30"
          }`}
        >
          <Trophy
            className={`h-10 w-10 ${
              passed
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-amber-600 dark:text-amber-400"
            }`}
          />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-slate-800 dark:text-white">
          Quiz Complete!
        </h3>
        <p className="mb-1 text-lg text-slate-600 dark:text-slate-300">
          You scored{" "}
          <span className="font-bold text-sky-700 dark:text-sky-400">
            {score}
          </span>{" "}
          out of <span className="font-bold">{total}</span>
        </p>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          {percent}%{" "}
          {passed
            ? "— Great job! Lesson marked as complete."
            : "— Keep practicing! You need 60% to mark the lesson complete."}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Question {currentIndex + 1} of {total}
        </p>
        <p className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
          Score: {score}/{total}
        </p>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-primary-500 transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-800 sm:rounded-2xl sm:p-6">
        {q?.type === "multiple-choice" && (
          <MCQuestion
            key={`mc-${currentIndex}`}
            q={q}
            onAnswer={handleAnswer}
          />
        )}
        {q?.type === "matching" && (
          <MatchQuestion
            key={`match-${currentIndex}`}
            q={q}
            onAnswer={handleAnswer}
          />
        )}
        {q?.type === "construction" && (
          <ConstructQuestion
            key={`construct-${currentIndex}`}
            q={q}
            onAnswer={handleAnswer}
          />
        )}

        {state === "feedback" && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
            >
              {isLast ? "See Results" : "Next Question"}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
