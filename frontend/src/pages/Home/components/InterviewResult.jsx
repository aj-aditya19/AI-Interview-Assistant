import ScoreCard from "./ScoreCard.jsx";
import AnalysisPanel from "./AnalysisPanel.jsx";
import Feedback from "./Feedback.jsx";
import { getTrackLabel, getTrackSummary } from "../utils/constatns.jsx";
import "../styles/InterviewResult.css";

function InterviewResult({
  setup,
  history,
  scores,
  analysisPoints,
  summaryText,
  focusText,
  followUpQuestion,
  finalSummary,
  strengths = [],
  improvements = [],
  nextSteps = [],
  readinessLabel,
  closingMessage,
  onRestart,
}) {
  const trackLabel = getTrackLabel(setup.track);
  const profileLines = getTrackSummary(setup);

  return (
    <div className="home-result-layout">
      <section className="home-box home-result-main">
        <div className="home-box-head">
          <div>
            <label>Interview result</label>
            <p>
              {trackLabel} completed in {setup.durationMinutes || "3"} minutes.
            </p>
          </div>
          <span className="home-badge">Result</span>
        </div>

        <ScoreCard scores={scores} />
        <AnalysisPanel analysisPoints={analysisPoints} />
        <Feedback
          summaryText={finalSummary || summaryText}
          focusText={closingMessage || focusText}
          followUpQuestion={readinessLabel || followUpQuestion}
          followUpLabel="Readiness"
        />

        <div className="home-result-lists">
          <div className="home-result-list">
            <h4>Strengths</h4>
            {strengths.length > 0 ? (
              <ul>
                {strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="home-placeholder">No strengths were returned.</p>
            )}
          </div>

          <div className="home-result-list">
            <h4>Improvements</h4>
            {improvements.length > 0 ? (
              <ul>
                {improvements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="home-placeholder">No improvements were returned.</p>
            )}
          </div>

          <div className="home-result-list">
            <h4>Next steps</h4>
            {nextSteps.length > 0 ? (
              <ul>
                {nextSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="home-placeholder">No next steps were returned.</p>
            )}
          </div>
        </div>

        <div className="home-result-history">
          <h4>Interview history</h4>
          {history.length > 0 ? (
            history.map((item, index) => (
              <article
                key={`${item.question}-${index}`}
                className="home-history-item"
              >
                <p>
                  <strong>Q{index + 1}:</strong> {item.question}
                  {item.attemptNumber ? ` (Attempt ${item.attemptNumber})` : ""}
                </p>
                <p>
                  <strong>A:</strong> {item.answer}
                </p>
                {item.improvedAnswer ? (
                  <p className="home-summary-focus">
                    Improved answer: {item.improvedAnswer}
                  </p>
                ) : null}
                {item.summary ? (
                  <p className="home-summary-focus">AI note: {item.summary}</p>
                ) : null}
              </article>
            ))
          ) : (
            <p className="home-placeholder">No answers were recorded.</p>
          )}
        </div>

        <button
          type="button"
          className="home-primary-button"
          onClick={onRestart}
        >
          Start another interview
        </button>
      </section>

      <aside className="home-box home-result-side">
        <div className="home-box-head">
          <div>
            <label>Profile recap</label>
            <p>The setup that shaped this interview.</p>
          </div>
          <span className="home-badge">Profile</span>
        </div>

        <div className="home-result-profile">
          <p>
            <strong>Track:</strong> {trackLabel}
          </p>
          {profileLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>
            <strong>Interview level:</strong>{" "}
            {setup.interviewLevel || "Not set"}
          </p>
          {setup.projects ? (
            <p>
              <strong>Projects:</strong> {setup.projects}
            </p>
          ) : null}
          {setup.techStack ? (
            <p>
              <strong>Tech stack:</strong> {setup.techStack}
            </p>
          ) : null}
          {setup.experience ? (
            <p>
              <strong>Experience:</strong> {setup.experience}
            </p>
          ) : null}
          {setup.previousInternships ? (
            <p>
              <strong>Previous internships:</strong> {setup.previousInternships}
            </p>
          ) : null}
          {setup.notes ? (
            <p>
              <strong>Notes:</strong> {setup.notes}
            </p>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

export default InterviewResult;
