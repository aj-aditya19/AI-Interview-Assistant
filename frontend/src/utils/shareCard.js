function wrap(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = String(text).split(" ");
  let line = "",
    lines = 0;
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = w;
      if (++lines >= maxLines) return y;
    } else line = test;
  }
  ctx.fillText(line, x, y);
  return y + lineHeight;
}

export async function makeCard({
  title,
  score,
  outOf = 10,
  subtitle,
  lines = [],
  badge,
}) {
  const W = 1080,
    H = 1080;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");

  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#0f6358");
  g.addColorStop(1, "#157a6e");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath();
  ctx.arc(W - 120, 140, 260, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.font = "700 40px Sora, Inter, sans-serif";
  ctx.fillText("InterviewIQ", 80, 110);
  ctx.font = "500 30px Inter, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.8)";
  ctx.fillText(title, 80, 170);

  ctx.fillStyle = "#fff";
  ctx.font = "700 300px Sora, Inter, sans-serif";
  ctx.fillText(String(score), 80, 520);
  const w = ctx.measureText(String(score)).width;
  ctx.font = "600 80px Inter, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.7)";
  ctx.fillText(`/${outOf}`, 100 + w, 520);

  if (badge) {
    ctx.fillStyle = "#d4a017";
    ctx.font = "700 36px Inter, sans-serif";
    ctx.fillText(badge, 80, 600);
  }

  ctx.fillStyle = "#fff";
  ctx.font = "500 38px Inter, sans-serif";
  let y = 690;
  if (subtitle) y = wrap(ctx, subtitle, 80, y, W - 160, 52, 3);
  ctx.font = "400 32px Inter, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.88)";
  y += 10;
  for (const l of lines.slice(0, 4)) {
    y = wrap(ctx, `• ${l}`, 80, y, W - 160, 44, 2);
  }

  ctx.fillStyle = "rgba(255,255,255,.7)";
  ctx.font = "500 28px Inter, sans-serif";
  ctx.fillText(`Practice free at ${window.location.host}`, 80, H - 70);

  return new Promise((res) => c.toBlob(res, "image/png"));
}

export async function shareCard(opts, filename = "interviewiq-result.png") {
  const blob = await makeCard(opts);
  const file = new File([blob], filename, { type: "image/png" });
  const text = `${opts.title}: ${opts.score}/${opts.outOf ?? 10} on InterviewIQ`;

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text, title: "InterviewIQ" });
      return "shared";
    } catch (e) {
      if (e?.name === "AbortError") return "cancelled";
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return "downloaded";
}
