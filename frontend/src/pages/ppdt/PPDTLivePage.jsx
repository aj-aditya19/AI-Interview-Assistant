import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api.js";
import content from "../../content/ppdt.json";
import "./PPDTLivePage.css";

const PHASE = { VIEWING: "viewing", RESPONDING: "responding", DONE: "done" };

export default function PPDTLivePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (!state?.sessionId) navigate("/ppdt/setup", { replace: true });
  }, []);

  const {
    sessionId,
    imageUrl,
    viewDurationSeconds = 30,
    responseDurationSeconds = 180,
  } = state || {};

  const [phase, setPhase] = useState(PHASE.VIEWING);
  const [timeLeft, setTimeLeft] = useState(viewDurationSeconds);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [elapsedResponse, setElapsedResponse] = useState(0);

  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase !== PHASE.VIEWING) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPhase(PHASE.RESPONDING);
          setTimeLeft(responseDurationSeconds);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase !== PHASE.RESPONDING) return;
    timerRef.current = setInterval(() => {
      setElapsedResponse((s) => s + 1);
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          stopListening();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase === PHASE.RESPONDING) {
      startListening();
    }
  }, [phase]);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError(content.live.listeningLabel + " not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    finalTranscriptRef.current = "";

    recognition.onresult = (e) => {
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const piece = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalTranscriptRef.current += piece + " ";
        } else {
          interimText += piece;
        }
      }
      setTranscript((finalTranscriptRef.current + " " + interimText).trim());
    };

    recognition.onerror = () => {};
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const handleSubmit = async () => {
    stopListening();
    clearInterval(timerRef.current);
    if (!transcript.trim()) {
      setError("Please describe what you saw before submitting.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/ppdt/session/submit", {
        sessionId,
        userAnswer: transcript.trim(),
        durationSeconds: elapsedResponse,
      });
      navigate("/ppdt/result", { state: { record: res.data.record } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit response");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timerUrgent = timeLeft <= 30 && phase === PHASE.RESPONDING;

  if (!state?.sessionId) return null;

  return (
    <div className="ppdt-live-page">
      {/* Top bar */}
      <div className="ppdt-topbar">
        <div className="flex items-center gap-12">
          <div className="live-logo">IQ</div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            PPDT Practice
          </span>
        </div>
        <div className={`ppdt-timer ${timerUrgent ? "urgent" : ""}`}>
          <span className="timer-label">
            {phase === PHASE.VIEWING ? "Observe" : "Time left"}
          </span>
          <span className="timer-value">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="ppdt-main container">
        {/* Phase heading */}
        <div className="ppdt-phase-header">
          {phase === PHASE.VIEWING ? (
            <>
              <h2 className="section-heading">{content.live.viewingHeading}</h2>
              <p className="body-text">{content.live.viewingSubtext}</p>
            </>
          ) : (
            <>
              <h2 className="section-heading">{content.live.hiddenHeading}</h2>
              <p className="body-text">{content.live.hiddenSubtext}</p>
            </>
          )}
        </div>

        <div className="ppdt-content">
          {/* Image area */}
          <div className="ppdt-image-wrap card">
            {phase === PHASE.VIEWING ? (
              <img src={imageUrl} alt="PPDT image" className="ppdt-image" />
            ) : (
              <div className="ppdt-image-hidden">
                <span>🖼️</span>
                <p>Image hidden — narrate your story from memory</p>
              </div>
            )}
          </div>

          {/* Response area */}
          {phase === PHASE.RESPONDING && (
            <div className="ppdt-response-wrap card">
              <div className="ppdt-response-header">
                <span className="ppdt-response-label">
                  {content.live.responseLabel}
                </span>
                {listening && (
                  <div className="flex items-center gap-8">
                    <span className="pulse-dot" />
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--color-error)",
                      }}
                    >
                      {content.live.listeningLabel}
                    </span>
                  </div>
                )}
              </div>

              <div className="ppdt-transcript">
                {transcript || (
                  <span className="ppdt-transcript-placeholder">
                    Start speaking — your words will appear here...
                  </span>
                )}
              </div>

              {error && <div className="alert alert-error mt-12">{error}</div>}

              <div className="ppdt-controls mt-16">
                {listening ? (
                  <button className="btn btn-ghost" onClick={stopListening}>
                    Pause
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={startListening}
                    disabled={loading}
                  >
                    Resume
                  </button>
                )}
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleSubmit}
                  disabled={loading || !transcript.trim()}
                >
                  {loading ? (
                    <span
                      className="spinner"
                      style={{ borderTopColor: "#fff" }}
                    />
                  ) : (
                    content.live.submitButton
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
