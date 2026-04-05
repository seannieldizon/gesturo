"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CircleCheck, Lock } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { InstructionPanel } from "@/components/InstructionPanel";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { LESSON_LABEL, LESSON_ORDER, type LessonId } from "@/lib/lesson-progress";

const STUDY_HARD_GIF = "/gif/study-hard.gif";

type LessonItem = { id: string; title: string; description: string; tips: string };

type LessonSectionHeading = { kind: "heading"; id: string; heading: string };

type LessonContentBlock = LessonItem | LessonSectionHeading;

const defaultTips = (title: string) =>
  `Practice "${title}" slowly first, then repeat with clear handshape, steady movement, and facial expression that matches the meaning.`;

function itemsFrom(prefix: string, rows: readonly { title: string; description: string; tips?: string }[]): LessonItem[] {
  return rows.map((row, i) => ({
    id: `${prefix}-${i + 1}`,
    title: row.title,
    description: row.description,
    tips: row.tips ?? defaultTips(row.title),
  }));
}

function sectionHeading(id: string, heading: string): LessonSectionHeading {
  return { kind: "heading", id, heading };
}

function isSectionHeading(block: LessonContentBlock): block is LessonSectionHeading {
  return "kind" in block && block.kind === "heading";
}

const TIME_DATE_CONTENT: LessonContentBlock[] = [
  sectionHeading("time-date-sec-days", "Days"),
  ...itemsFrom("time-date-day", [
    { title: "Sunday", description: "Sign the day clearly at a steady pace; keep brows relaxed unless asking a question." },
    { title: "Monday", description: "Form the sign your video uses for Monday; hold the final shape until it reads." },
    { title: "Tuesday", description: "Separate Tuesday from similar day signs with crisp handshape contrast." },
    { title: "Wednesday", description: "Use full movement—avoid cutting the sign short mid-stroke." },
    { title: "Thursday", description: "Keep palm angle consistent with your reference so it does not look like another day." },
    { title: "Friday", description: "Smile lightly if naming a fun plan; neutral face for plain scheduling." },
    { title: "Saturday", description: "End cleanly before moving to the next word in a sentence." },
  ]),
  sectionHeading("time-date-sec-months", "Months"),
  ...itemsFrom("time-date-month", [
    { title: "January", description: "Spell or sign January distinctly; do not blend into February’s shape." },
    { title: "February", description: "Keep two syllables’ worth of movement clear without rushing." },
    { title: "March", description: "Short sign—still pause at the end so viewers catch it." },
    { title: "April", description: "Match the handshape your materials show; avoid ASL-only habits if FSL differs." },
    { title: "May", description: "Single crisp production; avoid bouncing the hand after the sign." },
    { title: "June", description: "Contrast June from July with obvious path or finger placement." },
    { title: "July", description: "Full extension on any pointing arc so it reads at arm’s length." },
    { title: "August", description: "If fingerspelling, letter each character; if lexical sign, hold the finish." },
    { title: "September", description: "Longer word—steady rhythm, no garbling mid-sign." },
    { title: "October", description: "Keep “Oct” fingerspelling even if tempted to abbreviate unclearly." },
    { title: "November", description: "Separate N-O or full sign per lesson; one beat per part." },
    { title: "December", description: "Close the year-month list with the same clarity as January." },
  ]),
  sectionHeading("time-date-sec-time", "Time"),
  ...itemsFrom("time-date-clock", [
    { title: "1:00", description: "Show the hour first, then :00 (o’clock) as your FSL pattern teaches; face neutral for statements." },
    { title: "2:00", description: "Keep hour and minute markers separate—two quick beats, not one smear." },
    { title: "3:00", description: "If using a pointing-to-wrist pattern, aim clearly at the watch zone." },
    { title: "4:00", description: "Watch palm orientation so 4:00 does not resemble a different hour." },
    { title: "5:00", description: "End with a slight hold on the hour handshape before adding AM/PM if used." },
    { title: "6:00", description: "Mid-day times often need clear context—add NOON if your variety pairs it." },
    { title: "7:00", description: "Evening planning: optional soft smile; still keep numbers precise." },
    { title: "8:00", description: "Stretch the sign into signing space; do not shrink toward the chest." },
    { title: "9:00", description: "Night context: match any NIGHT sign your lesson adds after the time." },
    { title: "10:00", description: "Two-digit hour—produce “ten” as one concept, then minutes if any." },
    { title: "11:00", description: "Near midnight/noon—disambiguate with MORNING/NIGHT when needed." },
    { title: "12:00", description: "Noon vs midnight: add MIDNIGHT or NOON per your materials so meaning locks." },
    { title: "1:30", description: "Hour first, then half-hour marker; separate clearly from 1:00 and 2:00." },
    { title: "2:15", description: "Quarter past: chunk quarter, then tie to hour—follow your video’s order." },
    { title: "3:45", description: "Quarter to / minus pattern: keep the “to the next hour” logic visible in movement." },
    { title: "6:45", description: "Rush-hour clarity—slow down slightly so listeners catch the offset." },
    { title: "9:15", description: "Morning appointment tone: polite face, full numbers." },
    { title: "10:30", description: "Half past ten: ensure TEN remains readable after the half marker." },
    { title: "11:45", description: "Late time—still articulate; tired face optional, sloppy hands not." },
    { title: "12:30", description: "Lunchtime slot: optional MEAL sign after if your phrase needs it." },
  ]),
  sectionHeading("time-date-sec-relative", "Relative Time"),
  ...itemsFrom("time-date-rel", [
    { title: "Today", description: "Anchor near the body or neutral space per FSL; present-tense face." },
    { title: "Tomorrow", description: "Forward motion or future tilt; brows up lightly for planning tone." },
    { title: "Yesterday", description: "Backward or past motion; subdued face can match reminiscing." },
    { title: "Bukas", description: "Treat as “tomorrow” in Filipino—same clarity as English gloss; match your regional sign." },
    { title: "Ngayon", description: "“Now / today” nuance—often a sharp, close-to-body production; hold briefly." },
    { title: "Kahapon", description: "“Yesterday” in Filipino—parallel path to English yesterday sign if your lesson pairs them." },
  ]),
];

