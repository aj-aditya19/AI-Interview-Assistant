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

export function analyzeTranscript(text = "") {
  const lower = text.toLowerCase();
  const words = lower
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  let fillers = words.filter((w) => SINGLE.includes(w)).length;
  for (const p of MULTI)
    fillers += (lower.match(new RegExp(`\\b${p}\\b`, "g")) || []).length;
  fillers += (lower.match(/,\s*like\b/g) || []).length;
  return { words: words.length, fillers };
}
