import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import RewardBanner from "../../components/common/RewardBanner.jsx";
import vocabBank from "../../content/vocabBank.json";
import vocabWords from "../../content/vocabWords.json";
import api from "../../utils/api.js";
import { review, orderByDue } from "../../utils/srs.js";
import { speak } from "../../utils/speak.js";

const POOL = [...vocabWords, ...vocabBank].filter((w) => w.meaning);
const SET = 5;

export default function SentencePracticePage() {
  const navigate = useNavigate();
  const [words, setWords] = useState(() => orderByDue(POOL).slice(0, SET));
  const [i, setI] = useState(0);
  const [sentence, setSentence] = useState("");
  const [fb, setFb] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [scores, setScores] = useState([]);
  const [done, setDone] = useState(false);
  const [reward, setReward] = useState(null);
  const w = words[i];

  const check = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await api.post("/communication/sentence-check", {
        word: w.word,
        meaning: w.meaning,
        sentence,
      });
      setFb(res.data);
      review(w.id, res.data.score >= 7);
    } catch (e) {
      setError(e.response?.data?.message || "Couldn't check right now.");
    } finally {
      setBusy(false);
    }
  };

  const next = async () => {
    const s = [...scores, fb?.score ?? 0];
    setScores(s);
    if (i + 1 >= words.length) {
      setDone(true);
      try {
        const res = await api.post("/communication/complete", {
          type: "sentence",
          correct: s.filter((x) => x >= 7).length,
          total: s.length,
          words: s.length,
        });
        setReward(res.data.gamification);
      } catch {}
      return;
    }
    setI(i + 1);
    setSentence("");
    setFb(null);
  };

  const restart = () => {
    setWords(orderByDue(POOL).slice(0, SET));
    setI(0);
    setSentence("");
    setFb(null);
    setScores([]);
    setDone(false);
    setReward(null);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="ft-page ft-narrow">
        <button className="ft-back" onClick={() => navigate("/communication")}>
          ← Communication
        </button>
        <h1 className="display-heading">Use it in a sentence</h1>
        <p className="body-text mt-8">
          Writing your own sentence is the fastest way to make a word yours.
        </p>

        {done ? (
          <div className="ft-panel mt-24 text-center">
            <RewardBanner gamification={reward} />
            <div className="ft-score-num">
              {Math.round(
                (scores.reduce((a, b) => a + b, 0) / scores.length) * 10,
              ) / 10}
              <small>/10</small>
            </div>
            <p className="body-text">
              Average across {scores.length} sentences.
            </p>
            <div className="ft-row mt-24" style={{ justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={restart}>
                5 new words
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => navigate("/communication")}
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <div className="ft-runner mt-24">
            <span className="ft-muted">
              Word {i + 1} / {words.length}
            </span>
            <div className="ft-prompt ft-prompt-word">{w.word}</div>
            <p className="body-text text-center">
              {w.meaning}{" "}
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => speak(w.word)}
              >
                🔊
              </button>
            </p>
            <textarea
              className="form-textarea mt-16"
              rows={3}
              value={sentence}
              disabled={!!fb}
              maxLength={300}
              placeholder={`Write a sentence using “${w.word}”…`}
              aria-label="Your sentence"
              onChange={(e) => setSentence(e.target.value)}
            />
            {error && <div className="alert alert-error mt-12">{error}</div>}
            {!fb ? (
              <button
                className="btn btn-primary mt-12"
                onClick={check}
                disabled={busy || sentence.trim().split(/\s+/).length < 3}
              >
                {busy ? <span className="spinner" /> : "Check my sentence"}
              </button>
            ) : (
              <div className="mt-16">
                <div className="ft-between">
                  <span
                    className={`ft-pill ${fb.score >= 7 ? "good" : fb.score >= 5 ? "warn" : "bad"}`}
                  >
                    {fb.score}/10
                  </span>
                </div>
                <p className="body-text mt-8">{fb.feedback}</p>
                {fb.improved && (
                  <p className="ft-note mt-8">
                    <strong>Polished:</strong> {fb.improved}
                  </p>
                )}
                <button className="btn btn-primary mt-12" onClick={next}>
                  {i + 1 >= words.length ? "Finish" : "Next word"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
