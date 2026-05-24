import "../styles/AnalysisPanel.css";

function AnalysisPanel({ analysisPoints }) {
  return (
    <div className="home-analysis-card">
      <h4>Point to point feedback</h4>
      {analysisPoints.length > 0 ? (
        <ul>
          {analysisPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : (
        <p className="home-placeholder">
          Your feedback will appear here after you answer.
        </p>
      )}
    </div>
  );
}

export default AnalysisPanel;
