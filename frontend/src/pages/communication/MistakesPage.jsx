import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import RewardBanner from "../../components/common/RewardBanner.jsx";
import mistakes from "../../content/commonMistakes.json";
import api from "../../utils/api.js";

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
function similarity(a, b) {
  const A = norm(a),
    B = norm(b);
  if (!A.length || !B.length) return 0;
  const setB = new Set(B);
  const common = A.filter((w) => setB.has(w)).length;
  return common / Math.max(A.length, B.length);
}
const pickSet = () =>
  [...mistakes].sort(() => Math.random() - 0.5).slice(0, 10);

export default function MistakesPage() {
  const navigate = useNavigate();
  const [set, setSet] = useState(pickSet);
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [reward, setReward] = useState(null);
  const m = set[i];

  const check = () => {
    const options = m.right.split(" / ");
    const best = Math.max(...options.map((o) => similarity(answer, o)));
    const wrongSim = similarity(answer, m.wrong);
    const ok = best >= 0.85 && wrongSim < 1;
    setResult(ok ? "right" : "close");
    if (ok) setCorrect((c) => c + 1);
  };

  const next = async () => {
    if (i + 1 >= set.length) {
      setDone(true);
      try {
        const res = await api.post("/communication/complete", {
          type: "mistakes",
          correct,
          total: set.length,
          words: 0,
        });
        setReward(res.data.gamification);
      } catch {}
      return;
    }
    setI(i + 1);
    setAnswer("");
    setResult(null);
  };
  const restart = () => {
    setSet(pickSet());
    setI(0);
    setAnswer("");
    setResult(null);
    setCorrect(0);
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
        <h1 className="display-heading">Fix the mistake</h1>
        <p className="body-text mt-8">
          Each sentence has a common error. Rewrite it correctly.
        </p>

        {done ? (
          <div className="ft-panel mt-24 text-center">
            <RewardBanner gamification={reward} />
            <div className="ft-score-num">
              {correct}
              <small>/{set.length}</small>
            </div>
            <div className="ft-row mt-24" style={{ justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={restart}>
                New set
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
              {i + 1} / {set.length}
            </span>
            <div className="ft-prompt ft-wrong">{m.wrong}</div>
            <input
              className="form-input mt-16"
              value={answer}
              disabled={!!result}
              placeholder="Type the corrected sentence…"
              aria-label="Corrected sentence"
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && answer.trim() && !result) check();
              }}
            />
            {!result ? (
              <div className="ft-row mt-12">
                <button
                  className="btn btn-primary"
                  onClick={check}
                  disabled={!answer.trim()}
                >
                  Check
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setResult("close")}
                >
                  Show answer
                </button>
              </div>
            ) : (
              <div className="mt-16">
                <p className={`ft-note ${result === "right" ? "ok" : ""}`}>
                  {result === "right" ? "Correct! " : "Compare with this: "}
                  <strong>{m.right}</strong>
                </p>
                <p className="body-text mt-8">{m.why}</p>
                <button className="btn btn-primary mt-12" onClick={next}>
                  {i + 1 >= set.length ? "Finish" : "Next"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
