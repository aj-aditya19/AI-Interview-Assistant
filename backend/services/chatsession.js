import axios from "axios";
import { randomUUID } from "crypto";

const interviewSessions = new Map();

const toText = (value) => String(value || "").trim();
const normalize = (value) => toText(value).toLowerCase();
const clampScore = (value) =>
  Math.max(0, Math.min(10, Math.round(Number(value) || 0)));

const validTrackValues = ["internship", "job", "language"];
const validDurationValues = ["3", "5"];
const validLevelValues = ["Beginner", "Intermediate", "Advanced"];
const maxHistoryEntries = 8;

const isFilled = (value) => Boolean(toText(value));
const buildSessionId = () => `${Date.now()}-${randomUUID().slice(0, 8)}`;
const getUserId = (user) => toText(user?._id?.toString()) || "anonymous";
const getSessionKey = (sessionId) => toText(sessionId);

const clearSessionsForUser = (userId) => {
  for (const [key, session] of interviewSessions.entries()) {
    if (session.userId === userId) {
      interviewSessions.delete(key);
    }
  }
};

const getLatestSessionForUser = (userId) =>
  Array.from(interviewSessions.values())
    .filter((session) => session.userId === userId)
    .sort((left, right) => right.createdAt - left.createdAt)[0] || null;

const validateSetup = (setup) => {
  const track = normalize(setup?.track) || "internship";

  if (!validTrackValues.includes(track)) {
    return "Please choose a valid interview track.";
  }

  if (!validDurationValues.includes(toText(setup?.durationMinutes))) {
    return "Please choose a valid interview time.";
  }

  if (!validLevelValues.includes(toText(setup?.interviewLevel))) {
    return "Please choose a valid interview level.";
  }

  if (track === "language") {
    if (!isFilled(setup?.language)) {
      return "Please choose the language you want to learn.";
    }

    if (!validLevelValues.includes(toText(setup?.languageLevel))) {
      return "Please choose a valid language level.";
    }
  } else {
    if (!isFilled(setup?.role)) {
      return "Please choose a role first.";
    }

    if (!isFilled(setup?.subjects)) {
      return "Please add your subjects first.";
    }

    if (!Array.isArray(setup?.techStack) || setup.techStack.length === 0) {
      return "Please add your tech stack first.";
    }
  }

  return "";
};

const setupSummary = (setup) => {
  const track = normalize(setup?.track) || "internship";
  const role = toText(setup?.role) || "the candidate";
  const subjects = toText(setup?.subjects) || "general interview readiness";
  const projects = toText(setup?.projects) || "relevant projects";
  const techStack = Array.isArray(setup?.techStack)
    ? setup.techStack.join(", ") || "a flexible tech stack"
    : "a flexible tech stack";
  const experience = toText(setup?.experience) || "no direct experience shared";
  const previousInternships =
    toText(setup?.previousInternships) || "none mentioned";
  const language = toText(setup?.language) || "a target language";
  const languageLevel = toText(setup?.languageLevel) || "mixed";
  const interviewLevel = toText(setup?.interviewLevel) || "mixed";

  if (track === "language") {
    return [
      `Track: language learning`,
      `Language: ${language}`,
      `Current level: ${languageLevel}`,
      `Interview level: ${interviewLevel}`,
      `Notes: ${toText(setup?.notes) || "none"}`,
    ].join("\n");
  }

  return [
    `Track: ${track}`,
    `Role: ${role}`,
    `Subjects: ${subjects}`,
    `Projects: ${projects}`,
    `Tech stack: ${techStack}`,
    `Experience: ${experience}`,
    `Previous internships: ${previousInternships}`,
    `Interview level: ${interviewLevel}`,
    `Notes: ${toText(setup?.notes) || "none"}`,
  ].join("\n");
};

