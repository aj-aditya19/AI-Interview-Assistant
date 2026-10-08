import { callJSON, callText, clamp, chatModel } from "./llm.js";
import { cleanOLQ, OLQ_PROMPT_LINE } from "../utils/olq.js";

const arr = (a, n = 5) => (Array.isArray(a) ? a.slice(0, n).map(String) : []);

export async function evaluateWAT(responses) {
  const system = `You are an SSB psychologist assessing a Word Association Test (WAT). The candidate saw a word and had 15 seconds to write the FIRST sentence that came to mind.
Good responses: positive/constructive, natural, specific, short, show action or values. Bad: negative, escapist, bookish definitions, copied clichés, blank, or copying the stimulus word without meaning.
${OLQ_PROMPT_LINE}
Return ONLY JSON:
{
  "items": [{"i": <index>, "score": <0-10>, "tone": "positive"|"neutral"|"negative", "note": "<=14 words, only if score<=6, else empty"}],
  "overallScore": <0-10>,
  "result": {"positivity":<0-10>,"spontaneity":<0-10>,"originality":<0-10>,"clarity":<0-10>},
  "olq": {"<OLQ name>": <0-10>, ...},
  "patterns": ["2-3 patterns noticed across responses, e.g. repeated negative themes"],
  "recommendations": ["3-4 tips"]
}
Blank responses score 0.`;
  const user = responses
    .map((r, i) => `${i}. ${r.word} -> ${r.text?.trim() || "(blank)"}`)
    .join("\n");
  const out = await callJSON({ system, user, maxTokens: 4000, fallback: null });
  return normalizeItems(out, responses.length, {
    result: ["positivity", "spontaneity", "originality", "clarity"],
  });
}

export async function evaluateSRT(responses) {
  const system = `You are an SSB psychologist assessing a Situation Reaction Test (SRT). For each situation the candidate wrote what they would DO.
Good reactions: prompt, practical, realistic, responsible, safe, show initiative, consider others and use available resources; they begin with action not feelings. Bad: no action, avoiding responsibility, violent/illegal, unrealistic heroics, too vague ("I will handle it").
${OLQ_PROMPT_LINE}
Return ONLY JSON:
{
  "items": [{"i": <index>, "score": <0-10>, "olq": ["1-2 OLQ names shown"], "note": "<=18 words feedback only if score<=6, else empty"}],
  "overallScore": <0-10>,
  "result": {"initiative":<0-10>,"practicality":<0-10>,"responsibility":<0-10>,"speedOfDecision":<0-10>},
  "olq": {"<OLQ name>": <0-10>, ...},
  "patterns": ["2-3 patterns"],
  "recommendations": ["3-4 tips"]
}
Blank responses score 0.`;
  const user = responses
    .map(
      (r, i) =>
        `${i}. Situation: ${r.situation}\n   Reaction: ${r.text?.trim() || "(blank)"}`,
    )
    .join("\n");
  const out = await callJSON({ system, user, maxTokens: 4000, fallback: null });
  return normalizeItems(out, responses.length, {
    result: ["initiative", "practicality", "responsibility", "speedOfDecision"],
  });
}

