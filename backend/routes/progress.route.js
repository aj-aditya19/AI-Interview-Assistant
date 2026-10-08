import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import protect from "../middleware/auth.js";
import aiQuota from "../middleware/aiQuota.js";
import User from "../models/User.model.js";
import InterviewRecord from "../models/InterviewRecord.model.js";
import PPDTRecord from "../models/PPDTRecord.model.js";
import PracticeRecord from "../models/PracticeRecord.model.js";
import {
  awardXP,
  BADGES,
  dayKey,
  weekKey,
} from "../services/gamification.service.js";
import { evaluateDaily } from "../services/ai.practice.service.js";
import { OLQ_FACTORS, OLQ_LIST } from "../utils/olq.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DAILY_Q = JSON.parse(
  readFileSync(path.join(__dirname, "../data/dailyQuestions.json"), "utf-8"),
).questions;

const dayNumber = () =>
  Math.floor(new Date(dayKey() + "T00:00:00Z").getTime() / 86400000);
const avg = (a) =>
  a.length
    ? Math.round((a.reduce((s, n) => s + n, 0) / a.length) * 10) / 10
    : null;

router.get("/summary", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select(
      "gamification preferences stats fullName",
    );
    const g = user.gamification?.toObject?.() || user.gamification || {};

    const [ints, ppdts, practices] = await Promise.all([
      InterviewRecord.find({ userId })
        .sort({ createdAt: -1 })
        .limit(25)
        .select("overallScore result createdAt"),
      PPDTRecord.find({ userId })
        .sort({ createdAt: -1 })
        .limit(25)
        .select("overallScore createdAt"),
      PracticeRecord.find({ userId })
        .sort({ createdAt: -1 })
        .limit(40)
        .select("type overallScore createdAt"),
    ]);

    const trend = [
      ...ints.map((r) => ({
        date: r.createdAt,
        type: "interview",
        score: r.overallScore,
      })),
      ...ppdts.map((r) => ({
        date: r.createdAt,
        type: "ppdt",
        score: r.overallScore,
      })),
      ...practices
        .filter((r) => r.type !== "comm")
        .map((r) => ({
          date: r.createdAt,
          type: r.type,
          score: r.overallScore,
        })),
    ]
      .filter((t) => typeof t.score === "number")
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-20);

    const skillKeys = [
      "communication",
      "confidence",
      "technical",
      "fluency",
      "vocabulary",
      "grammar",
      "clarity",
    ];
    const skills = {};
    for (const k of skillKeys) {
      const v = avg(
        ints
          .slice(0, 5)
          .map((r) => r.result?.[k])
          .filter((n) => typeof n === "number"),
      );
      if (v !== null) skills[k] = v;
    }
    const weakest =
      Object.entries(skills).sort((a, b) => a[1] - b[1])[0]?.[0] || null;

    const byType = {};
    for (const r of practices)
      (byType[r.type] ||= []).push(r.overallScore || 0);
    const typeAverages = Object.fromEntries(
      Object.entries(byType).map(([k, v]) => [
        k,
        { avg: avg(v), count: v.length },
      ]),
    );

    const act = new Map((g.activity || []).map((a) => [a.date, a]));
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = dayKey(new Date(Date.now() - i * 86400000));
      days.push({
        date: d,
        sessions: act.get(d)?.sessions || 0,
        xp: act.get(d)?.xp || 0,
      });
    }

    const xp = g.xp || 0;
    const level = g.level || 1;
    const today = dayKey();
    const todaySessions = act.get(today)?.sessions || 0;
    const streakAlive =
      g.streak?.lastDate === today ||
      g.streak?.lastDate === dayKey(new Date(Date.now() - 86400000));

    res.json({
      xp,
      level,
      levelStartXP: 50 * (level - 1) ** 2,
      nextLevelXP: 50 * level ** 2,
      streak: {
        current: streakAlive ? g.streak?.current || 0 : 0,
        longest: g.streak?.longest || 0,
        doneToday: g.streak?.lastDate === today,
      },
      weeklyXP: g.weekly?.key === weekKey() ? g.weekly.xp : 0,
      badges: (g.badges || []).map((b) => ({ ...b, ...BADGES[b.id] })),
      allBadges: Object.entries(BADGES).map(([id, b]) => ({
        id,
        ...b,
        earned: (g.badges || []).some((x) => x.id === id),
      })),
      counts: g.counts || {},
      days,
      trend,
      skills,
      weakest,
      typeAverages,
      dailyGoal: user.preferences?.dailyGoal || 1,
      todaySessions,
      dailyDone: g.lastDaily === today,
      preferences: user.preferences || {},
    });
  } catch (err) {
    console.error("progress summary:", err.message);
    res.status(500).json({ message: "Failed to load progress" });
  }
});