const getStartPrompt = (setup) => {
  const track = normalize(setup?.track) || "internship";
  const language = toText(setup?.language) || "the target language";

  if (track === "language") {
    return {
      system:
        "You are a helpful language interview coach. Start every session by asking the learner to introduce themselves first. Then ask one short follow-up about why they want to learn the language. Return only JSON with keys: question, intro. No markdown, no extra text.",
      intro: `Start by introducing yourself briefly, then answer naturally in ${language} when you can.`,
      question: `Please introduce yourself and explain why you want to learn ${language}.`,
    };
  }

  if (track === "job") {
    return {
      system:
        "You are a strict but fair job interview interviewer. Start every session by asking the candidate to introduce themselves first. Return only JSON with keys: question, intro. No markdown, no extra text.",
      intro:
        "Start with a short self-introduction and keep the answer structured.",
      question:
        "Please introduce yourself and tell me why this role is a good fit for you.",
    };
  }

  return {
    system:
      "You are a strict but fair internship interviewer. Start every session by asking the candidate to introduce themselves first. Return only JSON with keys: question, intro. No markdown, no extra text.",
    intro:
      "Start with a short self-introduction and focus on your skills, projects, and learning mindset.",
    question:
      "Please introduce yourself and tell me why you want this internship.",
  };
};

const getRetryQuestion = (setup) => {
  const track = normalize(setup?.track) || "internship";

  if (track === "language") {
    return `Could you try again and introduce yourself in ${toText(setup?.language) || "the target language"}?`;
  }

  return "Should I know more about you?";
};

const getFallbackNextQuestion = (setup, currentQuestion) => {
  const track = normalize(setup?.track) || "internship";

  if (track === "language") {
    return `Can you answer this in ${toText(setup?.language) || "the target language"} and share something you enjoy?`;
  }

  if (track === "job") {
    return "Tell me about a time you solved a difficult problem or improved a process.";
  }

  if (toText(currentQuestion).toLowerCase().includes("project")) {
    return "What was the toughest technical choice in that project?";
  }

  return "Tell me about a project where you learned something important quickly.";
};

const getReviewPrompt = (setup, currentQuestion) => {
  const track = normalize(setup?.track) || "internship";
  const retryQuestion = getRetryQuestion(setup);

  if (track === "language") {
    return {
      system:
        "You are an AI language coach in a live interview chat. Evaluate the learner's answer to the current question. If the answer is weak or off-topic on the first attempt, ask one simple retry question. If the second attempt is still weak, move on with a low score and a short correction. Return only JSON with keys: analysis (array of 3-5 short bullet strings), scores (object with pronunciation, fluency, vocabulary, grammar, overall numbers from 0 to 10), summary (1-2 short sentences), improvedAnswer (one rewritten answer), shouldRetry (boolean), retryQuestion (one short follow-up question), nextQuestion (one concise next question). No markdown, no extra text.",
      retryQuestion,
      nextQuestion: `What is one hobby or interest you can describe in ${toText(setup?.language) || "the target language"}?`,
    };
  }

  if (track === "job") {
    return {
      system:
        "You are an AI job interview coach in a live chat session. Evaluate the candidate's answer to the current question. If the answer does not actually introduce the candidate or does not answer the question well on the first attempt, ask a simple retry question. If the second attempt is still weak, move on with a low score and a short correction. Return only JSON with keys: analysis (array of 3-5 short bullet strings), scores (object with accuracy, confidence, vocabulary, english, overall numbers from 0 to 10), summary (1-2 short sentences), improvedAnswer (one rewritten answer), shouldRetry (boolean), retryQuestion (one short follow-up question), nextQuestion (one concise next question). Keep the feedback direct, fair, and practical.",
      retryQuestion,
      nextQuestion: getFallbackNextQuestion(setup, currentQuestion),
    };
  }

  return {
    system:
      "You are an AI internship interview coach in a live chat session. Evaluate the candidate's answer to the current question. If the answer does not actually introduce the candidate or is too weak on the first attempt, ask a simple retry question. If the second attempt is still weak, move on with a low score and a short correction. Return only JSON with keys: analysis (array of 3-5 short bullet strings), scores (object with accuracy, confidence, vocabulary, english, overall numbers from 0 to 10), summary (1-2 short sentences), improvedAnswer (one rewritten answer), shouldRetry (boolean), retryQuestion (one short follow-up question), nextQuestion (one concise next question). Keep the feedback direct, fair, and practical.",
    retryQuestion,
    nextQuestion: getFallbackNextQuestion(setup, currentQuestion),
  };
};

