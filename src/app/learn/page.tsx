"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Hand,
  MessageCircle,
  Lock,
  Siren,
  Hash,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LottiePlayer } from "@/components/lottie/LottiePlayer";
import { LOTTIE_ANIMALS } from "@/constants/lottie-animals";
import { InstructionPanel } from "@/components/InstructionPanel";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import type { LessonId } from "@/lib/lesson-progress";

const ALPHABET = [
  { letter: "A", description: "Make a fist with thumb on the side", tips: "Keep your thumb resting against the side of your fist. This is the base for many FSL signs." },
  { letter: "B", description: "Flat hand with fingers together, thumb across palm", tips: "Fingers stay straight and touching. The thumb folds across the palm naturally." },
  { letter: "C", description: "Form a C-shape with your hand", tips: "Curve your fingers and thumb to form a gentle C. Relax your hand for a natural look." },
  { letter: "D", description: "Point index finger up, other fingers and thumb touch", tips: "Only the index finger points upward. Tuck other fingers and thumb together." },
  { letter: "E", description: "Point index and thumb sideways", tips: "Index and thumb extend to the side while other fingers curl. Like holding a small object." },
  { letter: "F", description: "Extend index and middle fingers sideways", tips: "Index and middle fingers touch and point out. Thumb holds down the ring and pinky." },
  { letter: "G", description: "Index finger points to the side, thumb under", tips: "Fist with index finger extended sideways. Thumb supports from below." },
  { letter: "H", description: "Index and middle fingers extended, slightly apart", tips: "Two fingers point forward or up, with a small gap between them." },
  { letter: "I", description: "Pinky finger extended upward", tips: "Fist with only the pinky pointing up. Other fingers and thumb are curled." },
  { letter: "J", description: "Pinky traces a J shape in the air", tips: "Pinky extended, draw the letter J with a smooth motion." },
  { letter: "K", description: "Index and thumb form a K, other fingers up", tips: "Index points up, thumb touches middle finger. Ring and pinky can be up or down." },
  { letter: "L", description: "Index and thumb form an L-shape", tips: "Index finger up, thumb out to the side. Fingers form a right angle." },
  { letter: "M", description: "Thumb tucked under three folded fingers", tips: "Curve index, middle, and ring fingers over the tucked thumb so the hand shows a clear M profile." },
  { letter: "N", description: "Index and middle curve over the tucked thumb", tips: "Keep the pinky and ring finger folded. The two fingertips rest on the thumb to form an N." },
  { letter: "O", description: "Thumb and fingertips touch in a round O", tips: "All fingertips meet the thumb in a relaxed circle—like holding a small ball." },
  { letter: "P", description: "Index and middle down, thumb forms the stem of P", tips: "Hand faces downward; index and middle point toward the floor while the thumb supports the shape." },
  { letter: "Q", description: "Index and thumb point downward in a Q shape", tips: "Keep the rest of the fingers folded. The orientation should read clearly from your conversation partner." },
  { letter: "R", description: "Index and middle crossed, other fingers folded", tips: "Cross the two fingers gently; thumb can support from below. Avoid squeezing too tight." },
  { letter: "S", description: "Fist with thumb folded over fingers", tips: "A compact fist with the thumb resting across the bent fingers—like a soft S block." },
  { letter: "T", description: "Thumb between index and middle finger", tips: "Insert the thumb between the two fingers without forcing; keep the shape visible and steady." },
  { letter: "U", description: "Index and middle fingers together, pointing up", tips: "Fingers stay touching and parallel. Ring and pinky fold into the palm with the thumb." },
  { letter: "V", description: "Index and middle spread in a V", tips: "Separate the two fingers slightly so the V is obvious. Palm can face forward or toward the side." },
  { letter: "W", description: "Ring, middle, and index extended upward", tips: "Three fingers stand together like a W. Thumb and pinky tuck toward the palm." },
  { letter: "X", description: "Index finger bent into a hook", tips: "Only the index is extended and hooked; other fingers stay closed. Keep the bend crisp for clarity." },
  { letter: "Y", description: "Thumb and pinky extended, others folded", tips: "Classic Y-shape—think “hang loose.” Hold long enough for others to read the handshape." },
  { letter: "Z", description: "Index finger traces a Z in the air", tips: "Draw the three strokes of Z in front of you: horizontal, diagonal, horizontal. Keep movements smooth and visible." },
];

