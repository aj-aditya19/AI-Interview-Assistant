import express from "express";
import protect from "../middleware/auth.js";
import aiQuota from "../middleware/aiQuota.js";
import PracticeRecord from "../models/PracticeRecord.model.js";
import { checkSentence } from "../services/ai.practice.service.js";
import { awardXP, dayKey } from "../services/gamification.service.js";

const router = express.Router();

router.post("/sentence-check", protect, aiQuota(1), async (req, res) => {
  const { word, meaning, sentence } = req.body || {};
  if (!word || !sentence || String(sentence).trim().split(/\s+/).length < 3) {
    return res
      .status(400)
      .json({ message: "Write a full sentence using the word." });
  }
  try {
    const out = await checkSentence({
      word: String(word).slice(0, 40),
      meaning: String(meaning || "").slice(0, 200),
      sentence: String(sentence).slice(0, 400),
    });
    res.json(out);
  } catch {
    res.status(500).json({ message: "Couldn't check the sentence right now" });
  }
});

router.post("/complete", protect, async (req, res) => {
  try {
    const { type, correct = 0, total = 0, words = 0 } = req.body || {};
    if (!type || !total)
      return res.status(400).json({ message: "type and total required" });
    const t = Math.max(1, Math.min(100, Number(total)));
    const c = Math.max(0, Math.min(t, Number(correct)));
    const pct = Math.round((c / t) * 100);

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const today = await PracticeRecord.countDocuments({
      userId: req.user._id,
      type: "comm",
      createdAt: { $gte: start },
    });

    await PracticeRecord.create({
      userId: req.user._id,
      type: "comm",
      overallScore: pct / 10,
      meta: {
        kind: String(type).slice(0, 30),
        correct: c,
        total: t,
        day: dayKey(),
      },
    });
    const gamification =
      today < 8
        ? await awardXP(req.user._id, {
            kind: "comm",
            score: pct,
            words: Math.min(60, Number(words) || 0),
          })
        : null;
    res.json({ gamification, pct });
  } catch (err) {
    console.error("comm complete:", err.message);
    res.status(500).json({ message: "Failed to save progress" });
  }
});

export default router;
