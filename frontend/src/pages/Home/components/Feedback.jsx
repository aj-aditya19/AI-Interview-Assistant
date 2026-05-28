import "../styles/Feedback.css";

function Feedback({
  summaryText,
  focusText,
  followUpQuestion,
  followUpLabel = "Next question suggestion",
  compact = false,
  improvedAnswer,
}) {
  const bodyText = improvedAnswer || summaryText;

  return (
    <div className="home-summary-card">
      <h4>
        {compact
          ? "Live recap"
          : improvedAnswer
            ? "Improved answer"
            : "Summary"}
      </h4>
      <p>{bodyText || "AI rewritten answer will appear here."}</p>
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
