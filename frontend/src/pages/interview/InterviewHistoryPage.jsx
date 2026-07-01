import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import api from "../../utils/api.js";

export default function InterviewHistoryPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/interview/records")
      .then((res) => setRecords(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const readinessColor = (label) => ({
    "Interview Ready": "var(--color-ready)",
    "Promising": "var(--color-promising)",
    "Needs Improvement": "var(--color-needs)",
    "Keep Practicing": "var(--color-practicing)",
  }[label] || "var(--color-text-muted)");

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container" style={{ paddingTop: 40, paddingBottom: 60, maxWidth: 900 }}>
        <div className="flex items-center justify-between mb-24">
          <div>
            <h1 className="display-heading">Interview history</h1>
            <p className="body-text mt-8">All your past mock interview sessions</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/interview/setup")}>
            New interview
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", paddingTop: 60 }}><div className="spinner" style={{ margin: "0 auto" }} /></div>
        ) : records.length === 0 ? (
          <div className="card empty-state">
            <div className="empty-state-icon">🎙️</div>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: 16 }}>
              You haven't completed any interviews yet.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/interview/setup")}>
              Start your first interview
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {records.map((r) => (
              <div key={r._id} className="card history-card">
                <div className="history-card-left">
                  <div className="history-score">{r.overallScore ?? "—"}<span>/10</span></div>
                  <div
                    className="history-readiness"
                    style={{ color: readinessColor(r.readinessLabel) }}
                  >
                    {r.readinessLabel || "—"}
                  </div>
                </div>
                <div className="history-card-body">
                  <div className="history-role">{r.targetRole || "Interview"}</div>
                  <div className="history-meta">
                    {r.targetCompany && <span>{r.targetCompany}</span>}
                    <span>{r.interviewType}</span>
                    <span>{r.difficulty}</span>
                    <span>{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                    {r.rounds?.map((rd, i) => (
                      <span key={i} className="badge badge-muted" style={{ fontSize: "0.75rem" }}>
                        {rd.roundType} · {rd.roundScore ?? "—"}/10
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate("/interview/result", { state: { record: r } })}
                  style={{ flexShrink: 0 }}
                >
                  View report
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .history-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          transition: border-color 0.15s;
        }
        .history-card:hover { border-color: var(--color-primary); }
        .history-card-left {
          text-align: center;
          min-width: 70px;
          flex-shrink: 0;
        }
        .history-score {
          font-family: var(--font-display);
          font-size: 1.625rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1;
        }
        .history-score span { font-size: 0.875rem; color: var(--color-text-muted); font-weight: 400; }
        .history-readiness { font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px; font-weight: 500; }
        .history-card-body { flex: 1; min-width: 0; }
        .history-role { font-weight: 600; font-size: 1rem; color: var(--color-text-primary); }
        .history-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
        }
        .history-meta span:not(:last-child)::after { content: "·"; margin-left: 8px; }
        @media (max-width: 640px) {
          .history-card { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
