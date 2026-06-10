import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInterview } from "./hooks/useInterview";
import InterviewSetup from "./components/setup_interview";
import InterviewPanel from "./components/InterviewPanel";
import InterviewResult from "./components/InterviewResult";
import { getTrackLabel } from "./utils/constatns.jsx";
import "./styles/HomePage.css";

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const iv = useInterview();

  if (!user) return <p className="hp-loading">Loading…</p>;

  const isSetup = iv.interviewPhase === "setup";
  const isLive = iv.interviewPhase === "live";
  const isDone = iv.interviewPhase === "result";

  return (
    <div className="hp">
      <header className="hp-bar">
        <div className="hp-brand">
          <div className="hp-logo">🎯</div>
          <span className="hp-title">InterviewAI</span>
        </div>
        <div className="hp-right">
          <span className="hp-user">👤 {user.name || user.email}</span>
          <button
            className="hp-logout"
            onClick={async () => {
              try {
                if (iv.sessionId) {
                  await iv.finishInterview("logout");
                }
              } catch (err) {
                console.error(err);
              }

              logout();
              navigate("/auth");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {(isLive || isDone) && (
        <div className="hp-strip">
          <div className="hp-chip">
            <span className="hp-chip-lbl">Track</span>
            <span className="hp-chip-val">{getTrackLabel(iv.setup.track)}</span>
          </div>
          <div className="hp-chip">
            <span className="hp-chip-lbl">Level</span>
            <span className="hp-chip-val">
              {iv.setup.interviewLevel || "—"}
            </span>
          </div>
          <div className="hp-chip">
            <span className="hp-chip-lbl">Duration</span>
            <span className="hp-chip-val">{iv.totalTimeLabel}</span>
          </div>
          {isLive && (
            <div className="hp-chip hp-chip-timer">
              <span className="hp-chip-lbl">⏱ Remaining</span>
              <span className="hp-chip-val">{iv.timeRemainingLabel}</span>
            </div>
          )}
          {isLive && (
            <button
              className="hp-end-btn"
              onClick={() => iv.finishInterview("manual")}
            >
              ■ End Interview
            </button>
          )}
        </div>
      )}

      {isSetup && (
        <InterviewSetup
          setup={iv.setup}
          onChange={iv.updateSetupField}
          onTrackChange={iv.updateTrack}
          onSubmit={iv.startInterview}
          startingInterview={iv.startingInterview}
          setupError={iv.setupError}
        />
      )}

      {isLive && (
        <InterviewPanel
          // videoUrl={iv.videoUrl}
          setup={iv.setup}
          currentQuestion={iv.currentQuestion}
          reviewData={iv.reviewData}
          answerText={iv.answerText}
          onAnswerChange={iv.setAnswerText}
          onReplayFeedback={iv.replayFeedback}
          onSendAnswer={iv.sendAnswer}
          onToggleListening={iv.toggleListening}
          onFinishInterview={iv.finishInterview}
          isListening={iv.isListening}
          speechSupported={iv.speechSupported}
          autoSubmitSilence={iv.autoSubmitSilence}
          onToggleAutoSubmit={iv.setAutoSubmitSilence}
          autoSpeakReply={iv.autoSpeakReply}
          onToggleAutoSpeak={iv.setAutoSpeakReply}
          loadingReview={iv.loadingReview}
          finishingInterview={iv.finishingInterview}
          speechError={iv.speechError}
          voiceHint={iv.voiceHint}
          error={iv.error}
          timeLimitLabel={iv.totalTimeLabel}
          timeRemainingLabel={iv.timeRemainingLabel}
        />
      )}
      {isDone && (
        <InterviewResult
          setup={iv.resultData?.setup || iv.setup}
          history={iv.resultData?.history || iv.history || []}
          scores={iv.resultData?.scores || iv.scores}
          analysisPoints={
            iv.resultData?.analysisPoints || iv.analysisPoints || []
          }
          finalSummary={iv.resultData?.finalSummary}
          closingMessage={iv.resultData?.closingMessage}
          readinessLabel={iv.resultData?.readinessLabel}
          strengths={iv.resultData?.strengths || []}
          improvements={iv.resultData?.improvements || []}
          nextSteps={iv.resultData?.nextSteps || []}
          overallScore={iv.resultData?.overallScore}
          onRestart={iv.restartInterview}
        />
      )}
    </div>
  );
}

export default HomePage;
