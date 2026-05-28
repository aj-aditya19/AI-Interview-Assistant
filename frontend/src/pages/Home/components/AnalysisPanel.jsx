import "../styles/AnalysisPanel.css";

function AnalysisPanel({ analysisPoints, scores, summaryText, statusText }) {
  const overallScore = Number(scores?.overall || 0);

  return (
    <div className="home-analysis-card home-result-card">
      <div className="home-result-topline">
        <div>
          <h4>Result snapshot</h4>
          <p>
            {statusText || "AI analysis of the current answer appears here."}
          </p>
        </div>

        <div className="home-result-score">
          <strong>{overallScore}/10</strong>
          <span>Overall</span>
        </div>
      </div>

      {summaryText ? (
        <p className="home-result-summary-text">{summaryText}</p>
      ) : null}

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
