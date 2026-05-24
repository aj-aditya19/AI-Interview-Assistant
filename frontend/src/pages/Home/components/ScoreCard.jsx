import "../styles/ScoreCard.css";

const scoreItems = [
  ["Accuracy", "accuracy"],
  ["Confidence", "confidence"],
  ["Vocabulary", "vocabulary"],
  ["English", "english"],
  ["Overall", "overall"],
];

function ScoreCard({ scores }) {
  return (
    <div className="home-score-grid">
      {scoreItems.map(([label, key]) => (
        <div className="home-score-chip" key={label}>
          <span>{label}</span>
          <strong>{scores[key]}/10</strong>
        </div>
      ))}
    </div>
  );
}

export default ScoreCard;
