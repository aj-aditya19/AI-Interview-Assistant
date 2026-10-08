const SINGLE = [
  "um",
  "umm",
  "uh",
  "uhh",
  "er",
  "erm",
  "hmm",
  "basically",
  "actually",
  "literally",
  "honestly",
];
const MULTI = ["you know", "i mean", "kind of", "sort of"];

export function analyzeSpeech(text = "", speakingSeconds = 0) {
  const lower = (text || "").toLowerCase();
  const words = lower
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const wordCount = words.length;
  const fillers = {};

  for (const w of words)
    if (SINGLE.includes(w)) fillers[w] = (fillers[w] || 0) + 1;
  for (const phrase of MULTI) {
    const hits = (lower.match(new RegExp(`\\b${phrase}\\b`, "g")) || []).length;
    if (hits) fillers[phrase] = hits;
  }
  const commaLike = (lower.match(/,\s*like\b/g) || []).length;
  if (commaLike) fillers["like"] = commaLike;

  const fillerCount = Object.values(fillers).reduce((a, b) => a + b, 0);
  const secs = Number(speakingSeconds) || 0;
  const wpm = secs >= 5 ? Math.round((wordCount / secs) * 60) : null;
  let paceLabel = null;
  if (wpm !== null)
    paceLabel = wpm < 100 ? "slow" : wpm > 170 ? "fast" : "good";

  return {
    wordCount,
    fillerCount,
    fillers,
    speakingSeconds: secs,
    fillerPer100: wordCount
      ? Math.round((fillerCount / wordCount) * 1000) / 10
      : 0,
    wpm,
    paceLabel,
  };
}

export function aggregateSpeech(turns = []) {
  let words = 0,
    fillers = 0,
    secs = 0;
  const top = {};
  for (const t of turns) {
    const s = t.speech;
    if (!s) continue;
    words += s.wordCount || 0;
    fillers += s.fillerCount || 0;
    secs += s.speakingSeconds || 0;
    for (const [k, v] of Object.entries(s.fillers || {}))
      top[k] = (top[k] || 0) + v;
  }
  return {
    totalWords: words,
    totalFillers: fillers,
    fillerPer100Words: words ? Math.round((fillers / words) * 1000) / 10 : 0,
    avgWpm: secs >= 10 ? Math.round((words / secs) * 60) : null,
    topFillers: Object.entries(top)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count })),
  };
}
