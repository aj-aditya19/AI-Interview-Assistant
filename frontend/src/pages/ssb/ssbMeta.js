export const TEST_META = {
  tat: {
    title: "TAT — Thematic Apperception Test",
    short: "Look at a hazy picture for 30 seconds, then write a story in 4 minutes.",
    how: [
      "You will see a hazy picture for 30 seconds. Observe the characters, mood and setting.",
      "The picture disappears. You get 4 minutes to write a story: what led to this, what is happening, and how it ends.",
      "The last slide is blank: write about any situation of your own choice.",
      "Aim for a clear hero, a real problem, purposeful action and a positive, realistic ending.",
    ],
    options: [2, 4, 8, 11],
    optionLabel: "pictures",
    input: "area",
    placeholder: "Write your story: what led to this situation, what is happening, how it ends…",
  },
  wat: {
    title: "WAT — Word Association Test",
    short: "A word flashes for 15 seconds. Write the first sentence that comes to mind.",
    how: [
      "A word appears for 15 seconds. Write a short, natural sentence for it.",
      "Don't think too long: your first positive, practical thought is best.",
      "Avoid negative, vague or dictionary-style sentences. Show action and values.",
      "Press Enter to move to the next word.",
    ],
    options: [15, 30, 60],
    optionLabel: "words",
    input: "line",
    placeholder: "Type your sentence and press Enter…",
  },
  srt: {
    title: "SRT — Situation Reaction Test",
    short: "Read a situation and write what you would actually do.",
    how: [
      "You get a situation and 30 seconds to write your reaction.",
      "Start with the action you take, not your feelings. Be prompt, practical and realistic.",
      "Think of others involved, use available resources, and take responsibility.",
      "Don't leave a situation unanswered. A short reaction is better than none.",
    ],
    options: [10, 20, 40],
    optionLabel: "situations",
    input: "area",
    placeholder: "What would you do? Write it in a few sentences…",
  },
  sdt: {
    title: "SDT — Self Description Test",
    short: "Describe yourself as parents, teachers, friends and you see yourself.",
    how: [
      "Five short paragraphs: parents, teachers, friends, yourself, and the person you want to become.",
      "Be honest and specific. Give real strengths and real weaknesses with efforts to improve.",
      "Keep your five paragraphs consistent with each other.",
      "You have 3 minutes for each paragraph.",
    ],
    options: null,
    optionLabel: "",
    input: "area",
    placeholder: "Write here…",
  },
};

export const RESULT_LABELS = {
  positivity: "Positivity", spontaneity: "Spontaneity", originality: "Originality", clarity: "Clarity",
  initiative: "Initiative", practicality: "Practicality", responsibility: "Responsibility", speedOfDecision: "Speed of decision",
  observation: "Observation", storyStructure: "Story structure", officerLikeQualities: "Officer-like qualities", communication: "Communication",
  honesty: "Honesty", consistency: "Consistency", selfAwareness: "Self-awareness",
  content: "Content", leadership: "Leadership", listening: "Listening", participation: "Participation",
};

export const TYPE_NAMES = { tat: "TAT", wat: "WAT", srt: "SRT", sdt: "SDT", gd: "Group Discussion", daily: "Daily challenge", comm: "Communication" };
