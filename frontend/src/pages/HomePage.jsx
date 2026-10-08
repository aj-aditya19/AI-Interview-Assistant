import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/common/Navbar.jsx";
import RewardBanner from "../components/common/RewardBanner.jsx";
import BrowserSupportBanner from "../components/common/BrowserSupportBanner.jsx";
import OnboardingModal from "./OnboardingModal.jsx";
import useSpeech from "../hooks/useSpeech.js";
import api from "../utils/api.js";
import content from "../content/home.json";
import "./HomePage.css";

const TILES = {
  interview: {
    icon: "🎙️",
    title: "AI Mock Interview",
    desc: "Live voice interview with scoring, filler-word analysis and a Hinglish option.",
    path: "/interview/setup",
    cta: "Start interview",
  },
  ssb: {
    icon: "🎖️",
    title: "PPDT Practice",
    desc: "PPDT, TAT, WAT, SRT, SDT, group discussion and your OLQ report.",
    path: "/ssb",
    cta: "Open SSB suite",
  },
  comm: {
    icon: "💬",
    title: "Communication",
    desc: "Word of the day, vocabulary quiz, idioms, pronunciation and grammar.",
    path: "/communication",
    cta: "Practise English",
  },
  resume: {
    icon: "📄",
    title: "Resume ATS Check",
    desc: "ATS score, missing keywords and stronger bullet points.",
    path: "/resume",
    cta: "Check my resume",
  },
};
const ORDER = {
  interview: ["interview", "resume", "comm", "ssb"],
  ssb: ["ssb", "comm", "interview", "resume"],
  english: ["comm", "interview", "ssb", "resume"],
  all: ["interview", "ssb", "comm", "resume"],
};

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sum, setSum] = useState(null);
  const [daily, setDaily] = useState(null);
  const [answer, setAnswer] = useState("");
  const [fb, setFb] = useState(null);
  const [reward, setReward] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const speech = useSpeech();

  const load = () => {
    api
      .get("/progress/summary")
      .then((r) => setSum(r.data))
      .catch(() => {});
    api
      .get("/progress/daily")
      .then((r) => setDaily(r.data))
      .catch(() => {});
  };
  useEffect(load, []);
  useEffect(() => {
    if (user && !user.preferences?.onboarded) setShowOnboarding(true);
  }, [user]);
  useEffect(() => {
    if (speech.listening) setAnswer(speech.text);
  }, [speech.text, speech.listening]);

  const submitDaily = async () => {
    setBusy(true);
    setErr("");
    try {
      const res = await api.post("/progress/daily/submit", { answer });
      setFb(res.data.feedback);
      setReward(res.data.gamification);
      load();
    } catch (e) {
      setErr(e.response?.data?.message || "Couldn't check your answer.");
    } finally {
      setBusy(false);
    }
  };

  const goal = user?.preferences?.goal || "all";
  const stats = user?.stats || {};
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const sessionsDone = sum?.todaySessions ?? 0,
    sessionsGoal = sum?.dailyGoal ?? 1;

  let nudge = "Pick any practice below to start your streak.";
  if (sum) {
    if (sum.streak.current > 0 && !sum.streak.doneToday)
      nudge = `Your ${sum.streak.current}-day streak ends tonight. One quick session keeps it alive.`;
    else if (sum.weakest)
      nudge = `Your weakest interview skill lately is ${sum.weakest}. Practise it next.`;
    else if (sum.streak.doneToday) nudge = "Streak safe for today. Nice work!";
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      {showOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}
      <div className="container home-container">
        <div className="home-header">
          <div>
            <h1 className="display-heading">
              {greeting}, {user?.fullName?.split(" ")[0]} 👋
            </h1>
            <p className="body-text mt-8">{nudge}</p>
          </div>
          {sum && (
            <div className="home-chips">
              <span className="home-chip" title="Practice streak">
                🔥 {sum.streak.current}
              </span>
              <span className="home-chip" title="Level">
                Lv {sum.level}
              </span>
              <span className="home-chip" title="XP">
                {sum.xp} XP
              </span>
            </div>
          )}
        </div>

        <div className="home-stats">
          {[
            {
              label: content.stats.interviews,
              value: stats.totalInterviews ?? 0,
            },
            { label: content.stats.ppdt, value: stats.totalPPDTSessions ?? 0 },
            {
              label: content.stats.avgScore,
              value: stats.averageInterviewScore
                ? `${stats.averageInterviewScore}/10`
                : "—",
            },
            {
              label: "Today's goal",
              value: `${Math.min(sessionsDone, sessionsGoal)}/${sessionsGoal}`,
            },
          ].map((st) => (
            <div key={st.label} className="stat-card card">
              <span className="stat-value">{st.value}</span>
              <span className="stat-label">{st.label}</span>
            </div>
          ))}
        </div>

        {daily && (
          <div className="card daily-card">
            <div className="ft-between ft-wrap">
              <h2 className="section-heading">Daily challenge</h2>
              <span
                className={`ft-pill ${daily.completed || fb ? "good" : ""}`}
              >
                {daily.completed || fb ? "Done today ✓" : "+25 XP"}
              </span>
            </div>
            <p className="daily-q">{daily.question}</p>
            {fb ? (
              <div>
                <RewardBanner gamification={reward} />
                <div className="ft-pill-row">
                  <span
                    className={`ft-pill ${fb.score >= 7 ? "good" : fb.score >= 5 ? "warn" : "bad"}`}
                  >
                    {fb.score}/10
                  </span>
                </div>
                <p className="body-text mt-8">
                  <strong>Good:</strong> {fb.good}
                </p>
                <p className="body-text">
                  <strong>Improve:</strong> {fb.improve}
                </p>
                {fb.betterAnswer && (
                  <p className="ft-note mt-8">
                    <strong>Model answer:</strong> {fb.betterAnswer}
                  </p>
                )}
              </div>
            ) : daily.completed ? (
              <p className="body-text">
                You've completed today's challenge. A new question arrives
                tomorrow.
              </p>
            ) : (
              <>
                <BrowserSupportBanner message="Voice answers work in Chrome/Edge. You can type here instead." />
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Answer in 3-5 sentences (type or speak)…"
                  aria-label="Your answer"
                />
                {err && <div className="alert alert-error mt-12">{err}</div>}
                <div className="ft-row mt-12">
                  {speech.supported && (
                    <button
                      className={`btn ${speech.listening ? "btn-danger" : "btn-secondary"}`}
                      onClick={speech.listening ? speech.stop : speech.start}
                    >
                      {speech.listening ? "Stop" : "🎙️ Speak"}
                    </button>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={submitDaily}
                    disabled={busy || answer.trim().split(/\s+/).length < 8}
                  >
                    {busy ? <span className="spinner" /> : "Get feedback"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <div className="home-tiles">
          {ORDER[goal].map((k, idx) => {
            const t = TILES[k];
            return (
              <div key={k} className="module-tile card">
                <div className="tile-header">
                  <div
                    className={`tile-icon ${idx === 0 ? "tile-icon-primary" : "tile-icon-secondary"}`}
                  >
                    {t.icon}
                  </div>
                  {idx === 0 && (
                    <span className="badge badge-live">Recommended</span>
                  )}
                </div>
                <h3 className="tile-title">{t.title}</h3>
                <p className="tile-desc">{t.desc}</p>
                <button
                  className={`btn ${idx === 0 ? "btn-primary" : "btn-secondary"} mt-20`}
                  onClick={() => navigate(t.path)}
                >
                  {t.cta}
                </button>
              </div>
            );
          })}
        </div>

        <div className="home-quick mt-24">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate("/progress")}
          >
            Progress & badges →
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate("/interview/history")}
          >
            Past interviews →
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate("/ssb/olq")}
          >
            OLQ report →
          </button>
        </div>
      </div>
    </div>
  );
}
