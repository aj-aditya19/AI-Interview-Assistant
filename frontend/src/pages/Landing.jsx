import { Link } from "react-router-dom";
import "../styles/Landing.css";

function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <h1>AI Interview Assistant</h1>
        <p>
          Practice interview questions, improve your confidence, and prepare
          with a simple guided flow.
        </p>
        <div className="landing-actions">
          <Link to="/auth" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/auth" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </section>

      <section className="landing-features">
        <article className="feature-card">
          <h3>Practice</h3>
          <p>Train with focused interview sessions in one place.</p>
        </article>
        <article className="feature-card">
          <h3>Track</h3>
          <p>Keep your progress organized as you prepare.</p>
        </article>
        <article className="feature-card">
          <h3>Improve</h3>
          <p>Get better with consistent repetition and review.</p>
        </article>
      </section>
    </main>
  );
}

export default LandingPage;
