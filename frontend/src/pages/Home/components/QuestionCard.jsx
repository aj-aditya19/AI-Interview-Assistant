import { getTrackLabel } from "../utils/constatns.jsx";
import "../styles/QuestionCard.css";

function QuestionCard({ question, setup }) {
  const trackLabel = getTrackLabel(setup.track);

  return (
    <>
      <div className="home-box-head">
        <div>
          <label>Question screen</label>
          <p>The AI asks one question at a time and always starts with you.</p>
        </div>
        <span className="home-badge">Live</span>
      </div>

      <div className="home-question-card">
        <p>{question || "Your first question will appear here."}</p>
      </div>
    </>
  );
}

export default QuestionCard;
