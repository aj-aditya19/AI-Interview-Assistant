import React from "react";
import { Link } from "react-router-dom";
import "./PublicLanding.css";

const FEATURES = [
  {
    icon: "🎙️",
    title: "Talk to an AI interviewer",
    text: "A live voice interview built from your own resume and projects, with scoring on every answer, filler-word and pace feedback, and a Hinglish mode.",
  },
  {
    icon: "🎖️",
    title: "The full PPDT toolkit",
    text: "PPDT, TAT, WAT, SRT, SDT and group discussion, plus an Officer Like Qualities report that builds up across everything you practise.",
  },
  {
    icon: "💬",
    title: "Speak better English",
    text: "Word of the day, quizzes, idioms, 'fix the mistake' drills and pronunciation checks that highlight exactly which word you missed.",
  },
  {
    icon: "📄",
    title: "Resume ATS check",
    text: "See your ATS score, missing keywords and stronger bullet points. Your resume text is never stored.",
  },
];

export default function PublicLanding() {
  return (
    <div className="pl-page">
      <header className="pl-nav">
        <span className="pl-brand">
          <span className="logo-icon">IQ</span> InterviewIQ
        </span>
        <Link to="/auth" className="btn btn-ghost">
          Sign in
        </Link>
      </header>

      <main>
        <section className="pl-hero">
          <div>
            <p className="pl-eyebrow">Free while we grow</p>
            <h1 className="pl-title">
              Practise the interview before it counts.
            </h1>
            <p className="pl-lead">
              Mock interviews with instant feedback, NDA/SSB practice tests,
              spoken English drills and a resume check, all in one place and
              free to use.
            </p>
            <div className="pl-cta">
              <Link to="/auth" className="btn btn-primary btn-lg">
                Start practising free
              </Link>
              <span className="pl-note">No card needed</span>
            </div>
          </div>

          <div className="pl-demo" aria-label="Example of interview feedback">
            <div className="pl-bubble ai">
              <span>Interviewer</span>You mentioned a Node.js project. What was
              the hardest bug you fixed in it?
            </div>
            <div className="pl-bubble me">
              <span>You</span>We had a memory leak. I used the profiler to find
              a listener that was never removed…
            </div>
            <div className="pl-score">
              <div>
                <strong>8.1</strong>
                <small>/10</small>
              </div>
              <ul>
                <li>✓ Clear example with a result</li>
                <li>↗ Add how you verified the fix</li>
                <li>🎯 Pace 132 wpm · 2 fillers</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="pl-features">
          {FEATURES.map((f) => (
            <article key={f.title} className="pl-feature">
              <span aria-hidden="true">{f.icon}</span>
              <h2>{f.title}</h2>
              <p>{f.text}</p>
            </article>
          ))}
        </section>

        <section className="pl-steps">
          <h2>How it works</h2>
          <ol>
            <li>
              <strong>Tell us your goal.</strong> Placements, NDA/SSB or spoken
              English.
            </li>
            <li>
              <strong>Practise for 10 minutes a day.</strong> Voice or typing,
              on your phone or laptop.
            </li>
            <li>
              <strong>See what to fix.</strong> Scores, patterns and streaks
              that show real progress.
            </li>
          </ol>
          <Link to="/auth" className="btn btn-primary btn-lg">
            Create free account
          </Link>
        </section>
      </main>

      <footer className="pl-footer">
        InterviewIQ · AI-generated feedback is for practice and may not match a
        real assessment.
      </footer>
    </div>
  );
}
