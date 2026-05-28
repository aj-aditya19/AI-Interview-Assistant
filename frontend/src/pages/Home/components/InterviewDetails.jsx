import { getTrackLabel } from "../utils/constatns.jsx";

const buildContextLabel = (setup) => {
  if (setup.track === "language") {
    return `Language: ${setup.language || "Not set"}`;
  }

  return `Role: ${setup.role || "Not set"}`;
};

function InterviewDetails({
  setup,
  timeRemainingLabel,
  totalTimeLabel,
  sessionState,
}) {
  return (
    <section className="home-details-strip">
      <article className="home-detail-card">
        <span>Session</span>
        <strong>
          {sessionState === "retry" ? "Retry round" : "Live chat"}
        </strong>
      </article>

      <article className="home-detail-card">
        <span>Track</span>
        <strong>{getTrackLabel(setup.track)}</strong>
      </article>

      <article className="home-detail-card">
        <span>Timeline</span>
        <strong>
          {timeRemainingLabel} left of {totalTimeLabel}
        </strong>
      </article>

      <article className="home-detail-card">
        <span>Context</span>
        <strong>{buildContextLabel(setup)}</strong>
      </article>

      <article className="home-detail-card">
        <span>Difficulty</span>
        <strong>{setup.interviewLevel || "Not set"}</strong>
      </article>
    </section>
  );
}

export default InterviewDetails;
