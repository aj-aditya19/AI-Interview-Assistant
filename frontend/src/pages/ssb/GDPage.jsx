import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import BrowserSupportBanner from "../../components/common/BrowserSupportBanner.jsx";
import useSpeech from "../../hooks/useSpeech.js";
import api from "../../utils/api.js";

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function GDPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro");
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("");
  const [personas, setPersonas] = useState([]);
  const [history, setHistory] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const endRef = useRef(null);
  const speech = useSpeech({ lang: "en-IN" });

  useEffect(() => {
    api.get("/practice/config").catch(() => {});
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, busy]);
  useEffect(() => {
    if (phase !== "live") return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (speech.listening) setDraft(speech.text);
  }, [speech.text, speech.listening]);

  const begin = async (chosen) => {
    setBusy(true);
    setError("");
    try {
      const res = await api.post("/practice/gd/start", {
        topic: chosen || undefined,
      });
      setTopic(res.data.topic);
      setPersonas(res.data.personas);
      setTopics(res.data.topics || []);
      setHistory(res.data.opening || []);
      setElapsed(0);
      setPhase("live");
    } catch (e) {
      setError(e.response?.data?.message || "Couldn't start the discussion.");
    } finally {
      setBusy(false);
    }
  };

  const send = async () => {
    const msg = draft.trim();
    if (!msg || busy) return;
    speech.stop();
    const next = [...history, { speaker: "You", text: msg }];
    setHistory(next);
    setDraft("");
    speech.reset();
    setBusy(true);
    setError("");
    try {
      const res = await api.post("/practice/gd/turn", {
        topic,
        history: next,
        message: msg,
      });
      setHistory([...next, ...(res.data.messages || [])]);
    } catch (e) {
      setError(e.response?.data?.message || "The group went quiet. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const finish = async () => {
    speech.stop();
    setPhase("finishing");
    setError("");
    try {
      const res = await api.post("/practice/gd/finish", {
        topic,
        history,
        durationSeconds: elapsed,
      });
      navigate("/ssb/result", {
        state: { record: res.data.record, gamification: res.data.gamification },
      });
    } catch (e) {
      setError(e.response?.data?.message || "Couldn't evaluate. Try again.");
      setPhase("live");
    }
  };

  const mine = history.filter((m) => m.speaker === "You").length;

  if (phase === "intro") {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="ft-page ft-narrow">
          <button className="ft-back" onClick={() => navigate("/ssb")}>
            ← PPDT
          </button>
          <h1 className="display-heading">Group Discussion</h1>
          <p className="body-text mt-8">
            Three AI participants (Rahul, Priya, Amit) discuss a topic with you.
            Enter naturally, build on others' points, and try to steer the
            group.
          </p>
          <BrowserSupportBanner message="Voice input needs Chrome or Edge. You can type your points instead." />
          <div className="ft-panel mt-16">
            <h2 className="section-heading mb-8">Tips</h2>
            <ul className="ft-list">
              <li>
                Speak 4-6 times, not once at length and not only at the end.
              </li>
              <li>Refer to what others said ("Building on Priya's point…").</li>
              <li>
                Be firm but polite. Aim to summarise or suggest a way forward.
              </li>
            </ul>
          </div>
          {error && <div className="alert alert-error mt-16">{error}</div>}
          <div className="ft-row mt-24">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => begin()}
              disabled={busy}
            >
              {busy ? <span className="spinner" /> : "Random topic"}
            </button>
          </div>
          {topics.length > 0 && (
            <div className="ft-stack mt-16">
              {topics.map((t) => (
                <button key={t} className="ft-card" onClick={() => begin(t)}>
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="ft-page ft-narrow">
        <div className="ft-between ft-wrap">
          <div>
            <span className="ft-muted">Topic</span>
            <h1 className="section-heading">{topic}</h1>
          </div>
          <span className="ft-timer">{fmt(elapsed)}</span>
        </div>

        <div className="ft-chat mt-16" role="log" aria-live="polite">
          {history.map((m, i) => (
            <div
              key={i}
              className={`ft-msg ${m.speaker === "You" ? "me" : ""}`}
            >
              <span className="ft-msg-who">{m.speaker}</span>
              <p>{m.text}</p>
            </div>
          ))}
          {busy && (
            <div className="ft-msg typing">
              <span className="ft-msg-who">Group</span>
              <p>…</p>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {error && <div className="alert alert-error mt-12">{error}</div>}
        <BrowserSupportBanner message="Voice input needs Chrome or Edge. Type your points instead." />

        <textarea
          className="form-textarea mt-12"
          rows={3}
          value={draft}
          placeholder="Make your point…"
          aria-label="Your contribution"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          disabled={phase === "finishing"}
        />
        <div className="ft-between mt-12 ft-wrap">
          <div className="ft-row">
            {speech.supported && (
              <button
                className={`btn ${speech.listening ? "btn-danger" : "btn-secondary"}`}
                onClick={speech.listening ? speech.stop : speech.start}
              >
                {speech.listening ? "Stop mic" : "🎙️ Speak"}
              </button>
            )}
            <button
              className="btn btn-primary"
              onClick={send}
              disabled={!draft.trim() || busy}
            >
              Send
            </button>
          </div>
          <div className="ft-row">
            <span className="form-hint">You spoke {mine}×</span>
            <button
              className="btn btn-ghost"
              onClick={finish}
              disabled={mine < 2 || phase === "finishing"}
            >
              {phase === "finishing" ? (
                <span className="spinner" />
              ) : (
                "Finish & get feedback"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
