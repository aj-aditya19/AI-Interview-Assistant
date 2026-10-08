export const OLQ_FACTORS = {
  "Planning & Organising": [
    "Effective Intelligence",
    "Reasoning Ability",
    "Organising Ability",
    "Power of Expression",
  ],
  "Social Adjustment": [
    "Social Adaptability",
    "Cooperation",
    "Sense of Responsibility",
  ],
  "Social Effectiveness": [
    "Initiative",
    "Self Confidence",
    "Speed of Decision",
    "Ability to Influence the Group",
    "Liveliness",
  ],
  "Dynamic Factor": ["Determination", "Courage", "Stamina"],
};

export const OLQ_LIST = Object.values(OLQ_FACTORS).flat();

export const OLQ_PROMPT_LINE = `OLQs (use these exact names only): ${OLQ_LIST.join(", ")}.`;

export function cleanOLQ(obj) {
  const out = {};
  if (!obj || typeof obj !== "object") return out;
  for (const [k, v] of Object.entries(obj)) {
    const name = OLQ_LIST.find((n) => n.toLowerCase() === k.toLowerCase());
    const num = Number(v);
    if (name && !Number.isNaN(num)) out[name] = Math.max(0, Math.min(10, num));
  }
  return out;
}
