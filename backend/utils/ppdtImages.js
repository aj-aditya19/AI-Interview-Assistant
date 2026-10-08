import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../data/ppdt.json");
const publicDir = path.join(__dirname, "../public");

export const ppdtData = JSON.parse(readFileSync(dataPath, "utf-8"));

export const baseUrlOf = (req) =>
  process.env.PUBLIC_URL || `${req.protocol}://${req.get("host")}`;

export function isAvailable(img) {
  if (/^https?:\/\//.test(img.imageUrl)) return true;
  const rel = img.imageUrl.replace(/^\/static\//, "");
  return existsSync(path.join(publicDir, rel));
}

export const absoluteUrl = (img, base) =>
  /^https?:\/\//.test(img.imageUrl) ? img.imageUrl : `${base}${img.imageUrl}`;

export const availableImages = () => ppdtData.images.filter(isAvailable);

export const findImage = (id) => ppdtData.images.find((i) => i.id === id);

export const sample = (arr, n) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
};
