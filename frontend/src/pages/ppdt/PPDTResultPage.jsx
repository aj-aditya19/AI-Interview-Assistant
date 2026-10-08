import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import ScoreBar from "../../components/common/ScoreBar.jsx";
import RewardBanner from "../../components/common/RewardBanner.jsx";
import ShareButton from "../../components/common/ShareButton.jsx";
import content from "../../content/ppdt.json";

export default function PPDTResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const record = location.state?.record;
  const c = content.result;

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
            onClick={() => navigate("/ppdt/setup")}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <div
        className="container"
        style={{ paddingTop: 40, paddingBottom: 60, maxWidth: 900 }}
      >
        <RewardBanner gamification={location.state?.gamification} />

        <div className="flex items-center justify-between mb-24 flex-wrap gap-16">
          <div>
            <h1 className="display-heading">{c.heading}</h1>
            <p className="body-text mt-8">{c.subheading}</p>
          </div>
          <div className="flex gap-12">
            <ShareButton
              card={{
                title: "PPDT practice",
                score: record.overallScore,
                subtitle: (record.recommendations || [])[0],
              }}
              className="btn btn-secondary"
            />
            <button
              className="btn btn-ghost"
              onClick={() => navigate("/ppdt/setup")}
            >
              {c.buttons.tryAgain}
            </button>
            <button className="btn btn-ghost" onClick={() => navigate("/home")}>
              {c.buttons.goHome}
            </button>
          </div>
        </div>

        {record.storyElements && Object.keys(record.storyElements).length > 0 && (
          <div className="ft-panel" style={{ marginBottom: 24 }}>
            <h2 className="section-heading mb-8">Story checklist</h2>
            <div className="tag-list">
              {Object.entries(record.storyElements).map(([k, v]) => (
                <span key={k} className="tag" style={{ opacity: v ? 1 : 0.55 }}>
                  {v ? "✓" : "✗"} {k.replace(/([A-Z])/g, " $1").toLowerCase()}
                </span>
              ))}
            </div>
            {record.olq && Object.keys(record.olq).length > 0 && (
              <>
                <h3 className="section-heading mt-16 mb-8">OLQs shown</h3>
                <div className="tag-list">
                  {Object.entries(record.olq).map(([k, v]) => (
                    <span key={k} className="tag">{k} <strong>{v}</strong></span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: 24,
            alignItems: "start",
          }}
        >
          <div>
            <div
              className="card flex items-center gap-24"
              style={{ padding: 28 }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3rem",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    lineHeight: 1,
                  }}
                >
                  {record.overallScore ?? "—"}
                  <span
                    style={{
                      fontSize: "1.25rem",
                      color: "var(--color-text-muted)",
                      fontWeight: 400,
                    }}
                  >
                    /10
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--color-text-secondary)",
                    marginTop: 4,
                  }}
                >
                  {c.overallScore}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="badge badge-muted">{record.difficulty}</span>
                <span className="badge badge-muted">{record.imageId}</span>
              </div>
            </div>

            <div className="card mt-20">
              <h2 className="section-heading mb-20">{c.breakdown}</h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {record.result &&
                  Object.entries(record.result).map(([key, val]) => (
                    <ScoreBar
                      key={key}
                      label={c.scoreLabels[key] || key}
                      score={val}
                    />
                  ))}
              </div>
            </div>

            {record.userAnswer && (
              <div className="card mt-20">
                <h3
                  className="section-heading mb-12"
                  style={{ fontSize: "1rem" }}
                >
                  {c.yourResponse}
                </h3>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {record.userAnswer}
                </p>
              </div>
            )}

            {record.referenceDescription && (
              <div
                className="card mt-16"
                style={{ borderColor: "var(--color-primary)" }}
              >
                <h3
                  className="section-heading mb-12"
                  style={{ fontSize: "1rem" }}
                >
                  {c.referenceDescription}
                </h3>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {record.referenceDescription}
                </p>
              </div>
            )}
          </div>

          <div>
            {record.recommendations?.length > 0 && (
              <div className="card">
                <h3
                  className="section-heading mb-16"
                  style={{ fontSize: "1rem" }}
                >
                  {c.recommendations}
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {record.recommendations.map((r, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        fontSize: "0.875rem",
                        color: "var(--color-text-primary)",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--color-primary)",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}.
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
