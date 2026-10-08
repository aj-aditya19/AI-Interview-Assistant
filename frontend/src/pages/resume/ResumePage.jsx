import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import RewardBanner from "../../components/common/RewardBanner.jsx";
import ShareButton from "../../components/common/ShareButton.jsx";
import api from "../../utils/api.js";

const LABELS = {
  formatting: "Formatting",
  keywords: "Keywords",
  impact: "Impact & results",
  structure: "Structure",
  relevance: "Role relevance",
};
const tone = (n) => (n >= 75 ? "good" : n >= 55 ? "warn" : "bad");

function Bar({ label, value }) {
  return (
    <div>
      <div className="ft-between">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="score-bar-track mt-8">
        <div
          className="score-bar-fill"
          style={{
            width: `${value}%`,
            background: `var(--color-${value >= 75 ? "primary" : value >= 55 ? "secondary" : "error"})`,
          }}
        />
      </div>
    </div>
  );
}

export default function ResumePage() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [role, setRole] = useState("");
  const [jd, setJd] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [reward, setReward] = useState(null);
  const [history, setHistory] = useState([]);

  const loadHistory = () =>
    api
      .get("/resume/history")
      .then((r) => setHistory(r.data))
      .catch(() => {});
  useEffect(() => {
    loadHistory();
  }, []);

  const analyze = async () => {
    setBusy(true);
    setError("");
    setResult(null);
    const fd = new FormData();
    if (file) fd.append("resume", file);
    else fd.append("resumeText", text);
    fd.append("targetRole", role);
    fd.append("jobDescription", jd);
    try {
      const res = await api.post("/resume/analyze", fd);
      setResult(res.data.record.analysis);
      setReward(res.data.gamification);
      loadHistory();
    } catch (e) {
      setError(e.response?.data?.message || "Couldn't analyze the resume.");
    } finally {
      setBusy(false);
    }
  };

  const openOld = async (id) => {
    try {
      const r = await api.get(`/resume/history/${id}`);
      setResult(r.data.analysis);
      setReward(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {}
  };

  const canGo = file || text.trim().length > 200;

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="ft-page">
        <h1 className="display-heading">Resume ATS check</h1>
        <p className="body-text mt-8">
          Upload your resume and see how an applicant tracking system and a
          recruiter would read it. We analyse it and keep only the scores, never
          your resume text.
        </p>

        <div className="ft-grid-2 mt-24">
          <div className="ft-panel">
            <h2 className="section-heading mb-8">Your resume</h2>
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
              }}
            />
            <div className="ft-row">
              <button
                className="btn btn-secondary"
                onClick={() => fileRef.current?.click()}
              >
                {file ? "Change PDF" : "Upload PDF"}
              </button>
              {file && (
                <span className="form-hint">
                  {file.name}{" "}
                  <button
                    className="tag-remove"
                    onClick={() => {
                      setFile(null);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    aria-label="Remove file"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            {!file && (
              <>
                <p className="form-hint mt-12">
                  …or paste the text (use this for scanned PDFs):
                </p>
                <textarea
                  className="form-textarea mt-8"
                  rows={6}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your resume text here"
                  aria-label="Resume text"
                />
              </>
            )}
          </div>
          <div className="ft-panel">
            <h2 className="section-heading mb-8">Target</h2>
            <div className="form-group">
              <label className="form-label" htmlFor="role">
                Target role
              </label>
              <input
                id="role"
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Backend Developer"
                maxLength={80}
              />
            </div>
            <div className="form-group mt-12">
              <label className="form-label" htmlFor="jd">
                Job description (optional)
              </label>
              <textarea
                id="jd"
                className="form-textarea"
                rows={4}
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job posting for keyword matching"
              />
            </div>
          </div>
        </div>

        {error && <div className="alert alert-error mt-16">{error}</div>}
        <button
          className="btn btn-primary btn-lg mt-16"
          onClick={analyze}
          disabled={busy || !canGo}
        >
          {busy ? <span className="spinner" /> : "Analyse resume"}
        </button>

        {result && (
          <div className="mt-32">
            <RewardBanner gamification={reward} />
            <div className="ft-grid-2">
              <div className="ft-panel text-center">
                <div className="ft-score-num">
                  {result.atsScore}
                  <small>/100</small>
                </div>
                <span className={`ft-pill ${tone(result.atsScore)}`}>
                  {result.atsScore >= 75
                    ? "ATS-ready"
                    : result.atsScore >= 55
                      ? "Needs polish"
                      : "Needs work"}
                </span>
                <p className="body-text mt-12">{result.summary}</p>
                <div className="mt-12">
                  <ShareButton
                    card={{
                      title: "Resume ATS score",
                      outOf: 100,
                      score: result.atsScore,
                      subtitle: result.summary,
                    }}
                  />
                </div>
              </div>
              <div className="ft-panel ft-stack">
                {Object.entries(result.breakdown).map(([k, v]) => (
                  <Bar key={k} label={LABELS[k]} value={v} />
                ))}
              </div>
            </div>

            {result.strengths?.length > 0 && (
              <div className="ft-panel mt-16">
                <h2 className="section-heading mb-8">What's working</h2>
                <ul className="ft-list">
                  {result.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.issues?.length > 0 && (
              <div className="ft-panel mt-16">
                <h2 className="section-heading mb-8">Fix these</h2>
                <div className="ft-stack">
                  {result.issues.map((it, i) => (
                    <div key={i} className="ft-item-body">
                      <span
                        className={`ft-pill ${it.severity === "high" ? "bad" : it.severity === "medium" ? "warn" : ""}`}
                      >
                        {it.severity}
                      </span>
                      <p className="mt-8">
                        <strong>{it.text}</strong>
                      </p>
                      <p className="body-text">{it.fix}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.missingKeywords?.length > 0 && (
              <div className="ft-panel mt-16">
                <h2 className="section-heading mb-8">Missing keywords</h2>
                <div className="tag-list">
                  {result.missingKeywords.map((k) => (
                    <span key={k} className="tag">
                      {k}
                    </span>
                  ))}
                </div>
                <p className="form-hint mt-8">
                  Add these only where they are true: skills you really have and
                  projects you really did.
                </p>
              </div>
            )}

            {result.weakBullets?.length > 0 && (
              <div className="ft-panel mt-16">
                <h2 className="section-heading mb-8">Stronger bullet points</h2>
                <div className="ft-stack">
                  {result.weakBullets.map((b, i) => (
                    <div key={i} className="ft-compare">
                      <div>
                        <span className="ft-muted">Before</span>
                        <p>{b.original}</p>
                      </div>
                      <div>
                        <span className="ft-muted">After</span>
                        <p>{b.rewrite}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.sectionsMissing?.length > 0 && (
              <div className="ft-panel mt-16">
                <h2 className="section-heading mb-8">
                  Sections to consider adding
                </h2>
                <div className="tag-list">
                  {result.sectionsMissing.map((k) => (
                    <span key={k} className="tag">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="ft-panel mt-16 ft-between ft-wrap">
              <div>
                <h2 className="section-heading">
                  Practise what's on your resume
                </h2>
                <p className="body-text mt-8">
                  Interviewers ask about your projects. Start a mock interview
                  and autofill from this resume.
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/interview/setup")}
              >
                Start a mock interview
              </button>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="ft-panel mt-32">
            <h2 className="section-heading mb-8">Previous checks</h2>
            <div className="ft-stack">
              {history.map((h) => (
                <button
                  key={h._id}
                  className="ft-item-head"
                  onClick={() => openOld(h._id)}
                >
                  <span className="ft-item-prompt">
                    {h.targetRole || h.fileName || "Resume"}{" "}
                    <span className="form-hint">
                      · {new Date(h.createdAt).toLocaleDateString()}
                    </span>
                  </span>
                  <span className={`ft-pill ${tone(h.atsScore)}`}>
                    {h.atsScore}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
