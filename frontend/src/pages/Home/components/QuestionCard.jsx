import { getTrackLabel } from "../utils/constatns.jsx";
import "../styles/QuestionCard.css";

function QuestionCard({ question, setup }) {
  const trackLabel = getTrackLabel(setup.track);

  return (
    <>
      <div className="home-box-head">
        <div>
          <label>Question</label>
          <p>The AI asks one question at a time based on your profile.</p>
        </div>
        <span className="home-badge">Live</span>
      </div>

      <div className="home-question-card">
        <p>{question || "Your first question will appear here."}</p>
      </div>

      <div className="home-question-meta">
        <span>Track: {trackLabel}</span>
        <span>
          {setup.track === "language"
            ? `Language: ${setup.language || "Not set"}`
            : `Role: ${setup.role || "Not set"}`}
        </span>
        <span>Level: {setup.interviewLevel || "Not set"}</span>
      </div>
    </>
  );
}

export default QuestionCard;
