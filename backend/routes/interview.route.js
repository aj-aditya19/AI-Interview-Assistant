import express from "express";
import { v4 as uuidv4 } from "uuid";
import InterviewSession from "../models/InterviewSession.model.js";
import InterviewRecord from "../models/InterviewRecord.model.js";
import InterviewProfile from "../models/InterviewProfile.model.js";
import User from "../models/User.model.js";
import protect from "../middleware/auth.js";
import aiQuota from "../middleware/aiQuota.js";
import { analyzeSpeech, aggregateSpeech } from "../utils/speechMetrics.js";
import { awardXP } from "../services/gamification.service.js";
import {
  generateQuestion,
  evaluateAnswer,
  generateFinalSummary,
} from "../services/ai.service.js";

const router = express.Router();
function normalizeRound(r) {
  if (typeof r === "string") {
    return { roundType: r, durationMinutes: 5 };
  }
  return r;
}

router.post("/session", protect, async (req, res) => {
  const { action } = req.body;

  if (["start", "answer", "retry", "finish"].includes(action)) {
    const quota = aiQuota(action === "answer" || action === "retry" ? 2 : 3);
    return quota(req, res, () => dispatch(action, req, res));
  }
  return dispatch(action, req, res);
});

function dispatch(action, req, res) {
  if (action === "start") {
    return handleStart(req, res);
  } else if (action === "answer") {
    return handleAnswer(req, res);
  } else if (action === "retry") {
    return handleRetry(req, res);
  } else if (action === "timeout") {
    return handleRoundTimeout(req, res);
  } else if (action === "finish") {
    return handleFinish(req, res);
  } else {
    return res.status(400).json({
      message: "Invalid action. Use: start, answer, retry, timeout, or finish",
    });
  }
}

async function handleStart(req, res) {
  try {
    const { profileId } = req.body;

    if (!profileId) {
      return res.status(400).json({ message: "profileId is required" });
    }

    const profile = await InterviewProfile.findOne({
      _id: profileId,
      userId: req.user._id,
    });
    if (!profile) {
      return res.status(404).json({ message: "Interview profile not found" });
    }

    const sessionId = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const rounds = (profile.rounds || []).map(normalizeRound);
    if (rounds.length === 0) {
      rounds.push({ roundType: "hr", durationMinutes: 5 });
    }
    const firstRound = rounds[0].roundType;
    const firstQuestion = await generateQuestion({
      roundType: firstRound,
      profile,
      previousTurns: [],
      isFirst: true,
    });
    const session = await InterviewSession.create({
      userId: req.user._id,
      profileId: profile._id,
      sessionId,
      rounds,
      currentRoundIndex: 0,
      roundStartedAt: new Date(),
      currentQuestion: firstQuestion,
      turns: [],
      startedAt: new Date(),
      expiresAt,
    });
    res.status(201).json({
      sessionId: session.sessionId,
      currentRound: rounds[0].roundType,
      currentRoundIndex: 0,
      totalRounds: rounds.length,
      roundDurationMinutes: rounds[0].durationMinutes,
      question: firstQuestion,
    });
  } catch (error) {
    console.error("Start session error:", error.message);
    res.status(500).json({ message: "Failed to start session" });
  }
}

