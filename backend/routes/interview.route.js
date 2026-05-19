import express from "express";
import axios from "axios";
import { protect } from "../middleware/auth.js";

const interviewRouter = express.Router();

const toText = (value) => String(value || "").trim();

const setupSummary = (setup) => {
  const role = toText(setup?.role) || "the candidate";
  const company = toText(setup?.company) || "a target company";
  const domain = toText(setup?.domain) || "the chosen domain";
  const fieldOfInterest =
    toText(setup?.fieldOfInterest) || "the field of interest";
  const expertiseLevel = toText(setup?.expertiseLevel) || "mixed";
  const skills = toText(setup?.skills) || "general interview readiness";

  return [
    `Role: ${role}`,
    `Company: ${company}`,
    `Domain: ${domain}`,
    `Field of interest: ${fieldOfInterest}`,
    `Expertise level: ${expertiseLevel}`,
    `Skills: ${skills}`,
  ].join("\n");
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

interviewRouter.post("/interview/session", protect, async (req, res) => {
  try {
    const action = toText(req.body?.action) || "start";
    const setup = req.body?.setup || {};
    const currentQuestion = toText(req.body?.question);
    const answer = toText(req.body?.answer);
    const history = Array.isArray(req.body?.history)
      ? req.body.history.slice(-6)
      : [];

    if (action === "start") {
      if (!toText(setup?.role) && !toText(setup?.skills)) {
        return res.status(400).json({ message: "Interview setup is required" });
      }

      const content = await groqChat([
        {
          role: "system",
          content:
            "You are a strict but fair interview interviewer. Ask one concise interview question tailored to the candidate profile. Return only JSON with keys: question, intro. The question must be direct and role-based. No markdown, no extra text.",
        },
        {
          role: "user",
          content: `Candidate profile:\n${setupSummary(setup)}`,
        },
      ]);

      const parsed = extractJson(content) || {};

      return res.json({
        intro:
          toText(parsed.intro) ||
          "The interview is ready. Answer each question naturally and clearly.",
        question:
          toText(parsed.question) ||
          "Tell me about yourself and why you fit this role.",
      });
    }

    if (!currentQuestion || !answer) {
      return res
        .status(400)
        .json({ message: "Question and answer are required" });
    }

    const content = await groqChat([
      {
        role: "system",
        content:
          "You are an AI interview coach. Evaluate the candidate answer in short point-to-point form. Return only JSON with keys: analysis (array of 3-5 short bullet strings), scores (object with accuracy, confidence, vocabulary, english, overall numbers from 0 to 10), summary (1-2 short sentences), nextQuestion (one concise follow-up interview question), and strengthFocus (one short string). Keep the feedback direct and helpful.",
      },
      {
        role: "user",
        content: JSON.stringify(
          {
            profile: setup,
            history,
            currentQuestion,
            answer,
          },
          null,
          2,
        ),
      },
    ]);

    const parsed = extractJson(content) || {};
    const scores = parsed.scores || {};

    res.json({
      analysis: Array.isArray(parsed.analysis)
        ? parsed.analysis.filter(Boolean).map((item) => String(item))
        : [
            "Answer is being reviewed.",
            "Try to speak with clearer structure and stronger examples.",
          ],
      scores: {
        accuracy: Number(scores.accuracy) || 0,
        confidence: Number(scores.confidence) || 0,
        vocabulary: Number(scores.vocabulary) || 0,
        english: Number(scores.english) || 0,
        overall: Number(scores.overall) || 0,
      },
      summary:
        toText(parsed.summary) ||
        "The answer was analysed. Keep your next response shorter, clearer, and more specific.",
      nextQuestion:
        toText(parsed.nextQuestion) ||
        "Can you explain a project where you solved a difficult problem?",
      strengthFocus:
        toText(parsed.strengthFocus) ||
        "Focus on structured speaking, examples, and confidence.",
    });
  } catch (error) {
    console.error(
      "Interview session error:",
      error.response?.data || error.message,
    );
    res.status(500).json({
      message: "Failed to run interview session",
    });
  }
});

export default interviewRouter;
