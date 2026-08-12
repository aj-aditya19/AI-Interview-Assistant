import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import PPDTSession from "../models/PPDTSession.model.js";
import PPDTRecord from "../models/PPDTRecord.model.js";
import User from "../models/User.model.js";
import protect from "../middleware/auth.js";
import { evaluatePPDT } from "../services/ai.service.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ppdtData = JSON.parse(
  readFileSync(path.join(__dirname, "../data/ppdt.json"), "utf-8"),
);

router.get("/images", protect, async (req, res) => {
  try {
    const { difficulty } = req.query;

    let images = ppdtData.images.map((img) => ({
      id: img.id,
      difficulty: img.difficulty,
      viewDurationSeconds: img.viewDurationSeconds,
      responseDurationSeconds: img.responseDurationSeconds,
      imageUrl: img.imageUrl,
    }));

    if (difficulty) {
      images = images.filter((img) => img.difficulty === difficulty);
    }

    res.json(images);
  } catch (error) {
    console.error("PPDT images error:", error.message);
    res.status(500).json({ message: "Failed to load images" });
  }
});

router.post("/session/start", protect, async (req, res) => {
  try {
    const { imageId, difficulty } = req.body;

    if (!imageId) {
      return res.status(400).json({ message: "imageId is required" });
    }

    const imageData = ppdtData.images.find((img) => img.id === imageId);
    if (!imageData) {
      return res.status(404).json({ message: "Image not found" });
    }

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const session = await PPDTSession.create({
      userId: req.user._id,
      imageId,
      difficulty: imageData.difficulty,
      viewDurationSeconds: imageData.viewDurationSeconds,
      responseDurationSeconds: imageData.responseDurationSeconds,
      startedAt: new Date(),
      expiresAt,
    });

    res.status(201).json({
      sessionId: session._id,
      imageUrl: imageData.imageUrl,
      viewDurationSeconds: imageData.viewDurationSeconds,
      responseDurationSeconds: imageData.responseDurationSeconds,
      difficulty: imageData.difficulty,
    });
  } catch (error) {
    console.error("PPDT start error:", error.message);
    res.status(500).json({ message: "Failed to start PPDT session" });
  }
});

router.post("/session/submit", protect, async (req, res) => {
  try {
    const { sessionId, userAnswer, durationSeconds } = req.body;

    if (!sessionId || !userAnswer) {
      return res
        .status(400)
        .json({ message: "sessionId and userAnswer are required" });
    }

    const session = await PPDTSession.findOne({
      _id: sessionId,
      userId: req.user._id,
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found or expired" });
    }

    const imageData = ppdtData.images.find((img) => img.id === session.imageId);
    if (!imageData) {
      return res.status(404).json({ message: "Image data not found" });
    }

    const evaluation = await evaluatePPDT({
      userAnswer,
      referenceDescription: imageData.referenceDescription,
      imageId: session.imageId,
    });

    const record = await PPDTRecord.create({
      userId: req.user._id,
      imageId: session.imageId,
      imageUrl: imageData.imageUrl,
      referenceDescription: imageData.referenceDescription,
      userAnswer,
      overallScore: evaluation.overallScore,
      result: evaluation.result,
      recommendations: evaluation.recommendations,
      durationSeconds: durationSeconds || session.responseDurationSeconds,
      difficulty: session.difficulty,
    });

    await updateUserPPDTStats(req.user._id, evaluation.overallScore);

    await PPDTSession.deleteOne({ _id: sessionId });

    res.json({ record });
  } catch (error) {
    console.error("PPDT submit error:", error.message);
    res.status(500).json({ message: "Failed to submit PPDT response" });
  }
});

router.get("/records", protect, async (req, res) => {
  try {
    const records = await PPDTRecord.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch PPDT records" });
  }
});

async function updateUserPPDTStats(userId, newScore) {
  const user = await User.findById(userId);
  if (!user) return;

  const total = user.stats.totalPPDTSessions + 1;
  const prevAvg = user.stats.averagePPDTScore || 0;
  const newAvg = (prevAvg * (total - 1) + newScore) / total;

  user.stats.totalPPDTSessions = total;
  user.stats.averagePPDTScore = Math.round(newAvg * 10) / 10;
  if (newScore > (user.stats.bestPPDTScore || 0)) {
    user.stats.bestPPDTScore = newScore;
  }

  await user.save();
}

export default router;
