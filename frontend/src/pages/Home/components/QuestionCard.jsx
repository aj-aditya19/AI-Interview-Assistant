function QuestionCard({ question }) {
  return (
    <div
      style={{
        padding: 14,
        background: "var(--surface2)",
        borderRadius: "var(--r)",
        fontSize: ".9rem",
        lineHeight: 1.55,
      }}
    >
      {question || "Loading question…"}
    </div>
  );
}
export default QuestionCard;
