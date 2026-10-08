import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import BrowserSupportBanner from "../../components/common/BrowserSupportBanner.jsx";
import RewardBanner from "../../components/common/RewardBanner.jsx";
import useSpeech from "../../hooks/useSpeech.js";
import { speak } from "../../utils/speak.js";
import { review, orderByDue } from "../../utils/srs.js";
import api from "../../utils/api.js";
import content from "../../content/communication.json";
import vocabWords from "../../content/vocabWords.json";
import vocabBank from "../../content/vocabBank.json";
import hardWords from "../../content/hardWords.json";
import tongueTwisters from "../../content/tongueTwisters.json";
import tensesVerbs from "../../content/tensesVerbs.json";
import tensesExtra from "../../content/tensesExtra.json";
import idioms from "../../content/idioms.json";
import "./CommunicationPracticePage.css";

const DATA_BY_TYPE = {
  vocab: [...vocabWords, ...vocabBank],
  hardWords,
  tongueTwisters,
  tenses: [...tensesVerbs, ...tensesExtra],
  idioms,
};
const SRS_TYPES = ["vocab", "hardWords", "idioms"];
const SESSION_SIZE = 15;
const LEVELS = ["All", "Basic", "Intermediate", "Advanced"];

const clean = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z\s']/g, "")
    .split(/\s+/)
    .filter(Boolean);

function compare(target, spoken) {
  const t = clean(target);
  const said = new Set(clean(spoken));
  const marks = t.map((w) => ({ w, ok: said.has(w) }));
  const score = t.length
    ? Math.round((marks.filter((m) => m.ok).length / t.length) * 100)
    : 0;
  return { marks, score };
}

