import QuestionCard from "./QuestionCard.jsx";
import ScoreCard from "./ScoreCard.jsx";
import AnalysisPanel from "./AnalysisPanel.jsx";
import Feedback from "./Feedback.jsx";
import AnswerInput from "./AnswerInput.jsx";
import VoiceControls from "./VoiceControls.jsx";
import "../styles/InterviewPanel.css";

function InterviewPanel({
  setup,
  currentQuestion,
  reviewData,
  answerText,
  onAnswerChange,
  onReplayFeedback,
  onSendAnswer,
  onToggleListening,
  isListening,
  speechSupported,
  autoSubmitSilence,
  onToggleAutoSubmit,
  autoSpeakReply,
  onToggleAutoSpeak,
  loadingReview,
  speechError,
  voiceHint,
  error,
  timeLimitLabel,
  timeRemainingLabel,
  onEndInterview,
}) {
  const analysisPoints = reviewData?.analysisPoints || [];
  const scores = reviewData?.scores || {};
  const summaryText = reviewData?.summaryText || "";
  const improvedAnswer = reviewData?.improvedAnswer || "";
  const followUpQuestion = reviewData?.nextQuestion || "";
  const statusText = reviewData?.statusText || "";

  const hasFeedback = Boolean(
    summaryText || improvedAnswer || followUpQuestion,
  );

  return (
    <div className="home-interview-grid">
      <section className="home-box home-panel home-question-panel">
        <QuestionCard question={currentQuestion} setup={setup} />
      </section>

      <section className="home-box home-panel home-result-panel">
        <div className="home-box-head">
          <div>
            <label>Result screen</label>
            <p>
              {timeLimitLabel} total, {timeRemainingLabel} remaining.
            </p>
          </div>
          <span className="home-badge">Step 2</span>
        </div>

        {statusText ? <p className="home-result-state">{statusText}</p> : null}
        <ScoreCard scores={scores} />
        <AnalysisPanel
          analysisPoints={analysisPoints.slice(0, 3)}
          scores={scores}
          summaryText={summaryText}
          statusText={statusText}
        />

        <button
          type="button"
          className="home-secondary-button"
          onClick={onEndInterview}
        >
          End interview
        </button>
      </section>

      <section className="home-box home-panel home-answer-panel">
        <div className="home-box-head">
          <div>
            <label>Answer screen</label>
            <p>
              Speak clearly or type your response. Silence still submits after a
              short pause.
            </p>
          </div>
          <span className="home-badge">Step 3</span>
        </div>

        <AnswerInput value={answerText} onChange={onAnswerChange} />

        <VoiceControls
          isListening={isListening}
          speechSupported={speechSupported}
          autoSubmitSilence={autoSubmitSilence}
          onToggleAutoSubmit={onToggleAutoSubmit}
          autoSpeakReply={autoSpeakReply}
          onToggleAutoSpeak={onToggleAutoSpeak}
          onToggleListening={onToggleListening}
          onReplayFeedback={onReplayFeedback}
          onSendAnswer={onSendAnswer}
          loadingReview={loadingReview}
          voiceHint={voiceHint}
          speechError={speechError}
          hasFeedback={hasFeedback}
        />

        {error ? <p className="home-error">{error}</p> : null}
      </section>

      <section className="home-box home-panel home-improved-panel">
        <div className="home-box-head">
          <div>
            <label>Improved answer screen</label>
            <p>AI rewrites your answer into a cleaner interview response.</p>
          </div>
          <span className="home-badge">Step 4</span>
        </div>

        <Feedback
          summaryText={summaryText}
          focusText={statusText}
          followUpQuestion={followUpQuestion}
          improvedAnswer={improvedAnswer}
        />
      </section>
    </div>
  );
}

export default InterviewPanel;