export async function evaluateTAT(stories) {
  const system = `You are an SSB psychologist assessing a Thematic Apperception Test (TAT). For each hazy picture the candidate wrote a story (past → present → future) in 4 minutes. You cannot see pictures; you get a reference description and key elements. A blank slide means "write about a situation of your own choice".
Good stories: a clear hero, a realistic problem, purposeful action, helps others/team, positive and achievable outcome, consistent with the picture's mood/characters. Bad: negative outcomes, supernatural/unrealistic, passive hero, no ending, no link to the picture.
${OLQ_PROMPT_LINE}
Return ONLY JSON:
{
  "items": [{"i": <index>, "score": <0-10>, "hero": "<=10 words about the hero's nature", "note": "<=20 words feedback if score<=6, else empty"}],
  "overallScore": <0-10>,
  "result": {"observation":<0-10>,"storyStructure":<0-10>,"positivity":<0-10>,"officerLikeQualities":<0-10>,"communication":<0-10>},
  "olq": {"<OLQ name>": <0-10>, ...},
  "patterns": ["2-3 patterns across stories (e.g. hero is always passive)"],
  "recommendations": ["3-4 tips"]
}
Blank stories score 0.`;
  const user = stories
    .map(
      (s, i) =>
        `${i}. ${s.referenceDescription ? `Picture: ${s.referenceDescription} (Key: ${(s.keyElements || []).join("; ")})` : "BLANK SLIDE (own situation)"}\n   Story: ${s.text?.trim() || "(blank)"}`,
    )
    .join("\n\n");
  const out = await callJSON({ system, user, maxTokens: 3500, fallback: null });
  return normalizeItems(out, stories.length, {
    result: [
      "observation",
      "storyStructure",
      "positivity",
      "officerLikeQualities",
      "communication",
    ],
  });
}

export async function evaluateSDT(answers) {
  const system = `You are an SSB psychologist assessing a Self Description Test (SDT). The candidate wrote what (1) parents, (2) teachers, (3) friends/colleagues think of them, (4) what they think of themselves, and (5) the qualities they want to develop.
Good: honest, specific, balanced (strengths + real weaknesses with efforts to improve), consistent across all 5 paragraphs, with concrete examples. Bad: all-perfect, contradictory between paragraphs, generic, negative, or blank.
${OLQ_PROMPT_LINE}
Return ONLY JSON:
{
  "items": [{"i": <index>, "score": <0-10>, "note": "<=20 words feedback"}],
  "overallScore": <0-10>,
  "result": {"honesty":<0-10>,"consistency":<0-10>,"selfAwareness":<0-10>,"clarity":<0-10>},
  "olq": {"<OLQ name>": <0-10>, ...},
  "patterns": ["2-3 observations"],
  "recommendations": ["3-4 tips"]
}`;
  const user = answers
    .map((a, i) => `${i}. ${a.prompt}\n${a.text?.trim() || "(blank)"}`)
    .join("\n\n");
  const out = await callJSON({ system, user, maxTokens: 2500, fallback: null });
  return normalizeItems(out, answers.length, {
    result: ["honesty", "consistency", "selfAwareness", "clarity"],
  });
}

function normalizeItems(out, count, { result: resultKeys }) {
  if (!out) {
    return {
      ok: false,
      overallScore: 0,
      result: Object.fromEntries(resultKeys.map((k) => [k, 0])),
      items: Array.from({ length: count }, (_, i) => ({
        i,
        score: 0,
        note: "",
      })),
      olq: {},
      patterns: [],
      recommendations: ["Evaluation failed — please try again."],
    };
  }
  const byIndex = new Map((out.items || []).map((it) => [Number(it.i), it]));
  const items = Array.from({ length: count }, (_, i) => {
    const it = byIndex.get(i) || {};
    return {
      ...it,
      i,
      score: clamp(it.score),
      note: it.note ? String(it.note) : "",
    };
  });
  const r = out.result || {};
  return {
    ok: true,
    overallScore: clamp(out.overallScore),
    result: Object.fromEntries(resultKeys.map((k) => [k, clamp(r[k])])),
    items,
    olq: cleanOLQ(out.olq),
    patterns: arr(out.patterns, 4),
    recommendations: arr(out.recommendations, 5),
  };
}

