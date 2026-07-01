import React from "react";

// Shows a label, a horizontal progress bar, and the numeric score
export default function ScoreBar({ label, score, maxScore = 10 }) {
  const pct = Math.min(100, (score / maxScore) * 100);

  // Color shifts from yellow → green based on score
  const fillColor = score >= 7 ? "var(--color-primary)" : score >= 4 ? "var(--color-secondary)" : "#dc2626";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.875rem", color: "var(--color-text-primary)" }}>{label}</span>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: fillColor }}>
          {score != null ? `${score}/10` : "—"}
        </span>
      </div>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${pct}%`, background: fillColor }}
        />
      </div>
    </div>
  );
}
