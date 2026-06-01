import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInterview } from "./hooks/useInterview";
import Appbar from "./components/Appbar";
import InterviewDetails from "./components/InterviewDetails";
import InterviewSetup from "./components/setup_interview";
import InterviewPanel from "./components/InterviewPanel";
import InterviewResult from "./components/InterviewResult";
import "./styles/HomePage.css";

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const interview = useInterview();

  if (!user) {
    return <p className="home-loading">Loading user info...</p>;
  }

  return (
    <div
      className={`home-page ${
        interview.interviewStarted && !interview.interviewFinished
          ? "home-live-mode"
          : ""
      }`}
    >
      <Appbar
        onLogout={() => {
          logout();
          navigate("/auth");
        }}
      />

      {interview.interviewStarted || interview.interviewFinished ? (
        <InterviewDetails
          setup={interview.setup}
          timeRemainingLabel={interview.timeRemainingLabel}
          totalTimeLabel={interview.totalTimeLabel}
          sessionState={interview.sessionState}
        />
      ) : null}

      {!interview.interviewStarted ? (
        <div className="home-setup-shell">
          <InterviewSetup
            setup={interview.setup}
            onChange={interview.updateSetupField}
            onTrackChange={interview.updateTrack}
            onSubmit={interview.startInterview}
            startingInterview={interview.startingInterview}
            setupError={interview.setupError}
          />
        </div>
      ) : interview.interviewFinished ? (
        <InterviewResult
          setup={interview.resultData?.setup || interview.setup}
          history={interview.resultData?.history || interview.history}
          scores={interview.resultData?.scores || interview.scores}
          analysisPoints={
            interview.resultData?.analysisPoints || interview.analysisPoints
          }
          summaryText={
            interview.resultData?.finalSummary || interview.summaryText
          }
          focusText={
            interview.resultData?.closingMessage || interview.focusText
          }
          followUpQuestion={
            interview.resultData?.readinessLabel || interview.followUpQuestion
          }
          finalSummary={interview.resultData?.finalSummary}
          strengths={interview.resultData?.strengths || []}
          improvements={interview.resultData?.improvements || []}
          nextSteps={interview.resultData?.nextSteps || []}
          readinessLabel={interview.resultData?.readinessLabel}
          closingMessage={interview.resultData?.closingMessage}
          onRestart={interview.restartInterview}
        />
      ) : (
        <InterviewPanel
          setup={interview.setup}
          currentQuestion={interview.currentQuestion}
          reviewData={interview.reviewData}
          answerText={interview.answerText}
          onAnswerChange={interview.setAnswerText}
          onReplayFeedback={interview.replayFeedback}
          onSendAnswer={interview.sendAnswer}
          onToggleListening={interview.toggleListening}
          isListening={interview.isListening}
          speechSupported={interview.speechSupported}
          autoSubmitSilence={interview.autoSubmitSilence}
          onToggleAutoSubmit={interview.setAutoSubmitSilence}
          autoSpeakReply={interview.autoSpeakReply}
          onToggleAutoSpeak={interview.setAutoSpeakReply}
          loadingReview={interview.loadingReview}
          speechError={interview.speechError}
          voiceHint={interview.voiceHint}
          error={interview.error}
          timeLimitLabel={interview.totalTimeLabel}
          timeRemainingLabel={interview.timeRemainingLabel}
        />
      )}
    </div>
  );
}

export default HomePage;
