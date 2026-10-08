import "dotenv/config";
import { callJSON, callText, clamp, chatModel } from "./llm.js";
import { cleanOLQ, OLQ_PROMPT_LINE } from "../utils/olq.js";

const ROUND_GUIDE = {
  hr: "HR round: motivation, strengths/weaknesses, teamwork, conflict, career goals, culture fit. Use behavioural (STAR-style) questions.",
  technical:
    "Technical round: core concepts of the candidate's own tech stack, debugging, trade-offs, 'why did you choose X'.",
  dsa: "DSA round: ask the candidate to EXPLAIN (verbally) their approach to a problem — data structure choice, complexity, edge cases. No code typing; keep problems answerable by speech.",
  system_design:
    "System design round: ask about designing a small-to-medium system (URL shortener, chat app, etc.), covering requirements, components, scaling and trade-offs. Adapt depth to difficulty.",
  project:
    "Project deep-dive: go deep into ONE of the candidate's listed projects — architecture, their exact contribution, hardest bug, what they'd change, metrics.",
  managerial:
    "Managerial round: ownership, prioritisation, handling pressure/deadlines, leading or influencing without authority, decision-making.",
  other:
    "General round: a mix of situational, case-style and curiosity questions suited to the role.",
};

const COMPANY_STYLE = {
  tcs: "Style: service-company campus interview (TCS/Infosys/Wipro type) — fundamentals, basic coding/DBMS/OS, communication, willingness to relocate/learn.",
  infosys:
    "Style: service-company campus interview — fundamentals, aptitude of thought, communication and adaptability.",
  amazon:
    "Style: Amazon-like — probe the Leadership Principles (ownership, customer obsession, bias for action, dive deep) with STAR follow-ups.",
  google:
    "Style: Google-like — structured problem solving, thinking out loud, clarifying questions, scale and edge cases.",
  startup:
    "Style: startup interview — ownership, speed, wearing many hats, shipping, and learning fast.",
};

const langRule = (language) =>
  language === "hinglish"
    ? "LANGUAGE: Speak in natural Hinglish (Roman-script Hindi mixed with English, like a friendly Indian interviewer). Keep technical terms in English."
    : "LANGUAGE: Plain, clear English.";

export const generateQuestion = async ({
  roundType,
  profile,
  previousTurns = [],
  isFirst = false,
}) => {
  const previousQA = previousTurns
    .map((t) => `Q: ${t.question}\nA: ${t.answer}`)
    .join("\n\n");
  const style = COMPANY_STYLE[(profile.companyStyle || "").toLowerCase()] || "";

  const candidateContext = `Target role: ${profile.targetRole} at ${profile.targetCompany || "a top company"}
Skills: ${profile.skills?.join(", ") || "not specified"}
Tech stack: ${profile.techStack?.join(", ") || "not specified"}
Projects: ${profile.projects?.join("; ") || "not specified"}
Experience summary: ${profile.experienceSummary || "not specified"}
Strengths: ${profile.strengths?.join(", ") || "not specified"}
Additional notes: ${profile.additionalMessage || "none"}`;

  const system = `You are an experienced interviewer conducting a live, natural interview. Talk like a real human, not a quiz generator.

${ROUND_GUIDE[roundType] || ROUND_GUIDE.other}
${style}
${langRule(profile.language)}

Candidate profile:
${candidateContext}

Difficulty level: ${profile.difficulty}.

Rules:
- Ask ONE natural question at a time (max ~45 words).
- Ground questions in the candidate's actual skills, stack and projects — name them.
- If there is a previous answer, dig deeper first (why, example, challenge an assumption) before changing topic.
- Never repeat a topic already covered.
- Output ONLY the question text — no preamble, labels or numbering.`;

  const user = isFirst
    ? `Start this round with a warm, natural opening question grounded in the candidate's profile.`
    : `Conversation so far:\n${previousQA}\n\nAsk the next question — a deeper follow-up on their last answer, or a fresh one grounded in their profile.`;

  return callText({
    system,
    user,
    model: chatModel(),
    maxTokens: 400,
    temperature: 0.8,
  });
};