const GREETINGS = [
  { id: "hello", title: "Hello", description: "Wave your hand from side to side with an open palm", tips: "Keep the motion relaxed and friendly. A small wave is enough—focus on clarity rather than speed." },
  { id: "goodbye", title: "Goodbye", description: "Wave hand with palm facing outward, moving away", tips: "Start near your shoulder and move slightly outward as you wave. Maintain an open palm for readability." },
  { id: "thank-you", title: "Thank You", description: "Touch fingers to chin, then move hand forward and down", tips: "Fingertips lightly touch the chin, then move outward. Keep the movement smooth and intentional." },
  { id: "please", title: "Please", description: "Flat hand on chest, move in circular motion", tips: "Use a gentle circular motion on the chest. Keep your shoulder relaxed and movement consistent." },
  { id: "sorry", title: "Sorry", description: "Fist on chest, move in circular motion", tips: "Form a soft fist and make a small circle on the chest. Keep the motion visible but not exaggerated." },
] as const;

const NUMBERS = [
  { number: 1, description: "Hold up index finger", tips: "Keep other fingers and thumb tucked. Point the index finger straight up for clarity." },
  { number: 2, description: "Hold up index and middle finger", tips: "Index and middle fingers together, pointing up. Thumb holds down the ring and pinky." },
  { number: 3, description: "Hold up thumb, index, and middle finger", tips: "Thumb, index, and middle finger extended. Ring and pinky curl into the palm." },
  { number: 4, description: "Hold up four fingers (no thumb)", tips: "Four fingers straight and together, thumb folded into the palm." },
  { number: 5, description: "Hold up all five fingers spread apart", tips: "All five fingers extended and slightly spread. Palm can face forward or toward the viewer." },
] as const;

const EMERGENCY = [
  { id: "help", title: "Help", description: "Place fist on flat palm and raise both together", tips: "Non-dominant hand stays flat like a platform. Dominant fist rests on it and lifts upward together." },
  { id: "fire", title: "Fire", description: "Wiggle spread fingers upward with both hands", tips: "Hands rise with fingers spread, like flickering flames. Keep the motion visible from a distance." },
  { id: "hospital", title: "Hospital", description: "Cross arms on chest with closed fists", tips: "Arms cross over the chest—often taught as a recognizable emergency sign for medical help." },
  { id: "police", title: "Police", description: "Flat hand taps chest, then points outward", tips: "Contact a teacher or local deaf community for the regional variant used in your area." },
  { id: "call", title: "Call / Phone", description: "Y-hand shape to ear like holding a phone", tips: "Thumb and pinky extended to ear. Hold briefly so others can read the sign clearly." },
] as const;

const PHRASES = [
  { id: "yes", title: "Yes", description: "Nod fist up and down like nodding head", tips: "Use a gentle up-down motion. Keep the movement small and clear—like confirming with a nod." },
  { id: "no", title: "No", description: "Snap index and middle finger against thumb", tips: "Bring index and middle finger down to meet the thumb. Clarity matters more than sound." },
  { id: "help", title: "Help", description: "Place fist on flat palm and raise both together", tips: "Non-dominant hand stays flat like a platform. Dominant fist rests on it and lifts upward together." },
  { id: "friend", title: "Friend", description: "Hook index fingers together, then reverse", tips: "Hook index fingers, then swap the hook direction once. Keep elbows relaxed." },
  { id: "how-are-you", title: "How are you?", description: "Raise brows; hands forward with palms up in a short arc", tips: "Facial expression carries the question. Hands move slightly—keep eye contact when appropriate." },
] as const;

