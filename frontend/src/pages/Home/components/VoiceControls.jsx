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
  voiceHint,
  speechError,
  hasFeedback,
}) {
  return (
    <>
      <div className="home-voice-options">
        <label className="home-toggle">
          <input
            type="checkbox"
            checked={autoSubmitSilence}
            onChange={(event) => onToggleAutoSubmit(event.target.checked)}
          />
          <span>Auto submit after silence</span>
        </label>

        <label className="home-toggle">
          <input
            type="checkbox"
            checked={autoSpeakReply}
            onChange={(event) => onToggleAutoSpeak(event.target.checked)}
          />
          <span>Read AI feedback aloud</span>
        </label>
      </div>

      <div className="home-voice-row">
        <button
          type="button"
          className={`home-voice-button ${isListening ? "is-listening" : ""}`}
          onClick={onToggleListening}
          disabled={!speechSupported || loadingReview}
        >
          {isListening ? "Stop listening" : "Speak answer"}
        </button>

        <button
          type="button"
          className="home-secondary-button"
          onClick={onReplayFeedback}
          disabled={!hasFeedback}
        >
          Replay feedback
        </button>

        <button
          type="button"
          className="home-secondary-button"
          onClick={onSendAnswer}
          disabled={loadingReview}
        >
          {loadingReview ? "Analysing..." : "Send answer"}
        </button>
      </div>

      <p className="home-support-note">{voiceHint}</p>
      {speechError ? <p className="home-error">{speechError}</p> : null}
    </>
  );
}

export default VoiceControls;
