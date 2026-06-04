import "../styles/AnswerInput.css";

function AnswerInput({ value, isListening }) {
  return (
    <div className="home-answer-display">
      {isListening && <div className="live-indicator">Listening...</div>}

      {value || "Start speaking... your answer will appear here."}
    </div>
  );
}

export default AnswerInput;
