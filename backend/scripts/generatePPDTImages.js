import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  readFileSync(path.join(__dirname, "../data/ppdt.json"), "utf-8"),
);
const outDir = path.join(__dirname, "../public/ppdt");
mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const img of data.images) {
  if (!img.imagePrompt || !img.imageUrl.startsWith("/static/")) continue;
  const file = path.join(outDir, path.basename(img.imageUrl));
  if (existsSync(file)) continue;
  const seed = parseInt(img.id.replace(/\D/g, ""), 10) || 1;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(img.imagePrompt)}?width=768&height=576&seed=${seed}&nologo=true`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    console.log("saved", path.basename(file));
  } catch (err) {
    console.error("failed", img.id, err.message);
  }
  await sleep(2500);
}
console.log(
  "Done. Open public/ppdt and delete any image that isn't hazy/ambiguous enough.",
);
