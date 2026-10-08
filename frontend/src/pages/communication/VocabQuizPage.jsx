import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import RewardBanner from "../../components/common/RewardBanner.jsx";
import vocabBank from "../../content/vocabBank.json";
import vocabWords from "../../content/vocabWords.json";
import api from "../../utils/api.js";
import { review, orderByDue } from "../../utils/srs.js";

const POOL = [...vocabWords, ...vocabBank].filter((w) => w.meaning);
const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);

function buildQuestions() {
  const picks = orderByDue(POOL).slice(0, 10);
  return picks.map((w, i) => {
    const blank =
      i % 2 === 1 && w.example && new RegExp(w.word, "i").test(w.example);
    const wrong = shuffle(
      POOL.filter(
        (x) => x.id !== w.id && (!w.level || x.level === w.level || !x.level),
      ),
    ).slice(0, 3);
    return {
      id: w.id,
      prompt: blank
        ? w.example.replace(new RegExp(w.word, "i"), "_____")
        : w.meaning,
      kind: blank ? "Fill in the blank" : "Which word means…",
      answer: w.word,
      options: shuffle([w, ...wrong]).map((x) => x.word),
      explain: `${w.word}: ${w.meaning}`,
    };
  });
}

export default function VocabQuizPage() {
  const navigate = useNavigate();
  const [qs, setQs] = useState(() => buildQuestions());
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [reward, setReward] = useState(null);
  const q = qs[i];
  const wrongOnes = useMemo(() => [], []);

  const choose = (opt) => {
    if (picked) return;
    setPicked(opt);
    const ok = opt === q.answer;
    review(q.id, ok);
    if (ok) setCorrect((c) => c + 1);
    else wrongOnes.push(q);
  };

  const next = async () => {
    if (i + 1 >= qs.length) {
      setDone(true);
      try {
        const res = await api.post("/communication/complete", {
          type: "quiz",
          correct,
          total: qs.length,
          words: qs.length,
        });
        setReward(res.data.gamification);
      } catch {}
      return;
    }
    setI(i + 1);
    setPicked(null);
  };

  const restart = () => {
    setQs(buildQuestions());
    setI(0);
    setPicked(null);
    setCorrect(0);
    setDone(false);
    setReward(null);
    wrongOnes.length = 0;
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="ft-page ft-narrow">
        <button className="ft-back" onClick={() => navigate("/communication")}>
          ← Communication
        </button>
        <h1 className="display-heading">Vocabulary quiz</h1>

        {done ? (
          <div className="ft-panel mt-24 text-center">
            <RewardBanner gamification={reward} />
            <div className="ft-score-num">
              {correct}
              <small>/{qs.length}</small>
            </div>
            <p className="body-text mb-16">
              {correct >= 8
                ? "Excellent! Your vocabulary is strong."
                : correct >= 5
                  ? "Good effort. The words you missed will come back soon."
                  : "Keep going. Review the words, then try again."}
            </p>
            {wrongOnes.length > 0 && (
              <div className="ft-stack" style={{ textAlign: "left" }}>
                <h2 className="section-heading">Review these</h2>
                {wrongOnes.map((w) => (
                  <div key={w.id} className="ft-item-body">
                    {w.explain}
                  </div>
                ))}
              </div>
            )}
            <div className="ft-row mt-24" style={{ justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={restart}>
                New quiz
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
            <div className="ft-between mb-8">
              <span className="ft-muted">
                {q.kind} · {i + 1} / {qs.length}
              </span>
              <span className="ft-muted">{correct} correct</span>
            </div>
            <div className="ft-prompt">{q.prompt}</div>
            <div className="ft-stack mt-16">
              {q.options.map((o) => {
                const state = !picked
                  ? ""
                  : o === q.answer
                    ? "right"
                    : o === picked
                      ? "wrong"
                      : "";
                return (
                  <button
                    key={o}
                    className={`ft-option ${state}`}
                    onClick={() => choose(o)}
                    disabled={!!picked}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {picked && (
              <div className="mt-16">
                <p className={`ft-note ${picked === q.answer ? "ok" : ""}`}>
                  {picked === q.answer ? "Correct! " : "Not quite. "}
                  {q.explain}
                </p>
                <button className="btn btn-primary mt-12" onClick={next}>
                  {i + 1 >= qs.length ? "See result" : "Next"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
