import interviewAvatar from "../assets/interview-avator.jpg";
import "../styles/QuestionCard.css";
import AvatarCanvas from "./AvatarCanvas";

function QuestionCard({ question, videoUrl }) {
  return (
    <>
      <div className="home-box-head">
        <div>
          <label>Question screen</label>
        </div>
        <span className="home-badge">Live</span>
      </div>

      <div className="home-question-card">
        <div className="question-avatar-container">
          <AvatarCanvas videoUrl={videoUrl} />
        </div>

        <div className="question-overlay">
          <p>{question || "Your first question will appear here."}</p>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