export async function gdTurn({ topic, personas, history, userMessage }) {
  const system = `You are simulating a Group Discussion (GD) with ${personas.length} participants plus the human candidate ("You").
Topic: "${topic}".
Participants: ${personas.map((p) => `${p.name} (${p.style})`).join("; ")}.
After the candidate speaks, write what 1-3 of the participants say next (in order). Each message is 1-3 sentences, natural spoken English, may agree, disagree, interrupt politely, bring a fact, or ask the candidate a direct question. Do not speak for the candidate.
Return ONLY JSON: {"messages":[{"speaker":"<participant name>","text":"..."}]}`;
  const transcript = history
    .slice(-16)
    .map((m) => `${m.speaker}: ${m.text}`)
    .join("\n");
  const user = `Discussion so far:\n${transcript || "(just started)"}\n\nYou (candidate): ${userMessage || "(silent)"}`;
  const out = await callJSON({
    system,
    user,
    model: chatModel(),
    maxTokens: 700,
    temperature: 0.9,
    fallback: { messages: [] },
  });
  const valid = new Set(personas.map((p) => p.name));
  return (out.messages || [])
    .filter((m) => valid.has(m.speaker) && m.text)
    .slice(0, 3)
    .map((m) => ({ speaker: m.speaker, text: String(m.text).slice(0, 500) }));
}

export async function gdOpening({ topic, personas }) {
  const out = await gdTurn({
    topic,
    personas,
    history: [],
    userMessage:
      "(The moderator has just announced the topic. Have ONE participant open the discussion with a short, clear starting point.)",
  });
  return out.slice(0, 1);
}

export async function evaluateGD({ topic, history }) {
  const system = `You are an SSB Group Testing Officer scoring the candidate "You" in a GD.
Judge ONLY the lines spoken by "You". Consider: content & relevance, initiating/entering, listening (building on others), leadership & influence, assertiveness without aggression, structure, summarising, and speaking share (too silent or dominating).
${OLQ_PROMPT_LINE}
Return ONLY JSON:
{
  "overallScore": <0-10>,
  "result": {"content":<0-10>,"communication":<0-10>,"leadership":<0-10>,"listening":<0-10>,"participation":<0-10>},
  "olq": {"<OLQ name>": <0-10>, ...},
  "highlights": ["2-3 things done well, quoting briefly"],
  "recommendations": ["3-4 specific tips"],
  "summary": "2 sentences"
}`;
  const transcript = history
    .slice(-40)
    .map((m) => `${m.speaker}: ${m.text}`)
    .join("\n");
  const out = await callJSON({
    system,
    user: `Topic: ${topic}\n\n${transcript}`,
    maxTokens: 1500,
    fallback: {
      overallScore: 0,
      result: {},
      olq: {},
      highlights: [],
      recommendations: ["Evaluation failed — try again."],
      summary: "",
    },
  });
  const r = out.result || {};
  return {
    overallScore: clamp(out.overallScore),
    result: Object.fromEntries(
      [
        "content",
        "communication",
        "leadership",
        "listening",
        "participation",
      ].map((k) => [k, clamp(r[k])]),
    ),
    olq: cleanOLQ(out.olq),
    highlights: arr(out.highlights, 4),
    recommendations: arr(out.recommendations, 5),
    summary: out.summary || "",
  };
}

export async function checkSentence({ word, meaning, sentence }) {
  const system = `You are an English tutor. The learner must use the word "${word}"${meaning ? ` (meaning: ${meaning})` : ""} correctly in a sentence.
Return ONLY JSON: {"score":<0-10>,"usedCorrectly":<bool>,"grammarOk":<bool>,"feedback":"1-2 friendly sentences","improved":"a polished version of their sentence using the word"}`;
  const out = await callJSON({
    system,
    user: sentence,
    model: chatModel(),
    maxTokens: 500,
    fallback: null,
  });
  if (!out)
    return {
      score: 0,
      usedCorrectly: false,
      grammarOk: false,
      feedback: "Could not check right now. Try again.",
      improved: "",
    };
  return {
    score: clamp(out.score),
    usedCorrectly: !!out.usedCorrectly,
    grammarOk: !!out.grammarOk,
    feedback: String(out.feedback || ""),
    improved: String(out.improved || ""),
  };
}

