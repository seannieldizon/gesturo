import Link from "next/link";
import { Users, Accessibility, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimalMascots } from "@/components/AnimalMascots";
import { HomeCtaButtons } from "@/components/HomeCtaButtons";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-content px-6 py-8 sm:px-8 lg:px-12">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center text-center"
        aria-labelledby="hero-heading"
      >
        <span
          className="mb-4 inline-block text-6xl sm:text-7xl animate-bounce-hand"
          role="img"
          aria-label="Waving hand"
        >
          👋
        </span>
        <h1
          id="hero-heading"
          className="mb-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-100"
        >
          Welcome to GesTURO
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-slate-600 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-200">
          Learn Filipino Sign Language through interactive lessons designed for both deaf and hearing communities.
        </p>
        <HomeCtaButtons />
        <p className="mx-auto mt-12 max-w-lg text-center text-sm leading-relaxed text-slate-500">
          Meet a few friends who appear across GesTURO — from the home page to lessons and quizzes, they keep the experience warm and cohesive.
        </p>
        <AnimalMascots />
      </section>

      {/* Why Learn FSL? */}
      <section
        className="mt-16"
        aria-labelledby="why-fsl-heading"
      >
        <ScrollReveal animation="fade-up" duration={600} className="mb-8 text-center">
          <h2 id="why-fsl-heading" className="text-2xl font-bold text-slate-800">
            Why Learn FSL?
          </h2>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ScrollReveal animation="fade-up" delay={100} duration={600}>
            <article className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary-300/60">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600" aria-hidden>
                <Users className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-slate-800">Bridge Communities</h3>
              <p className="text-slate-600">
                Connect deaf and hearing communities through shared language and understanding.
              </p>
            </article>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200} duration={600}>
            <article className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary-300/60">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600" aria-hidden>
                <Accessibility className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-slate-800">Fully Accessible</h3>
              <p className="text-slate-600">
                Designed with accessibility in mind, including screen reader support and keyboard navigation.
              </p>
            </article>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300} duration={600} className="sm:col-span-2 lg:col-span-1">
            <article className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary-300/60">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600" aria-hidden>
                <Heart className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-slate-800">Interactive Learning</h3>
              <p className="text-slate-600">
                Engage with hands-on practice, quizzes, and visual demonstrations.
              </p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section
        className="mt-16"
        aria-labelledby="quick-start-heading"
      >
        <ScrollReveal animation="fade-up" duration={600} className="mb-8 text-center">
          <h2 id="quick-start-heading" className="text-2xl font-bold text-slate-800">
            Quick Start Guide
          </h2>
        </ScrollReveal>
        <div className="grid gap-8 lg:grid-cols-2">
          <ScrollReveal animation="slide-left" delay={100} duration={600}>
            <div className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" role="img" aria-hidden>👂</span>
                <h3 className="text-lg font-semibold text-slate-800">For Hearing Learners</h3>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Start with the FSL alphabet in the Learn section
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Practice common greetings and phrases
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Watch visual demonstrations carefully
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Test your knowledge with interactive quizzes
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">•</span>
                  Practice regularly to build muscle memory
                </li>
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slide-right" delay={100} duration={600}>
            <div className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" role="img" aria-hidden>🤟</span>
                <h3 className="text-lg font-semibold text-slate-800">For Deaf Users</h3>
              </div>
              <ul className="space-y-2 text-slate-600">
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
                  Help others learn proper FSL grammar
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

      {/* Stats cards */}
      <section className="mt-16" aria-label="Content overview">
        <div className="grid gap-6 sm:grid-cols-3">
          <ScrollReveal animation="scale" delay={0} duration={500}>
            <div className="rounded-2xl border border-primary-200/60 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600" aria-hidden>
                <span className="text-lg font-bold text-primary-700">abc</span>
              </span>
              <p className="text-xl font-bold text-slate-800">26 Letters in FSL Alphabet</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="scale" delay={100} duration={500}>
            <div className="rounded-2xl border border-primary-200/60 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 text-2xl" aria-hidden>
                💬
              </span>
              <p className="text-xl font-bold text-slate-800">100+ Common Signs & Phrases</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="scale" delay={200} duration={500}>
            <div className="rounded-2xl border border-primary-200/60 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 text-xl font-bold" aria-hidden>
                ∞
              </span>
              <p className="text-xl font-bold text-slate-800">Ways to Connect</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <ScrollReveal animation="fade-up" duration={700}>
        <section
          className="mt-16 rounded-3xl bg-gradient-to-r from-amber-100 via-amber-50 to-primary-100 p-8 sm:p-12 transition-all duration-300 hover:shadow-xl"
          aria-labelledby="cta-heading"
        >
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 text-5xl" role="img" aria-hidden>
              🌐
            </span>
            <h2 id="cta-heading" className="mb-2 text-2xl font-bold text-slate-800 sm:text-3xl">
              Ready to Begin Your FSL Journey?
            </h2>
            <p className="mb-6 max-w-xl text-slate-600">
              Join thousands learning Filipino Sign Language and making the world more inclusive.
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
