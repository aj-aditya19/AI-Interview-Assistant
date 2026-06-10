import { getTrackLabel, getTrackSummary } from "../utils/constatns.jsx";
import "../styles/InterviewResult.css";

function InterviewResult({
  setup,
  history = [],
  scores,
  analysisPoints = [],
  finalSummary,
  closingMessage,
  readinessLabel,
  strengths = [],
  improvements = [],
  nextSteps = [],
  overallScore,
  onRestart,
}) {
  const track = getTrackLabel(setup?.track);
  const profile = getTrackSummary(setup || {});
  const ov = Number(overallScore || scores?.overall || 0);
  const msg =
    ov >= 8
      ? "Outstanding! 🏆"
      : ov >= 6
        ? "Strong performance 👏"
        : ov >= 4
          ? "Good start 💪"
          : "Keep practicing 📚";

  const SCORE_ITEMS = [
    ["Accuracy", "accuracy"],
    ["Confidence", "confidence"],
    ["Vocabulary", "vocabulary"],
    ["English", "english"],
  ];

  return (
    <div className="result">
      <div className="result-hero">
        <div className="rh-left">
          <div className="rh-badge">🎉 Interview Complete</div>
          <h2>{msg}</h2>
          <p className="rh-sub">
            {track} · {setup?.durationMinutes || "3"} min ·&nbsp;
            {history.length} question{history.length !== 1 ? "s" : ""} answered
          </p>
        </div>
        <div className="rh-score">
          <div className="rh-score-val">{ov}/10</div>
          <div className="rh-score-lbl">Overall Score</div>
        </div>
        <button type="button" className="rh-restart" onClick={onRestart}>
          🔄 New Interview
        </button>
      </div>

      <div className="result-body">
        <div className="result-main">
          <div className="rc">
            <p className="rc-title">📊 Score Breakdown</p>
            <div className="rsc-grid">
              {SCORE_ITEMS.map(([l, k]) => (
                <div key={k} className="rsc-chip">
                  <span>{l}</span>
                  <strong>{Number(scores?.[k] || 0)}/10</strong>
                </div>
              ))}
            </div>
          </div>

          {(finalSummary || closingMessage || readinessLabel) && (
            <div className="rc">
              <p className="rc-title">🧠 AI Summary</p>
              {finalSummary && (
                <div className="rsum">
                  <p>{finalSummary}</p>
                </div>
              )}
              {closingMessage && <p className="rsum-meta">{closingMessage}</p>}
              {readinessLabel && (
                <p className="rsum-readiness">Readiness: {readinessLabel}</p>
              )}
            </div>
          )}

          <div className="rc">
            <p className="rc-title">⚡ Feedback</p>
            <div className="r3col">
              <div className="rlist">
                <h4>✅ Strengths</h4>
                {strengths.length > 0 ? (
                  <ul>
                    {strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="rlist-empty">No strengths listed yet.</p>
                )}
              </div>
              <div className="rlist">
                <h4>🔧 Improvements</h4>
                {improvements.length > 0 ? (
                  <ul>
                    {improvements.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="rlist-empty">No improvements listed yet.</p>
                )}
              </div>
              <div className="rlist">
                <h4>🎯 Next Steps</h4>
                {nextSteps.length > 0 ? (
                  <ul>
                    {nextSteps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="rlist-empty">No next steps listed yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="rc">
            <p className="rc-title">📋 Interview History</p>
            <div className="rhist">
              {history.length > 0 ? (
                history.map((item, i) => (
                  <div key={i} className="rhist-item">
                    <div className="rhist-num">
                      Question {i + 1}
                      {item.attemptNumber > 1
                        ? ` · Attempt ${item.attemptNumber}`
                        : ""}
                    </div>
                    <div className="rhist-q">{item.question}</div>
                    <div className="rhist-a">{item.answer}</div>
                    {item.improvedAnswer && (
                      <div className="rhist-improved">
                        💡 Better: {item.improvedAnswer}
                      </div>
                    )}
                    {item.summary && (
                      <div className="rhist-summary">🤖 {item.summary}</div>
                    )}
                    {(item.rate !== undefined || item.result !== undefined) && (
                      <span className="rhist-sc">
                        Score: {Number(item.rate ?? item.result ?? 0)}/
                        {Number(item.total || 10)}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p
                  style={{
                    color: "var(--muted-light)",
                    fontSize: ".84rem",
                    fontStyle: "italic",
                    textAlign: "center",
                    padding: "16px 0",
                  }}
                >
                  No answers recorded.
                </p>
              )}
            </div>
          </div>

          {analysisPoints.length > 0 && (
            <div className="rc">
              <p className="rc-title">🔑 Analysis Points</p>
              <ul
                style={{
                  paddingLeft: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {analysisPoints.map((a, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: ".83rem",
                      lineHeight: 1.5,
                      color: "var(--text-soft)",
                    }}
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="result-side">
          <div className="rc">
            <p className="rc-title">👤 Your Profile</p>
            <div className="rprofile">
              <div className="rp-row">
                <span>Track</span>
                <strong>{track}</strong>
              </div>
              {profile.map((l, i) => (
                <div key={i} className="rp-row">
                  <span>{l.split(":")[0]}</span>
                  <strong>{l.split(":").slice(1).join(":").trim()}</strong>
                </div>
              ))}
              {setup?.interviewLevel && (
                <div className="rp-row">
                  <span>Level</span>
                  <strong>{setup.interviewLevel}</strong>
                </div>
              )}
              {Array.isArray(setup?.techStack) &&
                setup.techStack.length > 0 && (
                  <div className="rp-row">
                    <span>Tech Stack</span>
                    <strong>{setup.techStack.join(", ")}</strong>
                  </div>
                )}
              {setup?.experience && (
                <div className="rp-row">
                  <span>Experience</span>
                  <strong>{setup.experience}</strong>
                </div>
              )}
              {setup?.projects && (
                <div className="rp-row">
                  <span>Projects</span>
                  <strong>{setup.projects}</strong>
                </div>
              )}
            </div>
          </div>

          <button type="button" className="rc-restart" onClick={onRestart}>
            🚀 Start New Interview
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewResult;
