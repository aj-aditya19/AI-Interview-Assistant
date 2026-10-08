import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import RadarChart from "../../components/common/RadarChart.jsx";
import RewardBanner from "../../components/common/RewardBanner.jsx";
import ShareButton from "../../components/common/ShareButton.jsx";
import ScoreBar from "../../components/common/ScoreBar.jsx";
import api from "../../utils/api.js";
import { RESULT_LABELS, TYPE_NAMES } from "./ssbMeta.js";

export default function PracticeResultPage() {
  const loc = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(loc.state?.record || null);
  const [loading, setLoading] = useState(!record && !!id);
  const [open, setOpen] = useState(null);
  const { gamification, plan = [], scores = {} } = loc.state || {};

  useEffect(() => {
    if (record || !id) return;
    api
      .get(`/practice/records/${id}`)
      .then((r) => setRecord(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, record]);

  if (loading)
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="ft-page text-center">
          <div className="spinner" style={{ margin: "60px auto" }} />
        </div>
      </div>
    );
  if (!record) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="ft-page text-center">
          <p className="body-text">No result found.</p>
          <button
            className="btn btn-primary mt-16"
            onClick={() => navigate("/ssb")}
          >
            Back to PPDT
          </button>
        </div>
      </div>
    );
  }

  const name = TYPE_NAMES[record.type] || record.type;
  const radar = Object.entries(record.result || {}).map(([k, v]) => ({
    label: RESULT_LABELS[k] || k,
    value: v,
  }));
  const olq = Object.entries(record.olq || {}).sort((a, b) => b[1] - a[1]);
  const items = Array.isArray(record.items) ? record.items : [];
  const nextType = plan[0];
  const finishedBattery = plan.length === 0 && Object.keys(scores).length >= 2;
  const batteryAvg = finishedBattery
    ? Math.round(
        (Object.values(scores).reduce((a, b) => a + b, 0) /
          Object.values(scores).length) *
          10,
      ) / 10
    : null;
  const label =
    record.overallScore >= 7
      ? "Strong"
      : record.overallScore >= 5
        ? "Promising"
        : "Needs work";

  const goNext = () => {
    sessionStorage.setItem("iq_ssb_plan", JSON.stringify(plan.slice(1)));
    navigate(`/ssb/test/${nextType}`);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="ft-page">
        <RewardBanner gamification={gamification} />

        <div className="ft-between mb-24 ft-wrap">
          <div>
            <h1 className="display-heading">{name} result</h1>
            <p className="body-text mt-8">
              {record.summary ||
                `${record.meta?.answered ?? ""}${record.meta?.total ? ` of ${record.meta.total} answered` : ""}`}
            </p>
          </div>
          <div className="ft-row">
            <ShareButton
              card={{
                title: `${name} practice`,
                score: record.overallScore,
                subtitle: label,
                lines: (record.recommendations || []).slice(0, 2),
              }}
            />
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  record.type === "gd" ? "/ssb/gd" : `/ssb/test/${record.type}`,
                )
              }
            >
              Try again
            </button>
          </div>
        </div>

        <div className="ft-grid-2">
          <div className="ft-panel text-center">
            <div className="ft-score-num">
              {record.overallScore}
              <small>/10</small>
            </div>
            <span
              className={`ft-pill ${record.overallScore >= 7 ? "good" : record.overallScore >= 5 ? "warn" : "bad"}`}
            >
              {label}
            </span>
            <div className="ft-stack mt-24" style={{ textAlign: "left" }}>
              {Object.entries(record.result || {}).map(([k, v]) => (
                <ScoreBar key={k} label={RESULT_LABELS[k] || k} score={v} />
              ))}
            </div>
          </div>
          <div className="ft-panel ft-center-col">
            <h2 className="section-heading mb-8">Profile</h2>
            <RadarChart data={radar} />
          </div>
        </div>

        {olq.length > 0 && (
          <div className="ft-panel mt-16">
            <h2 className="section-heading mb-8">OLQs shown in this test</h2>
            <div className="tag-list">
              {olq.map(([k, v]) => (
                <span key={k} className="tag">
                  {k} <strong>{v}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {record.patterns?.length > 0 && (
          <div className="ft-panel mt-16">
            <h2 className="section-heading mb-8">
              {record.type === "gd"
                ? "What you did well"
                : "Patterns the assessor noticed"}
            </h2>
            <ul className="ft-list">
              {record.patterns.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {record.recommendations?.length > 0 && (
          <div className="ft-panel mt-16">
            <h2 className="section-heading mb-8">How to improve</h2>
            <ul className="ft-list">
              {record.recommendations.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {record.type !== "gd" && items.length > 0 && (
          <div className="ft-panel mt-16">
            <h2 className="section-heading mb-8">Your responses</h2>
            <div className="ft-stack">
              {items.map((it, idx) => (
                <div key={it.id || idx} className="ft-item">
                  <button
                    className="ft-item-head"
                    onClick={() => setOpen(open === idx ? null : idx)}
                    aria-expanded={open === idx}
                  >
                    <span className="ft-item-prompt">{it.prompt}</span>
                    <span
                      className={`ft-pill ${it.score >= 7 ? "good" : it.score >= 5 ? "warn" : "bad"}`}
                    >
                      {it.score}
                    </span>
                  </button>
                  {open === idx && (
                    <div className="ft-item-body">
                      <p>
                        <strong>You wrote:</strong>{" "}
                        {it.text || <em>(no answer)</em>}
                      </p>
                      {it.hero && <p className="form-hint">Hero: {it.hero}</p>}
                      {it.note && <p className="ft-note">{it.note}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {nextType && (
          <div className="ft-panel mt-24 ft-between">
            <div>
              <h2 className="section-heading">Battery in progress</h2>
              <p className="body-text mt-8">Next up: {TYPE_NAMES[nextType]}.</p>
            </div>
            <button className="btn btn-primary" onClick={goNext}>
              Continue to {TYPE_NAMES[nextType]}
            </button>
          </div>
        )}
        {finishedBattery && (
          <div className="ft-panel mt-24">
            <h2 className="section-heading">
              Battery complete: {batteryAvg}/10 combined
            </h2>
            <div className="tag-list mt-12">
              {Object.entries(scores).map(([k, v]) => (
                <span key={k} className="tag">
                  {TYPE_NAMES[k]} <strong>{v}</strong>
                </span>
              ))}
            </div>
            <div className="ft-row mt-16">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/ssb/olq")}
              >
                See OLQ report
              </button>
              <ShareButton
                card={{
                  title: "SSB psychology battery",
                  score: batteryAvg,
                  subtitle: Object.entries(scores)
                    .map(([k, v]) => `${TYPE_NAMES[k]} ${v}`)
                    .join(" · "),
                }}
                label="Share combined score"
                className="btn btn-ghost"
              />
            </div>
          </div>
        )}

        <div className="ft-row mt-24">
          <button className="btn btn-ghost" onClick={() => navigate("/ssb")}>
            Back to PPDT
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate("/ssb/olq")}
          >
            OLQ report
          </button>
        </div>
      </div>
    </div>
  );
}
