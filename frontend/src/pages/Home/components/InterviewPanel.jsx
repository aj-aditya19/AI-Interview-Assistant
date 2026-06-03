import QuestionCard from "./QuestionCard.jsx";
import ScoreCard from "./ScoreCard.jsx";
import Feedback from "./Feedback.jsx";
import AnswerInput from "./AnswerInput.jsx";
import VoiceControls from "./VoiceControls.jsx";
import { defaultScores } from "../utils/constatns.jsx";
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
}) {
  const scores = reviewData?.scores || defaultScores;
  const summaryText = reviewData?.summaryText || "";
  const improvedAnswer = reviewData?.improvedAnswer || "";
  const followUpQuestion = reviewData?.nextQuestion || "";
  const statusText = reviewData?.statusText || "";

  const hasFeedback = Boolean(
    summaryText || improvedAnswer || followUpQuestion,
  );

  return (
    <div className="home-interview-grid">
      <div className="home-interview-stack home-interview-stack-left">
        <section className="home-box home-panel home-question-panel">
          <QuestionCard question={currentQuestion} setup={setup} />
        </section>
        <section className="home-box home-panel home-improved-panel">
          <div className="home-box-head">
            <div>
              <label>Improved answer screen</label>
            </div>
          </div>

          <Feedback
            summaryText={summaryText}
            focusText={statusText}
            followUpQuestion={followUpQuestion}
            improvedAnswer={improvedAnswer}
          />
        </section>
      </div>

      <div className="home-interview-stack home-interview-stack-right">
        <section className="home-box home-panel home-answer-panel">
          <div className="home-box-head">
            <div>
              <label>Answer screen</label>
            </div>
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

        <section className="home-box home-panel home-live-score-panel">
          <div className="home-box-head">
            <div>
              <label>Live scores</label>
            </div>
            <span className="home-badge">Live</span>
          </div>

          <ScoreCard scores={scores} />
        </section>
      </div>
    </div>
  );
}

export default InterviewPanel;