const LESSON_CONTENT: Record<LessonId, LessonContentBlock[]> = {
  emergency: itemsFrom("emergency", [
    { title: "Help", description: "Use an open hand, palm up, and move it forward a short distance—like reaching for aid. Keep brows up and eyes wide so your face reads as a request." },
    { title: "Emergency", description: "Show the sign with both hands at chest height, tense but controlled, then pause. Urgency comes from the face—no need to blur the hands for speed." },
    { title: "Call police", description: "Signal “phone” first, then the identity cue (badge/police) second. Keep each step distinct so the sequence stays readable at a distance." },
    { title: "Call ambulance", description: "Start with the phone or “call” motion, then add the medical/help context. Separate ideas cleanly—one beat per concept." },
    { title: "Fire", description: "Wiggle spread fingers upward with a slight rise, like small flames. Keep the expression serious; the sign and face should match danger, not play." },
    { title: "Danger", description: "Use a firm warning motion and narrowed eyes or tight mouth—facial grammar carries “stop / watch out” as much as the hands." },
    { title: "Hospital", description: "Form the sign crisply on the body location your lesson video shows (often an H-hand or cross placement). Hold the final shape until the viewer sees it." },
    { title: "Flood", description: "Show water rising with a flat hand drifting upward in wavy paths. Movement direction (up and spreading) sells the meaning—keep it smooth." },
    { title: "Earthquake", description: "Use short shaking motions with both hands or a vibrating quality through the arms. Small, repeated shakes read better than one big jerk." },
    { title: "Landslide", description: "Trace a downward slide along a slope with a flat hand—earth moving downhill. Angle the palm so the path reads as gravity pulling material." },
  ]),
  alphabet: itemsFrom("alphabet", [
    { title: "A", description: "Make a fist with thumb on the side." },
    { title: "B", description: "Flat hand with fingers together, thumb across palm." },
    { title: "C", description: "Curve your hand into a clear C shape." },
    { title: "D", description: "Point index finger up; thumb touches middle finger." },
    { title: "E", description: "Curl fingers down; thumb rests in front." },
    { title: "F", description: "Touch thumb and index; extend other fingers." },
    { title: "G", description: "Point index and thumb sideways, close together." },
    { title: "H", description: "Extend index and middle sideways, together." },
    { title: "I", description: "Raise pinky; keep other fingers closed." },
    { title: "J", description: "Draw a J shape in the air with pinky." },
    { title: "K", description: "Point index and middle up; thumb between them." },
    { title: "L", description: "Form an L using thumb and index." },
    { title: "M", description: "Place thumb under first three fingers." },
    { title: "N", description: "Place thumb under first two fingers." },
    { title: "O", description: "Touch all fingertips to thumb, making O." },
    { title: "P", description: "Like K, but point hand slightly downward." },
    { title: "Q", description: "Like G, but point hand downward." },
    { title: "R", description: "Cross index and middle fingers upward." },
    { title: "S", description: "Make a fist with thumb over fingers." },
    { title: "T", description: "Place thumb between index and middle finger." },
    { title: "U", description: "Point index and middle up, together." },
    { title: "V", description: "Point index and middle up, spread apart." },
    { title: "W", description: "Point index, middle, and ring up." },
    { title: "X", description: "Bend index like a hook; other fingers closed." },
    { title: "Y", description: "Extend thumb and pinky; fold other fingers." },
    { title: "Z", description: "Draw a Z shape in the air with index." },
  ]),
  numbers: itemsFrom("numbers", [
    { title: "Number 1-10 (easy)", description: "Keep the palm orientation consistent with what your reference uses (palm in/out). One crisp number at a time—no bouncing between digits." },
    { title: "Number 11-20 (easy-moderate)", description: "Separate tens and ones if your FSL variety combines movements—don’t fuse two numbers into one quick flick." },
    { title: "Number 21-50 (moderate)", description: "Anchor the tens handshape, then add the ones clearly. Pause between parts so “23” does not look like “32.”" },
    { title: "Number 50-100 (hard)", description: "Slow down for decades and round numbers; repeat if needed. If you tire, stop and rest—accuracy matters more than pace." },
  ]),
  greetings: itemsFrom("greetings", [
    { title: "Hi and Hello", description: "Smile and sign at a comfortable greeting distance—hands visible, not too close to the face. Match the warmth with open brows." },
    { title: "Good morning/noon/afternoon/evening/night", description: "Show the time-of-day sign first, then “good” if your phrase splits that way in FSL. Face and posture should feel polite, not rushed." },
    { title: "Goodbye", description: "Use a clear closing motion (often open palm or wave variant per your lesson). Hold eye contact briefly—it signals respect in conversation closings." },
    { title: "What's your name", description: "Raise brows (wh-question face), sign NAME, then YOU or the polite sequence your video teaches. Keep question markers on the face, not the hands." },
    { title: "Thank you", description: "Bring the sign from the chin or lips smoothly outward—like offering gratitude. A small nod reinforces sincerity." },
  ]),
  "time-date": TIME_DATE_CONTENT,
  family: itemsFrom("family", [
    { title: "Parents (Tatay, Nanay)", description: "Respect markers matter: slightly polished movements, neutral-positive face. Sign MOTHER/FATHER shapes fully before adding names." },
    { title: "Siblings (Kapatid, Ate, Kuya)", description: "Show birth-order or honorific signs distinctly—ATE/KUYA often have set locations; keep height and palm angles consistent." },
    { title: "Grandparents (Lolo, Lola)", description: "Often built from parent signs plus “old” or modality-specific variants—execute both parts so relationship is obvious." },
    { title: "Uncle/Aunt (Tita, Tito)", description: "Clarify side of family if your lesson includes it; handshape contrasts between Tito/Tita should be exaggerated for beginners." },
    { title: "Friend", description: "Use a friendly face (soft smile) with the hook or clasp motion common in FSL—two quick repeats max unless emphasis is needed." },
  ]),
  phrases: itemsFrom("phrases", [
    { title: "Thank you", description: "From chin or lips outward without snapping—smooth arcs read as polite. Optional small nod." },
    { title: "Have a nice day", description: "Chunk it: GOOD + DAY or the FSL reorder your video uses. Smile at the end—it sells the well-wish." },
    { title: "How are you", description: "Question eyebrows up; sign HOW + YOU or the fixed phrase. Wait at the end with receptive body lean—shows you want an answer." },
    { title: "Sorry", description: "Often near the chest with apologetic face (furrowed brows, forward lean). Keep the movement small and sincere, not theatrical." },
    { title: "You look good", description: "Compliment face: raised brows, slight smile; point LOOK/SEE toward the person, then GOOD/APPEAR sign. Never rush compliments." },
    { title: "Yes or no", description: "YES: fist nod; NO: head shake paired with hand if used. Keep each answer single and decisive for clarity." },
    { title: "Have you eaten", description: "Y/N question face, then EAT + FINISH pattern as taught. Pause so “already eaten” reads as a unit." },
    { title: "Excuse me", description: "Light tap or open hand “sorry/excuse” variant plus polite face. Use smaller amplitude in crowds, same clarity." },
    { title: "I understand", description: "Point to self, then flash the UNDERSTAND sign once with a firm nod—affirms receipt without overacting." },
    { title: "I don't understand", description: "Head shake + negation face; sign UNDERSTAND negated or NOT as your lesson shows. Keep eyes wide—invites the other person to rephrase." },
    { title: "You're welcome", description: "Often a small wave-off from the palm or the FSL phrase your video uses—calm face, not boastful." },
    { title: "What happened", description: "Wh-question brows; sign WHAT + HAPPEN with a forward lean—signals care and invites explanation." },
    { title: "I'm fine", description: "Point I, then FINE/OK with relaxed shoulders. If you add MORE/ALSO, separate the ideas with a beat." },
    { title: "Hi, I am ___", description: "Greeting, then NAME pattern: HI → I → NAME → spell or sign name. Spell names slowly and face the viewer." },
  ]),
  "health-body": itemsFrom("health-body", [
    { title: "Body Parts (head, stomach, back, leg, arm)", description: "Touch or point to the real body area, then show the part sign on/near that zone. Accuracy of location beats fancy movement." },
    { title: "Symptoms (sakit, lagnat, pagod, puyat)", description: "Pair the symptom sign with discomfort face—tired eyes for fatigue, pained face for hurt. Don’t smile while signing pain." },
    { title: "Medical terms (doctor, nurse, medicine, hospital, pharmacy)", description: "Keep clinical signs crisp; repeat key nouns if you’re listing needs in an emergency. Eye contact helps providers respond faster." },
  ]),
  "shopping-money": itemsFrom("shopping-money", [
    { title: "Money (piso, centavo, bill, coin)", description: "Show denomination handshapes distinctly; rub thumb on fingers for money-in-general if your lesson uses it—once or twice, not frantic." },
    { title: "Actions (buy, sell, pay, change)", description: "Direction of motion often signals who receives—toward self vs. toward other. Keep buyer/seller roles obvious." },
    { title: "Items (food, clothes, water, bread)", description: "Sign the category first if listing a shopping errand, then item. Iconic shapes (water glass, bread slice) should be readable at store distance." },
  ]),
  emotions: itemsFrom("emotions", [
    { title: "Happy", description: "Bright eyes and raised cheeks; sign the joy marker with buoyant small repeats matching your reference." },
    { title: "Sad", description: "Downturned mouth, slower tempo; keep signs smaller—low energy matches affect." },
    { title: "Angry", description: "Tense jaw, furrowed brows; handshapes can be sharper—control speed so it reads as anger, not random stress." },
    { title: "Tired", description: "Droopy lids, shoulders down; drag movements slightly longer to mirror fatigue." },
    { title: "Scared", description: "Wide eyes, quick inhales; hands close to body—protective framing sells fear." },
    { title: "Nervous", description: "Fidget smaller, tight mouth; you can repeat tiny shakes—avoid huge unrelated motion." },
    { title: "Excited", description: "Fast but clear rhythm; smile plus upward body posture—energy without slapping signs together." },
    { title: "Unwell", description: "Pale/green sick face cues + SICK sign at chest; keep it subdued vs. emergency-only “hurt.”" },
    { title: "Surprised", description: "Brows up, mouth O; pop the sign once—contrast makes surprise readable." },
    { title: "Bored", description: "Flat affect, slow blinks; lazy arcs on the sign mirror disinterest." },
    { title: "Sleepy", description: "Head tilt, eyes half-lid; place hand to cheek if your FSL variant marks sleep—gentle drift, not a sudden collapse." },
    { title: "Hot/cold", description: "Fan or wipe brow for hot; small shivers or tight shoulders for cold—temperature face matches the sensation." },
    { title: "Upset", description: "Irritated brows plus tight lips; moderate speed—between angry and sad." },
    { title: "Hungry", description: "Throat or stomach cue with expectant face—rubbing once clearly beats many tiny pats." },
    { title: "Hurt", description: "Localize pain: point + small twist at site; pain face (squint, exhale) should align with the location." },
    { title: "In love", description: "Soft smile, relaxed shoulders; heart or close-to-chest motion per lesson—keep it tender, not exaggerated." },
    { title: "Worried", description: "Brows knit, lip bite optional; small repeated signs at chest height show lingering concern." },
    { title: "Curious", description: "Head tilt, raised brows leaning forward—pair with WHAT/SEE exploration signs lightly." },
  ]),
  transportation: itemsFrom("transportation", [
    { title: "Jeepney", description: "Iconic vehicle shape + optional person-on-bench motion; show boarding direction if the route matters." },
    { title: "Bus", description: "Large rectangular space in front of torso; steady glide—emphasizes size vs. jeepney." },
    { title: "Tricycle", description: "Two rear wheels + bike front or trike pattern per your video—three beats max so it looks like one vehicle." },
    { title: "Van", description: "Boxy outline, higher roof line; smaller than bus, bigger than car in signing space." },
    { title: "Car", description: "Steering wheel grip and small chassis outline—keep hands within frame so the silhouette reads." },
    { title: "Motorcycle", description: "Handlebar twist + body lean cue; slight vibration repeat sells two wheels." },
    { title: "Airplane", description: "Flat hand flying neutral plane path; climb on takeoff if narrating trip segments." },
    { title: "Go/Stop", description: "GO points directional with intent; STOP is abrupt with command face—contrast speed between them." },
    { title: "Left/Right", description: "Index points or flat paths—mirror for your perspective vs. the traveler’s if your lesson notes say so." },
    { title: "Near/Far", description: "NEAR tight to body; FAR stretched with squint or gaze down the “road”—distance face helps." },
    { title: "North/West/East/South", description: "Map directions with upright indices; align with real compass if teaching outdoors—keep cardinal order consistent." },
  ]),
};

