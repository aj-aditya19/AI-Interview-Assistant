import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import protect from "../middleware/auth.js";
import aiQuota from "../middleware/aiQuota.js";
import PracticeRecord from "../models/PracticeRecord.model.js";
import { awardXP } from "../services/gamification.service.js";
import {
  evaluateWAT,
  evaluateSRT,
  evaluateTAT,
  evaluateSDT,
  gdTurn,
  gdOpening,
  evaluateGD,
} from "../services/ai.practice.service.js";
import {
  availableImages,
  findImage,
  absoluteUrl,
  baseUrlOf,
  sample,
} from "../utils/ppdtImages.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const load = (f) =>
  JSON.parse(readFileSync(path.join(__dirname, "../data", f), "utf-8"));
const WAT = load("wat.json").words;
const SRT = load("srt.json").situations;
const SDT = load("sdt.json").prompts;
const GD_TOPICS = load("gdTopics.json").topics;

const TIMING = {
  wat: { secondsPerItem: 15, defaultCount: 30, maxCount: 60 },
  srt: { secondsPerItem: 30, defaultCount: 20, maxCount: 60 },
  tat: { viewSeconds: 30, writeSeconds: 240, defaultCount: 4, maxCount: 11 },
  sdt: { secondsPerItem: 180 },
};
const cap = (s, n = 1500) => String(s || "").slice(0, n);
const intIn = (v, lo, hi, d) =>
  Math.max(lo, Math.min(hi, parseInt(v, 10) || d));

router.get("/config", protect, (req, res) => {
  res.json({
    timing: TIMING,
    available: {
      wat: WAT.length,
      srt: SRT.length,
      sdt: SDT.length,
      tat: availableImages().length,
      gdTopics: GD_TOPICS.length,
    },
  });
});

router.post("/:type/start", protect, (req, res) => {
  const { type } = req.params;
  const base = baseUrlOf(req);

  if (type === "wat") {
    const n = intIn(
      req.body.count,
      10,
      TIMING.wat.maxCount,
      TIMING.wat.defaultCount,
    );
    return res.json({
      type,
      secondsPerItem: TIMING.wat.secondsPerItem,
      items: sample(WAT, n),
    });
  }
  if (type === "srt") {
    const n = intIn(
      req.body.count,
      5,
      TIMING.srt.maxCount,
      TIMING.srt.defaultCount,
    );
    return res.json({
      type,
      secondsPerItem: TIMING.srt.secondsPerItem,
      items: sample(SRT, n),
    });
  }
  if (type === "sdt") {
    return res.json({
      type,
      secondsPerItem: TIMING.sdt.secondsPerItem,
      items: SDT,
    });
  }
  if (type === "tat") {
    const pool = availableImages();
    const n = Math.min(
      intIn(req.body.count, 1, TIMING.tat.maxCount, TIMING.tat.defaultCount),
      pool.length,
    );
    const pics = sample(pool, n).map((img) => ({
      id: img.id,
      imageUrl: absoluteUrl(img, base),
      viewSeconds: TIMING.tat.viewSeconds,
      writeSeconds: TIMING.tat.writeSeconds,
    }));
    pics.push({
      id: "blank",
      imageUrl: null,
      viewSeconds: 0,
      writeSeconds: TIMING.tat.writeSeconds,
    });
    return res.json({ type, items: pics });
  }
  return res.status(404).json({ message: "Unknown practice type" });
});

