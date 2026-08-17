import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import ScoreBar from "../../components/common/ScoreBar.jsx";
import content from "../../content/interviewResult.json";
import "./InterviewResultPage.css";

export default function InterviewResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const record = location.state?.record;
  const [expandedRound, setExpandedRound] = useState(null);

  if (!record) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div
          className="container"
          style={{ paddingTop: 60, textAlign: "center" }}
        >
          <p className="body-text">No result data found.</p>
          <button
            className="btn btn-primary mt-16"
            onClick={() => navigate("/home")}
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const readinessColor =
    {
      "Interview Ready": "var(--color-ready)",
      Promising: "var(--color-promising)",
      "Needs Improvement": "var(--color-needs)",
      "Keep Practicing": "var(--color-practicing)",
    }[record.readinessLabel] || "var(--color-text-secondary)";

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container result-container">
        <div className="result-header">
          <div>
            <h1 className="display-heading">{content.heading}</h1>
            <p className="body-text mt-8">{content.subheading}</p>
          </div>
          <div className="result-header-actions">
            <button
              className="btn btn-ghost"
              onClick={() => navigate("/interview/history")}
            >
              {content.buttons.viewHistory}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/interview/setup")}
            >
              {content.buttons.tryAgain}
            </button>
          </div>
        </div>

        <div className="result-layout">
          <div className="result-main">
            <div className="card result-overview">
              <div className="overview-score">
                <div className="big-score">
                  {record.overallScore ?? "—"}
                  <span>/10</span>
                </div>
                <div className="score-caption">
                  {content.sections.overallScore}
                </div>
              </div>
              <div className="overview-divider" />
              <div className="overview-readiness">
                <div
                  className="readiness-label"
                  style={{ color: readinessColor, borderColor: readinessColor }}
                >
                  {record.readinessLabel}
                </div>
                <div className="score-caption">
                  {content.sections.readiness}
                </div>
              </div>
              <div className="overview-meta">
                <span className="meta-item">🎯 {record.targetRole}</span>
                {record.targetCompany && (
                  <span className="meta-item">🏢 {record.targetCompany}</span>
                )}
                <span className="meta-item">📊 {record.difficulty}</span>
              </div>
            </div>

            <div className="card mt-20">
              <h2 className="section-heading mb-20">
                {content.sections.breakdown}
              </h2>
              <div className="breakdown-grid">
                {record.result &&
                  Object.entries(record.result).map(([key, val]) => (
                    <ScoreBar
                      key={key}
                      label={content.scoreLabels[key] || key}
                      score={val}
                    />
                  ))}
              </div>
            </div>

            {record.rounds?.length > 0 && (
              <div className="card mt-20">
                <h2 className="section-heading mb-20">
                  {content.sections.roundWise}
                </h2>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {record.rounds.map((round, ri) => (
                    <div key={ri} className="round-block">
                      <button
                        className="round-block-header"
                        onClick={() =>
                          setExpandedRound(expandedRound === ri ? null : ri)
                        }
                      >
                        <div className="flex items-center gap-12">
                          <span className="badge badge-primary">
                            {content.roundLabels[round.roundType] ||
                              round.roundType}
                          </span>
                          <span
                            style={{
                              fontSize: "0.875rem",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {round.turns?.length ?? 0} questions
                          </span>
                        </div>
                        <div className="flex items-center gap-12">
                          <span
                            style={{
                              fontWeight: 700,
                              color: "var(--color-primary)",
                            }}
                          >
                            {round.roundScore ?? "—"}/10
                          </span>
                          <span style={{ color: "var(--color-text-muted)" }}>
                            {expandedRound === ri ? "▲" : "▼"}
                          </span>
                        </div>
                      </button>

                      {expandedRound === ri &&
                        round.turns?.map((turn, ti) => (
                          <div key={ti} className="turn-block">
                            <div className="turn-section">
                              <span className="turn-label">
                                {content.turnLabels.question}
                              </span>
                              <p className="turn-text">{turn.question}</p>
                            </div>
                            <div className="turn-section">
                              <span className="turn-label">
                                {content.turnLabels.yourAnswer}
                              </span>
                              <p className="turn-text">{turn.answer}</p>
                            </div>
                            {turn.improvedAnswer && (
                              <div className="turn-section improved">
                                <span className="turn-label">
                                  {content.turnLabels.betterAnswer}
                                </span>
                                <p className="turn-text">
                                  {turn.improvedAnswer}
                                </p>
                              </div>
                            )}
                            {turn.scores && (
                              <div className="turn-scores">
                                {Object.entries(turn.scores).map(([k, v]) => (
                                  <div key={k} className="turn-score-pill">
                                    <span>{k}</span>
                                    <strong>{v}/10</strong>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="result-sidebar">
            {record.finalSummary && (
              <div className="card">
                <h3
                  className="section-heading mb-12"
                  style={{ fontSize: "1rem" }}
                >
                  {content.sections.summary}
                </h3>
                <p className="body-text" style={{ fontSize: "0.9rem" }}>
                  {record.finalSummary}
                </p>
              </div>
            )}

            {record.strengths?.length > 0 && (
              <div className="card mt-16">
                <h3
                  className="section-heading mb-12"
                  style={{ fontSize: "1rem" }}
                >
                  {content.sections.strengths}
                </h3>
                <ul className="feedback-list strengths-list">
                  {record.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {record.weaknesses?.length > 0 && (
              <div className="card mt-16">
                <h3
                  className="section-heading mb-12"
                  style={{ fontSize: "1rem" }}
                >
                  {content.sections.weaknesses}
                </h3>
                <ul className="feedback-list weaknesses-list">
                  {record.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {record.recommendations?.length > 0 && (
              <div className="card mt-16">
                <h3
                  className="section-heading mb-12"
                  style={{ fontSize: "1rem" }}
                >
                  {content.sections.recommendations}
                </h3>
                <ol className="feedback-list reco-list">
                  {record.recommendations.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ol>
              </div>
            )}

            <button
              className="btn btn-ghost btn-full mt-16"
              onClick={() => navigate("/home")}
            >
              {content.buttons.goHome}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
