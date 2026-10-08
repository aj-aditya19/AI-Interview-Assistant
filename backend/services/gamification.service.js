import User from "../models/User.model.js";

const TZ = process.env.APP_TIMEZONE || "Asia/Kolkata";

export const dayKey = (d = new Date()) =>
  d.toLocaleDateString("en-CA", { timeZone: TZ });

export function weekKey(d = new Date()) {
  const [y, m, day] = dayKey(d).split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, day));
  const dayNum = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t - yearStart) / 86400000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export const levelFromXP = (xp) => Math.floor(Math.sqrt((xp || 0) / 50)) + 1;

export const BADGES = {
  first_step: {
    title: "First Step",
    desc: "Complete your first practice session",
  },
  streak_3: { title: "On a Roll", desc: "3-day practice streak" },
  streak_7: { title: "Week Warrior", desc: "7-day practice streak" },
  streak_30: { title: "Unstoppable", desc: "30-day practice streak" },
  interview_ready: {
    title: "Interview Ready",
    desc: "Score 8+ in a mock interview",
  },
  ten_sessions: { title: "Committed", desc: "Complete 10 practice sessions" },
  ssb_explorer: {
    title: "SSB Explorer",
    desc: "Try PPDT, TAT, WAT, SRT and SDT",
  },
  word_smith: { title: "Word Smith", desc: "Practice 100 words" },
  resume_ready: {
    title: "Resume Ready",
    desc: "Score 75+ on the ATS resume check",
  },
};

export const XP_RULES = {
  interview: (score) => 50 + Math.round((score || 0) * 5),
  ppdt: (score) => 30 + Math.round((score || 0) * 3),
  tat: (score) => 35 + Math.round((score || 0) * 3),
  wat: (score) => 35 + Math.round((score || 0) * 3),
  srt: (score) => 35 + Math.round((score || 0) * 3),
  sdt: (score) => 30 + Math.round((score || 0) * 3),
  gd: (score) => 40 + Math.round((score || 0) * 4),
  daily: () => 25,
  comm: (score) => 10 + Math.round((score || 0) / 10),
  resume: () => 20,
};

export async function awardXP(
  userId,
  { kind, score = 0, words = 0, extraXP = 0 },
) {
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    const g = user.gamification?.toObject
      ? user.gamification.toObject()
      : user.gamification || {};
    const today = dayKey();
    const gained = (XP_RULES[kind] ? XP_RULES[kind](score) : 10) + extraXP;

    const streak = {
      current: 0,
      longest: 0,
      lastDate: null,
      ...(g.streak || {}),
    };
    if (streak.lastDate !== today) {
      const yesterday = dayKey(new Date(Date.now() - 86400000));
      streak.current =
        streak.lastDate === yesterday ? (streak.current || 0) + 1 : 1;
      streak.longest = Math.max(streak.longest || 0, streak.current);
      streak.lastDate = today;
    }

    const wk = weekKey();
    const weekly = g.weekly?.key === wk ? { ...g.weekly } : { key: wk, xp: 0 };
    weekly.xp += gained;

    const activity = [...(g.activity || [])];
    const slot = activity.find((a) => a.date === today);
    if (slot) {
      slot.sessions += 1;
      slot.xp += gained;
    } else activity.push({ date: today, sessions: 1, xp: gained });
    while (activity.length > 60) activity.shift();

    const counts = { ...(g.counts || {}) };
    counts[kind] = (counts[kind] || 0) + 1;
    counts.total = (counts.total || 0) + 1;
    if (words) counts.words = (counts.words || 0) + words;

    const xp = (g.xp || 0) + gained;
    const level = levelFromXP(xp);

    const have = new Set((g.badges || []).map((b) => b.id));
    const earned = [];
    const grant = (id, cond) => {
      if (cond && !have.has(id)) {
        earned.push({ id, earnedAt: new Date() });
        have.add(id);
      }
    };
    grant("first_step", counts.total >= 1);
    grant("streak_3", streak.current >= 3);
    grant("streak_7", streak.current >= 7);
    grant("streak_30", streak.current >= 30);
    grant("interview_ready", kind === "interview" && score >= 8);
    grant("ten_sessions", counts.total >= 10);
    grant(
      "ssb_explorer",
      ["ppdt", "tat", "wat", "srt", "sdt"].every((k) => counts[k] > 0),
    );
    grant("word_smith", (counts.words || 0) >= 100);
    grant("resume_ready", kind === "resume" && score >= 75);

    user.gamification = {
      ...g,
      xp,
      level,
      streak,
      weekly,
      activity,
      counts,
      badges: [...(g.badges || []), ...earned],
    };
    user.markModified("gamification");
    await user.save();

    return {
      xpGained: gained,
      xp,
      level,
      streak: streak.current,
      newBadges: earned.map((b) => ({ id: b.id, ...BADGES[b.id] })),
    };
  } catch (err) {
    console.error("awardXP failed:", err.message);
    return null;
  }
}
