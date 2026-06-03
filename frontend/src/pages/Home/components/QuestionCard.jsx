import interviewAvatar from "../assets/interview-avator.jpg";
import "../styles/QuestionCard.css";

function QuestionCard({ question }) {
  return (
    <>
      <div className="home-box-head">
        <div>
          <label>Question screen</label>
        </div>
        <span className="home-badge">Live</span>
      </div>

      <div className="home-question-card">
        <img
          src={interviewAvatar}
          alt="Interview Avatar"
          className="question-image"
        />

        <div className="question-overlay">
          <p>{question || "Your first question will appear here."}</p>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
