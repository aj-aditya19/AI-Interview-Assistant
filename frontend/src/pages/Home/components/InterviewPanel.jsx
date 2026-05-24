import QuestionCard from "./QuestionCard.jsx";
import ScoreCard from "./ScoreCard.jsx";
import AnalysisPanel from "./AnalysisPanel.jsx";
import Feedback from "./Feedback.jsx";
import AnswerInput from "./AnswerInput.jsx";
import VoiceControls from "./VoiceControls.jsx";
import { getTrackLabel } from "../utils/constatns.jsx";
import "../styles/InterviewPanel.css";

function InterviewPanel({
  setup,
  currentQuestion,
  analysisPoints,
  scores,
  summaryText,
  focusText,
  followUpQuestion,
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
  onEndInterview,
}) {
  const compactAnalysis = analysisPoints.slice(0, 3);

  return (
    <div className="home-grid home-grid-interview">
      <section className="home-box home-question-box">
        <QuestionCard question={currentQuestion} setup={setup} />
      </section>

      <section className="home-box home-score-box">
        <div className="home-box-head">
          <div>
            <label>Live interview panel</label>
            <p>
              {getTrackLabel(setup.track)} in progress. Time limit:{" "}
              {timeLimitLabel}.
            </p>
          </div>
          <span className="home-badge">Step 2</span>
        </div>

        <ScoreCard scores={scores} />
        <AnalysisPanel analysisPoints={compactAnalysis} />
        <Feedback
          summaryText={summaryText}
          focusText={focusText}
          followUpQuestion={followUpQuestion}
          compact
        />

        <button
          type="button"
          className="home-secondary-button"
          onClick={onEndInterview}
        >
          End interview
        </button>
      </section>

      <section className="home-box home-answer-box">
        <div className="home-box-head">
          <div>
            <label>Your answer</label>
            <p>
              Speak clearly. If nothing is detected for 3-4 seconds, the answer
              is sent automatically.
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
          hasFeedback={Boolean(summaryText || followUpQuestion)}
        />

        {error ? <p className="home-error">{error}</p> : null}
      </section>
    </div>
  );
}

export default InterviewPanel;
