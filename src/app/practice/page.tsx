"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LottiePlayer } from "@/components/lottie/LottiePlayer";
import { LOTTIE_ANIMALS } from "@/constants/lottie-animals";
import { useLoadingOverlay } from "@/contexts/LoadingOverlayContext";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function PracticePage() {
  const router = useRouter();
  const { withLoading } = useLoadingOverlay();

  const startQuiz = () => {
    void withLoading(async () => {
      await new Promise((r) => setTimeout(r, 650));
      router.push("/practice/quiz");
    });
  };

  return (
    <div className="mx-auto w-full max-w-content px-6 py-12 sm:px-8 lg:px-12">
      <section className="text-center">
        <h1 className="mb-3 text-3xl font-bold text-slate-800 sm:text-4xl">
          Practice Your FSL Skills
        </h1>
        <p className="mb-10 max-w-2xl mx-auto text-lg text-slate-600">
          Test your knowledge with interactive quizzes and challenges
        </p>

        <ScrollReveal animation="scale" duration={500}>
          <div className="mx-auto max-w-lg rounded-[2rem] border border-sky-100/80 bg-gradient-to-br from-white via-amber-50/30 to-sky-50/40 p-8 shadow-soft-lg">
            <div className="mx-auto mb-6 h-24 w-24">
              <LottiePlayer src={LOTTIE_ANIMALS.monkey} loop className="h-full w-full" />
            </div>
            <h2 className="mb-3 text-xl font-bold text-slate-800 sm:text-2xl">Ready to Practice?</h2>
            <p className="mb-8 text-slate-600">
              Test your FSL knowledge with 8 questions covering alphabet, greetings, numbers, and common words.
            </p>
            <button
              type="button"
              onClick={startQuiz}
              className="inline-flex w-full max-w-xs items-center justify-center rounded-2xl bg-gradient-to-r from-amber-200 via-amber-100 to-sky-200 px-8 py-4 text-base font-bold text-slate-900 shadow-md transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Start Quiz
            </button>
            <p className="mt-4 text-xs text-slate-500">
              A short loading animation plays while your quiz loads.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
