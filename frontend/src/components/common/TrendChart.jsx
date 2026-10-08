import React from "react";

export default function TrendChart({ points, max = 10, height = 150 }) {
  if (!points || points.length < 2) {
    return (
      <p className="form-hint">
        Complete 2 or more sessions to see your trend.
      </p>
    );
  }
  const W = 560,
    H = height,
    pad = 26;
  const x = (i) => pad + (i * (W - pad * 2)) / (points.length - 1);
  const y = (v) =>
    H - pad - (Math.max(0, Math.min(max, v)) / max) * (H - pad * 2);
  const path = points
    .map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.value)}`)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Score trend over recent sessions"
    >
      {[0, 5, 10].map((t) => (
        <g key={t}>
          <line
            x1={pad}
            x2={W - pad}
            y1={y(t)}
            y2={y(t)}
            stroke="var(--color-border)"
            strokeDasharray="3 4"
          />
          <text x={4} y={y(t) + 4} fontSize="10" fill="var(--color-text-muted)">
            {t}
          </text>
        </g>
      ))}
      <path
        d={path}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={x(i)}
          cy={y(p.value)}
          r="4"
          fill="var(--color-card)"
          stroke="var(--color-primary)"
          strokeWidth="2"
        >
          <title>{`${p.label}: ${p.value}/10`}</title>
        </circle>
      ))}
    </svg>
  );
}
