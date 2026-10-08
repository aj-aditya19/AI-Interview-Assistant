const KEY = "iq_srs_v1";
const DAYS = [0, 1, 3, 7, 14];
const DAY_MS = 86400000;

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
};
const save = (s) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
};

export function review(id, remembered) {
  const s = load();
  const box = Math.max(
    0,
    Math.min(4, (s[id]?.box ?? 0) + (remembered ? 1 : -2)),
  );
  s[id] = {
    box: Math.max(0, box),
    due: Date.now() + DAYS[Math.max(0, box)] * DAY_MS,
    seen: (s[id]?.seen || 0) + 1,
  };
  save(s);
}

export const isDue = (id) => {
  const e = load()[id];
  return !e || e.due <= Date.now();
};

export function stats(ids) {
  const s = load();
  let learned = 0,
    due = 0;
  for (const id of ids) {
    const e = s[id];
    if (e?.box >= 3) learned++;
    if (!e || e.due <= Date.now()) due++;
  }
  return { learned, due, total: ids.length };
}

export function orderByDue(items) {
  const s = load();
  const score = (it) => {
    const e = s[it.id];
    if (!e) return 0;
    return e.due <= Date.now() ? 1 : 2 + e.box;
  };
  return [...items].sort((a, b) => score(a) - score(b) || Math.random() - 0.5);
}
