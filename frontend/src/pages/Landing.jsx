import { Link } from "react-router-dom";
import "../styles/Landing.css";

function LandingPage() {
  return (
    <main className="landing-page">
      <div className="landing-shell">
        <section className="landing-hero">
          <p className="eyebrow">Lightweight interview prep</p>
          <h1>AI Interview Assistant</h1>
          <p>
            A calm, focused place to register, log in, and prepare for your next
            interview without unnecessary steps.
          </p>
          <div className="landing-actions">
            <Link to="/auth" className="btn btn-primary">
              Create account
            </Link>
            <Link to="/auth" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </section>

        <section className="landing-features">
          <article className="feature-card">
            <h3>Simple auth</h3>
            <p>Register and sign in with just email and password.</p>
          </article>
          <article className="feature-card">
            <h3>Ready for growth</h3>
            <p>
              The user model keeps `isVerified` for future verification work.
            </p>
          </article>
          <article className="feature-card">
            <h3>Clean UI</h3>
            <p>
              A soft light theme with clear spacing and minimal distraction.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}

export default LandingPage;
