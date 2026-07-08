import express from "express";
import { v4 as uuidv4 } from "uuid";
import InterviewSession from "../models/InterviewSession.model.js";
import InterviewRecord from "../models/InterviewRecord.model.js";
import InterviewProfile from "../models/InterviewProfile.model.js";
import User from "../models/User.model.js";
import protect from "../middleware/auth.js";
import {
  generateQuestion,
  evaluateAnswer,
  generateFinalSummary,
} from "../services/ai.service.js";

const router = express.Router();

router.post("/session", protect, async (req, res) => {
  const { action } = req.body;

  if (action === "start") {
    return handleStart(req, res);
  } else if (action === "answer") {
    return handleAnswer(req, res);
  } else if (action === "finish") {
    return handleFinish(req, res);
  } else {
    return res
      .status(400)
      .json({ message: "Invalid action. Use: start, answer, or finish" });
  }
});

// Start a new interview session
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

    // TTL: session expires 24 hours from now
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Get the first question for the first round
    const firstRound = profile.rounds[0] || "hr";
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
      rounds: profile.rounds,
      currentRoundIndex: 0,
      currentQuestion: firstQuestion,
      turns: [],
      startedAt: new Date(),
      expiresAt,
    });

    res.status(201).json({
      sessionId: session.sessionId,
      currentRound: profile.rounds[0],
      currentRoundIndex: 0,
      totalRounds: profile.rounds.length,
      question: firstQuestion,
    });
  } catch (error) {
    console.error("Start session error:", error.message);
    res.status(500).json({ message: "Failed to start session" });
  }
}

// Submit an answer and get the next question (or move to next round)
async function handleAnswer(req, res) {
  try {
    const { sessionId, answer } = req.body;

    if (!sessionId || !answer) {
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
    const currentRound = session.rounds[session.currentRoundIndex];

    // Evaluate the answer using AI
    const evaluation = await evaluateAnswer({
      question: session.currentQuestion,
      answer,
      roundType: currentRound,
      profile,
    });

    // Save this turn to the session
    const turn = {
      round: currentRound,
      question: session.currentQuestion,
      answer,
      improvedAnswer: evaluation.improvedAnswer,
      scores: evaluation.scores,
      analysis: evaluation.analysis,
      summary: evaluation.summary,
      shouldRetry: evaluation.shouldRetry,
    };
    session.turns.push(turn);

    // Count how many questions have been asked in the current round
    const turnsInCurrentRound = session.turns.filter(
      (t) => t.round === currentRound,
    );

    // Each round has a max of 5 questions, or we move on if the AI says to
    const maxQuestionsPerRound = 5;
    const shouldMoveToNextRound =
      turnsInCurrentRound.length >= maxQuestionsPerRound;

    let nextQuestion = null;
    let roundComplete = false;
    let interviewComplete = false;
    let nextRound = currentRound;
    let nextRoundIndex = session.currentRoundIndex;

    if (shouldMoveToNextRound) {
      // Check if there is a next round
      if (session.currentRoundIndex + 1 < session.rounds.length) {
        nextRoundIndex = session.currentRoundIndex + 1;
        nextRound = session.rounds[nextRoundIndex];
        session.currentRoundIndex = nextRoundIndex;

        nextQuestion = await generateQuestion({
          roundType: nextRound,
          profile,
          previousTurns: [],
          isFirst: true,
        });

        session.currentQuestion = nextQuestion;
        roundComplete = true;
      } else {
        // All rounds done
        interviewComplete = true;
        session.currentQuestion = null;
      }
    } else {
      // Continue with the next question in the same round
      const turnsForContext = turnsInCurrentRound.slice(-3); // pass last 3 for context
      nextQuestion = await generateQuestion({
        roundType: currentRound,
        profile,
        previousTurns: turnsForContext,
        isFirst: false,
      });
      session.currentQuestion = nextQuestion;
    }

    await session.save();

    res.json({
      evaluation,
      nextQuestion: interviewComplete ? null : nextQuestion,
      roundComplete,
      interviewComplete,
      currentRound: nextRound,
      currentRoundIndex: nextRoundIndex,
      totalRounds: session.rounds.length,
    });
  } catch (error) {
    console.error("Answer submission error:", error.message);
    res.status(500).json({ message: "Failed to process answer" });
  }
}

// Finish the interview: generate final summary and save to InterviewRecord
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

    // Group turns by round for the final record
    const roundsMap = {};
    for (const turn of session.turns) {
      if (!roundsMap[turn.round]) {
        roundsMap[turn.round] = [];
      }
      roundsMap[turn.round].push(turn);
    }

    const roundsForSummary = Object.entries(roundsMap).map(
      ([roundType, turns]) => {
        const roundScore =
          turns.reduce((sum, t) => sum + (t.scores?.overall || 0), 0) /
          (turns.length || 1);
        return {
          roundType,
          turns,
          roundScore: Math.round(roundScore * 10) / 10,
        };
      },
    );

    // Ask AI for the final summary
    const summary = await generateFinalSummary({
      rounds: roundsForSummary,
      profile,
    });

    // Determine interview type based on which rounds were done
    const roundTypes = session.rounds;
    let interviewType = "Mixed";
    if (roundTypes.length === 1) {
      if (roundTypes[0] === "hr") interviewType = "HR";
      else if (roundTypes[0] === "technical") interviewType = "Technical";
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
    });

    // Update user stats
    await updateUserStats(req.user._id, summary.overallScore);

    // Delete the temporary session now that we're done with it
    await InterviewSession.deleteOne({ sessionId });

    res.json({ record });
  } catch (error) {
    console.error("Finish interview error:", error.message);
    res.status(500).json({ message: "Failed to finish interview" });
  }
}

// Helper to update aggregate stats on the User document
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

// GET /api/interview/session/:sessionId — get session state (for reconnecting)
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

// GET /api/interview/records — list past completed interviews
router.get("/records", protect, async (req, res) => {
  try {
    const records = await InterviewRecord.find({ userId: req.user._id })
      .select("-rounds.turns") // exclude full turn data in list view for speed
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

// GET /api/interview/records/:id — single record with full detail
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
