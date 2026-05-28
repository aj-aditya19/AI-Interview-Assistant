import "../styles/AnswerInput.css";

function AnswerInput({ value, onChange }) {
  return (
    <textarea
      className="home-answer-input"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Type your answer here, or use voice input to dictate it..."
      rows="10"
    />
  );
}

export default AnswerInput;
