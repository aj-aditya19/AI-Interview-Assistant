import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import TagInput from "../../components/common/TagInput.jsx";
import api from "../../utils/api.js";
import content from "../../content/interviewSetup.json";
import "./InterviewSetupPage.css";

const DEFAULT_FORM = {
  label: "",
  reason: "placement",
  targetRole: "",
  targetCompany: "",
  skills: [],
  techStack: [],
  projects: [],
  difficulty: "Intermediate",
  rounds: ["hr", "technical"],
  additionalMessage: "",
  isDefault: false,
};

export default function InterviewSetupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = profile details, 2 = rounds, 3 = review
  const [form, setForm] = useState(DEFAULT_FORM);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/interview-profiles").then((res) => setSavedProfiles(res.data)).catch(() => {});
  }, []);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleRound = (roundValue) => {
    const current = form.rounds;
    if (current.includes(roundValue)) {
      if (current.length === 1) return; // must have at least one
      setField("rounds", current.filter((r) => r !== roundValue));
    } else {
      setField("rounds", [...current, roundValue]);
    }
  };

  const useProfile = (profile) => {
    setForm({
      label: profile.label,
      reason: profile.reason,
      targetRole: profile.targetRole,
      targetCompany: profile.targetCompany || "",
      skills: profile.skills || [],
      techStack: profile.techStack || [],
      projects: profile.projects || [],
      difficulty: profile.difficulty,
      rounds: profile.rounds,
      additionalMessage: profile.additionalMessage || "",
      isDefault: false,
    });
    setStep(3);
  };

  const handleStartInterview = async () => {
    if (!form.targetRole) { setError("Target role is required"); return; }
    setLoading(true);
    setError("");
    try {
      // Save profile first
      const profileRes = await api.post("/interview-profiles", {
        label: form.label || `${form.targetRole} — ${new Date().toLocaleDateString()}`,
        reason: form.reason,
        targetRole: form.targetRole,
        targetCompany: form.targetCompany,
        skills: form.skills,
        techStack: form.techStack,
        projects: form.projects,
        difficulty: form.difficulty,
        rounds: form.rounds,
        additionalMessage: form.additionalMessage,
        isDefault: form.isDefault,
      });
      const profileId = profileRes.data._id;

      // Start session
      const sessionRes = await api.post("/interview/session", { action: "start", profileId });
      navigate("/interview/live", {
        state: {
          sessionId: sessionRes.data.sessionId,
          profileId,
          firstQuestion: sessionRes.data.question,
          currentRound: sessionRes.data.currentRound,
          currentRoundIndex: sessionRes.data.currentRoundIndex,
          totalRounds: sessionRes.data.totalRounds,
          rounds: form.rounds,
          targetRole: form.targetRole,
          targetCompany: form.targetCompany,
          difficulty: form.difficulty,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container setup-container">
        {/* Step indicator */}
        <div className="setup-steps">
          {[content.steps.profile, content.steps.rounds, content.steps.review].map((s, i) => (
            <div key={s} className={`setup-step ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "done" : ""}`}>
              <div className="step-dot">{step > i + 1 ? "✓" : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="setup-layout">
          {/* Main form */}
          <div className="setup-main">
            {step === 1 && (
              <div className="card">
                <h2 className="section-heading mb-24">{content.heading}</h2>
                <div className="setup-fields">
                  {/* Reason */}
                  <div className="form-group">
                    <label className="form-label">{content.labels.reason}</label>
                    <div className="reason-options">
                      {content.reasonOptions.map((opt) => (
                        <label key={opt.value} className={`reason-option ${form.reason === opt.value ? "selected" : ""}`}>
                          <input
                            type="radio"
                            name="reason"
                            value={opt.value}
                            checked={form.reason === opt.value}
                            onChange={() => setField("reason", opt.value)}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Target role */}
                  <div className="form-group">
                    <label className="form-label">{content.labels.targetRole}</label>
                    <input
                      className="form-input"
                      list="role-options"
                      placeholder={content.labels.targetRolePlaceholder}
                      value={form.targetRole}
                      onChange={(e) => setField("targetRole", e.target.value)}
                    />
                    <datalist id="role-options">
                      {content.roleOptions.map((r) => <option key={r} value={r} />)}
                    </datalist>
                  </div>

                  {/* Target company */}
                  <div className="form-group">
                    <label className="form-label">{content.labels.targetCompany}</label>
                    <input
                      className="form-input"
                      placeholder={content.labels.targetCompanyPlaceholder}
                      value={form.targetCompany}
                      onChange={(e) => setField("targetCompany", e.target.value)}
                    />
                  </div>

                  {/* Skills */}
                  <div className="form-group">
                    <label className="form-label">{content.labels.skills}</label>
                    <TagInput
                      tags={form.skills}
                      onChange={(v) => setField("skills", v)}
                      placeholder={content.labels.skillsPlaceholder}
                    />
                  </div>

                  {/* Tech stack */}
                  <div className="form-group">
                    <label className="form-label">{content.labels.techStack}</label>
                    <TagInput
                      tags={form.techStack}
                      onChange={(v) => setField("techStack", v)}
                      placeholder={content.labels.techStackPlaceholder}
                    />
                  </div>

                  {/* Projects */}
                  <div className="form-group">
                    <label className="form-label">{content.labels.projects}</label>
                    <TagInput
                      tags={form.projects}
                      onChange={(v) => setField("projects", v)}
                      placeholder={content.labels.projectsPlaceholder}
                    />
                  </div>

                  {/* Additional message */}
                  <div className="form-group">
                    <label className="form-label">{content.labels.additionalMessage}</label>
                    <textarea
                      className="form-textarea"
                      placeholder={content.labels.additionalMessagePlaceholder}
                      value={form.additionalMessage}
                      onChange={(e) => setField("additionalMessage", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="setup-actions">
                  <button className="btn btn-primary" onClick={() => { if (!form.targetRole) { setError("Target role is required"); return; } setError(""); setStep(2); }}>
                    {content.buttons.next}
                  </button>
                  {error && <span className="form-error">{error}</span>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card">
                <h2 className="section-heading mb-8">{content.labels.rounds}</h2>
                <p className="body-text mb-24">{content.labels.roundsHelp}</p>

                <div className="rounds-list">
                  {content.roundOptions.map((round) => (
                    <label
                      key={round.value}
                      className={`round-option ${form.rounds.includes(round.value) ? "selected" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={form.rounds.includes(round.value)}
                        onChange={() => toggleRound(round.value)}
                      />
                      <div>
                        <div className="round-option-label">{round.label}</div>
                        <div className="round-option-desc">{round.description}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Difficulty */}
                <div className="form-group mt-24">
                  <label className="form-label">{content.labels.difficulty}</label>
                  <div className="difficulty-options">
                    {content.difficultyOptions.map((opt) => (
                      <label
                        key={opt.value}
                        className={`difficulty-option ${form.difficulty === opt.value ? "selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name="difficulty"
                          value={opt.value}
                          checked={form.difficulty === opt.value}
                          onChange={() => setField("difficulty", opt.value)}
                        />
                        <span className="diff-label">{opt.label}</span>
                        <span className="diff-hint">{opt.hint}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="setup-actions">
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>{content.buttons.back}</button>
                  <button className="btn btn-primary" onClick={() => setStep(3)}>{content.buttons.next}</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card">
                <h2 className="section-heading mb-24">Review & start</h2>

                <div className="review-rows">
                  <ReviewRow label="Role" value={form.targetRole} />
                  {form.targetCompany && <ReviewRow label="Company" value={form.targetCompany} />}
                  <ReviewRow label="Reason" value={content.reasonOptions.find((r) => r.value === form.reason)?.label} />
                  <ReviewRow label="Difficulty" value={form.difficulty} />
                  <ReviewRow label="Rounds" value={form.rounds.map((r) => content.roundOptions.find((o) => o.value === r)?.label).join(" → ")} />
                  {form.skills.length > 0 && <ReviewRow label="Skills" value={form.skills.join(", ")} />}
                </div>

                {error && <div className="alert alert-error mt-16">{error}</div>}

                <div className="setup-actions mt-24">
                  <button className="btn btn-ghost" onClick={() => setStep(2)}>{content.buttons.back}</button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleStartInterview}
                    disabled={loading}
                  >
                    {loading ? <span className="spinner" style={{ borderTopColor: "#fff" }} /> : content.buttons.start}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Saved profiles sidebar */}
          {savedProfiles.length > 0 && step !== 3 && (
            <div className="setup-sidebar">
              <div className="card">
                <h3 className="section-heading mb-16" style={{ fontSize: "1rem" }}>{content.savedProfiles}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {savedProfiles.slice(0, 5).map((p) => (
                    <div key={p._id} className="saved-profile-item">
                      <div>
                        <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>{p.label}</div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>{p.targetRole} · {p.difficulty}</div>
                      </div>
                      <button className="btn btn-secondary btn-sm" onClick={() => useProfile(p)}>
                        {content.useProfile}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="review-row">
      <span className="review-label">{label}</span>
      <span className="review-value">{value}</span>
    </div>
  );
}
