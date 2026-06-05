import "../styles/VoiceControls.css";

function VoiceControls({
  isListening,
  speechSupported,
  autoSubmitSilence,
  onToggleAutoSubmit,
  autoSpeakReply,
  onToggleAutoSpeak,
  onToggleListening,
  onReplayFeedback,
  onSendAnswer,
  loadingReview,
  finishingInterview,
  onFinishInterview,
  voiceHint,
  speechError,
  hasFeedback,
}) {
  const listeningLabel = isListening ? "Stop listening" : "Start listening";

  return (
    <div className="home-voice-options">
      <div className="home-voice-row">
        <label className="home-toggle">
          <input
            type="checkbox"
            checked={autoSubmitSilence}
            onChange={onToggleAutoSubmit}
          />
          Auto-submit on silence
        </label>

        <label className="home-toggle">
          <input
            type="checkbox"
            checked={autoSpeakReply}
            onChange={onToggleAutoSpeak}
          />
          Auto-speak feedback
        </label>
      </div>

      <div className="home-voice-row">
        <button
          type="button"
          className="home-voice-button"
          onClick={onToggleListening}
          disabled={!speechSupported || loadingReview || finishingInterview}
        >
          {listeningLabel}
        </button>

        <button
          type="button"
          className="home-secondary-button"
          onClick={onReplayFeedback}
          disabled={!hasFeedback || loadingReview || finishingInterview}
        >
          Replay feedback
        </button>

        <button
          type="button"
          className="home-secondary-button"
          onClick={onSendAnswer}
          disabled={loadingReview || finishingInterview}
        >
          Submit answer
        </button>

        <button
          type="button"
          className="home-secondary-button"
          onClick={onFinishInterview}
          disabled={loadingReview || finishingInterview}
        >
          {finishingInterview ? "Ending interview..." : "End interview"}
        </button>
      </div>

      {voiceHint ? <p className="home-support-note">{voiceHint}</p> : null}
      {speechError ? <p className="home-support-note">{speechError}</p> : null}
      {!speechSupported ? (
        <p className="home-support-note">
          Speech recognition is not supported in this browser.
        </p>
      ) : null}
      {hasFeedback ? (
        <p className="home-support-note">
          You can end the interview anytime to view the result screen.
        </p>
      ) : null}
    </div>
  );
}

export default VoiceControls;
