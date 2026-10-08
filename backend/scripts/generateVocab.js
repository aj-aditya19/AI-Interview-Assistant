import "dotenv/config";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { callJSON, chatModel } from "../services/llm.js";

const batches = parseInt(process.argv[2] || "6", 10);
const outFile = process.argv[3] || "../frontend/src/content/vocabBank.json";

const PLAN = [
  { level: "Basic", category: "Interview & workplace" },
  { level: "Intermediate", category: "Interview & workplace" },
  { level: "Intermediate", category: "Defence & leadership" },
  { level: "Advanced", category: "Defence & leadership" },
  { level: "Intermediate", category: "Business & technology" },
  { level: "Advanced", category: "Business & technology" },
  { level: "Advanced", category: "Everyday GRE-style" },
  { level: "Intermediate", category: "Everyday GRE-style" },
];

const bank = existsSync(outFile)
  ? JSON.parse(readFileSync(outFile, "utf-8"))
  : [];
const have = new Set(bank.map((w) => w.word.toLowerCase()));
let n = bank.length;

for (let b = 0; b < batches; b++) {
  const { level, category } = PLAN[b % PLAN.length];
  const out = await callJSON({
    model: chatModel(),
    maxTokens: 3500,
    temperature: 0.7,
    system: `You create vocabulary lists for Indian learners preparing for interviews and SSB. Return ONLY JSON: {"words":[{"word":"","meaning":"simple English, max 14 words","example":"natural sentence, max 18 words","synonyms":["2-3"],"hint":"IPA-like pronunciation hint e.g. ur-BAYN"}]}.`,
    user: `Give 30 NEW ${level}-level words for the theme "${category}". Do not include: ${[...have].slice(-60).join(", ")}`,
    fallback: { words: [] },
  });
  for (const w of out.words || []) {
    const key = String(w.word || "")
      .toLowerCase()
      .trim();
    if (!key || have.has(key) || !w.meaning || !w.example) continue;
    have.add(key);
    bank.push({
      id: `vb${++n}`,
      word: w.word.trim(),
      meaning: w.meaning,
      example: w.example,
      synonyms: w.synonyms || [],
      hint: w.hint || "",
      level,
      category,
    });
  }
  console.log(`batch ${b + 1}/${batches}: bank size ${bank.length}`);
}
writeFileSync(outFile, JSON.stringify(bank, null, 2));
console.log("Saved", outFile);