const FALLBACK_EVAL = (answer) => ({
  scores: { accuracy: 5, confidence: 5, vocabulary: 5, english: 5, overall: 5 },
  analysis: ["Could not fully analyze the response."],
  summary: "Evaluation could not be completed automatically.",
  improvedAnswer: answer,
  shouldRetry: false,
});

export const evaluateAnswer = async ({
  question,
  answer,
  roundType,
  profile,
  speech,
}) => {
  const system = `You are a strict but fair interview evaluator. Return ONLY a JSON object:
{
  "scores": {"accuracy":<0-10>,"confidence":<0-10>,"vocabulary":<0-10>,"english":<0-10>,"overall":<0-10>},
  "analysis": ["3-4 specific points referring to what the candidate actually said"],
  "summary": "one short paragraph",
  "improvedAnswer": "a stronger version of THEIR answer (keep their facts; do not invent experience)",
  "shouldRetry": <true if overall < 4>
}
${langRule(profile.language)} (Write the feedback in that language style; keep JSON keys in English.)
The answer is a speech-to-text transcript: ignore missing punctuation/capitalisation and do not penalise transcription artefacts.`;

  const speechNote = speech
    ? `\nSpeech data: ${speech.wordCount} words, ~${speech.wpm ?? "n/a"} wpm, ${speech.fillerCount} filler words.`
    : "";
  const user = `Round: ${roundType}\nRole: ${profile.targetRole}\nQuestion: ${question}\nCandidate's answer: ${answer}${speechNote}`;

  const out = await callJSON({
    system,
    user,
    maxTokens: 1500,
    fallback: FALLBACK_EVAL(answer),
  });
  const s = out.scores || {};
  return {
    ...out,
    scores: {
      accuracy: clamp(s.accuracy),
      confidence: clamp(s.confidence),
      vocabulary: clamp(s.vocabulary),
      english: clamp(s.english),
      overall: clamp(s.overall),
    },
    analysis: Array.isArray(out.analysis) ? out.analysis.slice(0, 5) : [],
    shouldRetry: !!out.shouldRetry,
  };
};

export const generateFinalSummary = async ({ rounds, profile, speech }) => {
  const lines = rounds
    .map((r) => {
      const turns = (r.turns || []).filter((t) => !t.isRetry);
      const avg =
        turns.reduce((s, t) => s + (t.scores?.overall || 0), 0) /
        (turns.length || 1);
      const sorted = [...turns].sort(
        (a, b) => (a.scores?.overall || 0) - (b.scores?.overall || 0),
      );
      const pick = (t) =>
        t &&
        `Q: ${t.question}\nA: ${(t.answer || "").slice(0, 350)}\nScore: ${t.scores?.overall}`;
      return `## ${r.roundType} round — avg ${avg.toFixed(1)}/10 over ${turns.length} questions
WEAKEST:\n${pick(sorted[0]) || "-"}
STRONGEST:\n${pick(sorted[sorted.length - 1]) || "-"}`;
    })
    .join("\n\n");

  const speechLine = speech
    ? `Speech: avg ${speech.avgWpm ?? "n/a"} wpm, ${speech.totalFillers} filler words (${speech.fillerPer100Words}/100 words).`
    : "";

  const system = `You are an interview coach. Return ONLY JSON:
{
  "overallScore": <0-10>,
  "result": {"communication":<0-10>,"confidence":<0-10>,"technical":<0-10>,"fluency":<0-10>,"vocabulary":<0-10>,"grammar":<0-10>,"clarity":<0-10>},
  "strengths": ["2-4 specific strengths, quoting topics the candidate actually covered"],
  "weaknesses": ["2-4 specific weaknesses"],
  "recommendations": ["3-5 concrete, actionable tips"],
  "finalSummary": "2-3 sentence overall assessment",
  "readinessLabel": "Interview Ready" | "Needs Improvement" | "Promising" | "Keep Practicing"
}
${langRule(profile.language)} Be specific; avoid generic advice.`;

  const user = `Candidate for: ${profile.targetRole}\nDifficulty: ${profile.difficulty}\n${speechLine}\n\n${lines}`;

  const fallbackScore = (() => {
    const all = rounds.flatMap((r) =>
      (r.turns || []).filter((t) => !t.isRetry),
    );
    return all.length
      ? all.reduce((s, t) => s + (t.scores?.overall || 0), 0) / all.length
      : 5;
  })();

  const out = await callJSON({
    system,
    user,
    maxTokens: 1500,
    fallback: {
      overallScore: fallbackScore,
      result: {
        communication: 5,
        confidence: 5,
        technical: 5,
        fluency: 5,
        vocabulary: 5,
        grammar: 5,
        clarity: 5,
      },
      strengths: ["Attempted all rounds"],
      weaknesses: ["Needs more practice"],
      recommendations: [
        "Practice mock interviews regularly",
        "Work on structuring answers (situation → action → result)",
      ],
      finalSummary:
        "The interview was completed. Keep practicing to improve your performance.",
      readinessLabel: "Keep Practicing",
    },
  });
  out.overallScore = clamp(out.overallScore);
  return out;
};

