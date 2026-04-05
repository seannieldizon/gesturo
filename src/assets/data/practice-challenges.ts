import { LESSON_LABEL, LESSON_ORDER, type LessonId } from "@/lib/lesson-progress";

export type PracticeChallengeId = LessonId | "comprehensive";

export type PracticeQuestion = {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  /** Used for Challenge 12 ordering (easy → medium → hard, repeated). */
  difficulty?: "easy" | "medium" | "hard";
};

type ChallengeSet = {
  title: string;
  description: string;
  questions: PracticeQuestion[];
};

/** Deterministic slot 0–3 so correct answer position varies by lesson + question number. */
function hashPlacement(lessonId: string, n: number): 0 | 1 | 2 | 3 {
  const s = `${lessonId}:${n}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return (h % 4) as 0 | 1 | 2 | 3;
}

/** First tuple entry is always the correct answer; others are distractors. */
function placeCorrectAt(
  options: [string, string, string, string],
  placement: 0 | 1 | 2 | 3
): { options: string[]; correctIndex: number } {
  const [correct, w1, w2, w3] = options;
  const slots: string[] = new Array(4);
  slots[placement] = correct;
  const rest = [w1, w2, w3];
  let ri = 0;
  for (let i = 0; i < 4; i++) {
    if (i === placement) continue;
    slots[i] = rest[ri++]!;
  }
  return { options: slots, correctIndex: placement };
}

function q(
  lessonId: LessonId,
  n: number,
  question: string,
  options: [string, string, string, string]
): PracticeQuestion {
  const placement = hashPlacement(lessonId, n);
  const { options: opts, correctIndex } = placeCorrectAt(options, placement);
  return {
    id: `${lessonId}-q${n}`,
    category: LESSON_LABEL[lessonId],
    question,
    options: opts,
    correctIndex,
  };
}

const EMERGENCY_QUESTIONS: PracticeQuestion[] = [
  q(
    "emergency",
    1,
    "You need to signal that you require assistance. What best supports a clear **Help** sign?",
    [
      "An open palm and forward motion paired with raised brows and wide eyes",
      "Hands hidden below the waist so you stay comfortable",
      "A neutral face so only the hands carry meaning",
      "Looking away so you do not appear demanding",
    ],
  ),
  q(
    "emergency",
    2,
    "When signing **Emergency**, why pause briefly after producing the sign?",
    [
      "So viewers can read the sign and your urgent facial expression together",
      "Because pausing means you are unsure of the next word",
      "So you can skip facial grammar entirely",
      "Because emergency signs should always be rushed without stops",
    ],
  ),
  q(
    "emergency",
    3,
    "For **Call police**, what sequencing keeps the meaning clearest?",
    [
      "Phone or “call” first, then the police or badge identity cue",
      "Police identity first, then any phone reference",
      "Only mouthing the word without hand sequence",
      "Both ideas blended into one quick flick",
    ],
  ),
  q(
    "emergency",
    4,
    "When signing **Call ambulance**, how should you separate “calling” from “medical help”?",
    [
      "One distinct beat for the call motion, then a clear beat for medical or help context",
      "Merge everything into a single vague wave",
      "Use only fingerspelling with no order",
      "Skip the call and jump straight to a random gesture",
    ],
  ),
  q(
    "emergency",
    5,
    "For **Fire**, what pairing best matches real danger?",
    [
      "Wiggling fingers rising like flames with a serious, alert face",
      "A playful smile and fast cartoon-like wiggle",
      "Minimal hand movement and a laughing expression",
      "Signing while turning your back to the viewer",
    ],
  ),
  q(
    "emergency",
    6,
    "For **Danger**, what makes the warning readable?",
    [
      "A firm warning motion with narrowed eyes or a tight mouth",
      "Soft giggling while signing quickly",
      "Signing only with your non-dominant hand behind your back",
      "Whispering without changing your face",
    ],
  ),
  q(
    "emergency",
    7,
    "After forming **Hospital**, what should you do before moving on?",
    [
      "Hold the final handshape until the viewer sees it clearly",
      "Drop your hands immediately without finishing the shape",
      "Repeat random letters instead of holding the sign",
      "Look at the floor so the sign stays private",
    ],
  ),
  q(
    "emergency",
    8,
    "For **Flood**, what movement direction best conveys rising water?",
    [
      "A flat hand drifting upward in gentle waves",
      "Only a small finger twitch downward",
      "Hands crossed and still at the chest",
      "Random circles with no upward path",
    ],
  ),
  q(
    "emergency",
    9,
    "For **Earthquake**, why are small repeated shakes often clearer than one huge jerk?",
    [
      "They read as tremors and stay controlled for the viewer",
      "Large single jerks are always more accurate for every learner",
      "Shaking should never repeat in sign",
      "Earthquake is signed only with the head, not the hands",
    ],
  ),
  q(
    "emergency",
    10,
    "For **Landslide**, what best shows earth moving downhill?",
    [
      "A flat hand tracing a downward slide along a slope",
      "Hands moving straight up rapidly",
      "Only tapping the shoulder twice",
      "Fingerspelling the English word with no movement path",
    ],
  ),
];

const ALPHABET_QUESTIONS: PracticeQuestion[] = [
  q(
    "alphabet",
    1,
    "When fingerspelling for someone facing you, where should most letters live in space?",
    [
      "In front of your shoulder, in the viewer’s line of sight",
      "Tucked beside your cheek where shapes hide",
      "Behind your back for comfort",
      "Low in your lap only",
    ],
  ),
  q(
    "alphabet",
    2,
    "Why hold each letter shape slightly longer when spelling a name?",
    [
      "So the reader can recognize each letter before you transition",
      "So you can skip harder letters",
      "So you can sign twice as fast overall",
      "So you avoid using facial expression",
    ],
  ),
  q(
    "alphabet",
    3,
    "Letters like **M** and **N** look similar to beginners. What helps?",
    [
      "Exaggerate thumb placement and finger count differences slightly",
      "Speed through both so they blur together",
      "Use only one handshape for both",
      "Spell them only with mouthing, not hands",
    ],
  ),
  q(
    "alphabet",
    4,
    "What should stay steady while fingerspelling a short word?",
    [
      "Your elbow and shoulder base so handshapes stay readable",
      "Your whole arm swinging wide for drama",
      "Your head turned away from the viewer",
      "Your hands crossing in front of your eyes",
    ],
  ),
  q(
    "alphabet",
    5,
    "If clarity and speed conflict while spelling, which should win for learners?",
    [
      "Clarity—slow enough that every letter reads",
      "Speed—always finish in under one second",
      "Neither—skip letters you find hard",
      "Only speed for vowels, never for consonants",
    ],
  ),
  q(
    "alphabet",
    6,
    "Palm orientation matters for some letters. What is a good habit?",
    [
      "Match the palm facing your reference video and keep it consistent",
      "Change palm facing randomly each time",
      "Always face palms fully away regardless of letter",
      "Hide palm angle behind the other hand",
    ],
  ),
  q(
    "alphabet",
    7,
    "After you fingerspell a mistake, what is a constructive approach?",
    [
      "Pause, repeat the letter or word clearly, then continue",
      "Pretend the mistake did not happen",
      "Speed up so the error is harder to see",
      "Stop signing entirely without signaling a correction",
    ],
  ),
  q(
    "alphabet",
    8,
    "When practicing **A–Z** in order, what keeps the drill useful?",
    [
      "Clean transitions and readable holds—not rushing the whole alphabet",
      "Signing as fast as possible without checking shapes",
      "Skipping every third letter to save time",
      "Using only lowercase mouthing instead of hands",
    ],
  ),
  q(
    "alphabet",
    9,
    "From a few steps away, what makes fingerspelling easier to read?",
    [
      "Slightly larger, crisp handshapes without sloppy blur",
      "Tiny movements tight to the chin only",
      "Signing while walking away",
      "Covering your mouth with one hand",
    ],
  ),
  q(
    "alphabet",
    10,
    "What is a good partner practice habit for alphabet work?",
    [
      "Take turns spelling and give specific feedback on unclear letters",
      "Only watch without ever signing back",
      "Guess silently without confirming letters",
      "Compete for who finishes first regardless of accuracy",
    ],
  ),
];

const NUMBERS_QUESTIONS: PracticeQuestion[] = [
  q(
    "numbers",
    1,
    "For numbers **1–10**, what should stay consistent across digits?",
    [
      "Palm orientation and number handshapes as shown in your reference",
      "A different palm rule for every single digit randomly",
      "Signing numbers only with the non-dominant hand always",
      "Using English words only, never handshapes",
    ],
  ),
  q(
    "numbers",
    2,
    "When producing **11–20**, what common mistake should you avoid?",
    [
      "Fusing tens and ones into one unreadable flick",
      "Pausing slightly between parts when your variety needs it",
      "Repeating the tens handshape if your teacher asks for clarity",
      "Checking that each part is visible before moving on",
    ],
  ),
  q(
    "numbers",
    3,
    "Why might **23** be confused with **32** if you rush?",
    [
      "Tens and ones can swap visually without clear separation",
      "They are always identical signs in every variety",
      "Only the face shows 23 versus 32, never the hands",
      "You should never sign two-digit numbers in FSL",
    ],
  ),
  q(
    "numbers",
    4,
    "For **21–50**, what pacing habit supports accuracy?",
    [
      "Anchor the tens idea, add ones distinctly, then pause briefly",
      "Always sign both parts on top of each other at once",
      "Skip tens when you think the listener knows them",
      "Whisper the answer instead of signing",
    ],
  ),
  q(
    "numbers",
    5,
    "For **50–100** or longer numbers, what is most important when you are tired?",
    [
      "Accuracy over speed—even if you need a breath between chunks",
      "Speed over accuracy so you finish quickly",
      "Guessing if you forget a digit",
      "Stopping mid-number without signaling you are continuing",
    ],
  ),
  q(
    "numbers",
    6,
    "What does “handshape accuracy” mean for number practice?",
    [
      "Each digit’s shape matches your lesson video, not a loose approximation",
      "Any bent finger counts as the same number",
      "Numbers are only about speed, not shape",
      "You should curl all fingers for every digit",
    ],
  ),
  q(
    "numbers",
    7,
    "When transitioning from one number to the next in a list, what helps?",
    [
      "A tiny reset or neutral beat so digits do not smear together",
      "Never pausing between list items",
      "Using the same handshape for every item",
      "Turning away during the list",
    ],
  ),
  q(
    "numbers",
    8,
    "Why is “readability at arm’s length” a good self-check?",
    [
      "Real conversations often happen a few steps away",
      "Numbers should only be signed inches from the chest",
      "Distance never affects how signs look",
      "You should only practice numbers in a mirror alone",
    ],
  ),
  q(
    "numbers",
    9,
    "What is a simple self-check after signing a two-part number?",
    [
      "Could a partner identify both parts without guessing?",
      "Did you avoid moving entirely",
      "Did you use only one finger for every number",
      "Did you skip facial grammar on purpose",
    ],
  ),
  q(
    "numbers",
    10,
    "For a practice routine with numbers, what makes the best warm-up?",
    [
      "A few slow, clear single digits before multi-part numbers",
      "Starting with the fastest double-digit you know",
      "Avoiding warm-up to save time",
      "Only practicing with eyes closed",
    ],
  ),
];

const GREETINGS_QUESTIONS: PracticeQuestion[] = [
  q(
    "greetings",
    1,
    "For **Hi** or **Hello**, what distance is usually comfortable in class or public?",
    [
      "Hands visible at a normal conversational distance—not pressed to your face",
      "Hands touching the viewer’s shoulders",
      "Signing with hands behind your back",
      "Only signing if you are touching foreheads",
    ],
  ),
  q(
    "greetings",
    2,
    "When greeting by time of day (morning, afternoon, evening), what tone fits polite FSL?",
    [
      "Warm but clear movements with a respectful face",
      "Rushed signs with a frown",
      "Time-of-day signs only with no facial warmth",
      "Skipping the time sign and only nodding",
    ],
  ),
  q(
    "greetings",
    3,
    "For **Goodbye**, why is brief eye contact often appropriate?",
    [
      "It signals respect and closure in many conversations",
      "You should always stare without breaking gaze",
      "Eye contact is never used with goodbyes",
      "You should look at the floor the entire time",
    ],
  ),
  q(
    "greetings",
    4,
    "For **What’s your name?**, where does the question usually show grammatically?",
    [
      "Raised brows and a clear question face while signing NAME / YOU patterns",
      "Only in the speed of your hands",
      "By whispering without face change",
      "By turning your back mid-question",
    ],
  ),
  q(
    "greetings",
    5,
    "For **Thank you**, what makes the sign feel sincere?",
    [
      "A smooth outward motion from chin or lips, sometimes with a small nod",
      "A sharp slap toward the viewer",
      "Signing while laughing at unrelated jokes",
      "Using only a head shake",
    ],
  ),
  q(
    "greetings",
    6,
    "When signing **Good evening** versus **Good night**, what should you track?",
    [
      "The distinct signs your materials teach—not mixing them into one vague motion",
      "They are always identical gestures",
      "You should only use English words, not signs",
      "You should skip context and use random hand waves",
    ],
  ),
  q(
    "greetings",
    7,
    "Introducing yourself in a short chain (greeting → name) works best when you:",
    [
      "Keep each step visible and separate with small beats",
      "Compress everything into one unreadable blur",
      "Use only fingerspelling with no greeting",
      "Avoid signing your name entirely",
    ],
  ),
  q(
    "greetings",
    8,
    "What is a common “social expression” mistake beginners make?",
    [
      "Smiling during a serious or apologetic line",
      "Matching face to meaning most of the time",
      "Using polite posture when appropriate",
      "Keeping greetings at a readable height",
    ],
  ),
  q(
    "greetings",
    9,
    "If someone did not catch your greeting, what is a respectful redo?",
    [
      "Repeat slightly slower with the same clear face and hand placement",
      "Shout verbally without adjusting the sign",
      "Give up and walk away silently",
      "Sign a different greeting randomly",
    ],
  ),
  q(
    "greetings",
    10,
    "Why is “intro pacing” important when meeting someone new?",
    [
      "It gives the other person time to see each part of your introduction",
      "It means you should always sign as fast as possible",
      "It means you should skip your name",
      "It means you should avoid eye contact entirely",
    ],
  ),
];

const TIME_DATE_QUESTIONS: PracticeQuestion[] = [
  q(
    "time-date",
    1,
    "When signing days of the week, what keeps **Sunday** through **Saturday** distinct?",
    [
      "Clear handshapes and steady rhythm—not abbreviating mid-sign",
      "Using the same hand motion for every weekday",
      "Signing days only with head nods",
      "Skipping weekdays and only signing “today”",
    ],
  ),
  q(
    "time-date",
    2,
    "For month names like **January** versus **February**, what should you watch?",
    [
      "Each month’s sign or spelling is fully formed and not blended",
      "All months use one identical handshape",
      "Months are never signed in FSL",
      "You should only mouth months silently",
    ],
  ),
  q(
    "time-date",
    3,
    "When giving a clock time like **3:00**, what is a good chunking habit?",
    [
      "Establish the hour, then add o’clock or minute markers as your lesson shows",
      "Smear hour and minute into one unclear twist",
      "Point randomly at the wall",
      "Use only the minute, never the hour",
    ],
  ),
  q(
    "time-date",
    4,
    "For **Yesterday**, what often reinforces past meaning?",
    [
      "A backward or past-directed path with matching subdued or recall face when appropriate",
      "Only signing faster than usual",
      "Facing away entirely while signing",
      "Using a future-tilt body lean",
    ],
  ),
  q(
    "time-date",
    5,
    "For **Tomorrow**, what pairing is common in teaching materials?",
    [
      "Forward motion or future tilt with light planning brows",
      "Signing while looking exclusively behind you",
      "Using only a head shake",
      "Random circles with no forward cue",
    ],
  ),
  q(
    "time-date",
    6,
    "For **Ngayon** (now), what clarity habit helps?",
    [
      "A crisp, close-to-body or neutral-space production with a short hold",
      "Stretching the sign across the whole room slowly",
      "Mouthing only with hands still in pockets",
      "Blending ngayon with yesterday every time",
    ],
  ),
  q(
    "time-date",
    7,
    "For **Bukas** (tomorrow), what should align with **Tomorrow** practice?",
    [
      "Consistent future grammar cues as your bilingual materials pair them",
      "Treating bukas as identical to “yesterday” always",
      "Never using facial grammar with Filipino time words",
      "Fingerspelling only with no sign",
    ],
  ),
  q(
    "time-date",
    8,
    "For **Kahapon** (yesterday), what mistake is easy to make if you rush?",
    [
      "Letting the sign look like a future or present cue",
      "Holding the sign still long enough to read",
      "Using a recall-appropriate face when taught",
      "Separating kahapon from English “yesterday” drills when learning",
    ],
  ),
  q(
    "time-date",
    9,
    "When scheduling two different times in one sentence, what helps most?",
    [
      "Finish the first time cleanly before starting the second",
      "Overlap both times in the same signing space",
      "Use only the second time and drop the first",
      "Switch to spoken language mid-sentence only",
    ],
  ),
  q(
    "time-date",
    10,
    "Why practice **scheduling phrases** with calm pacing?",
    [
      "Appointments are easier to follow when each time marker is readable",
      "Schedules should always be signed as fast as possible",
      "You should never include dates with times",
      "You should avoid eye contact during scheduling",
    ],
  ),
];

const FAMILY_QUESTIONS: PracticeQuestion[] = [
  q(
    "family",
    1,
    "When signing **Tatay** or **Nanay**, why is a respectful face important?",
    [
      "Family terms often carry cultural respect markers in conversation",
      "Parents should always be signed with joking faces only",
      "Respect is shown only by speed, not expression",
      "You should avoid clear handshapes for parents",
    ],
  ),
  q(
    "family",
    2,
    "For **Kapatid** (sibling), what should stay clear for beginners?",
    [
      "The sibling sign itself before adding extra names",
      "Only fingerspelling English words unrelated to family",
      "Mixing sibling with grandparent signs randomly",
      "Skipping the sign and pointing vaguely",
    ],
  ),
  q(
    "family",
    3,
    "Honorifics like **Ate** and **Kuya** often need:",
    [
      "Consistent placement and palm angles as your video demonstrates",
      "Identical handshapes with no contrast",
      "Signing only with elbows locked behind the back",
      "Using them only in English word order without signs",
    ],
  ),
  q(
    "family",
    4,
    "For **Lolo** and **Lola**, many lessons build meaning by:",
    [
      "Combining recognizable parent/old cues so relationship is obvious",
      "Using random gestures unrelated to grandparents",
      "Skipping movement entirely",
      "Only spelling English letters without signs",
    ],
  ),
  q(
    "family",
    5,
    "For **Tita** versus **Tito**, what helps learners avoid confusion?",
    [
      "Exaggerating handshape contrast early, then refining with feedback",
      "Using one sign for both always",
      "Avoiding practice with a partner",
      "Signing both while looking away",
    ],
  ),
  q(
    "family",
    6,
    "The **Friend** sign in social introductions usually benefits from:",
    [
      "A warm, approachable face with clear hand contact or hook motion per lesson",
      "A stern face and sharp jabs",
      "No facial expression at all",
      "Signing friend behind the head only",
    ],
  ),
  q(
    "family",
    7,
    "For **family introductions**, what order habit is often taught?",
    [
      "Relationship sign first, then name or fingerspelling if needed",
      "Name first with no relationship sign ever",
      "Only pointing without signing",
      "Random order every time",
    ],
  ),
  q(
    "family",
    8,
    "What does **relationship context** mean in a short family story?",
    [
      "Keeping who is related to whom visible through signs, not vague points",
      "Using one point for everyone in the family",
      "Avoiding any mention of relationships",
      "Switching languages without signing",
    ],
  ),
  q(
    "family",
    9,
    "Why is **respectful expression** paired with family vocabulary?",
    [
      "It matches how many Filipino families discuss elders and relatives",
      "Respect is never shown in sign language",
      "You should always use sarcastic faces for relatives",
      "Expression is illegal in family signing",
    ],
  ),
  q(
    "family",
    10,
    "For smooth **conversational flow** about relatives, what is a good goal?",
    [
      "Clear transitions between people (mom → dad → sibling) without smearing signs",
      "Talking about everyone with one identical point",
      "Never taking turns in dialogue practice",
      "Skipping practice with real mini-dialogues",
    ],
  ),
];

const PHRASES_QUESTIONS: PracticeQuestion[] = [
  q(
    "phrases",
    1,
    "For **Thank you** in a longer phrase, what keeps it polite?",
    [
      "Smooth arc and calm face—not snapping the hand outward",
      "Slapping downward sharply every time",
      "Signing while frowning at the person",
      "Skipping the sign and only nodding once",
    ],
  ),
  q(
    "phrases",
    2,
    "**Have a nice day** is clearest when you:",
    [
      "Chunk GOOD and DAY (or your lesson’s FSL order) with a friendly close",
      "Blend every word into one unreadable twist",
      "Use only English mouthing",
      "Sign it while walking away mid-sentence",
    ],
  ),
  q(
    "phrases",
    3,
    "For **How are you?**, what invites a real answer?",
    [
      "Question brows plus a slight receptive lean at the end",
      "A flat face and turned-away shoulders",
      "Signing as fast as possible with no pause",
      "Closing your eyes during the question",
    ],
  ),
  q(
    "phrases",
    4,
    "For **Sorry**, what face often matches the meaning?",
    [
      "Apologetic brows and a small forward lean with controlled movement",
      "A wide grin and loud laughter",
      "Angry squint throughout",
      "No expression at all",
    ],
  ),
  q(
    "phrases",
    5,
    "For **Yes** or **No**, what supports clarity?",
    [
      "Decisive movement paired with a matching nod or head shake when used",
      "Waffling between both answers in one motion",
      "Only shrugging without a sign",
      "Looking away before finishing",
    ],
  ),
  q(
    "phrases",
    6,
    "**Have you eaten?** typically needs:",
    [
      "A yes/no question face with a clear EAT-related sequence as taught",
      "Only a wh-question face with no yes/no marking",
      "Random hand waves unrelated to food",
      "Skipping the question entirely",
    ],
  ),
  q(
    "phrases",
    7,
    "For **Excuse me** in a crowd, what adjustment is wise?",
    [
      "Smaller amplitude but the same clear polite face",
      "Huge swings that hit nearby people",
      "No sign—only pushing through",
      "Whispering instead of signing",
    ],
  ),
  q(
    "phrases",
    8,
    "**I understand** is often clearest when you:",
    [
      "Point to self, sign UNDERSTAND once, and nod firmly",
      "Shake head while signing understand",
      "Sign understand ten times rapidly",
      "Point at the other person only",
    ],
  ),
  q(
    "phrases",
    9,
    "**I don’t understand** invites help best when you:",
    [
      "Use negation face and clear NOT/UNDERSTAND pattern per lesson",
      "Smile brightly as if joking",
      "Turn your back immediately",
      "Sign understand twice quickly",
    ],
  ),
  q(
    "phrases",
    10,
    "For **You’re welcome**, what tone fits many teaching examples?",
    [
      "Calm and modest—no boastful exaggeration",
      "Loud theatrical bows only",
      "Angry sharp motions",
      "Silent treatment after thanks",
    ],
  ),
];

const HEALTH_BODY_QUESTIONS: PracticeQuestion[] = [
  q(
    "health-body",
    1,
    "When teaching **head** as a body part, what pairing helps memory?",
    [
      "Touch or point near the real head, then show the part sign clearly",
      "Point at the foot while signing head",
      "Sign head only with eyes closed always",
      "Skip location entirely",
    ],
  ),
  q(
    "health-body",
    2,
    "For **stomach** discomfort, why localize the sign?",
    [
      "Providers and friends can tell where the problem is focused",
      "Localization never matters in sign",
      "You should only fingerspell English letters",
      "You should sign stomach on the forehead",
    ],
  ),
  q(
    "health-body",
    3,
    "For **leg** versus **arm**, what should beginners watch?",
    [
      "Different zones and paths so limbs are not confused",
      "Using identical points for both always",
      "Signing both only behind the back",
      "Avoiding any difference in movement",
    ],
  ),
  q(
    "health-body",
    4,
    "For **sakit** (pain/hurt), what makes communication honest?",
    [
      "A pain-matched face with a clear twist or point at the site",
      "Smiling widely while claiming pain",
      "Signing pain only at the neck regardless of truth",
      "Using no face change at all",
    ],
  ),
  q(
    "health-body",
    5,
    "For **lagnat** (fever), what often reinforces meaning?",
    [
      "Tired or flushed affect cues paired with the taught sign",
      "Jumping jacks while signing",
      "Laughing throughout",
      "Signing fever on the knee only",
    ],
  ),
  q(
    "health-body",
    6,
    "**Pagod** (tired) is readable when you:",
    [
      "Slow the tempo slightly and let shoulders and lids show fatigue",
      "Sign as fast as excited",
      "Use an angry face for tired",
      "Skip the sign and only yawn verbally",
    ],
  ),
  q(
    "health-body",
    7,
    "**Puyat** (lack of sleep) often pairs with:",
    [
      "Gentle droop cues around the eyes per your reference",
      "Hyperactive bouncing",
      "A constant wide grin",
      "Signing only with feet",
    ],
  ),
  q(
    "health-body",
    8,
    "In a clinic list (**doctor**, **nurse**, **medicine**), why repeat key nouns clearly?",
    [
      "Staff can follow needs even under noise or distance",
      "Repeating never helps communication",
      "You should whisper instead",
      "You should use one vague point for all roles",
    ],
  ),
  q(
    "health-body",
    9,
    "For **hospital** in a health lesson (not emergency drill), what matters?",
    [
      "Crisp clinical production appropriate to a visit narrative",
      "Joking faces throughout",
      "Replacing hospital with random verbs",
      "Signing only with one finger for every word",
    ],
  ),
  q(
    "health-body",
    10,
    "For **pharmacy** or picking up medicine, what habit supports clarity?",
    [
      "Separate MEDICINE and PLACE signs if your lesson teaches both ideas",
      "Blend every medicine word into one flick",
      "Avoid naming the place entirely",
      "Use unrelated vehicle signs",
    ],
  ),
];

const SHOPPING_MONEY_QUESTIONS: PracticeQuestion[] = [
  q(
    "shopping-money",
    1,
    "For **piso**, what should be obvious to a cashier?",
    [
      "A clear money or peso handshape, not a vague rub",
      "Only spelling P without context",
      "Hiding hands under the counter",
      "Pointing at random objects",
    ],
  ),
  q(
    "shopping-money",
    2,
    "**Centavo** amounts are clearest when you:",
    [
      "Separate pesos and centavos if both are needed, with pauses",
      "Mumble amounts without signing",
      "Skip centavos always",
      "Use identical signs for peso and centavo",
    ],
  ),
  q(
    "shopping-money",
    3,
    "For **bill** versus **coin**, many lessons stress:",
    [
      "Contrasting flat paper motion with small round coin taps",
      "Identical fists for both",
      "Only spelling English words",
      "Never showing the difference",
    ],
  ),
  q(
    "shopping-money",
    4,
    "For **buy**, direction of motion often signals:",
    [
      "Who receives the item or money in the exchange",
      "Only your favorite color",
      "Random arcs with no role meaning",
      "That you are driving a car",
    ],
  ),
  q(
    "shopping-money",
    5,
    "For **sell**, clarity improves when you:",
    [
      "Show movement toward the buyer’s side as your video demonstrates",
      "Always sign sell at your chin only",
      "Use buy and sell interchangeably",
      "Avoid facing the person",
    ],
  ),
  q(
    "shopping-money",
    6,
    "For **pay**, what sequencing habit helps in line at a store?",
    [
      "Money motion, then pay action, then pause for change if needed",
      "Random gestures with no order",
      "Only nodding without paying signs",
      "Throwing signs as fast as possible silently",
    ],
  ),
  q(
    "shopping-money",
    7,
    "For **change** (money returned), what should be clear?",
    [
      "That you are referring to returned money, not a topic change in conversation",
      "That you mean weather change only",
      "That you want to swap languages mid-sign",
      "That you are ignoring the cashier",
    ],
  ),
  q(
    "shopping-money",
    8,
    "When listing **water**, **bread**, and **clothes** as shopping items, what helps?",
    [
      "Short iconic shapes per item with small beats between them",
      "One identical fist for every item",
      "Only spelling without signs",
      "Signing all items on your knee",
    ],
  ),
  q(
    "shopping-money",
    9,
    "For **shopping dialogue** practice, why take turns?",
    [
      "Buyer and seller roles switch movement direction and responses realistically",
      "Only one person should ever sign",
      "Dialogue should never include prices",
      "You should avoid eye contact in dialogue",
    ],
  ),
  q(
    "shopping-money",
    10,
    "Why keep money signs **readable at a small distance**?",
    [
      "Markets and counters often have space between you and the seller",
      "Money signs should only be inches from your chest always",
      "Distance never matters",
      "You should only sign money with one finger hidden",
    ],
  ),
];

const EMOTIONS_QUESTIONS: PracticeQuestion[] = [
  q(
    "emotions",
    1,
    "For **Happy**, what pairing usually sells the emotion?",
    [
      "Bright eyes and raised cheeks with buoyant, clear repeats",
      "Flat face and slumped shoulders",
      "Angry brows throughout",
      "Signing only with elbows locked down",
    ],
  ),
  q(
    "emotions",
    2,
    "For **Sad**, what tempo fits the affect?",
    [
      "Slightly slower, smaller movements with downturned mouth",
      "Rapid sharp punches",
      "Excited bouncing",
      "Neutral speed with a forced grin",
    ],
  ),
  q(
    "emotions",
    3,
    "For **Angry**, what balance should learners aim for?",
    [
      "Sharp, controlled tension—not random flailing",
      "Complete stillness with a giggle",
      "Signing while whispering apologies",
      "Using only happy faces",
    ],
  ),
  q(
    "emotions",
    4,
    "For **Tired**, what body cue often matches?",
    [
      "Droopy lids and lowered shoulders with longer arcs",
      "Wide eyes and jumping",
      "Constant surprised brows",
      "Rapid tiny taps unrelated to tired",
    ],
  ),
  q(
    "emotions",
    5,
    "For **Scared**, why might hands stay closer to the body?",
    [
      "Protective framing reads as fear in many performances",
      "Fear should always be signed far forward only",
      "Fear never uses the face",
      "You should laugh during scared",
    ],
  ),
  q(
    "emotions",
    6,
    "For **Nervous**, what amplitude is usually appropriate?",
    [
      "Smaller, tighter repeats—not huge unrelated swings",
      "Huge windmill arms",
      "Only stomping feet",
      "Signing with eyes closed always",
    ],
  ),
  q(
    "emotions",
    7,
    "For **Excited**, what keeps enthusiasm readable?",
    [
      "Faster but still crisp rhythm with an upward posture",
      "Slurred overlapping signs with no pauses",
      "Signing while facing away",
      "Using sad brows on purpose",
    ],
  ),
  q(
    "emotions",
    8,
    "For **Unwell**, why keep intensity lower than emergency **hurt** in some lessons?",
    [
      "General sickness cues can be subdued while still honest",
      "Unwell must always be signed as loudly as possible",
      "Unwell should never use facial grammar",
      "Unwell is identical to excited always",
    ],
  ),
  q(
    "emotions",
    9,
    "For **Surprised**, what timing works well?",
    [
      "Brows up, mouth open, one crisp pop of the sign",
      "Slow dragging with a frown",
      "Repeating twenty times without pause",
      "Signing surprised behind the head only",
    ],
  ),
  q(
    "emotions",
    10,
    "For **Hungry**, **Worried**, or **Curious** rotations in class, what is the main goal?",
    [
      "Match face, speed, and space to each emotion’s meaning",
      "Use one generic face for every emotion",
      "Skip hands and only mime with feet",
      "Always sign the same English word regardless",
    ],
  ),
];

const TRANSPORTATION_QUESTIONS: PracticeQuestion[] = [
  q(
    "transportation",
    1,
    "For **Jeepney**, what silhouette cue helps viewers?",
    [
      "A compact body with optional bench or boarding direction as taught",
      "A huge circle unrelated to vehicles",
      "Only spelling J without context",
      "Signing jeepney at the ankle",
    ],
  ),
  q(
    "transportation",
    2,
    "For **Bus**, size in signing space often reads as:",
    [
      "Larger, steady glide compared with smaller vehicles",
      "Identical to a motorcycle always",
      "Tiny finger twitches only",
      "Random dots in the air",
    ],
  ),
  q(
    "transportation",
    3,
    "For **Tricycle**, what should the three-beat idea avoid?",
    [
      "Smearing all wheels into one unreadable twist",
      "Clear separate cues for wheels or trike pattern",
      "Spelling English only",
      "Using no movement",
    ],
  ),
  q(
    "transportation",
    4,
    "For **Van**, what outline cue is common in lessons?",
    [
      "Boxy taller cabin compared with a low car outline",
      "Identical to airplane always",
      "Only pointing at shoes",
      "Waving randomly",
    ],
  ),
  q(
    "transportation",
    5,
    "For **Car**, what simple iconic pair appears in many intros?",
    [
      "Steering wheel grip plus a small chassis outline",
      "Only hopping in place",
      "Spelling CAR slowly without motion",
      "Using bus motion for car always",
    ],
  ),
  q(
    "transportation",
    6,
    "For **Motorcycle**, what combo often sells two wheels?",
    [
      "Handlebar twist with a slight lean or vibration repeat",
      "Flat palms flying upward only",
      "Clapping hands loudly",
      "Signing only with pinkies",
    ],
  ),
  q(
    "transportation",
    7,
    "For **Airplane**, what path is clearest?",
    [
      "Neutral forward glide with optional climb for takeoff stories",
      "Spiraling randomly near the chin",
      "Only vertical drops without travel",
      "Tracing squares on the floor",
    ],
  ),
  q(
    "transportation",
    8,
    "For **Go** versus **Stop**, what contrast helps?",
    [
      "Directional intent for go versus abrupt command face and stop motion",
      "Identical motions for both",
      "Only mouthing the English words",
      "Signing both behind the back",
    ],
  ),
  q(
    "transportation",
    9,
    "For **Left** and **Right**, what should learners confirm with materials?",
    [
      "Whether signs are viewer-centered or signer-centered in your module",
      "That left and right are never used in FSL",
      "That both mean “straight ahead”",
      "That you should only point at the sky",
    ],
  ),
  q(
    "transportation",
    10,
    "For **Near**, **Far**, and compass directions, what habit supports wayfinding?",
    [
      "Consistent map orientation and distance scaling in signing space",
      "Random directions each time for fun",
      "Only spelling N-E-S-W without signs",
      "Facing away from the traveler always",
    ],
  ),
];

const LESSON_QUESTION_BANK: Record<LessonId, PracticeQuestion[]> = {
  emergency: EMERGENCY_QUESTIONS,
  alphabet: ALPHABET_QUESTIONS,
  numbers: NUMBERS_QUESTIONS,
  greetings: GREETINGS_QUESTIONS,
  "time-date": TIME_DATE_QUESTIONS,
  family: FAMILY_QUESTIONS,
  phrases: PHRASES_QUESTIONS,
  "health-body": HEALTH_BODY_QUESTIONS,
  "shopping-money": SHOPPING_MONEY_QUESTIONS,
  emotions: EMOTIONS_QUESTIONS,
  transportation: TRANSPORTATION_QUESTIONS,
};

const lessonEntries = LESSON_ORDER.map(
  (lessonId) =>
    [
      lessonId,
      {
        title: `${LESSON_LABEL[lessonId]} Challenge`,
        description: `Ten questions focused on ${LESSON_LABEL[lessonId]}.`,
        questions: LESSON_QUESTION_BANK[lessonId],
      },
    ] as const
);

/** Challenge 12: unique mixed review; difficulty cycles easy → medium → hard (×8) + final easy. */
const COMPREHENSIVE_QUESTIONS_RAW: Omit<PracticeQuestion, "difficulty">[] = [
  {
    id: "comp-1",
    category: "Mixed review",
    question:
      "You see smoke and need to alert others. Besides the **Fire** sign, what best supports urgency?",
    options: [
      "Serious facial expression matching danger",
      "A playful smile to keep people calm incorrectly",
      "Signing with hands in pockets",
      "Turning away before finishing",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-2",
    category: "Mixed review",
    question:
      "You fingerspell a classmate’s name and they squint. What is the best next step for **alphabet** clarity?",
    options: [
      "Repeat unclear letters more slowly with steady elbow base",
      "Speed up so the name finishes faster",
      "Switch to random letters",
      "Hide your hands entirely",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-3",
    category: "Mixed review",
    question:
      "You must sign **47** and **74** on the same day. What advanced habit prevents swaps?",
    options: [
      "Anchor tens clearly, separate ones, and pause between numbers",
      "Sign both as identical flicks",
      "Use only mouthing for one of them",
      "Avoid practicing two-digit numbers",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-4",
    category: "Mixed review",
    question:
      "At a community booth, you greet someone new. What simple habit fits **Greetings**?",
    options: [
      "Hands visible at a comfortable distance with a polite face",
      "Hands pressed against your cheeks the whole time",
      "Signing while looking at your shoes only",
      "Skipping hello and pointing silently",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-5",
    category: "Mixed review",
    question:
      "You explain an appointment **tomorrow afternoon**. What **Time, Date, and Scheduling** skill matters?",
    options: [
      "Separate day, time-of-day, and clock chunks with small beats",
      "Blend all ideas into one unreadable twist",
      "Use only English speech",
      "Skip afternoon entirely",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-6",
    category: "Mixed review",
    question:
      "You introduce **Nanay** then **Tita**. What **Family** skill keeps relationships clear?",
    options: [
      "Complete each relationship sign before adding the next name",
      "Point once for everyone",
      "Use identical handshapes for both on purpose",
      "Skip relationship signs entirely",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-7",
    category: "Mixed review",
    question:
      "Someone thanks you after you held a door. Which **Common Phrases** response fits many lessons?",
    options: [
      "A calm, modest **You’re welcome** pattern",
      "A loud sarcastic laugh",
      "Ignoring them completely",
      "Signing **Sorry** instead always",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-8",
    category: "Mixed review",
    question:
      "You feel **lagnat** and need to tell a guardian. What **Health and Body** approach is honest?",
    options: [
      "Taught fever sign with tired or flushed affect cues",
      "Smiling while denying symptoms",
      "Pointing at unrelated body parts",
      "Only spelling without signs",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-9",
    category: "Mixed review",
    question:
      "At a sari-sari counter you clarify **piso** versus **centavo**. What **Shopping and Money** habit helps?",
    options: [
      "Contrast peso and centavo clearly with pauses if both are needed",
      "Use one vague rub for every amount",
      "Only write on paper, never sign",
      "Point at random products instead",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-10",
    category: "Mixed review",
    question:
      "You feel **nervous** before a presentation. What **Emotions** balance keeps the sign readable?",
    options: [
      "Smaller tight repeats with a nervous face—not huge unrelated swings",
      "Windmill arms to show nerves",
      "Happy brows throughout",
      "Signing only with your feet",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-11",
    category: "Mixed review",
    question:
      "You give directions: **turn left**, then **stop**. What **Transportation** contrast supports clarity?",
    options: [
      "Directional left index, then abrupt stop motion with command face",
      "Identical circles for both",
      "Only spelling English words backward",
      "Facing away from the traveler",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-12",
    category: "Mixed review",
    question:
      "In an elevator, someone asks for **Help** quietly. What **Emergency** adjustment fits the space?",
    options: [
      "Clear handshape with urgent face but controlled amplitude",
      "Huge swings that hit nearby people",
      "Whispering only with no sign",
      "Laughing to reduce tension inappropriately",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-13",
    category: "Mixed review",
    question:
      "A teacher asks you to spell **M** then **N** back-to-back. What **Alphabet** focus prevents blur?",
    options: [
      "Thumb placement and finger contrasts exaggerated slightly for learners",
      "Speed through both identically",
      "Use one merged handshape",
      "Spell only with your non-dominant elbow",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-14",
    category: "Mixed review",
    question:
      "You list three prices in a row. What **Numbers** habit keeps the list understandable?",
    options: [
      "Tiny reset beats between each number so digits do not smear",
      "Never pause in lists",
      "Use the same digit for every price",
      "Turn around while listing",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-15",
    category: "Mixed review",
    question:
      "You meet a principal and want **Good morning**. What **Greetings** detail often matters?",
    options: [
      "Polite face with clear time-of-day sign before rushing to your request",
      "Skipping time-of-day entirely",
      "Using goodbye first always",
      "Signing while walking past",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-16",
    category: "Mixed review",
    question:
      "You compare **Kuya** and **Ate** in a story. What **Family** lesson point is key?",
    options: [
      "Honorific placement and palm angles as your video shows",
      "Treating both as random synonyms with one point",
      "Never using honorifics in FSL",
      "Spelling only English words",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-17",
    category: "Mixed review",
    question:
      "You didn’t catch instructions. Which **Common Phrases** line invites a helpful redo?",
    options: [
      "**I don’t understand** with negation face and clear NOT/UNDERSTAND pattern",
      "**I understand** while confused",
      "Silent staring only",
      "Random thank-you signs",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-18",
    category: "Mixed review",
    question:
      "You describe **sakit** in your **arm** after sports. What **Health and Body** combo is clearest?",
    options: [
      "Localize to the arm with pain-matched face",
      "Sign pain only on the chin",
      "Smile widely while signing pain",
      "Use vehicle signs instead",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-19",
    category: "Mixed review",
    question:
      "You negotiate **change** after paying. What **Shopping and Money** meaning should be obvious?",
    options: [
      "Returned money—not a random topic change",
      "Weather only",
      "A new unrelated story",
      "Directions to the airport only",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-20",
    category: "Mixed review",
    question:
      "You sign **excited** about a trip, then **tired** after travel. What **Emotions** shift matters?",
    options: [
      "Change tempo, posture, and face to match each state",
      "Keep identical speed for both",
      "Use angry brows for excited",
      "Skip tired entirely",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-21",
    category: "Mixed review",
    question:
      "You compare **jeepney** and **bus** routes. What **Transportation** contrast is often taught?",
    options: [
      "Smaller iconic jeepney body versus larger steady bus space",
      "Identical signs for both vehicles",
      "Only fingerspelling with no motion",
      "Signing both at the knees only",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-22",
    category: "Mixed review",
    question:
      "You must call for an **ambulance** after an injury. What **Emergency** sequencing fits many lessons?",
    options: [
      "Call motion first, then clear medical/help context as separate beats",
      "Medical sign only with no call cue",
      "Random waving without order",
      "Only mouthing English silently",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-23",
    category: "Mixed review",
    question:
      "You spell an acronym for a club. What **Alphabet** habit protects readability?",
    options: [
      "Hold each letter, especially similar pairs, with clean transitions",
      "Collapse letters into one wiggle",
      "Spell backward for style",
      "Use numbers instead of letters",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-24",
    category: "Mixed review",
    question:
      "You narrate **Kahapon** vs **Bukas** in one story. What **Time, Date, and Scheduling** skill prevents confusion?",
    options: [
      "Clear past versus future grammar cues for each word",
      "Using identical motion for both always",
      "Skipping Filipino time words",
      "Only pointing at the floor",
    ],
    correctIndex: 0,
  },
  {
    id: "comp-25",
    category: "Mixed review",
    question:
      "You run a review chain: **Emergency → Numbers → Phrases** in one drill. What meta-skill ties them?",
    options: [
      "Finish each idea cleanly before switching modules so meaning never smears",
      "Blend all modules into one unreadable flick",
      "Skip phrases entirely",
      "Never transition between topics",
    ],
    correctIndex: 0,
  },
];

const DIFF_CYCLE: Array<"easy" | "medium" | "hard"> = ["easy", "medium", "hard"];

const COMPREHENSIVE_QUESTIONS: PracticeQuestion[] = COMPREHENSIVE_QUESTIONS_RAW.map((raw, i) => {
  const n = i + 1;
  const placement = hashPlacement("comprehensive", n);
  const tuple = raw.options as [string, string, string, string];
  const { options, correctIndex } = placeCorrectAt(tuple, placement);
  return {
    ...raw,
    options,
    correctIndex,
    difficulty: DIFF_CYCLE[i % 3]!,
  };
});

export const PRACTICE_CHALLENGES: Record<PracticeChallengeId, ChallengeSet> = {
  ...Object.fromEntries(lessonEntries),
  comprehensive: {
    title: "Comprehensive Challenge",
    description:
      "Twenty-five mixed scenarios across all lessons. Difficulty cycles easy, then medium, then hard throughout the run.",
    questions: COMPREHENSIVE_QUESTIONS,
  },
} as Record<PracticeChallengeId, ChallengeSet>;