export default function LearnPage() {
  const [category, setCategory] = useState<LessonId>("emergency");
  const [notice, setNotice] = useState<string | null>(null);
  const [expandedTips, setExpandedTips] = useState<Record<string, boolean>>({});
  const [studyHardGifFailed, setStudyHardGifFailed] = useState(false);
  const { unlocked, completeLearn, learnCompleted, challengeCompleted } = useLessonProgress();

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  const lessonList = useMemo(() => LESSON_ORDER.map((id) => ({ id, label: LESSON_LABEL[id] })), []);
  const toggleTips = (key: string) => setExpandedTips((prev) => ({ ...prev, [key]: !prev[key] }));

  const trySelect = (id: LessonId) => {
    if (!unlocked(id)) {
      const idx = LESSON_ORDER.indexOf(id);
      const prev = idx > 0 ? LESSON_ORDER[idx - 1] : null;
      if (!prev) {
        setNotice("Lesson locked.");
        return;
      }
      const needLearn = !learnCompleted.has(prev);
      const needChallenge = !challengeCompleted.has(prev);
      if (needLearn && needChallenge) {
        setNotice(
          `Lesson locked. Mark “${LESSON_LABEL[prev]}” complete on Learn and finish its Practice challenge.`
        );
      } else if (needLearn) {
        setNotice(`Lesson locked. Use “Mark lesson complete” below while viewing “${LESSON_LABEL[prev]}”.`);
      } else {
        setNotice(`Lesson locked. Finish the “${LESSON_LABEL[prev]}” challenge in Practice.`);
      }
      return;
    }
    setCategory(id);
  };

  const currentLessonMarked = learnCompleted.has(category);

  return (
    <div className="relative pb-40 md:pb-28">
      <div className="mx-auto w-full max-w-content px-6 py-12 sm:px-8 lg:px-12">
        <section className="mb-8 rounded-3xl border border-[#dccfba] bg-white/90 p-6 shadow-soft">
          <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-8">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">Learn Filipino Sign Language</h1>
              <p className="mt-3 text-slate-600">
                Emergency is always open. Each later lesson unlocks only after you mark the previous lesson complete on this page{" "}
                <strong className="font-semibold">and</strong> finish that lesson’s challenge in Practice.
              </p>
            </div>
            {!studyHardGifFailed && (
              <div className="flex shrink-0 justify-center md:justify-end">
                <img
                  src={STUDY_HARD_GIF}
                  alt=""
                  className="h-auto w-full max-w-[200px] object-contain sm:max-w-[240px] md:max-w-[260px]"
                  onError={() => setStudyHardGifFailed(true)}
                />
              </div>
            )}
          </div>
        </section>

        <section className="mt-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Lessons (11)</p>
          <div className="flex flex-wrap gap-2">
            {lessonList.map(({ id, label }) => {
              const isActive = category === id;
              const isLocked = !unlocked(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => trySelect(id)}
                  className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                    isActive
                      ? "bg-gradient-to-r from-amber-300 to-sky-300 text-slate-900"
                      : isLocked
                        ? "border border-dashed border-slate-300 bg-white/70 text-slate-400"
                        : "border border-primary-100 bg-white text-slate-700"
                  }`}
                >
                  {isLocked && <Lock className="h-4 w-4" aria-hidden />}
                  {label}
                  {learnCompleted.has(id) && (
                    <CircleCheck
                      className="absolute right-1 top-1 h-4 w-4 text-emerald-600"
                      aria-label={`${label} completed`}
                    />
                  )}
                </button>
              );
            })}
          </div>
          {notice && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {notice}
            </div>
          )}
        </section>

        <ScrollReveal animation="fade-up" duration={450} className="mt-8">
          <section className="relative rounded-3xl border border-primary-100 bg-white/90 p-6 shadow-soft">
            {currentLessonMarked && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <CircleCheck className="h-3.5 w-3.5" aria-hidden />
                Completed
              </span>
            )}
            <h2 className="text-2xl font-bold text-slate-800">{LESSON_LABEL[category]}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LESSON_CONTENT[category].map((block, i) => {
                if (isSectionHeading(block)) {
                  return (
                    <div
                      key={block.id}
                      className={`col-span-full ${i > 0 ? "mt-4 border-t border-primary-100 pt-8" : ""}`}
                    >
                      <h3 className="text-lg font-bold text-slate-800">{block.heading}</h3>
                    </div>
                  );
                }
                const item: LessonItem = block;
                return (
                  <ScrollReveal key={item.id} animation="scale" delay={(i % 6) * 50} duration={380}>
                    <article className="rounded-2xl border border-primary-100 bg-white p-4 shadow-sm">
                      <h3 className="text-base font-bold text-slate-800">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                      {expandedTips[item.id] && (
                        <p className="mt-3 rounded-xl bg-sky-50 p-3 text-sm text-sky-900">{item.tips}</p>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleTips(item.id)}
                        className="mt-3 text-sm font-semibold text-sky-700"
                      >
                        {expandedTips[item.id] ? "Hide Tips ▲" : "Show Tips ▼"}
                      </button>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={currentLessonMarked}
                onClick={() => completeLearn(category)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                  currentLessonMarked
                    ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                    : "bg-gradient-to-r from-amber-300 to-sky-300 text-slate-900 hover:brightness-105"
                }`}
              >
                {currentLessonMarked ? "Lesson marked complete" : "Mark lesson complete"}
              </button>
              <Link href="/practice" className="text-sm font-semibold text-primary-700 underline underline-offset-2">
                Go to Practice Challenges
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </div>
      <InstructionPanel />
    </div>
  );
}