export default function CommunicationPracticePage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { practice } = content;
  const meta = practice.typeMeta[type];
  const all = DATA_BY_TYPE[type] || [];

  const [level, setLevel] = useState("All");
  const [round, setRound] = useState(0);
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState([]);
  const [reward, setReward] = useState(null);
  const speech = useSpeech({ lang: "en-IN" });

  const items = useMemo(() => {
    const pool =
      type === "vocab" && level !== "All"
        ? all.filter((w) => w.level === level)
        : all;
    const ordered = SRS_TYPES.includes(type) ? orderByDue(pool) : pool;
    return ordered.slice(0, SESSION_SIZE);
  }, [type, level, round]);

  const current = items[index];
  const target = current?.word || current?.text || "";

  useEffect(() => {
    speech.reset();
    setChecked(false);
  }, [index, round]);
  useEffect(() => {
    if (!speech.listening && speech.text) setChecked(true);
  }, [speech.listening, speech.text]);
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const { marks, score } =
    checked && speech.text
      ? compare(target, speech.text)
      : { marks: [], score: null };
  const message =
    score === null
      ? ""
      : score >= 70
        ? practice.matchGood
        : score >= 40
          ? practice.matchOkay
          : practice.matchLow;
  const showDetails = checked || !speech.supported;

  const finish = async (finalResults) => {
    setFinished(true);
    const correct = finalResults.filter(Boolean).length;
    try {
      const res = await api.post("/communication/complete", {
        type,
        correct,
        total: finalResults.length,
        words: finalResults.length,
      });
      setReward(res.data.gamification);
    } catch {}
  };

  const next = (remembered) => {
    if (SRS_TYPES.includes(type) && remembered !== undefined)
      review(current.id, remembered);
    const verdict = remembered !== undefined ? remembered : (score ?? 0) >= 70;
    const updated = [...results, verdict];
    setResults(updated);
    if (index + 1 >= items.length) return finish(updated);
    setIndex(index + 1);
  };

  const again = () => {
    setResults([]);
    setIndex(0);
    setFinished(false);
    setReward(null);
    setRound((r) => r + 1);
  };

  if (!meta || all.length === 0) {
    return (
      <div className="comm-practice-page">
        <Navbar />
        <div className="container comm-practice-main">
          <p>Invalid practice type.</p>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/communication")}
          >
            {practice.backButton}
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const correct = results.filter(Boolean).length;
    return (
      <div className="comm-practice-page">
        <Navbar />
        <div className="container comm-practice-main comm-practice-complete">
          <RewardBanner gamification={reward} />
          <h2>{practice.completeHeading}</h2>
          <p>
            {correct} of {results.length}{" "}
            {SRS_TYPES.includes(type)
              ? "marked as remembered"
              : "pronounced well"}
            .
          </p>
          <div className="comm-practice-complete-actions">
            <button className="btn btn-primary" onClick={again}>
              Practise {SESSION_SIZE} more
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/communication")}
            >
              {practice.backButton}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="comm-practice-page">
      <Navbar />
      <div className="container comm-practice-main">
        <button
          className="comm-practice-back"
          onClick={() => navigate("/communication")}
        >
          ← {practice.backButton}
        </button>
        <h2 className="comm-practice-title">{meta.title}</h2>
        <p className="comm-practice-instruction">{meta.instruction}</p>

        {type === "vocab" && (
          <div className="ft-row mb-16" role="group" aria-label="Level">
            {LEVELS.map((l) => (
              <button
                key={l}
                className={`ft-chip ${level === l ? "active" : ""}`}
                onClick={() => {
                  setLevel(l);
                  setIndex(0);
                  setResults([]);
                }}
              >
                {l}
              </button>
            ))}
          </div>
        )}

        {!current ? (
          <p className="body-text">No items at this level yet.</p>
        ) : (
          <>
            <div className="comm-practice-progress">
              {practice.progressLabel} {index + 1} / {items.length}
            </div>

            <div className="comm-practice-card">
              <p className="comm-practice-target">{target}</p>
              {current.hint && (
                <p className="comm-practice-hint">/ {current.hint} /</p>
              )}
              {current.tense && (
                <p className="comm-practice-tense">({current.tense})</p>
              )}
              {current.level && (
                <span className="ft-pill">{current.level}</span>
              )}
              <div className="mt-12">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => speak(target)}
                >
                  🔊 Hear it
                </button>
              </div>
            </div>

            <BrowserSupportBanner message="Voice practice needs Chrome or Edge. You can still learn the words and mark what you remember." />

            {speech.supported && (
              <div className="comm-practice-mic-area">
                <button
                  className={`comm-practice-mic-btn ${speech.listening ? "listening" : ""}`}
                  onClick={speech.listening ? speech.stop : speech.start}
                >
                  {speech.listening ? practice.micListening : practice.micStart}
                </button>
              </div>
            )}

            {speech.text && (
              <div className="comm-practice-transcript">
                <span className="comm-practice-transcript-label">
                  {practice.yourSpeechLabel}:
                </span>{" "}
                {speech.text}
              </div>
            )}

            {checked && speech.text && (
              <div className="comm-practice-feedback">
                <div className="ft-words" aria-label="Word by word result">
                  {marks.map((m, i) => (
                    <span
                      key={i}
                      className={m.ok ? "ft-word-ok" : "ft-word-bad"}
                    >
                      {m.w}
                    </span>
                  ))}
                </div>
                <span className="comm-practice-score">{score}%</span> {message}
              </div>
            )}

            {showDetails && (current.meaning || current.example) && (
              <div className="comm-practice-details">
                {current.meaning && (
                  <p>
                    <strong>{practice.meaningLabel}:</strong> {current.meaning}
                  </p>
                )}
                {current.example && (
                  <p>
                    <strong>{practice.exampleLabel}:</strong> {current.example}
                  </p>
                )}
                {current.synonyms?.length > 0 && (
                  <p>
                    <strong>Similar:</strong> {current.synonyms.join(", ")}
                  </p>
                )}
              </div>
            )}

            <div className="comm-practice-actions">
              {SRS_TYPES.includes(type) ? (
                <>
                  <button className="btn btn-ghost" onClick={() => next(false)}>
                    Need more practice
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => next(true)}
                  >
                    I know this ✓
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={() => next()}>
                  {index + 1 >= items.length
                    ? practice.finishButton
                    : practice.nextButton}
                </button>
              )}
            </div>
            {SRS_TYPES.includes(type) && (
              <p className="form-hint mt-12">
                Words you mark “need more practice” come back sooner.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
