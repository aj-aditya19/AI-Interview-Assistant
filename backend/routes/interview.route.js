import express from "express";
import axios from "axios";
import { protect } from "../middleware/auth.js";
import {
  startInterviewRecording,
  stopInterviewRecording,
} from "../services/recording.js";

const interviewRouter = express.Router();

const toText = (value) => String(value || "").trim();

const validTrackValues = ["internship", "job", "language"];
const validDurationValues = ["3", "5"];
const validLevelValues = ["Beginner", "Intermediate", "Advanced"];

const isFilled = (value) => Boolean(toText(value));

const validateSetup = (setup) => {
  const track = toText(setup?.track) || "internship";

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

    if (!isFilled(setup?.skills)) {
      return "Please add your skills first.";
    }

    if (!isFilled(setup?.techStack)) {
      return "Please add your tech stack first.";
    }
  }

  return "";
};

const setupSummary = (setup) => {
  const track = toText(setup?.track) || "internship";
  const role = toText(setup?.role) || "the candidate";
  const skills = toText(setup?.skills) || "general interview readiness";
  const projects = toText(setup?.projects) || "relevant projects";
  const techStack = toText(setup?.techStack) || "a flexible tech stack";
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
    `Skills: ${skills}`,
    `Projects: ${projects}`,
    `Tech stack: ${techStack}`,
    `Experience: ${experience}`,
    `Previous internships: ${previousInternships}`,
    `Interview level: ${interviewLevel}`,
    `Notes: ${toText(setup?.notes) || "none"}`,
  ].join("\n");
};

const getStartPrompt = (setup) => {
  const track = toText(setup?.track) || "internship";

  if (track === "language") {
    return {
      system:
        "You are a helpful language interview coach. Ask one friendly opening question first about the learner, then one concise follow-up based on the target language and current level. Return only JSON with keys: question, intro. The question must begin by asking the learner to introduce themselves and explain why they want to learn the language. No markdown, no extra text.",
      intro:
        "Start with a short introduction, then answer naturally and clearly in the target language when possible.",
    };
  }

  if (track === "job") {
    return {
      system:
        "You are a strict but fair job interview interviewer. Ask one concise opening question that starts with a brief self-introduction prompt and then targets role fit, experience, projects, and practical problem solving. Return only JSON with keys: question, intro. No markdown, no extra text.",
      intro:
        "Start with a short self-introduction and focus on impact, experience, and examples.",
    };
  }

  return {
    system:
      "You are a strict but fair internship interviewer. Ask one concise opening question that starts with a brief self-introduction prompt and then targets role fit, skills, projects, tech stack, and learning mindset. Return only JSON with keys: question, intro. No markdown, no extra text.",
    intro:
      "Start with a short self-introduction and focus on your skills, projects, and readiness to learn.",
  };
};

const getReviewPrompt = (setup) => {
  const track = toText(setup?.track) || "internship";

  if (track === "language") {
    return {
      system:
        "You are an AI language coach. Evaluate the learner answer in short point-to-point form. Return only JSON with keys: analysis (array of 3-5 short bullet strings), scores (object with pronunciation, fluency, vocabulary, grammar, overall numbers from 0 to 10), summary (1-2 short sentences), nextQuestion (one concise follow-up question), and strengthFocus (one short string). Keep the feedback direct and helpful.",
      fallbackQuestion:
        "Can you introduce yourself again using the target language and share why you want to learn it?",
    };
  }

  if (track === "job") {
    return {
      system:
        "You are an AI job interview coach. Evaluate the candidate answer in short point-to-point form. Return only JSON with keys: analysis (array of 3-5 short bullet strings), scores (object with accuracy, confidence, vocabulary, english, overall numbers from 0 to 10), summary (1-2 short sentences), nextQuestion (one concise follow-up interview question), and strengthFocus (one short string). Focus on experience, impact, problem solving, and clarity.",
      fallbackQuestion:
        "Can you describe a situation where you improved a process or solved a difficult problem?",
    };
  }

  return {
    system:
      "You are an AI internship interview coach. Evaluate the candidate answer in short point-to-point form. Return only JSON with keys: analysis (array of 3-5 short bullet strings), scores (object with accuracy, confidence, vocabulary, english, overall numbers from 0 to 10), summary (1-2 short sentences), nextQuestion (one concise follow-up interview question), and strengthFocus (one short string). Focus on projects, skills, learning ability, and role fit.",
    fallbackQuestion:
      "Can you explain a project where you learned something important quickly?",
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

interviewRouter.post("/interview/session", protect, async (req, res) => {
  try {
    const action = toText(req.body?.action) || "start";
    const setup = req.body?.setup || {};
    const currentQuestion = toText(req.body?.question);
    const answer = toText(req.body?.answer);
    const reason = toText(req.body?.reason);
    const history = Array.isArray(req.body?.history)
      ? req.body.history.slice(-6)
      : [];

    if (action === "start") {
      const setupError = validateSetup(setup);

      if (setupError) {
        return res.status(400).json({ message: setupError });
      }

      const recording = await startInterviewRecording({
        userId: req.user?._id?.toString(),
        setup,
      });

      const startPrompt = getStartPrompt(setup);

      const content = await groqChat([
        {
          role: "system",
          content: startPrompt.system,
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
          startPrompt.intro ||
          "The interview is ready. Answer each question naturally and clearly.",
        question:
          toText(parsed.question) ||
          "Tell me about yourself and why you fit this track.",
        recording: {
          sessionId: recording.sessionId,
          status: "started",
        },
      });
    }

    if (action === "finish") {
      const finishPrompt =
        toText(reason) === "time-limit"
          ? "The interview time has ended. Summarize the candidate performance based on the completed conversation and provide a concise final assessment. Return only JSON with keys: finalSummary, strengths (array), improvements (array), nextSteps (array), readinessLabel, closingMessage. Keep it short, clear, and track-aware."
          : "Summarize the candidate performance based on the completed conversation and provide a concise final assessment. Return only JSON with keys: finalSummary, strengths (array), improvements (array), nextSteps (array), readinessLabel, closingMessage. Keep it short, clear, and track-aware.";

      const content = await groqChat([
        {
          role: "system",
          content: finishPrompt,
        },
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
      const recording = await stopInterviewRecording({
        userId: req.user?._id?.toString(),
      });

      return res.json({
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
        readinessLabel:
          toText(parsed.readinessLabel) || "Ready for the next round",
        closingMessage:
          toText(parsed.closingMessage) ||
          "Use the feedback to improve your next interview session.",
        recording: recording
          ? {
              sessionId: recording.sessionId,
              status: "stopped",
              outputDir: recording.outputDir,
              manifestPath: recording.manifestPath,
            }
          : {
              status: "not-started",
            },
      });
    }

    if (!currentQuestion || !answer) {
      return res
        .status(400)
        .json({ message: "Question and answer are required" });
    }

    const reviewPrompt = getReviewPrompt(setup);

    const content = await groqChat([
      {
        role: "system",
        content: reviewPrompt.system,
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
        toText(parsed.nextQuestion) || reviewPrompt.fallbackQuestion,
      strengthFocus:
        toText(parsed.strengthFocus) ||
        "Focus on structured speaking, examples, and confidence.",
    });
  } catch (error) {
    if (req.user?._id) {
      await stopInterviewRecording({ userId: req.user._id.toString() }).catch(
        () => {},
      );
    }

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