const extractJson = (content) => {
  const text = toText(content);
  const fenced = text.match(/```json\s*([\s\S]*?)\s*```/i);
  const candidate = fenced?.[1] || text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  try {
    return JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return null;
  }
};

const groqChat = async (messages) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages,
      temperature: 0.4,
      response_format: { type: "json_object" },
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data?.choices?.[0]?.message?.content || "{}";
};

const runAnswerReview = async ({
  setup,
  currentQuestion,
  answer,
  history,
  attemptNumber,
}) => {
  const reviewPrompt = getReviewPrompt(setup, currentQuestion);
  const content = await groqChat([
    { role: "system", content: reviewPrompt.system },
    {
      role: "user",
      content: JSON.stringify(
        {
          profile: setupSummary(setup),
          history,
          currentQuestion,
          answer,
          attemptNumber,
        },
        null,
        2,
      ),
    },
  ]);

  const parsed = extractJson(content) || {};
  const scores = parsed.scores || {};
  const analysis = Array.isArray(parsed.analysis)
    ? parsed.analysis.filter(Boolean).map((item) => String(item))
    : [
        "Answer is being reviewed.",
        "Try to speak with clearer structure and stronger examples.",
      ];

  return {
    analysis,
    scores: {
      accuracy: clampScore(scores.accuracy),
      confidence: clampScore(scores.confidence),
      vocabulary: clampScore(scores.vocabulary),
      english: clampScore(scores.english),
      overall: clampScore(scores.overall),
    },
    summary:
      toText(parsed.summary) ||
      "The answer was analysed. Keep your next response shorter, clearer, and more specific.",
    improvedAnswer:
      toText(parsed.improvedAnswer) ||
      "Try to answer with a short introduction, a clear example, and a direct conclusion.",
    shouldRetry: Boolean(parsed.shouldRetry),
    retryQuestion: toText(parsed.retryQuestion) || reviewPrompt.retryQuestion,
    nextQuestion: toText(parsed.nextQuestion) || reviewPrompt.nextQuestion,
  };
};

const summarizeSession = async ({ setup, history, reason }) => {
  const finishPrompt =
    toText(reason) === "time-limit"
      ? "The interview time has ended. Summarize the candidate performance based on the completed conversation and provide a concise final assessment. Return only JSON with keys: finalSummary, strengths (array), improvements (array), nextSteps (array), readinessLabel, closingMessage. Keep it short, clear, and track-aware."
      : "Summarize the candidate performance based on the completed conversation and provide a concise final assessment. Return only JSON with keys: finalSummary, strengths (array), improvements (array), nextSteps (array), readinessLabel, closingMessage. Keep it short, clear, and track-aware.";

  const content = await groqChat([
    { role: "system", content: finishPrompt },
    {
      role: "user",
      content: JSON.stringify(
        {
          profile: setup,
          history,
          reason,
        },
        null,
        2,
      ),
    },
  ]);

  const parsed = extractJson(content) || {};

  return {
    finalSummary:
      toText(parsed.finalSummary) ||
      "The interview session is complete. Review the conversation, scores, and suggestions below.",
    strengths: Array.isArray(parsed.strengths)
      ? parsed.strengths.filter(Boolean).map((item) => String(item))
      : ["Communication", "Preparedness"],
    improvements: Array.isArray(parsed.improvements)
      ? parsed.improvements.filter(Boolean).map((item) => String(item))
      : ["Add more examples", "Answer with more structure"],
    nextSteps: Array.isArray(parsed.nextSteps)
      ? parsed.nextSteps.filter(Boolean).map((item) => String(item))
      : ["Practice one more mock interview"],
    readinessLabel: toText(parsed.readinessLabel) || "Ready for the next round",
    closingMessage:
      toText(parsed.closingMessage) ||
      "Use the feedback to improve your next interview session.",
  };
};

