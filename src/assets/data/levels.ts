export type VideoPlaceholder = {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  groupTitle?: string;
};

export type MultipleChoiceQuestion = {
  type: "multiple-choice";
  id: number;
  instruction: string;
  question: string;
  options: string[];
  correctIndex: number;
  /** Optional clip shown above the question (e.g. sign to identify). */
  promptVideoUrl?: string;
};

export type MatchingVideoChoice = { url: string; label: string };

export type MatchingPair = {
  prompt: string;
  answer: string;
  /** Clip for the prompt (e.g. “Thank you!” sign). */
  promptVideoUrl?: string;
};

export type MatchingQuestion = {
  type: "matching";
  id: number;
  instruction: string;
  pairs: MatchingPair[];
  /** Text options for text-based matching (other levels). */
  options?: string[];
  /** When set, each pair’s `answer` must equal one of these URLs; UI shows labeled video choices. */
  videoChoices?: MatchingVideoChoice[];
  /** Randomize order of video options (per question mount). */
  shuffleVideoChoices?: boolean;
};

export type ConstructionQuestion = {
  type: "construction";
  id: number;
  instruction: string;
  prompt: string;
  acceptedAnswers: string[];
  hint?: string;
  /** Example clip (e.g. fingerspelling demo). */
  exampleVideoUrl?: string;
  /** Multiple prompts in one step; all must be correct to score the point. */
  parts?: Array<{
    prompt: string;
    acceptedAnswers: string[];
    videoUrl?: string;
  }>;
  /**
   * Accept answers that look like a name in letters: hyphens, spaces, periods between
   * parts, or one word — still letters/Ññ only (any specific name is valid).
   */
  acceptFingerspellingFormat?: boolean;
  /**
   * Gloss intro: HI + I-AM (or I AM / IAM) + learner’s name (any text after that).
   */
  acceptHiIamGlossFormat?: boolean;
};

export type QuizQuestion =
  | MultipleChoiceQuestion
  | MatchingQuestion
  | ConstructionQuestion;

export type Lesson = {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  videos: VideoPlaceholder[];
  quiz: QuizQuestion[];
};

export type Level = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
  lessons: Lesson[];
};

/** Level 1 Lesson 1 — matching questions 5–8 share these five sign clips. */
export const L1_LESSON1_MATCH_VIDEO_CHOICES: MatchingVideoChoice[] = [
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775781515/A_xwx1qv.mp4",
    label: "Choice 1",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775781514/10_np4gvl.mp4",
    label: "Choice 2",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775781510/17_yloulb.mp4",
    label: "Choice 3",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775781509/M_puxi7n.mp4",
    label: "Choice 4",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775781506/T_zio1g3.mp4",
    label: "Choice 5",
  },
];

/** Level 2 Lesson 1 — matching 5–8: pick the correct response clip (order shuffled in UI). */
/**
 * Order matches answer key Q5–Q8: 5-B, 6-A, 7-C, 8-D
 * A = I’m fine, B = you’re welcome, C = it’s okay, D = yes/no
 */
export const L2_LESSON1_RESPONSE_VIDEO_CHOICES: MatchingVideoChoice[] = [
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793088/i_m_fine_emag2m.mp4",
    label: "A",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793115/you_re_welcome_qxmt1x.mp4",
    label: "B",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793093/it_s_okay_llsr0x.mp4",
    label: "C",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793110/yes_no_grthx4.mp4",
    label: "D",
  },
];

/** Level 4 Lesson 1 — matching 5–8 shared video choices. */
export const L4_LESSON1_MATCH_VIDEO_CHOICES: MatchingVideoChoice[] = [
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775809028/thank_kbx4bs.mp4",
    label: "Choice 1",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775808929/pay_vwsrje.mp4",
    label: "Choice 2",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775808928/greet_o7xaen.mp4",
    label: "Choice 3",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775808923/ask_for_price_mlxmmi.mp4",
    label: "Choice 4",
  },
];

/** Level 5 Lesson 1 — matching Q5–Q8: A–D = hospital, school, market, church. Answer key: B, D, C, A. */
export const L5_LESSON1_MATCH_VIDEO_CHOICES: MatchingVideoChoice[] = [
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775821122/hospital_n1td1d.mp4",
    label: "A",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775821143/school_dqr1gs.mp4",
    label: "B",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775821131/market_e4xh0m.mp4",
    label: "C",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775821116/church_tuynwp.mp4",
    label: "D",
  },
];

/** Level 6 Lesson 1 — matching Q5–Q8: A–D = follow me, calm down, help, call. Answer key: C, D, A, B. */
export const L6_LESSON1_MATCH_VIDEO_CHOICES: MatchingVideoChoice[] = [
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775831792/follow_me_wa6gv1.mp4",
    label: "A",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775831791/calm_down_n7k0ge.mp4",
    label: "B",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775831787/help_j0vtx9.mp4",
    label: "C",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775831770/call_tubyfd.mp4",
    label: "D",
  },
];

