import Link from "next/link";
import { Users, Accessibility, Heart } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HumanGestureStrip } from "@/components/AnimalMascots";
import { HomeCtaButtons } from "@/components/HomeCtaButtons";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-content px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
      <section
        className="flex flex-col items-center text-center"
        aria-labelledby="hero-heading"
      >
        <div className="mb-6 w-full max-w-sm opacity-0 animate-fade-in-up animate-fill-forwards sm:mb-8 sm:max-w-lg">
          <div className="relative mx-auto overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/90 px-5 py-5 shadow-lg shadow-slate-200/30 ring-1 ring-slate-900/[0.04] dark:border-slate-600/80 dark:from-slate-800 dark:via-slate-800/95 dark:to-slate-900 dark:shadow-slate-950/40 dark:ring-white/[0.06] sm:rounded-3xl sm:px-10 sm:py-8">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(56,189,248,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(56,189,248,0.08),transparent_50%)]"
              aria-hidden
            />
            <div className="relative flex flex-col items-center gap-1">
              <BrandLogo
                size="xl"
                priority
                className="drop-shadow-sm dark:brightness-110 dark:contrast-95"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                Filipino Sign Language
              </p>
            </div>
          </div>
        </div>
        <h1
          id="hero-heading"
          className="mb-3 text-2xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-3xl lg:text-4xl opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-100"
        >
          Welcome to GesTURO
        </h1>
        <p className="mb-6 max-w-2xl text-base text-slate-600 dark:text-slate-300 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-200 sm:mb-8 sm:text-lg">
          Learn Filipino Sign Language through interactive lessons designed for
          both deaf and hearing communities.
        </p>
        <HomeCtaButtons />
        <p className="mx-auto mt-12 max-w-lg text-center text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          GesTURO centers people and everyday gestures — warm tones inspired by
          Filipino interiors, with visuals that foreground human connection.
        </p>
        <HumanGestureStrip />
      </section>

      <section className="mt-10 sm:mt-16" aria-labelledby="why-fsl-heading">
        <ScrollReveal animation="fade-up" duration={600} className="mb-8 text-center">
          <h2 id="why-fsl-heading" className="text-2xl font-bold text-slate-800 dark:text-white">
            Why Learn FSL?
          </h2>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ScrollReveal animation="fade-up" delay={100} duration={600}>
            <article className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary-300/60 dark:border-slate-700 dark:bg-slate-800">
              <span
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                aria-hidden
              >
                <Users className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-slate-800 dark:text-white">
                Bridge Communities
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Connect deaf and hearing communities through shared language and
                understanding.
              </p>
            </article>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200} duration={600}>
            <article className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary-300/60 dark:border-slate-700 dark:bg-slate-800">
              <span
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                aria-hidden
              >
                <Accessibility className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-slate-800 dark:text-white">
                Fully Accessible
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Designed with accessibility in mind, including screen reader
                support and keyboard navigation.
              </p>
            </article>
          </ScrollReveal>
          <ScrollReveal
            animation="fade-up"
            delay={300}
            duration={600}
            className="sm:col-span-2 lg:col-span-1"
          >
            <article className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary-300/60 dark:border-slate-700 dark:bg-slate-800">
              <span
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                aria-hidden
              >
                <Heart className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-slate-800 dark:text-white">
                Interactive Learning
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Engage with hands-on practice, quizzes, and visual
                demonstrations across 7 structured levels.
              </p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="mt-10 sm:mt-16" aria-labelledby="quick-start-heading">
        <ScrollReveal animation="fade-up" duration={600} className="mb-8 text-center">
          <h2
            id="quick-start-heading"
            className="text-2xl font-bold text-slate-800 dark:text-white"
          >
            Quick Start Guide
          </h2>
        </ScrollReveal>
        <div className="grid gap-8 lg:grid-cols-2">
          <ScrollReveal animation="slide-left" delay={100} duration={600}>
            <div className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" role="img" aria-hidden>
                  👂
                </span>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  For Hearing Learners
                </h3>
              </div>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Start from Level 1 (Basics) and progress through all 7 levels
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Watch video demonstrations for each lesson
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Complete quizzes to test your understanding
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Practice regularly to build muscle memory
                </li>
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slide-right" delay={100} duration={600}>
            <div className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" role="img" aria-hidden>
                  🤟
                </span>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  For Deaf Users
                </h3>
              </div>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  All content includes visual demonstrations
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Text descriptions accompany all signs
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Share your knowledge with hearing friends
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Connect with the broader FSL community
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mt-10 sm:mt-16" aria-label="Content overview">
        <div className="grid gap-6 sm:grid-cols-3">
          <ScrollReveal animation="scale" delay={0} duration={500}>
            <div className="rounded-2xl border border-primary-200/60 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <span
                className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                aria-hidden
              >
                <span className="text-lg font-bold">7</span>
              </span>
              <p className="text-xl font-bold text-slate-800 dark:text-white">
                Structured Levels
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="scale" delay={100} duration={500}>
            <div className="rounded-2xl border border-primary-200/60 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <span
                className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 text-2xl dark:bg-amber-900/30 dark:text-amber-400"
                aria-hidden
              >
                💬
              </span>
              <p className="text-xl font-bold text-slate-800 dark:text-white">
                100+ Signs & Phrases
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="scale" delay={200} duration={500}>
            <div className="rounded-2xl border border-primary-200/60 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <span
                className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 text-xl font-bold dark:bg-primary-900/30 dark:text-primary-400"
                aria-hidden
              >
                ✓
              </span>
              <p className="text-xl font-bold text-slate-800 dark:text-white">
                Interactive Quizzes
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal animation="fade-up" duration={700}>
        <section
          className="mt-10 rounded-2xl bg-gradient-to-r from-amber-100 via-amber-50 to-primary-100 p-6 transition-all duration-300 hover:shadow-xl dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 dark:border dark:border-slate-700 sm:mt-16 sm:rounded-3xl sm:p-12"
          aria-labelledby="cta-heading"
        >
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 text-5xl" role="img" aria-hidden>
              🌐
            </span>
            <h2
              id="cta-heading"
              className="mb-2 text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl"
            >
              Ready to Begin Your FSL Journey?
            </h2>
            <p className="mb-6 max-w-xl text-slate-600 dark:text-slate-400">
              Join thousands learning Filipino Sign Language and making the world
              more inclusive.
            </p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Start Learning Now
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
