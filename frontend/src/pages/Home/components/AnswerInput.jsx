import "../styles/AnswerInput.css";

function AnswerInput({ value, isListening }) {
  return (
    <div className="camera-container">
      <img
        src="http://localhost:5001/video_feed"
        alt="Camera Feed"
        className="camera-feed"
      />

      <div className="subtitle-box">{value || "Start speaking..."}</div>

      {isListening && <div className="live-indicator">Listening...</div>}
    </div>
  );
}

export default AnswerInput;
