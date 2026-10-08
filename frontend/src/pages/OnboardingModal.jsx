import React, { useState } from "react";
import api from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const GOALS = [
  {
    id: "interview",
    icon: "🎙️",
    title: "Placements & jobs",
    desc: "Mock interviews, resume check, communication.",
  },
  {
    id: "ssb",
    icon: "🎖️",
    title: "PPDT",
    desc: "PPDT, TAT, WAT, SRT, SDT, GD and OLQ report.",
  },
  {
    id: "english",
    icon: "💬",
    title: "Spoken English",
    desc: "Vocabulary, idioms, pronunciation, grammar.",
  },
  {
    id: "all",
    icon: "✨",
    title: "A bit of everything",
    desc: "Explore it all.",
  },
];

export default function OnboardingModal({ onClose }) {
  const { refreshUser } = useAuth();
  const [goal, setGoal] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async (g) => {
    setSaving(true);
    try {
      await api.patch("/progress/settings", {
        goal: g || "all",
        onboarded: true,
      });
      await refreshUser();
    } catch {}
    setSaving(false);
    onClose(g || "all");
  };

  return (
    <div
      className="ft-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ob-title"
    >
      <div className="ft-modal">
        <h2 id="ob-title" className="section-heading">
          What are you preparing for?
        </h2>
        <p className="body-text mt-8 mb-16">
          We'll put the right practice first. You can change this anytime.
        </p>
        <div className="ft-stack">
          {GOALS.map((g) => (
            <button
              key={g.id}
              className={`ft-card ${goal === g.id ? "selected" : ""}`}
              onClick={() => setGoal(g.id)}
              aria-pressed={goal === g.id}
            >
              <h3>
                <span aria-hidden="true">{g.icon}</span> {g.title}
              </h3>
              <p>{g.desc}</p>
            </button>
          ))}
        </div>
        <div className="ft-row mt-16" style={{ justifyContent: "flex-end" }}>
          <button
            className="btn btn-ghost"
            onClick={() => save("all")}
            disabled={saving}
          >
            Skip
          </button>
          <button
            className="btn btn-primary"
            onClick={() => save(goal)}
            disabled={!goal || saving}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
