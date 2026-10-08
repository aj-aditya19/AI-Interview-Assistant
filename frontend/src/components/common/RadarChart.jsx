import React from "react";

export default function RadarChart({ data, max = 10, size = 320 }) {
  const pts = data.filter((d) => d && d.label);
  if (pts.length < 3) return null;
  const c = size / 2,
    r = size / 2 - 52;
  const ang = (i) => (Math.PI * 2 * i) / pts.length - Math.PI / 2;
  const xy = (i, v) => [
    c + Math.cos(ang(i)) * r * (v / max),
    c + Math.sin(ang(i)) * r * (v / max),
  ];
  const ring = (f) => pts.map((_, i) => xy(i, max * f).join(",")).join(" ");
  const poly = pts
    .map((d, i) => xy(i, Math.max(0, Math.min(max, d.value || 0))).join(","))
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      style={{ maxWidth: size }}
      role="img"
      aria-label={`Radar chart: ${pts.map((d) => `${d.label} ${d.value ?? 0}`).join(", ")}`}
    >
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={ring(f)}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1"
        />
      ))}
      {pts.map((_, i) => {
        const [x, y] = xy(i, max);
        return (
          <line
            key={i}
            x1={c}
            y1={c}
            x2={x}
            y2={y}
            stroke="var(--color-border)"
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={poly}
        fill="var(--color-primary)"
        fillOpacity="0.22"
        stroke="var(--color-primary)"
        strokeWidth="2"
      />
      {pts.map((d, i) => {
        const [x, y] = xy(i, Math.max(0, Math.min(max, d.value || 0)));
        return (
          <circle key={i} cx={x} cy={y} r="3.5" fill="var(--color-primary)" />
        );
      })}
      {pts.map((d, i) => {
        const [x, y] = xy(i, max * 1.2);
        const anchor = Math.abs(x - c) < 8 ? "middle" : x > c ? "start" : "end";
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="11"
            fill="var(--color-text-secondary)"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
