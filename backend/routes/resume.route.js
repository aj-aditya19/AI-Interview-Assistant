import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import protect from "../middleware/auth.js";
import aiQuota from "../middleware/aiQuota.js";
import ResumeAnalysis from "../models/ResumeAnalysis.model.js";
import { analyzeResume, extractProfileFromResume } from "../services/ai.practice.service.js";
import { awardXP } from "../services/gamification.service.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype === "application/pdf" ? cb(null, true) : cb(new Error("Only PDF files are supported")),
}).single("resume");

const withUpload = (req, res, next) =>
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message || "Upload failed" });
    next();
  });

async function getResumeText(req) {
  if (req.file) {
    const parsed = await pdfParse(req.file.buffer);
    return (parsed.text || "").replace(/\s+\n/g, "\n").trim();
  }
  return String(req.body.resumeText || "").trim();
}

const tooShort = (t) => !t || t.length < 200;
const SHORT_MSG =
  "Couldn't read enough text from this resume. If it's a scanned/image PDF, paste the text instead.";

router.post("/analyze", protect, withUpload, aiQuota(3), async (req, res) => {
  try {
    const text = await getResumeText(req);
    if (tooShort(text)) return res.status(422).json({ message: SHORT_MSG });

    const analysis = await analyzeResume({
      resumeText: text,
      jobDescription: String(req.body.jobDescription || "").trim(),
      targetRole: String(req.body.targetRole || "").trim().slice(0, 80),
    });
    if (!analysis) return res.status(502).json({ message: "The analyzer is busy. Please try again." });

    const record = await ResumeAnalysis.create({
      userId: req.user._id,
      fileName: req.file?.originalname?.slice(0, 120),
      targetRole: String(req.body.targetRole || "").slice(0, 80),
      hadJobDescription: !!req.body.jobDescription,
      atsScore: analysis.atsScore,
      analysis,
    });
    const gamification = await awardXP(req.user._id, { kind: "resume", score: analysis.atsScore });
    res.status(201).json({ record, gamification });
  } catch (err) {
    console.error("resume analyze:", err.message);
    res.status(500).json({ message: "Failed to analyze the resume" });
  }
});

router.post("/extract-profile", protect, withUpload, aiQuota(2), async (req, res) => {
  try {
    const text = await getResumeText(req);
    if (tooShort(text)) return res.status(422).json({ message: SHORT_MSG });
    const profile = await extractProfileFromResume(text);
    if (!profile) return res.status(502).json({ message: "Couldn't read the resume. Please try again." });
    res.json(profile);
  } catch (err) {
    console.error("resume extract:", err.message);
    res.status(500).json({ message: "Failed to read the resume" });
  }
});

router.get("/history", protect, async (req, res) => {
  const rows = await ResumeAnalysis.find({ userId: req.user._id })
    .sort({ createdAt: -1 }).limit(10).select("atsScore targetRole fileName createdAt hadJobDescription");
  res.json(rows);
});

router.get("/history/:id", protect, async (req, res) => {
  try {
    const row = await ResumeAnalysis.findOne({ _id: req.params.id, userId: req.user._id });
    if (!row) return res.status(404).json({ message: "Not found" });
    res.json(row);
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

export default router;
