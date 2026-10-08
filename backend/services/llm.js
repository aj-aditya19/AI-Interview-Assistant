import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const chatModel = () =>
  process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
export const evalModel = () =>
  process.env.GROQ_EVAL_MODEL || "openai/gpt-oss-120b";

export function parseJSON(raw) {
  if (!raw) throw new Error("empty model reply");
  const cleaned = raw.replace(/```json|```/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("no JSON object in reply");
  return JSON.parse(cleaned.slice(start, end + 1));
}

export const clamp = (n, lo = 0, hi = 10) => {
  const v = Number(n);
  if (Number.isNaN(v)) return lo;
  return Math.max(lo, Math.min(hi, Math.round(v * 10) / 10));
};

export async function callJSON({
  system,
  user,
  model = evalModel(),
  maxTokens = 1800,
  temperature = 0.3,
  fallback = null,
}) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await groq.chat.completions.create({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        max_tokens: maxTokens,
        temperature,
      });
      return parseJSON(res.choices[0].message.content);
    } catch (err) {
      console.error(`callJSON attempt ${attempt + 1} failed:`, err.message);
    }
  }
  return fallback;
}

export async function callText({
  system,
  user,
  model = chatModel(),
  maxTokens = 600,
  temperature = 0.8,
}) {
  const res = await groq.chat.completions.create({
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    max_tokens: maxTokens,
    temperature,
  });
  const text = res.choices[0].message.content?.trim();
  if (!text) throw new Error("AI returned empty text");
  return text;
}

export default groq;