router.post("/:type/submit", protect, aiQuota(3), async (req, res) => {
  const { type } = req.params;
  try {
    const answers = Array.isArray(req.body.answers)
      ? req.body.answers.slice(0, 80)
      : [];
    if (!answers.length)
      return res.status(400).json({ message: "No answers submitted" });

    let evaluation, items;

    if (type === "wat") {
      const rows = answers
        .map((a) => ({
          id: a.id,
          word: WAT.find((w) => w.id === a.id)?.word,
          text: cap(a.text, 200),
        }))
        .filter((r) => r.word);
      evaluation = await evaluateWAT(rows);
      items = rows.map((r, i) => ({
        id: r.id,
        prompt: r.word,
        text: r.text,
        ...pick(evaluation.items[i]),
      }));
    } else if (type === "srt") {
      const rows = answers
        .map((a) => ({
          id: a.id,
          situation: SRT.find((s) => s.id === a.id)?.situation,
          text: cap(a.text, 500),
        }))
        .filter((r) => r.situation);
      evaluation = await evaluateSRT(rows);
      items = rows.map((r, i) => ({
        id: r.id,
        prompt: r.situation,
        text: r.text,
        ...pick(evaluation.items[i]),
      }));
    } else if (type === "tat") {
      const rows = answers.map((a) => {
        const img = a.id === "blank" ? null : findImage(a.id);
        return {
          id: a.id,
          referenceDescription: img?.referenceDescription,
          keyElements: img?.keyElements,
          text: cap(a.text, 2500),
          blank: a.id === "blank",
        };
      });
      evaluation = await evaluateTAT(rows);
      items = rows.map((r, i) => ({
        id: r.id,
        prompt: r.blank ? "Blank slide" : r.referenceDescription,
        text: r.text,
        ...pick(evaluation.items[i]),
      }));
    } else if (type === "sdt") {
      const rows = answers
        .map((a) => ({
          id: a.id,
          prompt: SDT.find((p) => p.id === a.id)?.prompt,
          text: cap(a.text, 2500),
        }))
        .filter((r) => r.prompt);
      evaluation = await evaluateSDT(rows);
      items = rows.map((r, i) => ({
        id: r.id,
        prompt: r.prompt,
        text: r.text,
        ...pick(evaluation.items[i]),
      }));
    } else {
      return res.status(404).json({ message: "Unknown practice type" });
    }

    if (!evaluation.ok) {
      return res.status(502).json({
        message: "The AI evaluator is busy. Please try submitting again.",
      });
    }

    const answered = items.filter((i) => i.text?.trim()).length;
    const record = await PracticeRecord.create({
      userId: req.user._id,
      type,
      overallScore: evaluation.overallScore,
      result: evaluation.result,
      items,
      olq: evaluation.olq,
      patterns: evaluation.patterns,
      recommendations: evaluation.recommendations,
      durationSeconds: Number(req.body.durationSeconds) || 0,
      meta: { answered, total: items.length },
    });
    const gamification =
      answered >= Math.ceil(items.length / 3)
        ? await awardXP(req.user._id, {
            kind: type,
            score: evaluation.overallScore,
          })
        : null;

    res.status(201).json({ record, gamification });
  } catch (err) {
    console.error(`${type} submit error:`, err.message);
    res.status(500).json({ message: "Failed to evaluate your responses" });
  }
});

const pick = (it = {}) => ({
  score: it.score ?? 0,
  note: it.note || "",
  tone: it.tone,
  olq: it.olq,
  hero: it.hero,
});

const PERSONAS = [
  {
    name: "Rahul",
    style: "confident, assertive, data-driven, sometimes interrupts",
  },
  {
    name: "Priya",
    style: "calm, structured, good at summarising and bridging views",
  },
  {
    name: "Amit",
    style: "quiet but insightful, offers a contrarian angle, polite",
  },
];

router.post("/gd/start", protect, aiQuota(1), async (req, res) => {
  try {
    const topic = cap(req.body.topic, 140) || sample(GD_TOPICS, 1)[0];
    const opening = await gdOpening({ topic, personas: PERSONAS });
    res.json({ topic, personas: PERSONAS, opening, topics: GD_TOPICS });
  } catch (err) {
    console.error("GD start:", err.message);
    res.status(500).json({ message: "Failed to start the discussion" });
  }
});

router.post("/gd/turn", protect, aiQuota(1), async (req, res) => {
  try {
    const { topic, history = [], message } = req.body;
    if (!topic || !message?.trim())
      return res.status(400).json({ message: "topic and message required" });
    const hist = history
      .slice(-20)
      .map((m) => ({ speaker: cap(m.speaker, 20), text: cap(m.text, 500) }));
    const messages = await gdTurn({
      topic: cap(topic, 140),
      personas: PERSONAS,
      history: hist,
      userMessage: cap(message, 600),
    });
    res.json({ messages });
  } catch (err) {
    console.error("GD turn:", err.message);
    res.status(500).json({ message: "Failed to continue the discussion" });
  }
});

router.post("/gd/finish", protect, aiQuota(2), async (req, res) => {
  try {
    const { topic, history = [], durationSeconds } = req.body;
    const hist = history
      .slice(-60)
      .map((m) => ({ speaker: cap(m.speaker, 20), text: cap(m.text, 600) }));
    const mine = hist.filter((m) => m.speaker === "You").length;
    if (mine < 2)
      return res.status(400).json({
        message:
          "Speak at least twice before finishing so there is something to evaluate.",
      });
    const ev = await evaluateGD({ topic: cap(topic, 140), history: hist });
    const record = await PracticeRecord.create({
      userId: req.user._id,
      type: "gd",
      overallScore: ev.overallScore,
      result: ev.result,
      items: hist,
      olq: ev.olq,
      recommendations: ev.recommendations,
      summary: ev.summary,
      patterns: ev.highlights,
      durationSeconds: Number(durationSeconds) || 0,
      meta: { topic: cap(topic, 140), turns: mine },
    });
    const gamification = await awardXP(req.user._id, {
      kind: "gd",
      score: ev.overallScore,
    });
    res.status(201).json({ record, gamification });
  } catch (err) {
    console.error("GD finish:", err.message);
    res.status(500).json({ message: "Failed to evaluate the discussion" });
  }
});

router.get("/records", protect, async (req, res) => {
  try {
    const q = { userId: req.user._id };
    if (req.query.type) q.type = req.query.type;
    const records = await PracticeRecord.find(q)
      .select("-items")
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(records);
  } catch {
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

router.get("/records/:id", protect, async (req, res) => {
  try {
    const record = await PracticeRecord.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch {
    res.status(404).json({ message: "Record not found" });
  }
});

export default router;
