import { Link } from "react-router-dom";
import "../styles/Landing.css";

function LandingPage() {
  return (
    <main className="landing-page">
      <div className="landing-shell">
        <section className="landing-grid">
          <div className="landing-hero">
            <p className="eyebrow">Adaptive interview practice</p>
            <h1>AI Interview Assistant</h1>
            <p className="landing-copy">
              A guided interview workspace for internship prep, job readiness,
              and language practice with structured feedback and timed sessions.
            </p>

            <div className="landing-actions">
              <Link to="/auth" className="btn btn-primary">
                Create account
              </Link>
              <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>
            </div>

            <div className="landing-highlights">
              <div className="landing-highlight">
                <strong>3 tracks</strong>
                <span>Internship, job, and language sessions</span>
              </div>
              <div className="landing-highlight">
                <strong>Timed</strong>
                <span>3 or 5 minute interview sessions</span>
              </div>
              <div className="landing-highlight">
                <strong>Live feedback</strong>
                <span>Scores, insights, and final review</span>
              </div>
            </div>
          </div>

          <aside className="landing-preview">
            <div className="preview-card preview-card-main">
              <p className="preview-label">Today’s flow</p>
              <h3>Pick a path, answer naturally, and review the result.</h3>
              <p>
                The interview adapts to your profile so the first question,
                feedback, and final summary all stay track-aware.
              </p>
            </div>

            <div className="preview-stack">
              <article className="feature-card">
                <h3>Internship mode</h3>
                <p>Role, skills, projects, stack, and interview level.</p>
              </article>
              <article className="feature-card">
                <h3>Job mode</h3>
                <p>
                  Experience, previous internships, and deeper role questions.
                </p>
              </article>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default LandingPage;