export const createChatSession = async ({ user, setup }) => {
  const setupError = validateSetup(setup);

  if (setupError) {
    throw new Error(setupError);
  }

  const userId = getUserId(user);
  clearSessionsForUser(userId);

  const startPrompt = getStartPrompt(setup);
  const content = await groqChat([
    { role: "system", content: startPrompt.system },
    {
      role: "user",
      content: `Candidate profile:\n${setupSummary(setup)}`,
    },
  ]);

  const parsed = extractJson(content) || {};
  const sessionId = buildSessionId();
  const question = toText(parsed.question) || startPrompt.question;

  interviewSessions.set(getSessionKey(sessionId), {
    sessionId,
    userId,
    setup,
    currentQuestion: question,
    retryCount: 0,
    turns: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  return {
    sessionId,
    intro:
      toText(parsed.intro) ||
      startPrompt.intro ||
      "The interview is ready. Answer each question naturally and clearly.",
    question,
    startedAt: Date.now(),
    durationMinutes: toText(setup?.durationMinutes) || "3",
  };
};

export const reviewChatSession = async ({
  user,
  sessionId,
  setup,
  question,
  answer,
  history,
}) => {
  const userId = getUserId(user);
  const session =
    (sessionId && interviewSessions.get(getSessionKey(sessionId))) ||
    getLatestSessionForUser(userId);

  if (!session) {
    throw new Error("Interview session not found");
  }

  if (!question || !answer) {
    throw new Error("Question and answer are required");
  }

  const attemptNumber = (Number(session.retryCount) || 0) + 1;
  const review = await runAnswerReview({
    setup: session.setup || setup,
    currentQuestion: session.currentQuestion || question,
    answer,
    history,
    attemptNumber,
  });

  const isRetry = Boolean(review.shouldRetry) && attemptNumber < 2;
  const nextQuestion = isRetry ? review.retryQuestion : review.nextQuestion;
  const currentScore = isRetry
    ? Math.min(review.scores.overall, attemptNumber === 1 ? 3 : 1)
    : review.scores.overall;

  const responseScores = {
    ...review.scores,
    overall: currentScore,
  };

  session.turns.push({
    question: session.currentQuestion || question,
    answer,
    attemptNumber,
    analysis: review.analysis,
    scores: responseScores,
    summary: review.summary,
    improvedAnswer: review.improvedAnswer,
    nextQuestion,
    shouldRetry: isRetry,
    createdAt: Date.now(),
  });

  if (session.turns.length > maxHistoryEntries) {
    session.turns = session.turns.slice(-maxHistoryEntries);
  }

  session.currentQuestion = nextQuestion;
  session.retryCount = isRetry ? attemptNumber : 0;
  session.updatedAt = Date.now();

  return {
    analysis: review.analysis,
    scores: responseScores,
    summary: review.summary,
    improvedAnswer: review.improvedAnswer,
    nextQuestion,
    shouldRetry: isRetry,
    attemptNumber,
    retryQuestion: review.retryQuestion,
    sessionId: session.sessionId,
    currentQuestion: session.currentQuestion,
    sessionState: isRetry ? "retry" : "advance",
  };
};

export const finishChatSession = async ({
  user,
  sessionId,
  setup,
  history,
  reason,
}) => {
  const userId = getUserId(user);
  const session =
    (sessionId && interviewSessions.get(getSessionKey(sessionId))) ||
    getLatestSessionForUser(userId);

  if (!session) {
    throw new Error("Interview session not found");
  }

  const summary = await summarizeSession({
    setup: session.setup || setup,
    history: session.turns.length > 0 ? session.turns : history || [],
    reason,
  });

  interviewSessions.delete(getSessionKey(session.sessionId));

  return {
    ...summary,
    history: session.turns,
    overallScore: session.turns.length
      ? Math.round(
          session.turns.reduce(
            (total, turn) => total + (Number(turn.scores?.overall) || 0),
            0,
          ) / session.turns.length,
        )
      : 0,
  };
};