router.get("/leaderboard", protect, async (req, res) => {
  try {
    const wk = weekKey();
    const top = await User.find({
      "preferences.showOnLeaderboard": true,
      "gamification.weekly.key": wk,
      status: "active",
    })
      .sort({ "gamification.weekly.xp": -1 })
      .limit(20)
      .select("preferences.displayName gamification.level gamification.weekly");

    const rows = top.map((u, i) => ({
      rank: i + 1,
      name: u.preferences?.displayName || "Anonymous",
      level: u.gamification?.level || 1,
      xp: u.gamification?.weekly?.xp || 0,
      me: String(u._id) === String(req.user._id),
    }));
    res.json({
      week: wk,
      rows,
      optedIn: !!req.user.preferences?.showOnLeaderboard,
    });
  } catch {
    res.status(500).json({ message: "Failed to load leaderboard" });
  }
});

router.patch("/settings", protect, async (req, res) => {
  try {
    const b = req.body || {};
    const user = await User.findById(req.user._id);
    const p = user.preferences || {};
    if (b.displayName !== undefined)
      p.displayName = String(b.displayName)
        .replace(/[<>]/g, "")
        .trim()
        .slice(0, 24);
    if (b.showOnLeaderboard !== undefined)
      p.showOnLeaderboard = !!b.showOnLeaderboard;
    if (["interview", "ssb", "english", "all"].includes(b.goal))
      p.goal = b.goal;
    if (b.dailyGoal !== undefined)
      p.dailyGoal = Math.max(1, Math.min(10, parseInt(b.dailyGoal, 10) || 1));
    if (b.onboarded !== undefined) p.onboarded = !!b.onboarded;
    if (p.showOnLeaderboard && !p.displayName) {
      return res
        .status(400)
        .json({ message: "Choose a display name to join the leaderboard." });
    }
    user.preferences = p;
    user.markModified("preferences");
    await user.save();
    res.json(user.preferences);
  } catch (err) {
    console.error("settings:", err.message);
    res.status(500).json({ message: "Failed to save settings" });
  }
});

router.get("/olq", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const [ppdt, practice] = await Promise.all([
      PPDTRecord.find({ userId })
        .sort({ createdAt: -1 })
        .limit(30)
        .select("olq"),
      PracticeRecord.find({
        userId,
        type: { $in: ["tat", "wat", "srt", "sdt", "gd"] },
      })
        .sort({ createdAt: -1 })
        .limit(60)
        .select("type olq"),
    ]);
    const bucket = Object.fromEntries(OLQ_LIST.map((n) => [n, []]));
    const sources = { ppdt: ppdt.length };
    for (const r of ppdt)
      for (const [k, v] of Object.entries(r.olq || {})) bucket[k]?.push(v);
    for (const r of practice) {
      sources[r.type] = (sources[r.type] || 0) + 1;
      for (const [k, v] of Object.entries(r.olq || {})) bucket[k]?.push(v);
    }
    const olq = Object.fromEntries(
      OLQ_LIST.map((n) => [
        n,
        { avg: avg(bucket[n]), count: bucket[n].length },
      ]),
    );
    const factors = Object.fromEntries(
      Object.entries(OLQ_FACTORS).map(([f, names]) => [
        f,
        avg(names.map((n) => olq[n].avg).filter((v) => v !== null)),
      ]),
    );
    const scored = OLQ_LIST.filter((n) => olq[n].avg !== null).sort(
      (a, b) => olq[a].avg - olq[b].avg,
    );
    res.json({
      olq,
      factors,
      sources,
      factorMap: OLQ_FACTORS,
      weakest: scored.slice(0, 3),
      strongest: scored.slice(-3).reverse(),
      unmeasured: OLQ_LIST.filter((n) => olq[n].avg === null),
    });
  } catch (err) {
    console.error("olq:", err.message);
    res.status(500).json({ message: "Failed to build OLQ report" });
  }
});

router.get("/daily", protect, async (req, res) => {
  const u = await User.findById(req.user._id).select("gamification.lastDaily");
  const n = dayNumber();
  res.json({
    date: dayKey(),
    dayNumber: n,
    question: DAILY_Q[n % DAILY_Q.length],
    completed: u?.gamification?.lastDaily === dayKey(),
  });
});

router.post("/daily/submit", protect, aiQuota(1), async (req, res) => {
  try {
    const answer = String(req.body.answer || "")
      .slice(0, 2000)
      .trim();
    if (answer.split(/\s+/).length < 8)
      return res
        .status(400)
        .json({ message: "Write or speak at least a couple of sentences." });
    const user = await User.findById(req.user._id);
    if (user.gamification?.lastDaily === dayKey())
      return res.status(409).json({
        message: "You already completed today's challenge. Come back tomorrow!",
      });

    const question = DAILY_Q[dayNumber() % DAILY_Q.length];
    const feedback = await evaluateDaily({ question, answer });
    user.gamification.lastDaily = dayKey();
    user.markModified("gamification");
    await user.save();
    await PracticeRecord.create({
      userId: user._id,
      type: "daily",
      overallScore: feedback.score,
      summary: feedback.good,
      recommendations: [feedback.improve],
      meta: { question },
    });
    const gamification = await awardXP(user._id, {
      kind: "daily",
      score: feedback.score,
    });
    res.json({ feedback, gamification });
  } catch (err) {
    console.error("daily:", err.message);
    res.status(500).json({ message: "Failed to check your answer" });
  }
});

export default router;