/** Level 7 Lesson 1 — matching Q5–Q8: A–D = I eat, we go outside, they are happy, he wakes up. Answer key: B, D, C, A. */
export const L7_LESSON1_MATCH_VIDEO_CHOICES: MatchingVideoChoice[] = [
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874576/i_eat_tfjkuu.mp4",
    label: "A",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874600/we_go_outside__dj5cjt.mp4",
    label: "B",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874588/they_are_happy_fpt8no.mp4",
    label: "C",
  },
  {
    url: "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874567/he_wakes_up_rzd95j.mp4",
    label: "D",
  },
];

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Basics",
    subtitle: "Alphabet & Numbers",
    description:
      "No facial expression and grammar needed yet. Mostly handshape memorization, used mainly for fingerspelling.",
    color: "sky",
    gradient: "from-sky-400 to-sky-600",
    icon: "✋",
    lessons: [
      {
        id: 1,
        title: "Alphabet & Numbers",
        description:
          "Learn the FSL alphabet (A–Z including Ñ and NG) and numbers from 1 to trillions.",
        objectives: [
          "Understand the basics of fingerspelling",
          "Learn correct hand positioning and speed when signing",
          "Master the FSL alphabet from A–Z (including Ñ and NG)",
          "Learn number signs from 1–100 (easy) up to thousands–trillions (hard)",
          "Understand right-handed and left-handed orientation",
        ],
        videos: [
          {
            id: 1,
            title: "Video 1.1 - Ano ang ibig sabihin ng fingerspelling?",
            description: "Core introduction to fingerspelling and its purpose in FSL communication.",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775741920/what_is_fingerspelling_yubfaw.mov",
            groupTitle: "Video 1",
          },
          {
            id: 2,
            title: "Video 1.2 - Gaano kataas dapat nakapwesto ang kamay kapag nag-sisign?",
            description: "Proper hand height and visibility while signing for clear comprehension.",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775741935/how_big_hand_move_signing_moqzdq.mov",
            groupTitle: "Video 1",
          },
          {
            id: 3,
            title: "Video 1.3 - Right-handed at Left-handed na orientation",
            description: "Orientation differences for right-handed and left-handed signers.",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775741950/right_and_left_jrbbn2.mov",
            groupTitle: "Video 1",
          },
          {
            id: 4,
            title: "Video 1.4 - Ang tamang bilis kapag nag-sisign",
            description: "Recommended signing speed for clarity, accuracy, and learner pacing.",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775741898/smooth_speed_signing_gt6tg5.mov",
            groupTitle: "Video 1",
          },
          {
            id: 5,
            title: "Letter A",
            description: "FSL handshape demonstration for letter A.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742665/letter_A_riamni.mov",
          },
          {
            id: 6,
            title: "Letter B",
            description: "FSL handshape demonstration for letter B.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742703/letter_B_m1vxqt.mov",
          },
          {
            id: 7,
            title: "Letter C",
            description: "FSL handshape demonstration for letter C.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742650/letter_C_lynjj5.mov",
          },
          {
            id: 8,
            title: "Letter D",
            description: "FSL handshape demonstration for letter D.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742727/letter_D_dyoqpt.mov",
          },
          {
            id: 9,
            title: "Letter E",
            description: "FSL handshape demonstration for letter E.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742653/letter_E_j5wqvq.mov",
          },
          {
            id: 10,
            title: "Letter F",
            description: "FSL handshape demonstration for letter F.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742760/letter_F_nrpslo.mov",
          },
          {
            id: 11,
            title: "Letter G",
            description: "FSL handshape demonstration for letter G.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742711/letter_G_uii8fl.mov",
          },
          {
            id: 12,
            title: "Letter H",
            description: "FSL handshape demonstration for letter H.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742653/letter_H_o9jcmm.mov",
          },
          {
            id: 13,
            title: "Letter I",
            description: "FSL handshape demonstration for letter I.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742661/letter_I_ahvwgx.mov",
          },
          {
            id: 14,
            title: "Letter J",
            description: "FSL handshape demonstration for letter J.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742719/letter_J_cy7ave.mov",
          },
          {
            id: 15,
            title: "Letter K",
            description: "FSL handshape demonstration for letter K.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742666/letter_K_slvijn.mov",
          },
          {
            id: 16,
            title: "Letter L",
            description: "FSL handshape demonstration for letter L.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742640/letter_L_je9n56.mov",
          },
          {
            id: 17,
            title: "Letter M",
            description: "FSL handshape demonstration for letter M.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742718/letter_M_xj1dsf.mov",
          },
          {
            id: 18,
            title: "Letter N",
            description: "FSL handshape demonstration for letter N.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742673/letter_N_hrxhvp.mov",
          },
          {
            id: 19,
            title: "Letter Ñ",
            description: "FSL handshape demonstration for letter Ñ.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775743999/%C3%91_urjv7t.mp4",
          },
          {
            id: 20,
            title: "Letter O",
            description: "FSL handshape demonstration for letter O.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742671/letter_O_ksxy30.mov",
          },
          {
            id: 21,
            title: "Letter P",
            description: "FSL handshape demonstration for letter P.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742642/letter_P_wv0smg.mov",
          },
          {
            id: 22,
            title: "Letter Q",
            description: "FSL handshape demonstration for letter Q.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742753/letter_Q_nf5s2f.mov",
          },
          {
            id: 23,
            title: "Letter R",
            description: "FSL handshape demonstration for letter R.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742745/letter_R_k4m80u.mov",
          },
          {
            id: 24,
            title: "Letter S",
            description: "FSL handshape demonstration for letter S.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742736/letter_S_deusjl.mov",
          },
          {
            id: 25,
            title: "Letter T",
            description: "FSL handshape demonstration for letter T.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742730/letter_T_mvbiqw.mov",
          },
          {
            id: 26,
            title: "Letter U",
            description: "FSL handshape demonstration for letter U.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742684/letter_U_cqqcqi.mov",
          },
          {
            id: 27,
            title: "Letter V",
            description: "FSL handshape demonstration for letter V.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742747/letter_V_ieqnz3.mov",
          },
          {
            id: 28,
            title: "Letter W",
            description: "FSL handshape demonstration for letter W.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742740/letter_W_nyosyl.mov",
          },
          {
            id: 29,
            title: "Letter X",
            description: "FSL handshape demonstration for letter X.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742752/letter_X_conc14.mov",
          },
          {
            id: 30,
            title: "Letter Y",
            description: "FSL handshape demonstration for letter Y.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742718/letter_Y_sgmn4p.mov",
          },
          {
            id: 31,
            title: "Letter Z",
            description: "FSL handshape demonstration for letter Z.",
            groupTitle: "Video 2",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775742738/letter_Z_gqjop1.mov",
          },
          {
            id: 32,
            title: "Number 1",
            description: "FSL number sign demonstration for 1.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744398/1_tymbwq.mov",
          },
          {
            id: 33,
            title: "Number 2",
            description: "FSL number sign demonstration for 2.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744542/2_aitfvb.mov",
          },
          {
            id: 34,
            title: "Number 3",
            description: "FSL number sign demonstration for 3.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744555/3_b8i28r.mov",
          },
          {
            id: 64,
            title: "Number 4",
            description: "FSL number sign demonstration for 4.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775745619/4_k3utd8.mov",
          },
          {
            id: 35,
            title: "Number 5",
            description: "FSL number sign demonstration for 5.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744558/6_obiwsj.mov",
          },
          {
            id: 36,
            title: "Number 6",
            description: "FSL number sign demonstration for 6.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744402/7_dgve0t.mov",
          },
          {
            id: 37,
            title: "Number 7",
            description: "FSL number sign demonstration for 7.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744409/8_sgrydn.mov",
          },
          {
            id: 65,
            title: "Number 8",
            description: "FSL number sign demonstration for 8.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775745616/8_jgsean.mov",
          },
          {
            id: 38,
            title: "Number 9",
            description: "FSL number sign demonstration for 9.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744597/9_gke3o4.mov",
          },
          {
            id: 39,
            title: "Number 10",
            description: "FSL number sign demonstration for 10.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744411/11_fpuvlk.mov",
          },
          {
            id: 66,
            title: "Number 11",
            description: "FSL number sign demonstration for 11.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775745612/11_wkwmj4.mov",
          },
          {
            id: 40,
            title: "Number 12",
            description: "FSL number sign demonstration for 12.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744569/12_vi4mfq.mov",
          },
          {
            id: 41,
            title: "Number 13",
            description: "FSL number sign demonstration for 13.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744575/13_keupax.mov",
          },
          {
            id: 67,
            title: "Number 14",
            description: "FSL number sign demonstration for 14.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775745628/14_gegkuc.mov",
          },
          {
            id: 42,
            title: "Number 15",
            description: "FSL number sign demonstration for 15.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744587/16_t8udmw.mov",
          },
          {
            id: 43,
            title: "Number 16",
            description: "FSL number sign demonstration for 16.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744419/17_ltlde9.mov",
          },
          {
            id: 44,
            title: "Number 17",
            description: "FSL number sign demonstration for 17.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744598/18_fbqdus.mov",
          },
          {
            id: 45,
            title: "Number 18",
            description: "FSL number sign demonstration for 18.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744423/19_jvnhrc.mov",
          },
          {
            id: 46,
            title: "Number 19",
            description: "FSL number sign demonstration for 19.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744589/20_vxdzni.mov",
          },
          {
            id: 47,
            title: "Number 20",
            description: "FSL number sign demonstration for 20.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744424/30_plrbsv.mov",
          },
          {
            id: 48,
            title: "Number 30",
            description: "FSL number sign demonstration for 30.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744723/40_c65zkb.mov",
          },
          {
            id: 49,
            title: "Number 40",
            description: "FSL number sign demonstration for 40.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744428/50_bynauu.mov",
          },
          {
            id: 50,
            title: "Number 50",
            description: "FSL number sign demonstration for 50.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744432/60_gevihx.mov",
          },
          {
            id: 51,
            title: "Number 60",
            description: "FSL number sign demonstration for 60.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744724/70_fzp42w.mov",
          },
          {
            id: 52,
            title: "Number 70",
            description: "FSL number sign demonstration for 70.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744436/80_jjqvid.mov",
          },
          {
            id: 53,
            title: "Number 80",
            description: "FSL number sign demonstration for 80.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744440/90_oehkzs.mov",
          },
          {
            id: 54,
            title: "Number 90",
            description: "FSL number sign demonstration for 90.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744728/100_k9imsp.mov",
          },
          {
            id: 55,
            title: "Number 100",
            description: "FSL number sign demonstration for 100.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744443/200_t30s4c.mov",
          },
          {
            id: 56,
            title: "Number 200",
            description: "FSL number sign demonstration for 200.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744731/300_upx873.mov",
          },
          {
            id: 57,
            title: "Number 300",
            description: "FSL number sign demonstration for 300.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744448/400_lklqhq.mov",
          },
          {
            id: 58,
            title: "Number 400",
            description: "FSL number sign demonstration for 400.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744735/500_xkpzic.mov",
          },
          {
            id: 59,
            title: "Number 500",
            description: "FSL number sign demonstration for 500.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744739/600_jbxebd.mov",
          },
          {
            id: 60,
            title: "Number 600",
            description: "FSL number sign demonstration for 600.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744743/700_fptghx.mov",
          },
          {
            id: 61,
            title: "Number 700",
            description: "FSL number sign demonstration for 700.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744747/800_adkcmc.mov",
          },
          {
            id: 62,
            title: "Number 800",
            description: "FSL number sign demonstration for 800.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744452/900_u5m7t8.mov",
          },
          {
            id: 63,
            title: "Number 900",
            description: "FSL number sign demonstration for 900.",
            groupTitle: "Video 3",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775744457/1000_apidvs.mov",
          },
        ],
        quiz: [
          {
            type: "multiple-choice",
            id: 1,
            instruction:
              "Watch the assigned video and identify the correct FSL sign being performed.",
            question:
              "The video shows a handshape forming a specific letter. The index and thumb point sideways, close together. What letter is this?",
            options: ["J", "D", "G", "A"],
            correctIndex: 2,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775780240/G_fosiq5.mp4",
          },
          {
            type: "multiple-choice",
            id: 2,
            instruction:
              "Identify the correct number based on the sign shown.",
            question:
              "The signer holds up three fingers clearly. What number is being signed?",
            options: ["5", "7", "2", "3"],
            correctIndex: 3,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775780156/3_atssmh.mp4",
          },
          {
            type: "multiple-choice",
            id: 3,
            instruction:
              "Identify the correct letter based on the handshape shown.",
            question:
              "The handshape includes a unique wiggling motion not found in the standard N sign. What letter is this?",
            options: ["N", "E", "Ñ", "F"],
            correctIndex: 2,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775780241/%C3%91_sjpafh.mp4",
          },
          {
            type: "multiple-choice",
            id: 4,
            instruction: "Identify the correct number from the sign shown.",
            question:
              "The signer shows one hand for 10, then adds 5 with the other. What number is this?",
            options: ["12", "13", "14", "15"],
            correctIndex: 3,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775780234/15_ebid4y.mp4",
          },
          {
            type: "matching",
            id: 5,
            instruction:
              "Matching type: choose the video that matches the letter or number described.",
            pairs: [
              {
                prompt: "Letter T",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775781506/T_zio1g3.mp4",
              },
            ],
            videoChoices: L1_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 6,
            instruction:
              "Matching type: choose the video that matches the letter or number described.",
            pairs: [
              {
                prompt: "Number 10",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775781514/10_np4gvl.mp4",
              },
            ],
            videoChoices: L1_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 7,
            instruction:
              "Matching type: choose the video that matches the letter or number described.",
            pairs: [
              {
                prompt: "Letter M",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775781509/M_puxi7n.mp4",
              },
            ],
            videoChoices: L1_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 8,
            instruction:
              "Matching type: choose the video that matches the letter or number described.",
            pairs: [
              {
                prompt: "Number 17",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775781510/17_yloulb.mp4",
              },
            ],
            videoChoices: L1_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "construction",
            id: 9,
            instruction:
              "Using FSL fingerspelling, write your answer with each letter separated by a dash.",
            prompt:
              "Fingerspell your full name: (Example: G-E-S-T-U-R-O)",
            acceptedAnswers: [],
            acceptFingerspellingFormat: true,
            exampleVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775782056/fingerspell_full_name_ex._GesTURO_cdm7pw.mp4",
            hint: "Spell your own name — hyphens (J-U-A-N), spaces, or plain letters (Juan) are all fine.",
          },
          {
            type: "construction",
            id: 10,
            instruction:
              "Watch each video and write the number being signed (digits only).",
            prompt: "Answer both items below.",
            acceptedAnswers: [],
            parts: [
              {
                prompt: "",
                videoUrl:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775782063/i_have_12_apples_gfyqd7.mp4",
                acceptedAnswers: ["12", "twelve", "Twelve", "TWELVE"],
              },
              {
                prompt: "",
                videoUrl:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775782049/me_age_20_aahfce.mp4",
                acceptedAnswers: ["20", "twenty", "Twenty", "TWENTY"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Functional Communication",
    subtitle: "Greetings & Common Phrases",
    description:
      "Some phrases involve facial expressions or body movement. Begins introducing functional communication with memorization of different expressions.",
    color: "emerald",
    gradient: "from-emerald-400 to-emerald-600",
    icon: "👋",
    lessons: [
      {
        id: 1,
        title: "Greetings & Common Phrases",
        description:
          "Learn FSL greetings for daily use and common phrases for everyday communication.",
        objectives: [
          "Understand why FSL greetings are functional for daily use",
          "Learn the importance of non-manual signals (facial expressions, body posture)",
          "Master hand positioning and speed for clear greetings",
          "Learn right-handed vs left-handed signing orientation",
          "Practice common greetings and everyday phrases",
        ],
        videos: [
          {
            id: 1,
            title: "Magandang Umaga!",
            description: "FSL greeting: Good morning.",
            groupTitle: "Greetings",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790614/good_morning_poknhc.mov",
          },
          {
            id: 2,
            title: "Magandang Gabi!",
            description: "FSL greeting: Good evening / Good night.",
            groupTitle: "Greetings",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790604/good_night_oeqoka.mov",
          },
          {
            id: 3,
            title: "Magandang Hapon!",
            description: "FSL greeting: Good afternoon.",
            groupTitle: "Greetings",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790598/good_afternoon_lf3a6s.mov",
          },
          {
            id: 4,
            title: "Magandang Araw!",
            description: "FSL greeting: Good day / Have a nice day.",
            groupTitle: "Greetings",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790612/good_day_xjig5j.mov",
          },
          {
            id: 5,
            title: "Kumusta ka?",
            description: "FSL: How are you?",
            groupTitle: "Greetings",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790644/how_are_you_sy10iu.mov",
          },
          {
            id: 6,
            title: "Ikinagagalak kong makilala ka.",
            description: "FSL: Nice to meet you.",
            groupTitle: "Greetings",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790627/nice_to_meet_you_h1y0aj.mov",
          },
          {
            id: 7,
            title: "Hi! Ako si ___.",
            description: "FSL: Hi! I am ___ (introduction).",
            groupTitle: "Greetings",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790603/HI_I_am_cxnmx7.mov",
          },
          {
            id: 8,
            title: "Pasensya / Patawad (Sorry!)",
            description: "FSL: Sorry / Excuse me (apology).",
            groupTitle: "Common Phrases",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790647/sorry_jshcin.mov",
          },
          {
            id: 9,
            title: "Salamat!",
            description: "FSL: Thank you!",
            groupTitle: "Common Phrases",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790630/thank_you_qsekli.mov",
          },
          {
            id: 10,
            title: "Walang anuman! (You're welcome!)",
            description: "FSL: You're welcome!",
            groupTitle: "Common Phrases",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790634/welcome_mhzdqh.mov",
          },
          {
            id: 11,
            title: "Naiintindihan ko.",
            description: "FSL: I understand.",
            groupTitle: "Common Phrases",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790623/I_understand_xvlcl5.mov",
          },
          {
            id: 12,
            title: "Hindi ko naiintindihan.",
            description: "FSL: I don't understand.",
            groupTitle: "Common Phrases",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790618/i_don_tunderstand_l78def.mov",
          },
          {
            id: 13,
            title: "Kumain ka na?",
            description: "FSL: Have you eaten?",
            groupTitle: "Common Phrases",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790610/you_done_eat_ws3reh.mov",
          },
          {
            id: 14,
            title: "Ayos lang ako.",
            description: "FSL: I'm fine / I'm okay.",
            groupTitle: "Common Phrases",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790606/me_okay_w24dd1.mov",
          },
          {
            id: 15,
            title: "Makikiraan po (Excuse me)",
            description: "FSL: Excuse me (passing through).",
            groupTitle: "Common Phrases",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775790647/excuse_me_brnz4m.mov",
          },
        ],
        quiz: [
          {
            type: "multiple-choice",
            id: 1,
            instruction:
              "Watch the video and identify the correct greeting from the signer’s expressions and movement.",
            question:
              "The signer has a bright smile with a rising hand gesture, like the sun coming up. What greeting is this?",
            options: [
              "Good evening!",
              "Good morning!",
              "Good afternoon!",
              "How are you?",
            ],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775792658/good_morning_dm8vq1.mp4",
          },
          {
            type: "multiple-choice",
            id: 2,
            instruction: "Identify the greeting shown in the video.",
            question:
              "The signer tilts their head calmly and waves their hand downward slowly. What greeting is this?",
            options: [
              "Good morning!",
              "Good evening!",
              "Have a nice day!",
              "Nice to meet you.",
            ],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775792645/good_evening_jevk8y.mp4",
          },
          {
            type: "multiple-choice",
            id: 3,
            instruction: "Identify the greeting shown in the video.",
            question:
              "The signer holds their hand neutral at chest level and points forward. What greeting is this?",
            options: [
              "Good afternoon!",
              "Sorry!",
              "Thank you!",
              "Hi! I am ___.",
            ],
            correctIndex: 0,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775792653/good_afternoon_ntbycw.mp4",
          },
          {
            type: "multiple-choice",
            id: 4,
            instruction: "Identify the greeting shown in the video.",
            question:
              "The signer raises eyebrows high with an open palm circling forward. What greeting is this?",
            options: [
              "Good morning!",
              "Nice to meet you.",
              "How are you?",
              "Excuse me",
            ],
            correctIndex: 2,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775792648/how_are_you__n8aprm.mp4",
          },
          {
            type: "matching",
            id: 5,
            instruction:
              "Matching: watch the prompt clip, then choose the response video that fits.",
            pairs: [
              {
                prompt: "Someone says “Thank you!” — how do you respond?",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793115/you_re_welcome_qxmt1x.mp4",
                promptVideoUrl:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793104/thank_you_xxa5lx.mp4",
              },
            ],
            /* Answer key Q5–8: 5-B, 6-A, 7-C, 8-D (order A–D = fine, welcome, okay, yes/no). */
            videoChoices: L2_LESSON1_RESPONSE_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 6,
            instruction:
              "Matching: watch the prompt clip, then choose the response video that fits.",
            pairs: [
              {
                prompt: "Someone asks “How are you?” — how do you respond?",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793088/i_m_fine_emag2m.mp4",
                promptVideoUrl:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793083/how_are_you__l37sed.mp4",
              },
            ],
            videoChoices: L2_LESSON1_RESPONSE_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 7,
            instruction:
              "Matching: watch the prompt clip, then choose the response video that fits.",
            pairs: [
              {
                prompt: "Someone says “Sorry!” — how do you respond?",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793093/it_s_okay_llsr0x.mp4",
                promptVideoUrl:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793098/sorry_g0j9vz.mp4",
              },
            ],
            videoChoices: L2_LESSON1_RESPONSE_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 8,
            instruction:
              "Matching: watch the prompt clip, then choose the response video that fits.",
            pairs: [
              {
                prompt: "Someone asks “Have you eaten?” — how do you respond?",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793110/yes_no_grthx4.mp4",
                promptVideoUrl:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775793081/have_you_eat__oalamo.mp4",
              },
            ],
            videoChoices: L2_LESSON1_RESPONSE_VIDEO_CHOICES,
          },
          {
            type: "construction",
            id: 9,
            instruction:
              "Write the gloss sequence for introducing yourself (sign order).",
            prompt:
              "Watch the example, then write how you would introduce yourself: HI + I-AM + your name (gloss or fingerspelling).",
            acceptedAnswers: [
              "HI + I-AM + NAME",
              "HI + I AM + NAME",
              "HI I-AM NAME",
              "HI + IAM + NAME",
              "hi + i-am + name",
            ],
            acceptHiIamGlossFormat: true,
            exampleVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775797104/hi_am_otter_gxkfbz.mp4",
            hint: "Format: HI + I-AM + your name (e.g. HI + I-AM + MARIA or HI + I-AM + M-A-R-I-A).",
          },
          {
            type: "construction",
            id: 10,
            instruction:
              "Create a simple FSL gloss for the situation shown in the video.",
            prompt:
              "Scenario: Wishing someone well at the end of a conversation. Write the gloss.",
            acceptedAnswers: [
              "HAVE + NICE + DAY",
              "HAVE NICE DAY",
              "have + nice + day",
              "HAVE+NICE+DAY",
            ],
            exampleVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775797097/have_nice_day_foox8j.mp4",
            hint: "Think about how to say “Have a nice day” in FSL gloss order.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Describing Relationships & Emotions",
    subtitle: "Emotions & Family",
    description:
      "Introduces emotional expressions in FSL. Requires facial expressions and body language. Focuses on expressing emotions and describing family structures.",
    color: "rose",
    gradient: "from-rose-400 to-rose-600",
    icon: "❤️",
    lessons: [
      {
        id: 1,
        title: "Emotions & Relationships",
        description:
          "Learn to express positive and negative emotions, describe family relationships, and connect them together.",
        objectives: [
          "Sign positive emotions: excited, surprised, in love, curious, funny, good, comfortable, energetic, proud, joyful, brave",
          "Sign negative emotions: angry, tired, scared, nervous, upset, hungry, hurt, bored, uncomfortable, hot, cold, worried",
          "Describe family members: father, mother, grandfather, aunt, older sister, friend",
          "Combine relationship and emotion signs in sentences",
        ],
        videos: [
          {
            id: 1,
            title: "Excited – Nasasabik",
            description: "FSL sign for excited.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799514/excited_wjkl4s.mov",
          },
          {
            id: 2,
            title: "Surprised – Gulat",
            description: "FSL sign for surprised.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799551/surprise_semage.mov",
          },
          {
            id: 3,
            title: "In love – May nagugustuhan",
            description: "FSL sign for in love.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799560/love_tvbr21.mov",
          },
          {
            id: 4,
            title: "Curious – Interesado",
            description: "FSL sign for curious.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799502/curious_dt1bxt.mov",
          },
          {
            id: 5,
            title: "Funny – Nakakatawa",
            description: "FSL sign for funny.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799521/funny_t7enqn.mov",
          },
          {
            id: 6,
            title: "Good – Mabuti / Magaling",
            description: "FSL sign for good.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799459/good_ptryqj.mov",
          },
          {
            id: 7,
            title: "Comfortable – Komportable",
            description: "FSL sign for comfortable.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799453/comfortable_qpqbo3.mov",
          },
          {
            id: 8,
            title: "Energetic – Masigla",
            description: "FSL sign for energetic.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799509/energetic_oz3wff.mov",
          },
          {
            id: 9,
            title: "Proud – Ipinagmamalaki",
            description: "FSL sign for proud.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799465/proud_bns6gd.mov",
          },
          {
            id: 10,
            title: "Joyful – Nagagalak / Maligaya",
            description: "FSL sign for joyful.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799542/joyful_nrjneq.mov",
          },
          {
            id: 11,
            title: "Brave – Matapang",
            description: "FSL sign for brave.",
            groupTitle: "Video 1 · Positive Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799449/brave_wf3wzw.mov",
          },
          {
            id: 12,
            title: "Angry – Galit",
            description: "FSL sign for angry.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799492/angry_moahlu.mov",
          },
          {
            id: 13,
            title: "Tired – Pagod",
            description: "FSL sign for tired.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799475/tired_u3ffa4.mov",
          },
          {
            id: 14,
            title: "Scared – Takot",
            description: "FSL sign for scared.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799469/scared_w9uapw.mov",
          },
          {
            id: 15,
            title: "Nervous – Kinakabahan",
            description: "FSL sign for nervous.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799545/nervous_zzxpwv.mov",
          },
          {
            id: 16,
            title: "Upset – Sumasama ang loob",
            description: "FSL sign for upset.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799480/upset_obijac.mov",
          },
          {
            id: 17,
            title: "Hungry – Gutom",
            description: "FSL sign for hungry.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799531/hungry_bhr0ww.mov",
          },
          {
            id: 18,
            title: "Hurt – Masakit",
            description: "FSL sign for hurt.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799536/hurt_u616x5.mov",
          },
          {
            id: 19,
            title: "Bored – Naiinip",
            description: "FSL sign for bored.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799446/bored_xv8rd3.mov",
          },
          {
            id: 20,
            title: "Uncomfortable – Hindi komportable",
            description: "FSL sign for uncomfortable.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799556/uncomfortable_euspg2.mov",
          },
          {
            id: 21,
            title: "Hot – Mainit",
            description: "FSL sign for hot.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799524/hot_hbzeec.mov",
          },
          {
            id: 22,
            title: "Cold – Malamig",
            description: "FSL sign for cold.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799497/cold_pgdnlj.mov",
          },
          {
            id: 23,
            title: "Worried – Nag-aalala",
            description: "FSL sign for worried.",
            groupTitle: "Video 1 · Negative Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775799486/worried_jb1mhf.mov",
          },
          {
            id: 24,
            title: "Father – Tatay",
            description: "FSL sign for father.",
            groupTitle: "Video 2 · Relationships",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800010/father_d5yo3p.mov",
          },
          {
            id: 25,
            title: "Mother – Nanay",
            description: "FSL sign for mother.",
            groupTitle: "Video 2 · Relationships",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800024/mother_k8hupf.mov",
          },
          {
            id: 26,
            title: "Grandfather – Lolo",
            description: "FSL sign for grandfather.",
            groupTitle: "Video 2 · Relationships",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800020/grandfather_ivbcx2.mov",
          },
          {
            id: 27,
            title: "Aunt – Tita",
            description: "FSL sign for aunt.",
            groupTitle: "Video 2 · Relationships",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800006/aunt_zcbxg7.mov",
          },
          {
            id: 28,
            title: "Older Sister – Ate",
            description: "FSL sign for older sister.",
            groupTitle: "Video 2 · Relationships",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800032/old_sister_lnzcml.mov",
          },
          {
            id: 29,
            title: "Friend – Kaibigan",
            description: "FSL sign for friend.",
            groupTitle: "Video 2 · Relationships",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800014/friend_nkpxq8.mov",
          },
          {
            id: 30,
            title: "Masaya ang nanay ko.",
            description: "Connecting relationship + emotion: happy mother.",
            groupTitle: "VIDEO 3: Connecting Relationships and Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800239/my_mom_happy_tnzcmr.mov",
          },
          {
            id: 31,
            title: "Malungkot ang ate ko.",
            description: "Connecting relationship + emotion: sad older sister.",
            groupTitle: "VIDEO 3: Connecting Relationships and Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800241/my_sister_sad_acfiki.mov",
          },
          {
            id: 32,
            title: "Galit ang tatay ko.",
            description: "Connecting relationship + emotion: angry father.",
            groupTitle: "VIDEO 3: Connecting Relationships and Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800203/my_father_angry_k2dzaq.mov",
          },
          {
            id: 33,
            title: "Pagod ang lolo ko.",
            description: "Connecting relationship + emotion: tired grandfather.",
            groupTitle: "VIDEO 3: Connecting Relationships and Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800229/my_grandfather_tired_nvzwtz.mov",
          },
          {
            id: 34,
            title: "Gulat ang kaibigan ko.",
            description: "Connecting relationship + emotion: surprised friend.",
            groupTitle: "VIDEO 3: Connecting Relationships and Emotions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775800209/my_friend_surprised_vf7ara.mov",
          },
        ],
        quiz: [
          {
            type: "multiple-choice",
            id: 1,
            instruction:
              "Based on the visual signs shown, identify the specific emotion being expressed.",
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775803009/surpise_jdygav.mp4",
            question:
              "The signer has wide eyes, an open mouth, and raises their hands quickly. What emotion is this?",
            options: ["Tired", "Happy", "Angry", "Surprised"],
            correctIndex: 3,
          },
          {
            type: "multiple-choice",
            id: 2,
            instruction: "Identify the emotion shown by the signer.",
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775802994/angry_f8cojj.mp4",
            question:
              "The signer has furrowed brows and a tensed jaw. What emotion is this?",
            options: ["Angry", "Tired", "Surprised", "Happy"],
            correctIndex: 0,
          },
          {
            type: "multiple-choice",
            id: 3,
            instruction: "Identify the emotion shown by the signer.",
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775803003/tired_bzjbw4.mp4",
            question:
              "The signer shows a drooping face and rubs their eyes. What emotion is this?",
            options: ["Surprised", "Happy", "Angry", "Tired"],
            correctIndex: 3,
          },
          {
            type: "multiple-choice",
            id: 4,
            instruction: "Identify the emotion shown by the signer.",
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775802997/happy_un0vzl.mp4",
            question:
              "The signer has a big smile and bounces their hands near the chest. What emotion is this?",
            options: ["Tired", "Happy", "Surprised", "Angry"],
            correctIndex: 1,
          },
          {
            type: "matching",
            id: 5,
            instruction:
              "Match each signed description with its correct meaning.",
            pairs: [
              {
                prompt:
                  "Signer points to forehead area (Male) + frowny/crying gesture",
                answer: "Malungkot ang tatay ko.",
                promptVideoUrl:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775803199/my_father_sad_wfceqh.mp4",
              },
              {
                prompt:
                  'Signer does "Female" sign near jaw + confident smile + thumb up chest',
                answer: "Ipinagmamalaki ako ng nanay ko.",
                promptVideoUrl:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775803218/my_mom_proud_me_cuwapv.mp4",
              },
              {
                prompt:
                  '"Male" + "Old" sign + calm relaxed face + rubbing chest',
                answer: "Komportable ang lolo ko.",
                promptVideoUrl:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775803211/my_grandfather_comfortable__bf7zwr.mp4",
              },
              {
                prompt:
                  "Signer interlocks index fingers + wide eyes + shaking hands",
                answer: "Natatakot ang kaibigan ko.",
                promptVideoUrl:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775803204/my_friend_scared_nl82vr.mp4",
              },
            ],
            options: [
              "Malungkot ang tatay ko.",
              "Ipinagmamalaki ako ng nanay ko.",
              "Komportable ang lolo ko.",
              "Natatakot ang kaibigan ko.",
            ],
          },
          {
            type: "construction",
            id: 6,
            instruction:
              "Translate the sentence into the correct FSL sign order (Gloss).",
            prompt: '"Masaya ang nanay ko."',
            exampleVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775803401/my_mom_happy_egoosa.mp4",
            acceptedAnswers: [
              "NANAY + KO + MASAYA",
              "NANAY KO MASAYA",
              "nanay + ko + masaya",
              "NANAY+KO+MASAYA",
            ],
            hint: "In FSL gloss, the subject comes first, then the possessive, then the emotion.",
          },
          {
            type: "construction",
            id: 7,
            instruction:
              "Translate the sentence into the correct FSL sign order (Gloss).",
            prompt: '"Malungkot ang ate ko."',
            exampleVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775803409/my_old_sister_sad_myur5j.mp4",
            acceptedAnswers: [
              "ATE + KO + MALUNGKOT",
              "ATE KO MALUNGKOT",
              "ate + ko + malungkot",
              "ATE+KO+MALUNGKOT",
            ],
            hint: "Follow the same pattern: relationship + possessive + emotion.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Scheduling & Money",
    subtitle: "Time, Dates & Transactions",
    description:
      "Introduces signs for time, dates, daily schedules, buying, selling, and handling money.",
    color: "amber",
    gradient: "from-amber-400 to-amber-600",
    icon: "🕐",
    lessons: [
      {
        id: 1,
        title: "Scheduling & Money",
        description:
          "Learn to sign time, dates, days of the week, months, and money-related transactions.",
        objectives: [
          "Sign basic time expressions (Anong oras?, Ngayon, Bukas, Kahapon)",
          "Sign parts of the day and exact times",
          "Sign days of the week and months of the year",
          "Learn money signs (Piso, Sentimo, Magkano?)",
          "Practice transaction signs (Bili, Bayad, Sukli)",
          "Learn shopping vocabulary (Benta, Mahal, Mura, Pagkain, Damit, Tubig, Tinapay)",
        ],
        videos: [
          {
            id: 1,
            title: "Anong oras? (What time?)",
            description: "Basic Time Signs",
            groupTitle: "Video 1: Time — Basic Time Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775805697/What_time_pageqe.mov",
          },
          {
            id: 2,
            title: "Ilang oras na? (What time is it now?)",
            description: "Basic Time Signs",
            groupTitle: "Video 1: Time — Basic Time Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775805716/What_time_now_ildbxg.mov",
          },
          {
            id: 3,
            title: "Ngayon (Now/Today)",
            description: "Basic Time Signs",
            groupTitle: "Video 1: Time — Basic Time Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775805706/Now_qhiizp.mov",
          },
          {
            id: 4,
            title: "Bukas (Tomorrow)",
            description: "Basic Time Signs",
            groupTitle: "Video 1: Time — Basic Time Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775805720/Tomorrow_osfptc.mov",
          },
          {
            id: 5,
            title: "Kahapon (Yesterday)",
            description: "Basic Time Signs",
            groupTitle: "Video 1: Time — Basic Time Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775805717/Yesterday_s39xyp.mov",
          },
          {
            id: 6,
            title: "Umaga (Morning)",
            description: "Parts of the Day and Exact Time",
            groupTitle: "Video 2: Time — Parts of the Day and Exact Time",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807021/Morning_dpim9d.mov",
          },
          {
            id: 7,
            title: "Hapon (Afternoon)",
            description: "Parts of the Day and Exact Time",
            groupTitle: "Video 2: Time — Parts of the Day and Exact Time",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807017/Afternoon_sie47m.mov",
          },
          {
            id: 8,
            title: "Gabi (Evening/Night)",
            description: "Parts of the Day and Exact Time",
            groupTitle: "Video 2: Time — Parts of the Day and Exact Time",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807034/Night_sl3e8u.mov",
          },
          {
            id: 9,
            title: "O'clock time (1:00, 2:00, etc.)",
            description: "Parts of the Day and Exact Time",
            groupTitle: "Video 2: Time — Parts of the Day and Exact Time",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807032/Time_clock_z8mday.mov",
          },
          {
            id: 10,
            title: "Kalahati (Half-past: 1:30, 2:30)",
            description: "Advanced Time Expressions",
            groupTitle: "Video 3: Time — Advanced Time Expressions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807106/Half-_past_bkaej3.mov",
          },
          {
            id: 11,
            title: "Quarter to (1:45, 2:45)",
            description: "Advanced Time Expressions",
            groupTitle: "Video 3: Time — Advanced Time Expressions",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807110/Quarter_to_gdu2tx.mov",
          },
          {
            id: 12,
            title: "Lunes (Monday)",
            description: "Days of the Week",
            groupTitle: "Video 4: Date - Days — Days of the Week",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807162/Monday_yxp7k5.mov",
          },
          {
            id: 13,
            title: "Martes (Tuesday)",
            description: "Days of the Week",
            groupTitle: "Video 4: Date - Days — Days of the Week",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807179/Tuesday_thrhvt.mov",
          },
          {
            id: 14,
            title: "Miyerkules (Wednesday)",
            description: "Days of the Week",
            groupTitle: "Video 4: Date - Days — Days of the Week",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807184/Wednesday_y2ytei.mov",
          },
          {
            id: 15,
            title: "Huwebes (Thursday)",
            description: "Days of the Week",
            groupTitle: "Video 4: Date - Days — Days of the Week",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807175/Thursday_k576sr.mov",
          },
          {
            id: 16,
            title: "Biyernes (Friday)",
            description: "Days of the Week",
            groupTitle: "Video 4: Date - Days — Days of the Week",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807159/Friday_ishorw.mov",
          },
          {
            id: 17,
            title: "Sabado (Saturday)",
            description: "Days of the Week",
            groupTitle: "Video 4: Date - Days — Days of the Week",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807166/Saturday_xmbzcw.mov",
          },
          {
            id: 18,
            title: "Linggo (Sunday)",
            description: "Days of the Week",
            groupTitle: "Video 4: Date - Days — Days of the Week",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807170/Sunday_awcize.mov",
          },
          {
            id: 19,
            title: "Enero, Pebrero, Marso",
            description: "Months of the Year",
            groupTitle: "Video 5: Date - Months — Months of the Year",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807350/January_February_March_kivked.mov",
          },
          {
            id: 20,
            title: "Abril, Mayo, Hunyo",
            description: "Months of the Year",
            groupTitle: "Video 5: Date - Months — Months of the Year",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807352/April_May_June_kmd0jy.mov",
          },
          {
            id: 21,
            title: "Hulyo, Agosto, Setyembre",
            description: "Months of the Year",
            groupTitle: "Video 5: Date - Months — Months of the Year",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807361/July_August_September_i7i5gw.mov",
          },
          {
            id: 22,
            title: "Oktubre, Nobyembre, Disyembre",
            description: "Months of the Year",
            groupTitle: "Video 5: Date - Months — Months of the Year",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807351/October_November_December_e36pq7.mov",
          },
          {
            id: 23,
            title: "Piso (Peso)",
            description: "Basic Money Signs",
            groupTitle: "Video 6: Money — Basic Money Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807577/Peso_sgsxew.mov",
          },
          {
            id: 24,
            title: "Sentimo (Centavo)",
            description: "Basic Money Signs",
            groupTitle: "Video 6: Money — Basic Money Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807568/Centavo_frumhe.mov",
          },
          {
            id: 25,
            title: "Magkano? (How much?)",
            description: "Basic Money Signs",
            groupTitle: "Video 6: Money — Basic Money Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807569/How_much_bebpck.mov",
          },
          {
            id: 26,
            title: "Bili (Buy)",
            description: "Basic Transaction Signs",
            groupTitle: "Video 7: Transactions — Basic Transaction Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807625/Buy_ylzdjh.mov",
          },
          {
            id: 27,
            title: "Bayad (Pay)",
            description: "Basic Transaction Signs",
            groupTitle: "Video 7: Transactions — Basic Transaction Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807633/Pay_pren7k.mov",
          },
          {
            id: 28,
            title: "Sukli (Change)",
            description: "Basic Transaction Signs",
            groupTitle: "Video 7: Transactions — Basic Transaction Signs",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807628/Change_br6sq4.mov",
          },
          {
            id: 29,
            title: "Benta (Sell)",
            description: "Shopping Descriptors",
            groupTitle: "Video 8: Shopping — Shopping Descriptors",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807697/Sell_gsa8dk.mov",
          },
          {
            id: 30,
            title: "Mahal (Expensive)",
            description: "Shopping Descriptors",
            groupTitle: "Video 8: Shopping — Shopping Descriptors",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807692/Expensive_rvahxh.mov",
          },
          {
            id: 31,
            title: "Mura (Cheap)",
            description: "Shopping Descriptors",
            groupTitle: "Video 8: Shopping — Shopping Descriptors",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807689/Cheap_wy4zbg.mov",
          },
          {
            id: 32,
            title: "Pagkain (Food)",
            description: "Common Items",
            groupTitle: "Video 9: Items — Common Items",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807745/Food_mgrla5.mov",
          },
          {
            id: 33,
            title: "Damit (Clothes)",
            description: "Common Items",
            groupTitle: "Video 9: Items — Common Items",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807741/Clothes_sw3c3l.mov",
          },
          {
            id: 34,
            title: "Tubig (Water)",
            description: "Common Items",
            groupTitle: "Video 9: Items — Common Items",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807749/Water_whxixa.mov",
          },
          {
            id: 35,
            title: "Tinapay (Bread)",
            description: "Common Items",
            groupTitle: "Video 9: Items — Common Items",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775807736/Bread_tet0ws.mov",
          },
        ],
        quiz: [
          {
            type: "multiple-choice",
            id: 1,
            instruction:
              "Watch the FSL video and choose the correct meaning of the sign. (Sign Recognition)",
            question:
              "The signer taps their wrist like checking a watch. What does this sign mean?",
            options: ["Tomorrow", "Time", "Money", "Yesterday"],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775808578/time_nejhbg.mp4",
          },
          {
            type: "multiple-choice",
            id: 2,
            instruction: "Identify the meaning of the sign shown.",
            question:
              "The signer rubs their fingers together. What does this sign mean?",
            options: ["Buy", "Expensive", "Money", "Sell"],
            correctIndex: 2,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775808572/money_apkglk.mp4",
          },
          {
            type: "multiple-choice",
            id: 3,
            instruction: "Identify the meaning of the sign shown.",
            question:
              "The signer holds palm up with a questioning expression. What does this sign mean?",
            options: ["Pay", "Price", "Change", "Cheap"],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775808574/price_brly1z.mp4",
          },
          {
            type: "multiple-choice",
            id: 4,
            instruction: "Identify the meaning of the sign shown.",
            question:
              "The signer moves their hand forward to indicate future time. What does this sign mean?",
            options: ["Yesterday", "Today", "Tomorrow", "Morning"],
            correctIndex: 2,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775808583/tomorrow_gmfdb6.mp4",
          },
          {
            type: "matching",
            id: 5,
            instruction:
              "Match the prompt with the correct video choice.",
            pairs: [
              {
                prompt: "Choose the clip for: Thank you.",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775809028/thank_kbx4bs.mp4",
              },
            ],
            videoChoices: L4_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 6,
            instruction:
              "Match the prompt with the correct video choice.",
            pairs: [
              {
                prompt: "Choose the clip for: Pay.",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775808929/pay_vwsrje.mp4",
              },
            ],
            videoChoices: L4_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 7,
            instruction:
              "Match the prompt with the correct video choice.",
            pairs: [
              {
                prompt: "Choose the clip for: Ask for price.",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775808923/ask_for_price_mlxmmi.mp4",
              },
            ],
            videoChoices: L4_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 8,
            instruction:
              "Match the prompt with the correct video choice.",
            pairs: [
              {
                prompt: "Choose the clip for: Greeting.",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775808928/greet_o7xaen.mp4",
              },
            ],
            videoChoices: L4_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "multiple-choice",
            id: 9,
            instruction:
              "Watch the FSL video and choose the correct answer to fill in the blank.",
            question: '"I will go to the market ______ at 3 PM."',
            options: ["Yesterday", "Tomorrow", "Morning", "Now"],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775809194/i_will_go_to_the_market_tomorrow_rlrgmc.mp4",
          },
          {
            type: "multiple-choice",
            id: 10,
            instruction:
              "Watch the FSL video and choose the correct answer to fill in the blank.",
            question: '"I would like to ___ water."',
            options: ["Morning", "Night", "Bread", "Buy"],
            correctIndex: 3,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775809199/the_item_how_much_uzjztz.mp4",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Spatial Communication",
    subtitle: "Transportation & Directions",
    description:
      "Uses spatial concepts such as left, right, near, far. Requires coordination of hand movement, location, and spatial awareness.",
    color: "violet",
    gradient: "from-violet-400 to-violet-600",
    icon: "🚌",
    lessons: [
      {
        id: 1,
        title: "Transportation & Directions",
        description:
          "Learn to sign different vehicles, landmarks, and directional signs for navigation.",
        objectives: [
          "Sign transportation vocabulary: Jeepney, Tricycle, Bus, Train, Motorcycle",
          "Sign landmarks: Kanto, Tulay, Simbahan, Palengke, Hospital, Paaralan",
          "Sign directions: Kaliwa, Kanan, Derecho, Likod, Liko",
          "Express distance: Malapit (Near) and Malayo (Far)",
          "Construct route descriptions combining transportation and directions",
        ],
        videos: [
          {
            id: 1,
            title: "Jeepney",
            description: "Transportation Vocabulary",
            groupTitle: "VIDEO 1 — TRANSPORTATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810423/Jeepney_bajcwx.mov",
          },
          {
            id: 2,
            title: "Tricycle",
            description: "Transportation Vocabulary",
            groupTitle: "VIDEO 1 — TRANSPORTATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810446/Tricycle_s8lf9r.mov",
          },
          {
            id: 3,
            title: "Bus",
            description: "Transportation Vocabulary",
            groupTitle: "VIDEO 1 — TRANSPORTATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810418/Bus_kpi7xs.mov",
          },
          {
            id: 4,
            title: "Train",
            description: "Transportation Vocabulary",
            groupTitle: "VIDEO 1 — TRANSPORTATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810438/Train_vw27aw.mov",
          },
          {
            id: 5,
            title: "Moto",
            description: "Transportation Vocabulary",
            groupTitle: "VIDEO 1 — TRANSPORTATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810428/Moto_bsrtf0.mov",
          },
          {
            id: 6,
            title: "Kanto (Corner)",
            description: "Landmarks",
            groupTitle: "VIDEO 2 — LANDMARKS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810923/Corner_ienzil.mov",
          },
          {
            id: 7,
            title: "Tulay (Bridge)",
            description: "Landmarks",
            groupTitle: "VIDEO 2 — LANDMARKS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810913/Bridge_ef5d77.mov",
          },
          {
            id: 8,
            title: "Simbahan (Church)",
            description: "Landmarks",
            groupTitle: "VIDEO 2 — LANDMARKS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810917/Church_oumxi3.mov",
          },
          {
            id: 9,
            title: "Palengke (Market)",
            description: "Landmarks",
            groupTitle: "VIDEO 2 — LANDMARKS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810939/Market_zoq7po.mov",
          },
          {
            id: 10,
            title: "Hospital",
            description: "Landmarks",
            groupTitle: "VIDEO 2 — LANDMARKS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810934/Hospital_pnbq4x.mov",
          },
          {
            id: 11,
            title: "Paaralan (School)",
            description: "Landmarks",
            groupTitle: "VIDEO 2 — LANDMARKS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775810945/School_sfaikf.mov",
          },
          {
            id: 12,
            title: "Kaliwa (Left)",
            description: "Directions",
            groupTitle: "VIDEO 3 — DIRECTIONS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775811048/Left_epi1dl.mov",
          },
          {
            id: 13,
            title: "Kanan (Right)",
            description: "Directions",
            groupTitle: "VIDEO 3 — DIRECTIONS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775811063/Right_vqjxkm.mov",
          },
          {
            id: 14,
            title: "Derecho (Straight)",
            description: "Directions",
            groupTitle: "VIDEO 3 — DIRECTIONS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775811073/Straight_lwcls9.mov",
          },
          {
            id: 15,
            title: "Likod (Back)",
            description: "Directions",
            groupTitle: "VIDEO 3 — DIRECTIONS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775811030/Back_ptb69l.mov",
          },
          {
            id: 16,
            title: "Malapit (Near) and Malayo (Far)",
            description: "Distance (NMS)",
            groupTitle: "VIDEO 3 — DIRECTIONS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775811061/Near_and_Far_nj1yuf.mov",
          },
          {
            id: 17,
            title: "Punta and Alis",
            description: "Distance (NMS)",
            groupTitle: "VIDEO 3 — DIRECTIONS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775811047/Go_and_Leave_c86jz2.mov",
          },
          {
            id: 18,
            title: "Sumakay ng bus, diretso sa simbahan.",
            description: "Signs shown: Bus + Ako + Diretso + Simbahan",
            groupTitle: "VIDEO 4 — APPLICATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775811249/Bus_-_ako_-_diretso_-_church_l5pkr0.mov",
          },
          {
            id: 19,
            title: "Sumakay ako ng jeepney, bumaba sa paaralan.",
            description: "Signs shown: Jeepney + Ako + Punta + Paaralan + Baba",
            groupTitle: "VIDEO 4 — APPLICATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775811251/Jeepney_-_ako_-_go_-_school_-_down_yadzah.mov",
          },
        ],
        quiz: [
          {
            type: "multiple-choice",
            id: 1,
            instruction:
              "Watch the FSL video and choose the correct meaning of the sign.",
            question:
              "The sign shows one hand moving forward while slightly bouncing. What vehicle is this?",
            options: ["Train", "Bus", "Jeepney", "Motorcycle"],
            correctIndex: 2,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775820852/jeep_pa7vjk.mp4",
          },
          {
            type: "multiple-choice",
            id: 2,
            instruction: "Watch the FSL video and identify the direction shown.",
            question:
              "The sign shows the hand moving toward the right side of the body. What direction is this?",
            options: ["Kanan", "Kaliwa", "Liko", "Diretso"],
            correctIndex: 0,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775820869/right_feptj9.mp4",
          },
          {
            type: "multiple-choice",
            id: 3,
            instruction: "Watch the FSL video and identify the vehicle shown.",
            question:
              "The sign shows both hands gripping an imaginary steering wheel, with a large frame. What vehicle is this?",
            options: ["Train", "Bus", "Jeepney", "Motorcycle"],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775820846/bus_n7tbnj.mp4",
          },
          {
            type: "multiple-choice",
            id: 4,
            instruction: "Watch the FSL video and identify the direction shown.",
            question:
              "The sign shows the hand moving toward the left side of the body. What direction is this?",
            options: ["Kanan", "Kaliwa", "Liko", "Diretso"],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775820862/left_jarnsi.mp4",
          },
          {
            type: "matching",
            id: 5,
            instruction:
              "Match the landmark with the correct video (A–D).",
            pairs: [
              {
                prompt: "Paaralan (School)",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775821143/school_dqr1gs.mp4",
              },
            ],
            videoChoices: L5_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 6,
            instruction:
              "Match the landmark with the correct video (A–D).",
            pairs: [
              {
                prompt: "Simbahan (Church)",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775821116/church_tuynwp.mp4",
              },
            ],
            videoChoices: L5_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 7,
            instruction:
              "Match the landmark with the correct video (A–D).",
            pairs: [
              {
                prompt: "Palengke (Market)",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775821131/market_e4xh0m.mp4",
              },
            ],
            videoChoices: L5_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 8,
            instruction:
              "Match the landmark with the correct video (A–D).",
            pairs: [
              {
                prompt: "Hospital",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775821122/hospital_n1td1d.mp4",
              },
            ],
            videoChoices: L5_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "multiple-choice",
            id: 9,
            instruction:
              "Watch the FSL video and choose the best meaning.",
            question: "What does the signed sequence mean?",
            options: [
              "Going to the market",
              "Going to school",
              "Going to the hospital",
              "Going home",
            ],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775821278/go_school_r1nrp9.mp4",
          },
          {
            type: "multiple-choice",
            id: 10,
            instruction:
              "Watch the FSL video and choose the best description of the route.",
            question: "Which description matches the signs shown?",
            options: [
              "Turn left, then straight to the church",
              "Straight, then right toward the hospital",
              "Right, then left toward the market",
              "Back, then straight to school",
            ],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775821270/direct_right_hospital_xhzyf2.mp4",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Emergency Situations",
    subtitle: "Safety & Health Signs",
    description:
      "Uses basic signs for emergencies. Requires quick and clear signing with simple communication of important details.",
    color: "red",
    gradient: "from-red-400 to-red-600",
    icon: "🚨",
    lessons: [
      {
        id: 1,
        title: "Emergency Situations",
        description:
          "Learn essential emergency signs including core safety, health, disaster, action/request signs, and sentence formation.",
        objectives: [
          "Sign core emergency words: Emergency, Help, Rescue, Danger, Safe, Not safe",
          "Sign health-related terms: Fever, Headache, Stomachache, Cold, Sick, Medicine",
          "Sign disaster terms: Fire, Flood, Typhoon, Rain, Earthquake, Landslide",
          "Sign people and places: Thief, Doctor, Firefighter, Hospital",
          "Use action/request signs: Call, Need help, Follow me, Run, Stay, Stop",
          "Construct emergency sentences in FSL",
        ],
        videos: [
          {
            id: 1,
            title: "Emergency (Sakuna)",
            description: "Core Emergency Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826486/emergency_tq7sgc.mov",
          },
          {
            id: 2,
            title: "Help (Tulong)",
            description: "Core Emergency Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826492/help_rfnyps.mov",
          },
          {
            id: 3,
            title: "Rescue (Pagsagip)",
            description: "Core Emergency Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826513/rescue_qpedkt.mov",
          },
          {
            id: 4,
            title: "Danger (Panganib)",
            description: "Core Emergency Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826378/danger_uhf61u.mov",
          },
          {
            id: 5,
            title: "Safe (Ligtas)",
            description: "Core Emergency Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826504/safe_dletij.mov",
          },
          {
            id: 6,
            title: "Not safe (Hindi ligtas)",
            description: "Core Emergency Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826499/not_safe_oun9ls.mov",
          },
          {
            id: 7,
            title: "Fever (Lagnat)",
            description: "Health-Related Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826586/Fever_qu8q7e.mov",
          },
          {
            id: 8,
            title: "Headache (Sakit ng ulo)",
            description: "Health-Related Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826595/Headache_j9cgal.mov",
          },
          {
            id: 9,
            title: "Stomachache (Sakit ng tiyan)",
            description: "Health-Related Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826670/Stomachache_uft7jl.mov",
          },
          {
            id: 10,
            title: "Cold (Sipon)",
            description: "Health-Related Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826585/Cold_o1whfu.mov",
          },
          {
            id: 11,
            title: "Sick (May sakit)",
            description: "Health-Related Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826668/Sick_tvffg0.mov",
          },
          {
            id: 12,
            title: "Medicine (Gamot)",
            description: "Health-Related Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826657/Medicine_umiwvm.mov",
          },
          {
            id: 13,
            title: "Fire (Sunog)",
            description: "Disaster and Environment Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826734/Fire_ep8z4c.mov",
          },
          {
            id: 14,
            title: "Flood (Baha)",
            description: "Disaster and Environment Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826747/Flood_vcmava.mov",
          },
          {
            id: 15,
            title: "Typhoon (Bagyo)",
            description: "Disaster and Environment Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826763/Typhoon_ov6pa1.mov",
          },
          {
            id: 16,
            title: "Rain (Ulan)",
            description: "Disaster and Environment Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826760/Rain_uhdwxu.mov",
          },
          {
            id: 17,
            title: "Earthquake (Lindol)",
            description: "Disaster and Environment Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826743/Earthquake_zp8jfh.mov",
          },
          {
            id: 18,
            title: "Landslide (Pagguho ng lupa)",
            description: "Disaster and Environment Signs",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826750/Landslide_mfuyky.mov",
          },
          {
            id: 19,
            title: "Thief (Magnanakaw)",
            description: "People and Places",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826837/Thief_jjfrqd.mov",
          },
          {
            id: 20,
            title: "Doctor (Doktor/Manggagamot)",
            description: "People and Places",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826828/Doctor_b5zy3v.mov",
          },
          {
            id: 21,
            title: "Firefighter (Bumbero)",
            description: "People and Places",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826837/Firefighter_vzvipq.mov",
          },
          {
            id: 22,
            title: "Hospital (Ospital)",
            description: "People and Places",
            groupTitle: "VIDEO 1 — BASIC EMERGENCY SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826832/Hospital_fwqmka.mov",
          },
          {
            id: 23,
            title: "Call (Tumawag)",
            description: "Asking for help",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826937/Call_slu75a.mov",
          },
          {
            id: 24,
            title: "Call for help (Tumawag ng tulong)",
            description: "Asking for help",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826940/Call_Help_k2y9xu.mov",
          },
          {
            id: 25,
            title: "Need help (Kailangan ng tulong)",
            description: "Asking for help",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826934/Need_Help_oex0ol.mov",
          },
          {
            id: 26,
            title: "Help me (Tulungan ako)",
            description: "Asking for help",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826952/Help_me_dxwsqr.mov",
          },
          {
            id: 27,
            title: "Help you (Tulungan kita)",
            description: "Asking for help",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826965/Help_you_bmwjc0.mov",
          },
          {
            id: 28,
            title: "Help them (Tulungan sila)",
            description: "Asking for help",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775826958/Help_Them_eurzbs.mov",
          },
          {
            id: 29,
            title: "Follow me (Sumunod sa akin)",
            description: "Guiding",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775827044/Follow_Me_wnjkdf.mov",
          },
          {
            id: 30,
            title: "Follow them (Sumunod sa kanila)",
            description: "Guiding",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775827049/Follow_Them_mcul2s.mov",
          },
          {
            id: 31,
            title: "Calm down (Kumalma)",
            description: "Guiding",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775827038/Calm_Down_ipz7jq.mov",
          },
          {
            id: 32,
            title: "Run (Takbo)",
            description: "Movement and Control Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828362/Run_dsrxxc.mov",
          },
          {
            id: 33,
            title: "Stay (Manatili)",
            description: "Movement and Control Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828385/Stay_vl6gtf.mov",
          },
          {
            id: 34,
            title: "Wait (Maghintay)",
            description: "Movement and Control Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828372/Wait_nkbmii.mov",
          },
          {
            id: 35,
            title: "Hold (Humawak)",
            description: "Movement and Control Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828358/Hold_aypgdx.mov",
          },
          {
            id: 36,
            title: "Stop (Tumigil)",
            description: "Movement and Control Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828366/Stop_lxbwab.mov",
          },
          {
            id: 37,
            title: "Go (Umalis/Pumunta)",
            description: "Movement and Control Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828378/Go_n8oxp0.mov",
          },
          {
            id: 38,
            title: "Cover (Takpan)",
            description: "Safety Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828471/Cover_nozgum.mov",
          },
          {
            id: 39,
            title: "Roll (Gumulong)",
            description: "Safety Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828496/Roll_ethhaz.mov",
          },
          {
            id: 40,
            title: "Crawl (Gumapang)",
            description: "Safety Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828476/Crawl_h2gp4e.mov",
          },
          {
            id: 41,
            title: "Inside (Loob)",
            description: "Safety Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828483/Inside_jcjw5c.mov",
          },
          {
            id: 42,
            title: "Outside (Labas)",
            description: "Safety Actions",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775828485/Outside_rhpywa.mov",
          },
          {
            id: 43,
            title: "First Aid Kit (Kit pangunang lunas)",
            description: "Emergency Tools",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775829195/First_Aid_Kit_gy8c9n.mov",
          },
          {
            id: 44,
            title: "Flashlight (Ilaw)",
            description: "Emergency Tools",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775829199/Flashlight_agtygx.mov",
          },
          {
            id: 45,
            title: "Fire Extinguisher (Pamatay-sunog)",
            description: "Emergency Tools",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775829192/Fire_Extinguisher_l52lwe.mov",
          },
          {
            id: 46,
            title: "Whistle (Pito)",
            description: "Emergency Tools",
            groupTitle: "VIDEO 2 — ACTION / REQUEST SIGNS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775829206/Whistle_v4omnk.mov",
          },
          {
            id: 47,
            title: "“Help! There is a fire.” (“Tulong! May sunog.”)",
            description: "Emergency sentence",
            groupTitle: "VIDEO 3 — EMERGENCY SENTENCE FORMATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775829268/Help_There_is_a_fire_hcgloj.mov",
          },
          {
            id: 48,
            title: "“I have a headache.” (“Masakit ang ulo ko.”)",
            description: "Emergency sentence",
            groupTitle: "VIDEO 3 — EMERGENCY SENTENCE FORMATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775829275/I_have_a_headache_enc95l.mov",
          },
          {
            id: 49,
            title: "“There is a flood in our area.” (“May baha sa aming lugar.”)",
            description: "Emergency sentence",
            groupTitle: "VIDEO 3 — EMERGENCY SENTENCE FORMATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775829281/There_s_a_flood_in_the_area_zj0ht7.mov",
          },
          {
            id: 50,
            title: "“Where’s the Hospital?” (“Asan ang ospital?”)",
            description: "Emergency sentence",
            groupTitle: "VIDEO 3 — EMERGENCY SENTENCE FORMATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775829286/Where_s_the_Hospital_d40aic.mov",
          },
        ],
        quiz: [
          {
            type: "multiple-choice",
            id: 1,
            instruction:
              "Watch the FSL video and choose the correct meaning.",
            question:
              "The signer waves their hand upward like flames. What emergency sign is this?",
            options: ["Flood", "Fire", "Earthquake", "Rain"],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775830560/fire_nnxfdc.mp4",
          },
          {
            type: "multiple-choice",
            id: 2,
            instruction: "Identify the emergency sign shown.",
            question:
              "One hand helps the other upward in a lifting motion. What sign is this?",
            options: ["Run", "Wait", "Help", "Stop"],
            correctIndex: 2,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775830566/help_eordis.mp4",
          },
          {
            type: "multiple-choice",
            id: 3,
            instruction: "Identify the emergency sign shown.",
            question:
              "The signer shakes hands with an intense facial expression. What sign is this?",
            options: ["Safe", "Danger", "Calm", "Follow"],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775830550/danger_oytzga.mp4",
          },
          {
            type: "multiple-choice",
            id: 4,
            instruction: "Identify the person being signed.",
            question:
              "The signer forms a cross-like shape on the arm, like a medical symbol. Who is being signed?",
            options: ["Firefighter", "Doctor", "Thief", "Police"],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775830554/doctor_pqm2y4.mp4",
          },
          {
            type: "matching",
            id: 5,
            instruction:
              "Match the situation with the correct video (A–D).",
            pairs: [
              {
                prompt: "You want to ask for help",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775831787/help_j0vtx9.mp4",
              },
            ],
            videoChoices: L6_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 6,
            instruction:
              "Match the situation with the correct video (A–D).",
            pairs: [
              {
                prompt: "You need to contact emergency services",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775831770/call_tubyfd.mp4",
              },
            ],
            videoChoices: L6_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 7,
            instruction:
              "Match the situation with the correct video (A–D).",
            pairs: [
              {
                prompt: "You are telling someone to follow you",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775831792/follow_me_wa6gv1.mp4",
              },
            ],
            videoChoices: L6_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 8,
            instruction:
              "Match the situation with the correct video (A–D).",
            pairs: [
              {
                prompt: "You are calming someone down",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775831791/calm_down_n7k0ge.mp4",
              },
            ],
            videoChoices: L6_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "multiple-choice",
            id: 9,
            instruction:
              "Watch the FSL video and choose the best meaning.",
            question: "What emergency message is being signed?",
            options: [
              "There is a flood nearby",
              "Help! There is a fire.",
              "Where is the hospital?",
              "I have a headache.",
            ],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775832957/help_there_s_fire_nldak3.mp4",
          },
          {
            type: "multiple-choice",
            id: 10,
            instruction:
              "Watch the FSL video and choose the best meaning.",
            question: "What is the signer expressing?",
            options: [
              "We are safe now",
              "We need help.",
              "Go outside",
              "Call the doctor",
            ],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775833028/we_need_help...__bbqr0j.mp4",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Glossing",
    subtitle: "FSL Grammar & Structure",
    description:
      "Introduces glossing as a way to represent FSL signs using written words. Focuses on how FSL grammar differs from spoken/written language.",
    color: "indigo",
    gradient: "from-indigo-400 to-indigo-600",
    icon: "📝",
    lessons: [
      {
        id: 1,
        title: "Glossing in FSL",
        description:
          "Learn how to represent FSL signs in written gloss form, including pronouns, indexing, repetition, emphasis, fingerspelling, classifiers, and sentence construction.",
        objectives: [
          "Learn pronouns: PRO.1, PRO.2, PRO.3, PRO.1+, PRO.2+, PRO.3+",
          "Learn indexing: IX-1, IX-2, IX-3",
          "Understand repetition (+) and emphasis (!) markers",
          "Practice fingerspelling and lexicalized signs",
          "Learn hyphenated/compound signs: GET-UP, SIT-DOWN, GO-OUT, COME-IN",
          "Learn classifiers: CL:1, CL:3, CL:F, CL:V, CL:B, CL:C, CL:4",
          "Understand non-manual signals (NMS) in glossing",
          "Construct sentences using FSL gloss",
        ],
        videos: [
          {
            id: 1,
            title: "PRO.1 (Ako)",
            description: "Pronouns",
            groupTitle: "VIDEO 1 — PRONOUNS AND INDEXING",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775835898/Ako_s7zefx.mov",
          },
          {
            id: 2,
            title: "PRO.2 (Ikaw / Ka)",
            description: "Pronouns",
            groupTitle: "VIDEO 1 — PRONOUNS AND INDEXING",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775835915/Ikaw_kjjcj2.mov",
          },
          {
            id: 3,
            title: "PRO.3 (Siya)",
            description: "Pronouns",
            groupTitle: "VIDEO 1 — PRONOUNS AND INDEXING",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775835910/Siya_i10fm1.mov",
          },
          {
            id: 4,
            title: "PRO.1+ (Kami / Tayo)",
            description: "Pronouns",
            groupTitle: "VIDEO 1 — PRONOUNS AND INDEXING",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775835924/Kami-Tayo_v61pj8.mov",
          },
          {
            id: 5,
            title: "PRO.2+ (Kayo)",
            description: "Pronouns",
            groupTitle: "VIDEO 1 — PRONOUNS AND INDEXING",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775835927/Kayo_l1xcfx.mov",
          },
          {
            id: 6,
            title: "PRO.3+ (Sila)",
            description: "Pronouns",
            groupTitle: "VIDEO 1 — PRONOUNS AND INDEXING",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775835904/Sila_esxjpi.mov",
          },
          {
            id: 7,
            title: "TRY+ (Subukan muli / Ulitin ang pagsubok)",
            description: "+ = repetition",
            groupTitle: "VIDEO 2 — REPETITION AND EMPHASIS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775837066/Try_repetition_bouleq.mov",
          },
          {
            id: 8,
            title: "BUSY! (Sobrang abala)",
            description: "! = emphasis",
            groupTitle: "VIDEO 2 — REPETITION AND EMPHASIS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775837062/Busy_emphasis_cvlwbf.mov",
          },
          {
            id: 9,
            title: "W-H-A-T (A-N-O)",
            description: "Fingerspelling",
            groupTitle: "VIDEO 3 — FINGERSPELLING AND LEXICALIZATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775837183/W-H-A-T_tg3uif.mov",
          },
          {
            id: 10,
            title: "B-U-S-Y (A-B-A-L-A)",
            description: "Fingerspelling",
            groupTitle: "VIDEO 3 — FINGERSPELLING AND LEXICALIZATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775837166/B-U-S-Y_kbvspl.mov",
          },
          {
            id: 11,
            title: "O-K",
            description: "Fingerspelling",
            groupTitle: "VIDEO 3 — FINGERSPELLING AND LEXICALIZATION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775837169/O-K_qw9kob.mov",
          },
          {
            id: 12,
            title: "GET-UP (Bumangon)",
            description: "Hyphenated / compound actions",
            groupTitle: "VIDEO 3 — HYPHENATED SIGNS (COMPOUND ACTIONS)",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838220/GET-UP_OR_STAND_xi3xrr.mov",
          },
          {
            id: 13,
            title: "SIT-DOWN (Umupo)",
            description: "Hyphenated / compound actions",
            groupTitle: "VIDEO 3 — HYPHENATED SIGNS (COMPOUND ACTIONS)",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838197/SIT-DOWN_whm9e0.mov",
          },
          {
            id: 14,
            title: "GO-OUT (Lumabas)",
            description: "Hyphenated / compound actions",
            groupTitle: "VIDEO 3 — HYPHENATED SIGNS (COMPOUND ACTIONS)",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838184/GET-OUT_whbbcl.mov",
          },
          {
            id: 15,
            title: "COME-IN (Pumasok)",
            description: "Hyphenated / compound actions",
            groupTitle: "VIDEO 3 — HYPHENATED SIGNS (COMPOUND ACTIONS)",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838168/COME-IN_ggens6.mov",
          },
          {
            id: 16,
            title: "CL:1 — Tao / isang tao",
            description: "Classifiers",
            groupTitle: "VIDEO 4 — CLASSIFIERS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838323/CL__1_-_Tao_-_Isang_Tao_rcsfnj.mov",
          },
          {
            id: 17,
            title: "CL:3 — Sasakyan",
            description: "Classifiers",
            groupTitle: "VIDEO 4 — CLASSIFIERS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838434/CL__3_-_Sasakyan_kqmcwo.mov",
          },
          {
            id: 18,
            title: "CL:F — Maliit na bagay (hawak gamit ang daliri)",
            description: "Classifiers",
            groupTitle: "VIDEO 4 — CLASSIFIERS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838410/CL__F_-_Maliit_na_bagay_hawak_gamit_ang_daliri_nyuzyd.mov",
          },
          {
            id: 19,
            title: "CL:V — Dalawang tao / paa (galaw)",
            description: "Classifiers",
            groupTitle: "VIDEO 4 — CLASSIFIERS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838368/CL__V_-_Dalawang_tao_-_Paa_galaw_s5wdip.mov",
          },
          {
            id: 20,
            title: "CL:B — Patag na bagay (papel, libro)",
            description: "Classifiers",
            groupTitle: "VIDEO 4 — CLASSIFIERS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838432/CL__B_-_Patag_na_bagay_papel_libro_yc1w9n.mov",
          },
          {
            id: 21,
            title: "CL:C — Bilog / lalagyan",
            description: "Classifiers",
            groupTitle: "VIDEO 4 — CLASSIFIERS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838371/CL__C_-_Bilog_-_Lalagyan_i4fje8.mov",
          },
          {
            id: 22,
            title: "CL:4 — Maramihan / hanay",
            description: "Classifiers",
            groupTitle: "VIDEO 4 — CLASSIFIERS",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775838344/CL__4_-_Maramihan_-_hanay_ifevuf.mov",
          },
          {
            id: 23,
            title: "Yes/No (raised eyebrows) — Tanong na oo o hindi",
            description: "Non-manual signals (NMS)",
            groupTitle: "VIDEO 5 — NON-MANUAL SIGNALS (NMS)",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775839700/Yes-No_nods-headshakes_nlpfby.mov",
          },
          {
            id: 24,
            title: "Questions (furrowed brows) — Tanong (sino, ano, saan, etc.)",
            description: "Non-manual signals (NMS)",
            groupTitle: "VIDEO 5 — NON-MANUAL SIGNALS (NMS)",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775839725/Questions_furrowed_brows_ijibyr.mov",
          },
          {
            id: 25,
            title: "Negation (headshake) — Hindi / pagtanggi",
            description: "Non-manual signals (NMS)",
            groupTitle: "VIDEO 5 — NON-MANUAL SIGNALS (NMS)",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775839621/Negation_headshakes_matyec.mov",
          },
          {
            id: 26,
            title: "Very big (mouth open) — Napakalaki",
            description: "Non-manual signals (NMS)",
            groupTitle: "VIDEO 5 — NON-MANUAL SIGNALS (NMS)",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775839729/Very_big_mouth_open_ydzo24.mov",
          },
          {
            id: 27,
            title: "Very small (tight lips) — Napakaliit",
            description: "Non-manual signals (NMS)",
            groupTitle: "VIDEO 5 — NON-MANUAL SIGNALS (NMS)",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775839741/Very_small_tight_lips_wk4tj1.mov",
          },
          {
            id: 28,
            title: "PRO.1 STUDY — Nag-aaral ako",
            description: "Sentence construction",
            groupTitle: "VIDEO 6 — SENTENCE CONSTRUCTION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775873111/PRO._1_STUDY_-_Nag-aaral_ako_sjcerw.mov",
          },
          {
            id: 29,
            title: "PRO.2 HAPPY — Masaya ka",
            description: "Sentence construction",
            groupTitle: "VIDEO 6 — SENTENCE CONSTRUCTION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775873170/PRO._2_HAPPY_-_Masaya_Ka_uowv3g.mov",
          },
          {
            id: 30,
            title: "PRO.1+ GO SCHOOL — Pumapasok kami sa paaralan",
            description: "Sentence construction",
            groupTitle: "VIDEO 6 — SENTENCE CONSTRUCTION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775873140/PRO._1_GO_SCHOOL_-_Pumapasok_kami_sa_paaralan_ktmbjl.mov",
          },
          {
            id: 31,
            title: "IX-1 EAT — Kumakain ako",
            description: "Sentence construction",
            groupTitle: "VIDEO 6 — SENTENCE CONSTRUCTION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775873079/IX-1_EAT_-_Kumakain_ako_cjd7ne.mov",
          },
          {
            id: 32,
            title: "IX-2 GO — Pumupunta ka",
            description: "Sentence construction",
            groupTitle: "VIDEO 6 — SENTENCE CONSTRUCTION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775873176/IX-2_GO_-_Pumupunta_Ka_oh7fq4.mov",
          },
          {
            id: 33,
            title: "CL:3 MOVE-FORWARD — Umaandar ang sasakyan pasulong",
            description: "Sentence construction",
            groupTitle: "VIDEO 6 — SENTENCE CONSTRUCTION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775873150/CL__3_MOVE-FORWARD_-_Umaandar_ang_sasakyan_pasulong_vtdaxr.mov",
          },
          {
            id: 34,
            title: "CL:B FALL — Nahuhulog ang papel",
            description: "Sentence construction",
            groupTitle: "VIDEO 6 — SENTENCE CONSTRUCTION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775873182/CL__B_FALL_-_Nahuhulog_ang_papel_fm5vv3.mov",
          },
          {
            id: 35,
            title: "CL:1 STAND THERE — May taong nakatayo doon",
            description: "Sentence construction",
            groupTitle: "VIDEO 6 — SENTENCE CONSTRUCTION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775873008/CL__1_STAND_THERE_-_May_taong_nakatayo_doon_t3xx52.mov",
          },
          {
            id: 36,
            title: "PRO.1 LOVE PRO.2 — Mahal kita",
            description: "Sentence construction",
            groupTitle: "VIDEO 6 — SENTENCE CONSTRUCTION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775873048/PRO._1_LOVE_PRO._2_-_Mahal_kita_ux9shf.mov",
          },
          {
            id: 37,
            title: "PRO.3+ HAPPY — Masaya sila",
            description: "Sentence construction",
            groupTitle: "VIDEO 6 — SENTENCE CONSTRUCTION",
            videoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775873195/PRO._3_HAPPY_-_Masaya_sila_ze44cn.mov",
          },
        ],
        quiz: [
          {
            type: "multiple-choice",
            id: 1,
            instruction:
              "Identify the correct gloss form based on the video.",
            question:
              'The video shows the FSL for "I am going to school." What is the correct gloss?',
            options: [
              "PRO.1 STUDY SCHOOL",
              "PRO.1 GO SCHOOL",
              "PRO.1+ GO SCHOOL",
              "IX-1 GO SCHOOL",
            ],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874306/PRO._1_GO_SCHOOL_nc7wsa.mp4",
          },
          {
            type: "multiple-choice",
            id: 2,
            instruction: "Identify the correct gloss form.",
            question:
              'The video shows the FSL for "You help me." What is the correct gloss?',
            options: [
              "PRO.2 HELP PRO.1",
              "PRO.2 HELP PRO.1+",
              "IX-2 HELP IX-1",
              "PRO.2+ HELP PRO.1",
            ],
            correctIndex: 0,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874284/PRO._2_HELP_PRO._1_tfpqmr.mp4",
          },
          {
            type: "multiple-choice",
            id: 3,
            instruction: "Identify the correct gloss form.",
            question:
              'The video shows the FSL for "He is very happy!" What is the correct gloss?',
            options: [
              "PRO.3 HAPPY!",
              "PRO.3 HAPPY",
              "IX-3 HAPPY!",
              "PRO.3+ HAPPY!",
            ],
            correctIndex: 0,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874317/PRO._3_HAPPY_chbarg.mp4",
          },
          {
            type: "multiple-choice",
            id: 4,
            instruction: "Identify the correct gloss form.",
            question:
              'The video shows the FSL for "Try again." What is the correct gloss? (Remember: + means repetition)',
            options: ["TRY!", "PRO.1 TRY+", "PRO.1 TRY!", "TRY+"],
            correctIndex: 3,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874293/IX-1_TRY_nqpuuk.mp4",
          },
          {
            type: "matching",
            id: 5,
            instruction:
              "Match the sentence with the correct video (A–D).",
            pairs: [
              {
                prompt: "We go outside",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874600/we_go_outside__dj5cjt.mp4",
              },
            ],
            videoChoices: L7_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 6,
            instruction:
              "Match the sentence with the correct video (A–D).",
            pairs: [
              {
                prompt: "He wakes up",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874567/he_wakes_up_rzd95j.mp4",
              },
            ],
            videoChoices: L7_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 7,
            instruction:
              "Match the sentence with the correct video (A–D).",
            pairs: [
              {
                prompt: "They are happy",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874588/they_are_happy_fpt8no.mp4",
              },
            ],
            videoChoices: L7_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "matching",
            id: 8,
            instruction:
              "Match the sentence with the correct video (A–D).",
            pairs: [
              {
                prompt: "I eat",
                answer:
                  "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874576/i_eat_tfjkuu.mp4",
              },
            ],
            videoChoices: L7_LESSON1_MATCH_VIDEO_CHOICES,
          },
          {
            type: "multiple-choice",
            id: 9,
            instruction:
              "Watch the FSL video and choose the correct gloss.",
            question: '"A car moves forward." What is the best gloss?',
            options: [
              "CL:1 MOVE-FORWARD",
              "CL:3 MOVE-FORWARD",
              "PRO.3 CAR FORWARD",
              "GO CAR FAST",
            ],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874903/a_car_moves_forward__oy7e9x.mp4",
          },
          {
            type: "multiple-choice",
            id: 10,
            instruction:
              "Watch the FSL video and choose the correct gloss.",
            question: '"I love you." What is the best gloss?',
            options: [
              "PRO.2 LOVE PRO.1",
              "PRO.1 LOVE PRO.2",
              "IX-1 LOVE IX-2",
              "LOVE PRO.1 PRO.2",
            ],
            correctIndex: 1,
            promptVideoUrl:
              "https://res.cloudinary.com/dixdjm8ub/video/upload/v1775874910/i_love_you_uqicbu.mp4",
          },
        ],
      },
    ],
  },
];

export function getLevelById(id: number): Level | undefined {
  return LEVELS.find((l) => l.id === id);
}

export function getLessonByIds(
  levelId: number,
  lessonId: number
): { level: Level; lesson: Lesson } | undefined {
  const level = getLevelById(levelId);
  if (!level) return undefined;
  const lesson = level.lessons.find((l) => l.id === lessonId);
  if (!lesson) return undefined;
  return { level, lesson };
}

export function getTotalLessons(): number {
  return LEVELS.reduce((sum, l) => sum + l.lessons.length, 0);
}
