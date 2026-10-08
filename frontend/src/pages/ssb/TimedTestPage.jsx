import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import api from "../../utils/api.js";
import { TEST_META } from "./ssbMeta.js";

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function TimedTestPage() {
  const { type } = useParams();
  const meta = TEST_META[type];
  const navigate = useNavigate();

  const [phase, setPhase] = useState("intro");
  const [count, setCount] = useState(meta?.options?.[1] || 0);
  const [items, setItems] = useState([]);
  const [secondsPerItem, setSecondsPerItem] = useState(0);
  const [i, setI] = useState(0);
  const [stage, setStage] = useState("write");
  const [left, setLeft] = useState(0);
  const [total, setTotal] = useState(1);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const answersRef = useRef([]);
  const textRef = useRef("");
  const itemStart = useRef(0);
  const runStart = useRef(0);
  const advanceRef = useRef(() => {});
  const inputRef = useRef(null);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    setPhase("intro");
    setItems([]);
    setI(0);
    setText("");
    setError("");
    answersRef.current = [];
    setCount(TEST_META[type]?.options?.[1] || 0);
  }, [type]);

  const durationFor = (item, st) =>
    type === "tat"
      ? st === "view"
        ? item.viewSeconds
        : item.writeSeconds
      : secondsPerItem;

  useEffect(() => {
    if (phase !== "run") return;
    const item = items[i];
    if (!item) return;
    const dur = durationFor(item, stage);
    const end = Date.now() + dur * 1000;
    setLeft(dur);
    setTotal(dur);
    itemStart.current = Date.now();
    const t = setInterval(() => {
      const l = Math.ceil((end - Date.now()) / 1000);
      if (l <= 0) {
        clearInterval(t);
        setLeft(0);
        advanceRef.current();
      } else setLeft(l);
    }, 250);
    return () => clearInterval(t);
  }, [phase, i, stage, items]);

  useEffect(() => {
    if (phase === "run" && stage === "write") inputRef.current?.focus();
  }, [phase, i, stage]);

  const start = async () => {
    setPhase("loading");
    setError("");
    try {
      const res = await api.post(`/practice/${type}/start`, { count });
      const its = res.data.items;
      if (!its?.length) throw new Error("empty");
      its.forEach((it) => {
        if (it.imageUrl) {
          const im = new Image();
          im.src = it.imageUrl;
        }
      });
      setItems(its);
      setSecondsPerItem(res.data.secondsPerItem || 0);
      answersRef.current = [];
      setI(0);
      setText("");
      textRef.current = "";
      setStage(type === "tat" && its[0].imageUrl ? "view" : "write");
      runStart.current = Date.now();
      setPhase("run");
    } catch {
      setError("Couldn't load the test. Check your connection and try again.");
      setPhase("intro");
    }
  };

  const submit = async () => {
    setPhase("submitting");
    setError("");
    try {
      const res = await api.post(`/practice/${type}/submit`, {
        answers: answersRef.current,
        durationSeconds: Math.round((Date.now() - runStart.current) / 1000),
      });
      const plan = JSON.parse(sessionStorage.getItem("iq_ssb_plan") || "[]");
      const scores = JSON.parse(
        sessionStorage.getItem("iq_ssb_scores") || "{}",
      );
      scores[type] = res.data.record.overallScore;
      sessionStorage.setItem("iq_ssb_scores", JSON.stringify(scores));
      navigate("/ssb/result", {
        state: {
          record: res.data.record,
          gamification: res.data.gamification,
          plan,
          scores,
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Submission failed. Your answers are kept: try again.",
      );
      setPhase("retry");
    }
  };

  const pushCurrent = () => {
    const item = items[i];
    answersRef.current.push({
      id: item.id,
      text: textRef.current.trim(),
      secondsTaken: Math.round((Date.now() - itemStart.current) / 1000),
    });
    textRef.current = "";
    setText("");
  };

  const advance = (finishEarly = false) => {
    const item = items[i];
    if (!item) return;
    if (type === "tat" && stage === "view" && item.imageUrl && !finishEarly) {
      setStage("write");
      return;
    }
    pushCurrent();
    if (finishEarly || i + 1 >= items.length) {
      submit();
      return;
    }
    setI(i + 1);
    setStage(type === "tat" && items[i + 1].imageUrl ? "view" : "write");
  };
  advanceRef.current = () => advance(false);

  if (!meta) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="ft-page">
          <p>Unknown test.</p>
          <button
            className="btn btn-primary mt-16"
            onClick={() => navigate("/ssb")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (phase === "intro" || phase === "loading") {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="ft-page ft-narrow">
          <button className="ft-back" onClick={() => navigate("/ssb")}>
            ← PPDT
          </button>
          <h1 className="display-heading">{meta.title}</h1>
          <p className="body-text mt-8">{meta.short}</p>
          <div className="ft-panel mt-24">
            <h2 className="section-heading mb-8">How it works</h2>
            <ul className="ft-list">
              {meta.how.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          {meta.options && (
            <div className="ft-panel mt-16">
              <label className="form-label" htmlFor="count">
                Number of {meta.optionLabel}
              </label>
              <div className="ft-row mt-8" role="group" id="count">
                {meta.options.map((o) => (
                  <button
                    key={o}
                    className={`ft-chip ${count === o ? "active" : ""}`}
                    onClick={() => setCount(o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
              {type === "tat" && (
                <p className="form-hint mt-8">
                  Plus one blank slide at the end.
                </p>
              )}
            </div>
          )}
          {error && <div className="alert alert-error mt-16">{error}</div>}
          <button
            className="btn btn-primary btn-lg mt-24"
            onClick={start}
            disabled={phase === "loading"}
          >
            {phase === "loading" ? <span className="spinner" /> : "Start test"}
          </button>
        </div>
      </div>
    );
  }

  if (phase === "submitting" || phase === "retry") {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div
          className="ft-page ft-narrow text-center"
          style={{ paddingTop: 80 }}
        >
          {phase === "submitting" ? (
            <>
              <div className="spinner" style={{ margin: "0 auto 16px" }} />
              <p className="body-text">
                Evaluating your responses… this can take up to 30 seconds.
              </p>
            </>
          ) : (
            <>
              {error && <div className="alert alert-error">{error}</div>}
              <button className="btn btn-primary mt-16" onClick={submit}>
                Try submitting again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const item = items[i];
  const showImage = type === "tat" && item.imageUrl && stage === "view";
  const writing = stage === "write";
  const pct = total ? Math.max(0, Math.min(100, (left / total) * 100)) : 0;
  const urgent = left <= 5 && writing;

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="ft-page ft-narrow">
        <div className="ft-between mb-8">
          <span className="ft-muted">
            {meta.title.split(" — ")[0]} · {i + 1} / {items.length}
          </span>
          <span
            className={`ft-timer ${urgent ? "urgent" : ""}`}
            aria-live="off"
          >
            {fmt(left)}
          </span>
        </div>
        <div className="ft-timerbar" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>

        <div className="ft-runner">
          {showImage && (
            <>
              <p className="ft-muted mb-8">
                Observe carefully — the picture will disappear.
              </p>
              <img
                src={item.imageUrl}
                alt="Hazy scene to observe"
                className="ft-image"
              />
              <button
                className="btn btn-ghost mt-16"
                onClick={() => advance(false)}
              >
                I'm ready, start writing
              </button>
            </>
          )}

          {type === "tat" && writing && (
            <p className="ft-muted mb-8">
              {item.imageUrl
                ? "Write your story about the picture."
                : "Blank slide: write about any situation of your choice."}
            </p>
          )}
          {type === "wat" && writing && (
            <div className="ft-prompt ft-prompt-word">{item.word}</div>
          )}
          {type === "srt" && writing && (
            <div className="ft-prompt">{item.situation}</div>
          )}
          {type === "sdt" && writing && (
            <div className="ft-prompt">{item.prompt}</div>
          )}

          {writing &&
            (meta.input === "line" ? (
              <input
                ref={inputRef}
                className="form-input ft-line-input"
                value={text}
                maxLength={200}
                placeholder={meta.placeholder}
                autoComplete="off"
                spellCheck="true"
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    advance(false);
                  }
                }}
                aria-label="Your sentence"
              />
            ) : (
              <textarea
                ref={inputRef}
                className="form-textarea ft-area"
                value={text}
                maxLength={2500}
                placeholder={meta.placeholder}
                spellCheck="true"
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey))
                    advance(false);
                }}
                aria-label="Your answer"
              />
            ))}

          {writing && (
            <div className="ft-between mt-16">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => advance(true)}
              >
                Finish early
              </button>
              <div className="ft-row">
                {meta.input === "area" && (
                  <span className="form-hint">
                    {text.trim() ? text.trim().split(/\s+/).length : 0} words
                  </span>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => advance(false)}
                >
                  {i + 1 >= items.length ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