const CATEGORY_META: { id: LessonId; label: string; short: string }[] = [
  { id: "alphabet", label: "Alphabet", short: "abc" },
  { id: "numbers", label: "Number", short: "123" },
  { id: "greetings", label: "Greetings", short: "👋" },
  { id: "emergency", label: "Emergency Response", short: "!" },
  { id: "phrases", label: "Phrases", short: "💬" },
];

export default function LearnPage() {
  const [category, setCategory] = useState<LessonId>("alphabet");
  const [expandedTips, setExpandedTips] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState<string | null>(null);
  const { completed, complete, unlocked } = useLessonProgress();

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const toggleTips = (key: string) => {
    setExpandedTips((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const trySelect = (id: LessonId) => {
    if (!unlocked(id)) {
      const order = ["alphabet", "numbers", "greetings", "emergency", "phrases"] as const;
      const idx = order.indexOf(id);
      const prev = idx > 0 ? order[idx - 1] : null;
      setNotice(
        prev
          ? `Complete the ${prev === "emergency" ? "Emergency Response" : prev} lesson first to unlock this section.`
          : "This lesson is locked."
      );
      return;
    }
    setCategory(id);
  };

  const lessonCardClass =
    "rounded-3xl border border-primary-100 bg-white/90 p-6 shadow-[0_8px_30px_rgba(0,100,180,0.06)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,100,180,0.1)]";

  const markCompleteBlock = (id: LessonId) => (
    <div className="mt-10 flex flex-col items-center gap-3">
      {completed.has(id) ? (
        <p className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200">
          ✓ This lesson is marked complete. You can open the next tab.
        </p>
      ) : (
        <button
          type="button"
          onClick={() => complete(id)}
          className="rounded-full bg-gradient-to-r from-amber-300 to-sky-300 px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          Mark lesson complete
        </button>
      )}
    </div>
  );

  return (
    <div className="relative pb-40 md:pb-28">
      <div className="mx-auto w-full max-w-content px-6 py-12 sm:px-8 lg:px-12">
        {notice && (
          <div
            className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900"
            role="status"
          >
            {notice}
          </div>
        )}

        {/* Hero */}
        <section className="relative mb-12 overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-amber-50/90 via-white to-sky-50/90 p-8 text-center shadow-lg shadow-sky-100/50 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-sky-200/40 blur-3xl" aria-hidden />
          <h1 className="relative mb-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Learn Filipino Sign Language
          </h1>
          <p className="relative mb-8 max-w-2xl mx-auto text-lg text-slate-600">
            Master FSL through our comprehensive visual guides. Each sign includes detailed descriptions and helpful tips.
          </p>
          <ScrollReveal animation="fade-up" duration={600}>
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border border-primary-200/40 aspect-video bg-slate-100 shadow-inner">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
                alt="People learning together - visual guides for sign language"
                fill
                className="object-cover"
                sizes="(max-width: 576px) 100vw, 576px"
              />
            </div>
          </ScrollReveal>
        </section>

        {/* Featured Step-by-Step */}
        <section className="mt-16">
          <ScrollReveal animation="fade-up" duration={600} className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Featured Step-by-Step Demonstrations</h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2">
            <ScrollReveal animation="slide-left" delay={0} duration={500}>
              <div className={lessonCardClass}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-amber-50/90 ring-1 ring-amber-200/60" aria-hidden>
                    <LottiePlayer src={LOTTIE_ANIMALS.camaleon} loop className="h-full w-full" />
                  </span>
                  <h3 className="text-xl font-bold text-slate-800">Hello</h3>
                </div>
                <p className="mb-4 text-slate-600">Learn the complete greeting sign with 3 easy steps.</p>
                <button type="button" className="text-amber-700 font-semibold hover:underline focus:outline-none focus-visible:ring-2 rounded">
                  Show Steps
                </button>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="slide-right" delay={0} duration={500}>
              <div className={lessonCardClass}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-sky-50/90 ring-1 ring-sky-200/60" aria-hidden>
                    <LottiePlayer src={LOTTIE_ANIMALS.turtle} loop className="h-full w-full" />
                  </span>
                  <h3 className="text-xl font-bold text-slate-800">Thank You</h3>
                </div>
                <p className="mb-4 text-slate-600">Master expressing gratitude with detailed instructions.</p>
                <button type="button" className="text-amber-700 font-semibold hover:underline focus:outline-none focus-visible:ring-2 rounded">
                  Show Steps
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Lesson categories */}
        <section className="mt-12">
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-slate-500">
            Lessons
          </p>
          <ScrollReveal animation="fade-up" duration={500} className="flex flex-wrap justify-center gap-2">
            {CATEGORY_META.map(({ id, label, short }) => {
              const isActive = category === id;
              const isLocked = !unlocked(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => trySelect(id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-amber-300 via-amber-200 to-sky-300 text-slate-900 shadow-md ring-2 ring-sky-300/60"
                      : isLocked
                        ? "border border-dashed border-slate-300 bg-white/60 text-slate-400"
                        : "border border-primary-100 bg-white text-slate-700 shadow-sm hover:bg-sky-50/80"
                  }`}
                  aria-pressed={isActive}
                  aria-disabled={isLocked}
                >
                  {isLocked ? <Lock className="h-4 w-4" aria-hidden /> : short === "abc" ? <span className="text-xs font-bold">abc</span> : short === "123" ? <Hash className="h-4 w-4" /> : short === "!" ? <Siren className="h-4 w-4" /> : short === "💬" ? <MessageCircle className="h-4 w-4" /> : <Hand className="h-4 w-4" />}
                  {label}
                </button>
              );
            })}
          </ScrollReveal>
        </section>

        {/* Mascot animation — updates with the active lesson tab */}
        <div className="mt-6 flex flex-col items-center gap-2" aria-hidden>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Your study buddy</p>
          <div className="h-20 w-44 sm:h-24 sm:w-52" key={category}>
            <LottiePlayer src={LOTTIE_ANIMALS.monito} loop className="h-full w-full" />
          </div>
        </div>

        {/* Alphabet */}
        {category === "alphabet" && (
          <section className="mt-8" aria-label="Alphabet">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ALPHABET.map(({ letter, description, tips }, i) => (
                <ScrollReveal key={letter} animation="scale" delay={(i % 6) * 50} duration={400}>
                  <div className={lessonCardClass}>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-4xl font-bold text-slate-800">{letter}</span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-sky-200 text-primary-700" aria-hidden>
                        <Hand className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="mt-3 text-slate-600">{description}</p>
                    {expandedTips[letter] && <p className="mt-2 rounded-xl bg-sky-50 p-3 text-sm text-sky-900">{tips}</p>}
                    <button type="button" onClick={() => toggleTips(letter)} className="mt-3 flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900">
                      {expandedTips[letter] ? "Hide Tips ▲" : "Show Tips ▼"}
                    </button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            {markCompleteBlock("alphabet")}
          </section>
        )}

        {/* Numbers */}
        {category === "numbers" && (
          <section className="mt-8" aria-label="Numbers">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {NUMBERS.map(({ number, description, tips }, i) => {
                const key = `numbers:${number}`;
                return (
                  <ScrollReveal key={number} animation="scale" delay={(i % 6) * 60} duration={420}>
                    <div className={lessonCardClass}>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-4xl font-bold text-slate-800">{number}</span>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-sky-200 text-primary-700" aria-hidden>
                          <Hand className="h-5 w-5" />
                        </span>
                      </div>
                      <p className="mt-3 text-slate-600">{description}</p>
                      {expandedTips[key] && <p className="mt-3 rounded-xl bg-sky-50 p-3 text-sm text-sky-900">{tips}</p>}
                      <button type="button" onClick={() => toggleTips(key)} className="mt-3 flex items-center gap-1 text-sm font-semibold text-sky-700">
                        {expandedTips[key] ? "Hide Tips ▲" : "Show Tips ▼"}
                      </button>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
            {markCompleteBlock("numbers")}
          </section>
        )}

        {/* Greetings */}
        {category === "greetings" && (
          <section className="mt-8" aria-label="Greetings">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GREETINGS.map(({ id, title, description, tips }, i) => {
                const key = `greetings:${id}`;
                return (
                  <ScrollReveal key={id} animation="scale" delay={(i % 6) * 60} duration={420}>
                    <div className={lessonCardClass}>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-sky-200 text-primary-700" aria-hidden>
                          <Hand className="h-5 w-5" />
                        </span>
                      </div>
                      <p className="mt-3 text-slate-600">{description}</p>
                      {expandedTips[key] && <p className="mt-3 rounded-xl bg-sky-50 p-3 text-sm text-sky-900">{tips}</p>}
                      <button type="button" onClick={() => toggleTips(key)} className="mt-3 text-sm font-semibold text-sky-700">
                        {expandedTips[key] ? "Hide Tips ▲" : "Show Tips ▼"}
                      </button>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
            {markCompleteBlock("greetings")}
          </section>
        )}

        {/* Emergency Response */}
        {category === "emergency" && (
          <section className="mt-8" aria-label="Emergency Response">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {EMERGENCY.map(({ id, title, description, tips }, i) => {
                const key = `emergency:${id}`;
                return (
                  <ScrollReveal key={id} animation="scale" delay={(i % 6) * 60} duration={420}>
                    <div className={`${lessonCardClass} border-amber-100`}>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700" aria-hidden>
                          <Siren className="h-5 w-5" />
                        </span>
                      </div>
                      <p className="mt-3 text-slate-600">{description}</p>
                      {expandedTips[key] && <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-950">{tips}</p>}
                      <button type="button" onClick={() => toggleTips(key)} className="mt-3 text-sm font-semibold text-amber-800">
                        {expandedTips[key] ? "Hide Tips ▲" : "Show Tips ▼"}
                      </button>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
            {markCompleteBlock("emergency")}
          </section>
        )}

        {/* Phrases */}
        {category === "phrases" && (
          <section className="mt-8" aria-label="Phrases">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PHRASES.map(({ id, title, description, tips }, i) => {
                const key = `phrases:${id}`;
                return (
                  <ScrollReveal key={id} animation="scale" delay={(i % 6) * 60} duration={420}>
                    <div className={lessonCardClass}>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-sky-200 text-primary-700" aria-hidden>
                          <Hand className="h-5 w-5" />
                        </span>
                      </div>
                      <p className="mt-3 text-slate-600">{description}</p>
                      {expandedTips[key] && <p className="mt-3 rounded-xl bg-sky-50 p-3 text-sm text-sky-900">{tips}</p>}
                      <button type="button" onClick={() => toggleTips(key)} className="mt-3 text-sm font-semibold text-sky-700">
                        {expandedTips[key] ? "Hide Tips ▲" : "Show Tips ▼"}
                      </button>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
            {markCompleteBlock("phrases")}
          </section>
        )}

        {/* Learning Tips — chalkboard-inspired */}
        <section className="mt-16">
          <ScrollReveal animation="fade-up" duration={600}>
            <div className="rounded-[1.75rem] border border-emerald-900/20 bg-gradient-to-b from-emerald-900 to-emerald-950 p-6 text-emerald-50 shadow-xl sm:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10" aria-hidden>ℹ</span>
                Learning Tips
              </h2>
              <ul className="space-y-3 text-emerald-100/95">
                <li className="flex gap-3"><span className="text-amber-300" aria-hidden>✓</span> Practice in front of a mirror to ensure you&apos;re forming signs correctly</li>
                <li className="flex gap-3"><span className="text-amber-300" aria-hidden>✓</span> Focus on hand shape, position, and movement — all three are crucial</li>
                <li className="flex gap-3"><span className="text-amber-300" aria-hidden>✓</span> Facial expressions matter in sign language — they add meaning and emotion</li>
                <li className="flex gap-3"><span className="text-amber-300" aria-hidden>✓</span> Practice regularly — even 10 minutes a day makes a difference</li>
                <li className="flex gap-3"><span className="text-amber-300" aria-hidden>✓</span> Connect with the deaf community to practice and learn proper usage</li>
              </ul>
            </div>
          </ScrollReveal>
        </section>
      </div>

      <InstructionPanel />
    </div>
  );
}
