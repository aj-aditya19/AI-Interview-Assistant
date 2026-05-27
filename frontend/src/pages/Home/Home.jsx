import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInterview } from "./hooks/useInterview";
import InterviewSetup from "./components/setup_interview";
import InterviewPanel from "./components/InterviewPanel";
import InterviewResult from "./components/InterviewResult";
import "./styles/HomePage.css";

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const interview = useInterview();
  const currentTrack =
    interview.setup.track === "language"
      ? "Language learning"
      : interview.setup.track === "job"
        ? "Job readiness"
        : "Internship readiness";

  if (!user) {
    return <p className="home-loading">Loading user info...</p>;
  }

  return (
    <div className="home-page">
      <div className="home-header">
        <div>
          <h2>Interview Assistant</h2>
          <p>
            Hello, <strong>{user.name}</strong>. Build your interview profile,
            answer by voice or text, and get scored by the AI interviewer.
          </p>
        </div>
        <button
          className="home-logout"
          onClick={() => {
            logout();
            navigate("/auth");
          }}
        >
          Logout
        </button>
      </div>

      {/* <div className="home-status-strip">
        <div className="home-status-card">
          <span>Current track</span>
          <strong>{currentTrack}</strong>
        </div>
        <div className="home-status-card">
          <span>Interview length</span>
          <strong>{interview.setup.durationMinutes || 3} minutes</strong>
        </div>
        <div className="home-status-card">
          <span>Session mode</span>
          <strong>
            {interview.interviewFinished
              ? "Review"
              : interview.interviewStarted
                ? "Live"
                : "Setup"}
          </strong>
        </div>
      </div> */}

      {!interview.interviewStarted ? (
        <InterviewSetup
          style={{ backgroundColor: "yellow" }}
          setup={interview.setup}
          onChange={interview.updateSetupField}
          onTrackChange={interview.updateTrack}
          onSubmit={interview.startInterview}
          startingInterview={interview.startingInterview}
          setupError={interview.setupError}
        />
      ) : interview.interviewFinished ? (
        <InterviewResult
          style={{ backgroundColor: "red" }}
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
          analysisPoints={interview.analysisPoints}
          scores={interview.scores}
          summaryText={interview.summaryText}
          focusText={interview.focusText}
          followUpQuestion={interview.followUpQuestion}
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
          timeLimitLabel={`${interview.setup.durationMinutes || 3} minutes`}
          onEndInterview={() => interview.finishInterview("manual")}
        />
      )}
    </div>
  );
}

export default HomePage;