async function handleAnswer(req, res) {
  try {
    const { sessionId, answer: rawAnswer, speakingSeconds } = req.body;
    const answer = typeof rawAnswer === "string" ? rawAnswer.slice(0, 4000) : "";

    if (!sessionId || !answer.trim()) {
      return res
        .status(400)
        .json({ message: "sessionId and answer are required" });
    }

    const session = await InterviewSession.findOne({
      sessionId,
      userId: req.user._id,
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found or expired" });
    }

    const profile = await InterviewProfile.findById(session.profileId);
    const currentRound = normalizeRound(
      session.rounds[session.currentRoundIndex],
    );

    const speech = analyzeSpeech(answer, speakingSeconds);
    const evaluation = await evaluateAnswer({
      question: session.currentQuestion,
      answer,
      roundType: currentRound.roundType,
      profile,
      speech,
    });

    const turn = {
      speech,
      round: currentRound.roundType,
      question: session.currentQuestion,
      answer,
      improvedAnswer: evaluation.improvedAnswer,
      scores: evaluation.scores,
      analysis: evaluation.analysis,
      summary: evaluation.summary,
      shouldRetry: evaluation.shouldRetry,
    };
    session.turns.push(turn);
    const turnsInCurrentRound = session.turns.filter(
      (t) => t.round === currentRound.roundType && !t.isRetry,
    );
    const maxQuestionsPerRound = 5;
    const roundElapsedMs =
      Date.now() - new Date(session.roundStartedAt).getTime();
    const roundTimeUp =
      roundElapsedMs >= currentRound.durationMinutes * 60 * 1000;
    const shouldMoveToNextRound =
      turnsInCurrentRound.length >= maxQuestionsPerRound || roundTimeUp;

    let nextQuestion = null;
    let roundComplete = false;
    let interviewComplete = false;
    let nextRound = currentRound;
    let nextRoundIndex = session.currentRoundIndex;

    if (shouldMoveToNextRound) {
      if (session.currentRoundIndex + 1 < session.rounds.length) {
        nextRoundIndex = session.currentRoundIndex + 1;
        nextRound = normalizeRound(session.rounds[nextRoundIndex]);
        session.currentRoundIndex = nextRoundIndex;
        session.roundStartedAt = new Date();
        nextQuestion = await generateQuestion({
          roundType: nextRound.roundType,
          profile,
          previousTurns: [],
          isFirst: true,
        });
        session.currentQuestion = nextQuestion;
        roundComplete = true;
      } else {
        interviewComplete = true;
        session.currentQuestion = null;
      }
    } else {
      const turnsForContext = turnsInCurrentRound.slice(-3);
      nextQuestion = await generateQuestion({
        roundType: currentRound.roundType,
        profile,
        previousTurns: turnsForContext,
        isFirst: false,
      });
      session.currentQuestion = nextQuestion;
    }

    await session.save();

    res.json({
      evaluation,
      speech,
      nextQuestion: interviewComplete ? null : nextQuestion,
      roundComplete,
      interviewComplete,
      currentRound: nextRound.roundType,
      currentRoundIndex: nextRoundIndex,
      totalRounds: session.rounds.length,
      roundDurationMinutes: nextRound.durationMinutes,
    });
  } catch (error) {
    console.error("Answer submission error:", error.message);
    res.status(500).json({ message: "Failed to process answer" });
  }
}

async function handleRetry(req, res) {
  try {
    const { sessionId, answer: rawAnswer, speakingSeconds } = req.body;
    const answer = typeof rawAnswer === "string" ? rawAnswer.slice(0, 4000) : "";
    if (!sessionId || !answer.trim()) {
      return res.status(400).json({ message: "sessionId and answer are required" });
    }
    const session = await InterviewSession.findOne({ sessionId, userId: req.user._id });
    if (!session) return res.status(404).json({ message: "Session not found or expired" });

    const last = session.turns[session.turns.length - 1];
    if (!last) return res.status(400).json({ message: "Nothing to retry yet" });
    if (last.isRetry) {
      return res.status(409).json({ message: "You can retry each question once." });
    }

    const profile = await InterviewProfile.findById(session.profileId);
    const speech = analyzeSpeech(answer, speakingSeconds);
    const evaluation = await evaluateAnswer({
      question: last.question, answer, roundType: last.round, profile, speech,
    });

    session.turns.push({
      round: last.round,
      question: last.question,
      answer,
      improvedAnswer: evaluation.improvedAnswer,
      scores: evaluation.scores,
      analysis: evaluation.analysis,
      summary: evaluation.summary,
      attemptNumber: (last.attemptNumber || 1) + 1,
      isRetry: true,
      speech,
    });
    await session.save();

    res.json({
      evaluation,
      speech,
      previousScore: last.scores?.overall ?? null,
      improvement:
        Math.round(((evaluation.scores?.overall || 0) - (last.scores?.overall || 0)) * 10) / 10,
    });
  } catch (error) {
    console.error("Retry error:", error.message);
    res.status(500).json({ message: "Failed to process retry" });
  }
}

async function handleRoundTimeout(req, res) {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    const session = await InterviewSession.findOne({
      sessionId,
      userId: req.user._id,
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found or expired" });
    }

    const profile = await InterviewProfile.findById(session.profileId);

    let nextQuestion = null;
    let roundComplete = false;
    let interviewComplete = false;
    let nextRound = normalizeRound(session.rounds[session.currentRoundIndex]);
    let nextRoundIndex = session.currentRoundIndex;

    if (session.currentRoundIndex + 1 < session.rounds.length) {
      nextRoundIndex = session.currentRoundIndex + 1;
      nextRound = normalizeRound(session.rounds[nextRoundIndex]);
      session.currentRoundIndex = nextRoundIndex;
      session.roundStartedAt = new Date();

      nextQuestion = await generateQuestion({
        roundType: nextRound.roundType,
        profile,
        previousTurns: [],
        isFirst: true,
      });

      session.currentQuestion = nextQuestion;
      roundComplete = true;
    } else {
      interviewComplete = true;
      session.currentQuestion = null;
    }

    await session.save();

    res.json({
      nextQuestion: interviewComplete ? null : nextQuestion,
      roundComplete,
      interviewComplete,
      currentRound: nextRound.roundType,
      currentRoundIndex: nextRoundIndex,
      totalRounds: session.rounds.length,
      roundDurationMinutes: nextRound.durationMinutes,
    });
  } catch (error) {
    console.error("Round timeout error:", error.message);
    res.status(500).json({ message: "Failed to process round timeout" });
  }
}

async function handleFinish(req, res) {
  try {
    const { sessionId, durationSeconds } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    const session = await InterviewSession.findOne({
      sessionId,
      userId: req.user._id,
    });
    if (!session) {
      return res
        .status(404)
        .json({ message: "Session not found or already finished" });
    }

    const profile = await InterviewProfile.findById(session.profileId);
    const roundsMap = {};
    for (const turn of session.turns) {
      if (!roundsMap[turn.round]) {
        roundsMap[turn.round] = [];
      }
      roundsMap[turn.round].push(turn);
    }

    const roundsForSummary = Object.entries(roundsMap).map(
      ([roundType, turns]) => {
        const scored = turns.filter((t) => !t.isRetry);
        const roundScore =
          scored.reduce((sum, t) => sum + (t.scores?.overall || 0), 0) /
          (scored.length || 1);
        return {
          roundType,
          turns,
          roundScore: Math.round(roundScore * 10) / 10,
        };
      },
    );

    const speech = aggregateSpeech(session.turns.filter((t) => !t.isRetry));
    const summary = await generateFinalSummary({
      rounds: roundsForSummary,
      profile,
      speech,
    });

    const roundTypes = session.rounds.map((r) => r.roundType);
    let interviewType = "Mixed";
    if (roundTypes.length === 1) {
      if (roundTypes[0] === "hr") interviewType = "HR";
      else if (["technical", "dsa", "system_design", "project"].includes(roundTypes[0])) interviewType = "Technical";
      else interviewType = "Behavioral";
    }

    const record = await InterviewRecord.create({
      userId: req.user._id,
      profileId: session.profileId,
      interviewType,
      targetRole: profile?.targetRole,
      targetCompany: profile?.targetCompany,
      difficulty: profile?.difficulty,
      status: "Completed",
      durationSeconds: durationSeconds || 0,
      startedAt: session.startedAt,
      endedAt: new Date(),
      rounds: roundsForSummary,
      overallScore: summary.overallScore,
      result: summary.result,
      strengths: summary.strengths,
      weaknesses: summary.weaknesses,
      recommendations: summary.recommendations,
      finalSummary: summary.finalSummary,
      readinessLabel: summary.readinessLabel,
      language: profile?.language || "english",
      speech,
    });

    await updateUserStats(req.user._id, summary.overallScore);
    await InterviewSession.deleteOne({ sessionId });
    const gamification = await awardXP(req.user._id, {
      kind: "interview",
      score: summary.overallScore,
    });

    res.json({ record, gamification });
  } catch (error) {
    console.error("Finish interview error:", error.message);
    res.status(500).json({ message: "Failed to finish interview" });
  }
}
async function updateUserStats(userId, newScore) {
  const user = await User.findById(userId);
  if (!user) return;

  const total = user.stats.totalInterviews + 1;
  const prevAvg = user.stats.averageInterviewScore || 0;
  const newAvg = (prevAvg * (total - 1) + newScore) / total;

  user.stats.totalInterviews = total;
  user.stats.averageInterviewScore = Math.round(newAvg * 10) / 10;
  if (newScore > (user.stats.bestInterviewScore || 0)) {
    user.stats.bestInterviewScore = newScore;
  }

  await user.save();
}

router.get("/session/:sessionId", protect, async (req, res) => {
  try {
    const session = await InterviewSession.findOne({
      sessionId: req.params.sessionId,
      userId: req.user._id,
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch session" });
  }
});

router.get("/records", protect, async (req, res) => {
  try {
    const records = await InterviewRecord.find({ userId: req.user._id })
      .select("-rounds.turns")
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

router.get("/records/:id", protect, async (req, res) => {
  try {
    const record = await InterviewRecord.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch record" });
  }
});

export default router;
