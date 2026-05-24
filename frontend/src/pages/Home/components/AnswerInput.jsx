import "../styles/AnswerInput.css";

function AnswerInput({ value, onChange }) {
  return (
    <textarea
      className="home-answer-input"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Speak or type your answer here..."
      rows="10"
    />
  );
}

export default AnswerInput;
