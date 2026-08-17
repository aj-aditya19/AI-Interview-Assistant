import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import api from "../../utils/api.js";
import content from "../../content/ppdt.json";
import "./PPDTSetupPage.css";

export default function PPDTSetupPage() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("Beginner");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    api
      .get("/ppdt/images")
      .then((res) => setImages(res.data))
      .catch(() => {})
      .finally(() => setFetchLoading(false));
  }, []);

  const handleStart = async () => {
    const filtered = images.filter((img) => img.difficulty === difficulty);
    if (filtered.length === 0) return;

    const image = filtered[Math.floor(Math.random() * filtered.length)];
    setLoading(true);
    try {
      const res = await api.post("/ppdt/session/start", {
        imageId: image.id,
        difficulty,
      });
      navigate("/ppdt/live", {
        state: {
          sessionId: res.data.sessionId,
          imageUrl: res.data.imageUrl,
          viewDurationSeconds: res.data.viewDurationSeconds,
          responseDurationSeconds: res.data.responseDurationSeconds,
          difficulty: res.data.difficulty,
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container ppdt-setup-container">
        <div className="ppdt-setup-layout">
          <div className="ppdt-setup-main">
            <h1 className="display-heading">{content.setup.heading}</h1>
            <p className="body-text mt-8 mb-32">{content.setup.subheading}</p>

            <div className="card">
              <h2 className="section-heading mb-20">
                {content.setup.difficultyLabel}
              </h2>
              <div className="ppdt-difficulty-list">
                {content.difficultyOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`ppdt-diff-option ${difficulty === opt.value ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={opt.value}
                      checked={difficulty === opt.value}
                      onChange={() => setDifficulty(opt.value)}
                    />
                    <div>
                      <div className="ppdt-diff-label">{opt.label}</div>
                      <div className="ppdt-diff-hint">{opt.hint}</div>
                    </div>
                  </label>
                ))}
              </div>

              <button
                className="btn btn-primary btn-lg mt-24"
                onClick={handleStart}
                disabled={loading || fetchLoading}
              >
                {loading ? (
                  <span
                    className="spinner"
                    style={{ borderTopColor: "#fff" }}
                  />
                ) : (
                  content.setup.startButton
                )}
              </button>
            </div>
          </div>

          <div className="ppdt-how-card card">
            <h3 className="section-heading mb-16">
              {content.setup.howItWorks.title}
            </h3>
            <ol className="ppdt-steps">
              {content.setup.howItWorks.steps.map((step, i) => (
                <li key={i}>
                  <div className="ppdt-step-num">{i + 1}</div>
                  <p>{step}</p>
                </li>
              ))}
            </ol>

            <div className="ppdt-tip mt-24">
              <strong>Tip:</strong> Observe every person, their expression, and
              the setting. Your story should have a clear beginning, middle, and
              conclusion.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
