import "../styles/Feedback.css";

function Feedback({
  summaryText,
  focusText,
  followUpQuestion,
  followUpLabel = "Next question suggestion",
  compact = false,
}) {
  return (
    <div className="home-summary-card">
      <h4>{compact ? "Live recap" : "Summary"}</h4>
      <p>{summaryText || "AI summary will appear here."}</p>
      {focusText ? (
        <p className="home-summary-focus">Focus: {focusText}</p>
      ) : null}
      {!compact && followUpQuestion ? (
        <p className="home-summary-focus">
          {followUpLabel}: {followUpQuestion}
        </p>
      ) : null}
    </div>
  );
}

export default Feedback;