export async function evaluateDaily({ question, answer }) {
  const system = `You are an interview coach giving quick feedback on a short answer.
Return ONLY JSON: {"score":<0-10>,"good":"one thing done well","improve":"one specific improvement","betterAnswer":"a model answer in 3-4 sentences"}`;
  const out = await callJSON({
    system,
    user: `Question: ${question}\nAnswer: ${answer}`,
    maxTokens: 700,
    fallback: null,
  });
  if (!out)
    return {
      score: 5,
      good: "You answered the question.",
      improve: "Add a specific example.",
      betterAnswer: "",
    };
  return {
    score: clamp(out.score),
    good: String(out.good || ""),
    improve: String(out.improve || ""),
    betterAnswer: String(out.betterAnswer || ""),
  };
}

export async function analyzeResume({
  resumeText,
  jobDescription,
  targetRole,
}) {
  const system = `You are an expert ATS (applicant tracking system) and resume reviewer for tech roles. Score the resume honestly — most resumes score 45-75.
Return ONLY JSON:
{
  "atsScore": <0-100>,
  "breakdown": {"formatting":<0-100>,"keywords":<0-100>,"impact":<0-100>,"structure":<0-100>,"relevance":<0-100>},
  "summary": "2 sentences",
  "strengths": ["2-4"],
  "issues": [{"severity":"high"|"medium"|"low","text":"specific problem","fix":"specific fix"}],
  "missingKeywords": ["up to 12 keywords/skills expected for the role/JD but absent"],
  "weakBullets": [{"original":"quoted bullet from the resume","rewrite":"stronger version with action verb + metric (use placeholders like [X%] if no number given; never invent facts)"}],
  "sectionsFound": ["Education","Skills",...],
  "sectionsMissing": ["Projects",...]
}
Impact = action verbs, quantified results, ownership. Relevance = match to the role${jobDescription ? " and the job description" : ""}. Limit weakBullets to 4.`;
  const user = `Target role: ${targetRole || "Software Engineer"}\n${jobDescription ? `Job description:\n${jobDescription.slice(0, 3500)}\n\n` : ""}Resume text:\n${resumeText.slice(0, 11000)}`;
  const out = await callJSON({ system, user, maxTokens: 2500, fallback: null });
  if (!out) return null;
  const b = out.breakdown || {};
  const c100 = (n) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));
  return {
    atsScore: c100(out.atsScore),
    breakdown: Object.fromEntries(
      ["formatting", "keywords", "impact", "structure", "relevance"].map(
        (k) => [k, c100(b[k])],
      ),
    ),
    summary: String(out.summary || ""),
    strengths: arr(out.strengths, 5),
    issues: (out.issues || []).slice(0, 8).map((i) => ({
      severity: i.severity || "medium",
      text: String(i.text || ""),
      fix: String(i.fix || ""),
    })),
    missingKeywords: arr(out.missingKeywords, 12),
    weakBullets: (out.weakBullets || []).slice(0, 4).map((w) => ({
      original: String(w.original || ""),
      rewrite: String(w.rewrite || ""),
    })),
    sectionsFound: arr(out.sectionsFound, 12),
    sectionsMissing: arr(out.sectionsMissing, 12),
  };
}

export async function extractProfileFromResume(resumeText) {
  const system = `Extract interview-profile data from this resume. Return ONLY JSON:
{"suggestedRole":"most fitting target role","skills":["up to 15"],"techStack":["up to 12 technologies/tools"],"projects":["project names with a short 6-10 word descriptor, up to 5"],"experienceSummary":"2-3 sentences, factual, from the resume only","strengths":["up to 4 evident strengths"]}
Never invent information that is not in the resume.`;
  const out = await callJSON({
    system,
    user: resumeText.slice(0, 11000),
    maxTokens: 1200,
    fallback: null,
  });
  if (!out) return null;
  return {
    suggestedRole: String(out.suggestedRole || ""),
    skills: arr(out.skills, 15),
    techStack: arr(out.techStack, 12),
    projects: arr(out.projects, 5),
    experienceSummary: String(out.experienceSummary || ""),
    strengths: arr(out.strengths, 4),
  };
}
