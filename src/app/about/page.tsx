import {
  BookOpen,
  Users,
  Heart,
  Globe,
  Puzzle,
  Star,
  Monitor,
  Eye,
  Smile,
  Building2,
  MapPin,
  Hand,
  ShieldCheck,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-content px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
      {/* Hero */}
      <section className="text-center mb-8 sm:mb-12">
        <h1 className="mb-3 text-2xl font-bold text-slate-800 dark:text-slate-50 sm:text-3xl lg:text-4xl">
          About Filipino Sign Language
        </h1>
        <p className="mb-6 max-w-2xl mx-auto text-base text-slate-600 dark:text-slate-300 sm:mb-8 sm:text-lg">
          Understanding FSL and its importance in the Filipino deaf community.
        </p>
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="mx-auto flex max-w-2xl min-h-[160px] items-center justify-center overflow-hidden rounded-xl border border-slate-200/70 bg-gradient-to-b from-filipino-cream/90 to-white p-2 shadow-sm dark:border-slate-600 dark:from-slate-800/80 dark:to-slate-900/90 sm:min-h-[240px] sm:p-2.5">
            <img
              src="/gif/thank-you.gif"
              alt="Thank you — representing gratitude and inclusive communication"
              className="h-auto w-full max-h-[280px] object-contain sm:max-h-[320px]"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* What is FSL? */}
      <section className="mt-10 sm:mt-16">
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm dark:border-slate-600 dark:bg-slate-800/95 sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-800 dark:text-slate-100 sm:text-2xl">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300" aria-hidden>
                <BookOpen className="h-5 w-5" />
              </span>
              What is Filipino Sign Language?
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                Filipino Sign Language (FSL) is the national sign language of the deaf community in the Philippines. It is a complete, natural language with its own grammar, vocabulary, and linguistic structure—distinct from spoken Filipino or English.
              </p>
              <p>
                FSL has roots in American Sign Language (ASL) but has evolved into a unique language with indigenous signs and cultural expressions that reflect Filipino identity and deaf culture.
              </p>
              <p>
                The Philippine government officially recognized FSL in 2018 through Republic Act No. 11106, the Filipino Sign Language Act, affirming its use in education, government, and public services.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Why Learn FSL? */}
      <section className="mt-10 sm:mt-16">
        <ScrollReveal animation="fade-up" duration={600} className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Why Learn FSL?
          </h2>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Users, title: "Connect with Community", desc: "Join and communicate with over 120,000 deaf Filipinos and their families" },
            { icon: Heart, title: "Show Inclusivity", desc: "Demonstrate respect and create an inclusive environment for all" },
            { icon: Globe, title: "Cultural Understanding", desc: "Learn about deaf culture and gain a broader perspective on communication" },
            { icon: Puzzle, title: "Accessibility Matters", desc: "Help break down communication barriers and promote equal access" },
            { icon: Star, title: "Personal Growth", desc: "Develop new skills and cognitive benefits from learning a visual language" },
            { icon: Monitor, title: "Professional Value", desc: "Enhance your career opportunities in education, healthcare, and social services" },
          ].map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} animation="scale" delay={i * 50} duration={400}>
              <div className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-600 dark:bg-slate-800/95 dark:hover:shadow-lg dark:hover:shadow-slate-950/40">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300" aria-hidden>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 font-semibold text-slate-800 dark:text-slate-100">
                  {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Key Principles of FSL */}
      <section className="mt-10 sm:mt-16">
        <ScrollReveal animation="fade-up" duration={600} className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Key Principles of FSL
          </h2>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { icon: Eye, title: "Visual-Spatial Language", desc: "FSL uses hand shapes, movements, facial expressions, and body language to convey meaning. It's not a direct translation of spoken language but has its own grammar and syntax." },
            { icon: Smile, title: "Facial Expressions", desc: "Facial expressions are grammatical markers in FSL, not just emotional expressions. They can change the meaning of signs and indicate questions, negations, or emphasis." },
            { icon: Building2, title: "Cultural Context", desc: "FSL is deeply connected to Filipino deaf culture. Learning the language means understanding and respecting deaf culture, norms, and community values." },
            { icon: MapPin, title: "Regional Variations", desc: "Like spoken languages, FSL has regional variations and dialects across different areas of the Philippines, enriching its diversity and cultural significance." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} animation="fade-up" delay={i * 80} duration={500}>
              <div className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-600 dark:bg-slate-800/95 dark:hover:shadow-lg dark:hover:shadow-slate-950/40">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300" aria-hidden>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 font-semibold text-slate-800 dark:text-slate-100">
                  {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Understanding Deaf Culture */}
      <section className="mt-10 sm:mt-16">
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="rounded-2xl border border-primary-200/60 bg-white p-6 shadow-sm dark:border-slate-600 dark:bg-slate-800/95 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100 sm:text-2xl">
              Understanding Deaf Culture
            </h2>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              Deaf culture is a vibrant community with its own values, traditions, and ways of interacting. When learning FSL, it&apos;s important to understand and respect these cultural aspects:
            </p>
            <ul className="space-y-4 text-slate-600 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-primary-500 dark:text-primary-400">
                  •
                </span>
                <span>
                  <strong className="text-slate-800 dark:text-slate-100">
                    Visual Communication:
                  </strong>{" "}
                  Deaf culture values direct eye contact and visual attention as signs of respect and engagement in conversation.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-primary-500 dark:text-primary-400">
                  •
                </span>
                <span>
                  <strong className="text-slate-800 dark:text-slate-100">
                    Name Signs:
                  </strong>{" "}
                  Members of the deaf community often have unique name signs given by other deaf individuals, which is considered an honor.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-primary-500 dark:text-primary-400">
                  •
                </span>
                <span>
                  <strong className="text-slate-800 dark:text-slate-100">Deaf Gain:</strong>{" "}
                  The perspective that deafness is not a deficit but a different way of experiencing the world, bringing unique perspectives and abilities.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-primary-500 dark:text-primary-400">
                  •
                </span>
                <span>
                  <strong className="text-slate-800 dark:text-slate-100">
                    Community Identity:
                  </strong>{" "}
                  Many deaf individuals identify as part of a linguistic and cultural minority rather than having a medical condition.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-primary-500 dark:text-primary-400">
                  •
                </span>
                <span>
                  <strong className="text-slate-800 dark:text-slate-100">
                    Tactile Communication:
                  </strong>{" "}
                  Touch is often used to get attention or express emotion, which may differ from hearing culture norms.
                </span>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* Continue Your Learning Journey */}
      <section className="mt-10 sm:mt-16">
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="rounded-3xl bg-gradient-to-r from-amber-200 via-amber-100 to-primary-200 p-8 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 sm:p-12">
            <h2 className="mb-4 text-center text-2xl font-bold text-slate-800 dark:text-slate-100 sm:text-3xl">
              Continue Your Learning Journey
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-slate-700 dark:text-slate-300">
              This platform is just the beginning. Connect with local deaf communities, attend FSL classes, and practice regularly to become truly proficient.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Hand, title: "Practice Daily", desc: "Consistency is key" },
                { icon: Users, title: "Join Communities", desc: "Learn from native signers" },
                { icon: ShieldCheck, title: "Be Respectful", desc: "Honor deaf culture" },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="min-w-[160px] rounded-2xl bg-white/80 px-6 py-5 text-center shadow-sm backdrop-blur dark:border dark:border-slate-600 dark:bg-slate-800/90"
                >
                  <Icon
                    className="mx-auto mb-2 h-8 w-8 text-primary-600 dark:text-primary-400"
                    aria-hidden
                  />
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
