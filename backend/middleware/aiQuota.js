const LIMIT = Number(process.env.AI_DAILY_LIMIT || 200);
const usage = new Map();

const today = () => new Date().toISOString().slice(0, 10);

export default function aiQuota(cost = 1) {
  return (req, res, next) => {
    const id = String(req.user?._id || req.ip);
    const key = `${id}:${today()}`;
    const used = usage.get(key) || 0;
    if (used + cost > LIMIT) {
      return res.status(429).json({
        message:
          "Daily practice limit reached. Come back tomorrow — your streak is safe!",
      });
    }
    usage.set(key, used + cost);
    if (usage.size > 5000) {
      for (const k of usage.keys()) if (!k.endsWith(today())) usage.delete(k);
    }
    next();
  };
}