export const evaluatePPDT = async ({
  userAnswer,
  referenceDescription,
  keyElements = [],
}) => {
  const system = `You are a PPDT (Picture Perception & Description Test) assessor.
The candidate saw a hazy picture and wrote/narrated a story. You cannot see the picture, but you are given a reference description and the key elements visible in it.

Assess:
1. Observation — did they notice the key elements (number/age/sex of characters, mood, setting) and stay consistent with them?
2. Story structure — a real story with: character(s) introduced, a situation/problem, action taken, and a positive, realistic outcome.
3. Officer-like qualities — positive attitude, initiative, leadership, practical problem-solving, team spirit; penalise negative/escapist endings and pure observation without a story.
4. Communication — clarity, flow, grammar.

${OLQ_PROMPT_LINE}

Return ONLY JSON:
{
  "overallScore": <0-10>,
  "result": {"observation":<0-10>,"imagination":<0-10>,"communication":<0-10>,"confidence":<0-10>,"storyStructure":<0-10>,"officerLikeQualities":<0-10>},
  "storyElements": {"characters":<bool>,"situation":<bool>,"action":<bool>,"outcome":<bool>,"positiveEnding":<bool>,"mood":<bool>},
  "olq": {"<OLQ name>": <0-10>, ...  only the 3-6 OLQs actually visible in the story},
  "recommendations": ["3-4 specific tips tied to THIS story"]
}`;

  const user = `Reference description: ${referenceDescription}
Key elements in the picture: ${keyElements.join("; ") || "n/a"}
Candidate's story:
${userAnswer}`;

  const out = await callJSON({
    system,
    user,
    maxTokens: 1500,
    fallback: {
      overallScore: 5,
      result: {
        observation: 5,
        imagination: 5,
        communication: 5,
        confidence: 5,
        storyStructure: 5,
        officerLikeQualities: 5,
      },
      storyElements: {},
      olq: {},
      recommendations: [
        "Observe details carefully",
        "Structure your story: character → problem → action → positive outcome",
        "Be confident and decisive",
      ],
    },
  });
  const r = out.result || {};
  return {
    overallScore: clamp(out.overallScore),
    result: Object.fromEntries(
      [
        "observation",
        "imagination",
        "communication",
        "confidence",
        "storyStructure",
        "officerLikeQualities",
      ].map((k) => [k, clamp(r[k])]),
    ),
    storyElements: out.storyElements || {},
    olq: cleanOLQ(out.olq),
    recommendations: Array.isArray(out.recommendations)
      ? out.recommendations.slice(0, 5)
      : [],
  };
};
