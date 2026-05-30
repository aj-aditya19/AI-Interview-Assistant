import express from "express";
import axios from "axios";
import { randomUUID } from "crypto";
import { protect } from "../middleware/auth.js";
import ChatSession from "../models/chatsesson.js";

const router = express.Router();

const validTrackValues = ["internship", "job", "language"];
const validDurationValues = ["3", "5"];
const validLevelValues = ["Beginner", "Intermediate", "Advanced"];
const maxHistoryEntries = 8;

const toText = (value) => String(value ?? "").trim();
const normalize = (value) => toText(value).toLowerCase();
const clampScore = (value) =>
  Math.max(0, Math.min(10, Math.round(Number(value) || 0)));
const isFilled = (value) => Boolean(toText(value));
const buildSessionId = () => `${Date.now()}-${randomUUID().slice(0, 8)}`;

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
        "You are a helpful language interview coach. The first interview question must always be a self-introduction only. Do not ask about the language or any other topic in the first question. The follow-up question can come later after the answer. Return only JSON with keys: question, intro. No markdown, no extra text.",
      intro: `Start by introducing yourself briefly, then answer naturally in ${language} when you can.`,
      question: "Please introduce yourself.",
    };
  }

  if (track === "job") {
    return {
      system:
        "You are a strict but fair job interview interviewer. The first interview question must always be a self-introduction only. Do not ask about the role or any other topic in the first question. The follow-up question can come later after the answer. Return only JSON with keys: question, intro. No markdown, no extra text.",
      intro:
        "Start with a short self-introduction and keep the answer structured.",
      question: "Please introduce yourself.",
    };
  }

  return {
    system:
      "You are a strict but fair internship interviewer. The first interview question must always be a self-introduction only. Do not ask about projects, skills, or any other topic in the first question. The follow-up question can come later after the answer. Return only JSON with keys: question, intro. No markdown, no extra text.",
    intro:
      "Start with a short self-introduction and focus on your skills, projects, and learning mindset.",
    question: "Please introduce yourself.",
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
        "You are an AI language coach in a live interview chat. Evaluate the learner's answer to the current question. If the answer is weak or off-topic on the first attempt, ask one simple retry question. If the second attempt is still weak, move on with a low score and a short correction. Return only JSON with keys: analysis (array of 3-5 short bullet strings), scores (object with accuracy, confidence, vocabulary, grammar, overall numbers from 0 to 10), summary (1-2 short sentences), improvedAnswer (one rewritten answer), improvedQuestion (one rewritten answer), shouldRetry (boolean), retryQuestion (one short follow-up question), nextQuestion (one concise next question), rate (number from 0 to 10), result (number from 0 to 10), total (number). No markdown, no extra text.",
      retryQuestion,
      nextQuestion: `What is one hobby or interest you can describe in ${toText(setup?.language) || "the target language"}?`,
    };
  }

  if (track === "job") {
    return {
      system:
        "You are an AI job interview coach in a live chat session. Evaluate the candidate's answer to the current question. If the answer does not actually introduce the candidate or does not answer the question well on the first attempt, ask a simple retry question. If the second attempt is still weak, move on with a low score and a short correction. Return only JSON with keys: analysis (array of 3-5 short bullet strings), scores (object with accuracy, confidence, vocabulary, english, overall numbers from 0 to 10), summary (1-2 short sentences), improvedAnswer (one rewritten answer), improvedQuestion (one rewritten answer), shouldRetry (boolean), retryQuestion (one short follow-up question), nextQuestion (one concise next question), rate (number from 0 to 10), result (number from 0 to 10), total (number). Keep the feedback direct, fair, and practical.",
      retryQuestion,
      nextQuestion: getFallbackNextQuestion(setup, currentQuestion),
    };
  }

  return {
    system:
      "You are an AI internship interview coach in a live chat session. Evaluate the candidate's answer to the current question. If the answer does not actually introduce the candidate or is too weak on the first attempt, ask a simple retry question. If the second attempt is still weak, move on with a low score and a short correction. Return only JSON with keys: analysis (array of 3-5 short bullet strings), scores (object with accuracy, confidence, vocabulary, english, overall numbers from 0 to 10), summary (1-2 short sentences), improvedAnswer (one rewritten answer), improvedQuestion (one rewritten answer), shouldRetry (boolean), retryQuestion (one short follow-up question), nextQuestion (one concise next question), rate (number from 0 to 10), result (number from 0 to 10), total (number). Keep the feedback direct, fair, and practical.",
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

const groqChat = async (
  messages,
  { temperature = 0.4, maxTokens = 800 } = {},
) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages,
      temperature,
      max_tokens: maxTokens,
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

router.get("/interview/session/:sessionId", protect, async (req, res) => {
  try {
    const session = await ChatSession.findOne({
      userId: req.user._id,
      sessionId: req.params.sessionId,
    }).lean();

    if (!session) {
      return res.json({ messages: [], turns: [] });
    }

    return res.json({
      sessionId: session.sessionId,
      currentQuestion: session.currentQuestion,
      intro: session.intro,
      turns: session.turns || [],
      messages: session.turns || [],
      overallScore: session.overallScore || 0,
      status: session.status,
      setup: session.setup,
      finalSummary: session.finalSummary || "",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

router.post("/interview/session", protect, async (req, res) => {
  try {
    const action = String(req.body?.action || "start").trim();

    if (action === "start") {
      const setup = req.body?.setup || {};
      const setupError = validateSetup(setup);

      if (setupError) {
        return res.status(400).json({ message: setupError });
      }

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
      const intro = toText(parsed.intro) || startPrompt.intro;

      const session = await ChatSession.create({
        userId: req.user._id,
        sessionId,
        setup,
        intro,
        currentQuestion: question,
        turns: [],
        status: "active",
        retryCount: 0,
        startedAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      return res.json({
        sessionId: session.sessionId,
        intro,
        question,
        startedAt: session.startedAt,
        durationMinutes: toText(setup?.durationMinutes) || "3",
      });
    }

    if (action === "finish") {
      const session = await ChatSession.findOne({
        userId: req.user._id,
        sessionId: req.body?.sessionId,
      });
      console.log("[chat.route] finish called", {
        user: req.user._id,
        sessionId: req.body?.sessionId,
        reason: req.body?.reason,
      });

      if (!session) {
        return res.status(404).json({ message: "Interview session not found" });
      }

      const summary = await summarizeSession({
        setup: session.setup || req.body?.setup || {},
        history:
          session.turns.length > 0
            ? session.turns
            : Array.isArray(req.body?.history)
              ? req.body.history
              : [],
        reason: req.body?.reason,
      });

      const overallScore = session.turns.length
        ? Math.round(
            session.turns.reduce(
              (total, turn) =>
                total +
                (Number(turn.rate) || Number(turn.scores?.overall) || 0),
              0,
            ) / session.turns.length,
          )
        : 0;

      session.status = "completed";
      session.completedAt = new Date();
      session.finalSummary = summary.finalSummary;
      session.strengths = summary.strengths;
      session.improvements = summary.improvements;
      session.nextSteps = summary.nextSteps;
      session.readinessLabel = summary.readinessLabel;
      session.closingMessage = summary.closingMessage;
      session.overallScore = overallScore;
      session.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await session.save();
      console.log("[chat.route] session saved", {
        sessionId: session.sessionId,
        overallScore: session.overallScore,
        turns: session.turns.length,
      });

      return res.json({
        ...summary,
        history: session.turns,
        overallScore,
        sessionId: session.sessionId,
      });
    }

    const session = await ChatSession.findOne({
      userId: req.user._id,
      sessionId: req.body?.sessionId,
    });

    if (!session) {
      return res.status(404).json({ message: "Interview session not found" });
    }

    const question = toText(req.body?.question || session.currentQuestion);
    const answer = toText(req.body?.answer);

    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "Question and answer are required" });
    }

    const attemptNumber = (Number(session.retryCount) || 0) + 1;
    const reviewPrompt = getReviewPrompt(
      session.setup || req.body?.setup || {},
      question,
    );
    const history = Array.isArray(req.body?.history)
      ? req.body.history
      : session.turns;

    const content = await groqChat([
      { role: "system", content: reviewPrompt.system },
      {
        role: "user",
        content: JSON.stringify(
          {
            profile: session.setup || req.body?.setup || {},
            currentQuestion: question,
            answer,
            history: history.slice(-maxHistoryEntries),
            attemptNumber,
          },
          null,
          2,
        ),
      },
    ]);

    const parsed = extractJson(content) || {};
    const analysis = Array.isArray(parsed.analysis)
      ? parsed.analysis.filter(Boolean).map((item) => String(item))
      : [];
    const baseScores = parsed.scores || {};
    const responseScores = {
      accuracy: clampScore(baseScores.accuracy),
      confidence: clampScore(baseScores.confidence),
      vocabulary: clampScore(baseScores.vocabulary),
      english: clampScore(baseScores.english),
      overall: clampScore(baseScores.overall || parsed.rate),
    };
    const rate = clampScore(parsed.rate ?? responseScores.overall);
    const total = clampScore(parsed.total ?? 10) || 10;
    const improvedAnswer =
      toText(parsed.improvedAnswer) ||
      toText(parsed.improvedQuestion) ||
      "Try answering with more structure and relevant details.";
    const improvedQuestion = toText(parsed.improvedQuestion) || improvedAnswer;
    const isRetry = Boolean(parsed.shouldRetry) && attemptNumber < 2;
    const nextQuestion = isRetry
      ? toText(parsed.retryQuestion) || reviewPrompt.retryQuestion
      : toText(parsed.nextQuestion) || reviewPrompt.nextQuestion;

    session.turns.push({
      question,
      answer,
      improvedQuestion,
      improvedAnswer,
      rate,
      result: rate,
      total,
      analysis,
      scores: responseScores,
      summary: toText(parsed.summary),
      nextQuestion,
      shouldRetry: isRetry,
      attemptNumber,
      createdAt: new Date(),
    });

    if (session.turns.length > maxHistoryEntries) {
      session.turns = session.turns.slice(-maxHistoryEntries);
    }

    session.currentQuestion = nextQuestion;
    session.retryCount = isRetry ? attemptNumber : 0;
    session.overallScore = session.turns.length
      ? Math.round(
          session.turns.reduce(
            (sum, turn) =>
              sum + (Number(turn.rate) || Number(turn.scores?.overall) || 0),
            0,
          ) / session.turns.length,
        )
      : 0;
    session.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await session.save();

    return res.json({
      analysis,
      scores: responseScores,
      summary: toText(parsed.summary),
      improvedAnswer,
      improvedQuestion,
      nextQuestion,
      shouldRetry: isRetry,
      attemptNumber,
      retryQuestion: reviewPrompt.retryQuestion,
      sessionId: session.sessionId,
      currentQuestion: session.currentQuestion,
      sessionState: isRetry ? "retry" : "advance",
      rate,
      result: rate,
      total,
    });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({
      message: "AI service error",
      error: err.message,
    });
  }
});

router.delete("/interview/session/:sessionId", protect, async (req, res) => {
  try {
    console.log("[chat.route] delete session", {
      user: req.user._id,
      sessionId: req.params.sessionId,
    });
    await ChatSession.deleteOne({
      userId: req.user._id,
      sessionId: req.params.sessionId,
    });

    return res.json({ message: "Chat session cleared" });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

export default router;
