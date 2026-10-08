import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api.js";
import content from "../../content/interviewLive.json";
import "./InterviewLivePage.css";
import interviewerImage from "./interviewer.jpg";
import BrowserSupportBanner from "../../components/common/BrowserSupportBanner.jsx";
import { analyzeTranscript } from "../../utils/speechMetrics.js";

export default function InterviewLivePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const savedSession = JSON.parse(
    sessionStorage.getItem("interviewSession") || "null",
  );

  const interviewState = state || savedSession;

  useEffect(() => {
    if (!interviewState?.sessionId) {
      navigate("/interview/setup", { replace: true });
    }
  }, [navigate, interviewState?.sessionId]);

  const {
    sessionId,
    firstQuestion,
    currentRound: initialRound,
    currentRoundIndex: initialRoundIndex,
    rounds = [],
  } = interviewState || {};

  const [currentQuestion, setCurrentQuestion] = useState(firstQuestion || "");
  const [currentRound, setCurrentRound] = useState(initialRound || "hr");
  const [currentRoundIndex, setCurrentRoundIndex] = useState(
    initialRoundIndex || 0,
  );
  const [status, setStatus] = useState("waitingForAnswer");
  const [transcript, setTranscript] = useState("");
  const [conversation, setConversation] = useState([
    { role: "ai", text: firstQuestion || "" },
  ]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [roundSeconds, setRoundSeconds] = useState(0);
  const [interviewDone, setInterviewDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emotion, setEmotion] = useState("");
  const [latestFeedback, setLatestFeedback] = useState(null);
  const [interviewerImageError, setInterviewerImageError] = useState(false);
  const speechOk = !!(
    window.SpeechRecognition || window.webkitSpeechRecognition
  );
  const listenStartRef = useRef(null);
  const speakingMsRef = useRef(0);
  const [latestSpeech, setLatestSpeech] = useState(null);
  const [lastQ, setLastQ] = useState("");
  const [retryMode, setRetryMode] = useState(false);
  const [retryUsed, setRetryUsed] = useState(false);
  const [retryInfo, setRetryInfo] = useState(null);

  const flushListenTime = () => {
    if (listenStartRef.current) {
      speakingMsRef.current += Date.now() - listenStartRef.current;
      listenStartRef.current = null;
    }
  };

  const roundDurationSeconds =
    (rounds[currentRoundIndex]?.durationMinutes || 5) * 60;
  const roundTimeoutFiredRef = useRef(false);

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const timerRef = useRef(null);
  const roundTimerRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const conversationEndRef = useRef(null);
  const captureIntervalRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    roundTimerRef.current = setInterval(
      () => setRoundSeconds((s) => s + 1),
      1000,
    );
    return () => clearInterval(roundTimerRef.current);
  }, [currentRound]);

  const sendFrame = async () => {
    const video = videoRef.current;
    if (!video || video.readyState !== 4) return;

    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      try {
        const formData = new FormData();
        formData.append("image", blob, "frame.jpg");

        const { data } = await api.post("/face-detect", formData);
        if (data?.emotion) {
          setEmotion(data.emotion);
        }
      } catch {}
    }, "image/jpeg");
  };

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        captureIntervalRef.current = setInterval(() => {
          sendFrame();
        }, 1000);
      } catch (err) {
        console.error(err);
      }
    };

    startCamera();

    return () => {
      clearInterval(captureIntervalRef.current);
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const speakText = useCallback((text) => {
    if (!text || !window.speechSynthesis) {
      console.error("Speech synthesis unavailable");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = () => {
      setStatus("aiSpeaking");
    };
    utterance.onend = () => {
      setStatus("waitingForAnswer");
    };
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setStatus("waitingForAnswer");
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    const loadQuestion = async () => {
      if (firstQuestion?.trim()) {
        console.log("USING FIRST QUESTION:", firstQuestion);

        setCurrentQuestion(firstQuestion);

        setConversation([
          {
            role: "ai",
            text: firstQuestion,
          },
        ]);

        speakText(firstQuestion);
        return;
      }

      if (!sessionId) return;

      try {
        const res = await api.get(`/interview/session/${sessionId}`);

        console.log("SESSION RESPONSE:", res.data);

        const question = res.data?.currentQuestion?.trim();

        if (question) {
          console.log("QUESTION FROM SESSION:", question);

          setCurrentQuestion(question);

          setConversation([
            {
              role: "ai",
              text: question,
            },
          ]);

          speakText(question);
        } else {
          console.error("No question found. Session response:", res.data);

          setError("Question was not received from the interview session.");
        }
      } catch (err) {
        console.error("Failed to load interview question:", err);
        setError("Failed to load interview question.");
      }
    };

    loadQuestion();
  }, [firstQuestion, sessionId, speakText]);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError(content.micError);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";
    if (!transcript) finalTranscriptRef.current = "";

    recognition.onend = () => {
      flushListenTime();
      setStatus((st) => (st === "listening" ? "waitingForAnswer" : st));
    };

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

    recognition.onerror = (e) => {
      if (e.error !== "no-speech") setError("Microphone error: " + e.error);
    };

    recognition.start();
    recognitionRef.current = recognition;
    listenStartRef.current = Date.now();
    setStatus("listening");
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    flushListenTime();
    setStatus("waitingForAnswer");
  };

  const startRetry = () => {
    setRetryMode(true);
    setTranscript("");
    finalTranscriptRef.current = "";
  };

  const submitAnswer = async () => {
    const answer = transcript.trim();
    if (!answer) return;

    stopListening();
    const speakingSeconds = Math.round(speakingMsRef.current / 1000);
    speakingMsRef.current = 0;
    const questionAsked = currentQuestion;
    setStatus("processing");
    setLoading(true);
    setConversation((prev) => [...prev, { role: "user", text: answer }]);
    setTranscript("");
    finalTranscriptRef.current = "";

    try {
      const res = await api.post("/interview/session", {
        action: retryMode ? "retry" : "answer",
        sessionId,
        answer,
        speakingSeconds,
      });

      if (res.data?.evaluation) {
        setLatestFeedback(res.data.evaluation);
      }
      setLatestSpeech(res.data?.speech || null);

      if (retryMode) {
        setRetryInfo({
          previous: res.data.previousScore,
          improvement: res.data.improvement,
        });
        setRetryUsed(true);
        setRetryMode(false);
        setStatus("waitingForAnswer");
        return;
      }
      setRetryInfo(null);
      setRetryUsed(false);
      setLastQ(questionAsked);

      const {
        nextQuestion,
        interviewComplete,
        roundComplete,
        currentRound: newRound,
        currentRoundIndex: newRoundIndex,
      } = res.data;

      if (interviewComplete) {
        setInterviewDone(true);
        const endMsg =
          "That concludes our interview. Thank you for your time! I'll now prepare your detailed feedback report.";
        setConversation((prev) => [...prev, { role: "ai", text: endMsg }]);
        speakText(endMsg);
        setStatus("interviewComplete");
      } else {
        if (roundComplete) {
          const transitionMsg = `Great work on the ${content.roundLabels[currentRound]} round. Let's move on to the ${content.roundLabels[newRound]} round.`;
          setConversation((prev) => [
            ...prev,
            { role: "ai", text: transitionMsg },
          ]);
          setCurrentRound(newRound);
          setCurrentRoundIndex(newRoundIndex);
          setRoundSeconds(0);
          roundTimeoutFiredRef.current = false;
          speakText(transitionMsg);
          setTimeout(() => {
            setCurrentQuestion(nextQuestion);
            setConversation((prev) => [
              ...prev,
              { role: "ai", text: nextQuestion },
            ]);
            speakText(nextQuestion);
          }, 3000);
        } else {
          setCurrentQuestion(nextQuestion);
          setConversation((prev) => [
            ...prev,
            { role: "ai", text: nextQuestion },
          ]);
          speakText(nextQuestion);
        }
        setStatus("waitingForAnswer");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit answer");
      setStatus("waitingForAnswer");
    } finally {
      setLoading(false);
    }
  };

  const finishInterview = async () => {
    setLoading(true);
    synthRef.current?.cancel();
    try {
      const res = await api.post("/interview/session", {
        action: "finish",
        sessionId,
        durationSeconds: elapsedSeconds,
      });
      navigate("/interview/result", {
        state: { record: res.data.record, gamification: res.data.gamification },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to finish interview");
    } finally {
      setLoading(false);
    }
  };

  const handleRoundTimeout = async () => {
    if (recognitionRef.current) stopListening();
    synthRef.current?.cancel();
    setStatus("processing");
    setLoading(true);

    try {
      const res = await api.post("/interview/session", {
        action: "timeout",
        sessionId,
      });

      const {
        nextQuestion,
        interviewComplete,
        roundComplete,
        currentRound: newRound,
        currentRoundIndex: newRoundIndex,
      } = res.data;

      if (interviewComplete) {
        setInterviewDone(true);
        const endMsg =
          "That's time! That concludes our interview. Thank you for your time! I'll now prepare your detailed feedback report.";
        setConversation((prev) => [...prev, { role: "ai", text: endMsg }]);
        speakText(endMsg);
        setStatus("interviewComplete");
      } else if (roundComplete) {
        const transitionMsg = `Time's up for the ${content.roundLabels[currentRound]} round. Let's move on to the ${content.roundLabels[newRound]} round.`;
        setConversation((prev) => [
          ...prev,
          { role: "ai", text: transitionMsg },
        ]);
        setCurrentRound(newRound);
        setCurrentRoundIndex(newRoundIndex);
        setRoundSeconds(0);
        roundTimeoutFiredRef.current = false;
        speakText(transitionMsg);
        setTimeout(() => {
          setCurrentQuestion(nextQuestion);
          setConversation((prev) => [
            ...prev,
            { role: "ai", text: nextQuestion },
          ]);
          speakText(nextQuestion);
        }, 3000);
        setStatus("waitingForAnswer");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to move on from round");
      setStatus("waitingForAnswer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewDone || loading) return;
    if (roundSeconds >= roundDurationSeconds && !roundTimeoutFiredRef.current) {
      roundTimeoutFiredRef.current = true;
      handleRoundTimeout();
    }
  }, [roundSeconds, roundDurationSeconds, interviewDone, loading]);

  const roundWarning =
    roundSeconds >= roundDurationSeconds - 30 && !interviewDone;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const scoreEntries = Object.entries(latestFeedback?.scores || {});
  const latestOverallScore = latestFeedback?.scores?.overall ?? "—";

  if (!interviewState?.sessionId) return null;

  return (
    <div className="live-page">
      <div className="live-topbar">
        <div className="live-topbar-left">
          <div className="live-logo">IQ</div>
          <span className="live-title">InterviewIQ</span>
        </div>

        <div className="live-round-indicator">
          {rounds.map((r, i) => (
            <div
              key={r.roundType}
              className={`round-pill ${i === currentRoundIndex ? "active" : ""} ${i < currentRoundIndex ? "done" : ""}`}
            >
              {content.roundLabels[r.roundType]}
            </div>
          ))}
        </div>

        <div className="live-timer">
          <span className="timer-label">{content.timer.elapsed}</span>
          <span className="timer-value">{formatTime(elapsedSeconds)}</span>
        </div>

        <div className="live-timer">
          <span className="timer-label">{content.timer.roundTime}</span>
          <span
            className={`timer-value ${roundWarning ? "timer-warning" : ""}`}
          >
            {formatTime(Math.max(0, roundDurationSeconds - roundSeconds))}
          </span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 0 }}>
        <BrowserSupportBanner message="Your browser can't do voice input. Type your answers in the box below instead (use Chrome or Edge for voice)." />
      </div>

      <div className="live-main">
        <div className="live-left">
          <div className="live-screen-stack">
            <div className="screen-card card interviewer-panel">
              <div className="screen-header">
                <span className="screen-tag">Interviewer</span>
                <span className="screen-status">
                  {status === "listening"
                    ? "Listening"
                    : status === "processing"
                      ? "Reviewing"
                      : "Ready"}
                </span>
              </div>

              <div className="interviewer-body">
                <div
                  className={`interviewer-portrait ${interviewerImageError ? "fallback-active" : ""}`}
                >
                  <img
                    src={interviewerImage}
                    alt="Interviewer"
                    onLoad={() => setInterviewerImageError(false)}
                    onError={() => setInterviewerImageError(true)}
                  />
                  <div className="portrait-fallback">AI</div>
                </div>

                <div className="interviewer-text-panel">
                  <span className="ai-label">AI Interviewer</span>
                  <div className="interviewer-subtitle-box">
                    <p>{currentQuestion}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="screen-card card user-panel">
              <div className="screen-header">
                <span className="screen-tag">User Screen</span>
                <span className="screen-status">
                  {status === "listening" ? "Recording" : "Live"}
                </span>
              </div>

              <div className="user-body">
                <div className="camera-wrap user-camera-wrap">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="camera-video"
                  />
                </div>

                <div className="user-text-panel">
                  <span className="user-label">Your Screen</span>
                  <div className="user-subtitle-box">
                    <p>
                      {transcript || "Your live answer will appear here..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {retryMode && (
            <div className="alert alert-info mt-16" role="status">
              <strong>Retrying:</strong> {lastQ}
              <button
                className="btn btn-ghost btn-sm"
                style={{ marginLeft: 12 }}
                onClick={() => setRetryMode(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {!speechOk && !interviewDone && (
            <textarea
              className="form-textarea mt-16"
              rows={4}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Type your answer here…"
              aria-label="Type your answer"
            />
          )}

          <div className="live-controls">
            {!interviewDone ? (
              <>
                {status === "listening" ? (
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={stopListening}
                  >
                    <span className="pulse-dot" />
                    {content.controls.stopAnswering}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={startListening}
                    disabled={
                      !speechOk ||
                      status === "aiSpeaking" ||
                      status === "processing" ||
                      loading
                    }
                  >
                    {content.controls.startAnswering}
                  </button>
                )}

                {transcript && (
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={submitAnswer}
                    disabled={
                      loading ||
                      status === "aiSpeaking" ||
                      status === "processing"
                    }
                  >
                    {loading ? (
                      <span className="spinner" />
                    ) : (
                      content.controls.submitAnswer
                    )}
                  </button>
                )}

                <button
                  className="btn btn-ghost"
                  onClick={finishInterview}
                  disabled={loading}
                >
                  {content.controls.finishInterview}
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary btn-lg"
                onClick={finishInterview}
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner"
                    style={{ borderTopColor: "#fff" }}
                  />
                ) : (
                  "View my results →"
                )}
              </button>
            )}
          </div>

          {error && <div className="alert alert-error mt-16">{error}</div>}
        </div>

        <aside className="live-right">
          <div className="insight-card card">
            <div className="insight-header">
              <span className="insight-label">Expression</span>
              <span className="emotion-pill">{emotion || "Neutral"}</span>
            </div>
            <div className="score-box">
              <span>{latestOverallScore}</span>
              <small>/10</small>
            </div>
          </div>

          <div className="insight-card card">
            <h3>Answer breakdown</h3>
            {scoreEntries.length ? (
              <div className="score-grid">
                {scoreEntries.map(([key, value]) => (
                  <div key={key} className="mini-score">
                    <span>{key}</span>
                    <strong>{value}/10</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">
                Submit an answer to see the AI scoring here.
              </p>
            )}
          </div>

          <div className="insight-card card">
            <h3>Improvement</h3>
            <p className="improvement-text">
              {latestFeedback?.improvedAnswer ||
                "Your improved answer will appear here after the system evaluates your response."}
            </p>
          </div>

          {latestFeedback && !interviewDone && (
            <div className="insight-card card">
              <h3>Speaking</h3>
              {latestSpeech?.wpm ? (
                <p className="improvement-text">
                  Pace: <strong>{latestSpeech.wpm} wpm</strong> (
                  {latestSpeech.paceLabel === "good"
                    ? "good, aim for 110–160"
                    : latestSpeech.paceLabel === "fast"
                      ? "a bit fast, slow down"
                      : "a bit slow, add energy"}
                  ). Filler words: <strong>{latestSpeech.fillerCount}</strong>
                </p>
              ) : (
                <p className="improvement-text">
                  Filler words:{" "}
                  <strong>{latestSpeech?.fillerCount ?? 0}</strong>
                </p>
              )}
              {retryInfo && (
                <p className="improvement-text">
                  Retry score change:{" "}
                  <strong>
                    {retryInfo.improvement > 0 ? "+" : ""}
                    {retryInfo.improvement}
                  </strong>{" "}
                  (was {retryInfo.previous})
                </p>
              )}
              {!retryUsed && !retryMode && lastQ && (
                <button
                  className="btn btn-secondary btn-sm mt-8"
                  onClick={startRetry}
                >
                  Try that answer again
                </button>
              )}
            </div>
          )}

          <div className="insight-card card">
            <h3>Live transcript</h3>
            <div className="live-transcript-box">
              {status === "listening" && transcript ? (
                <>
                  <p>{transcript}</p>
                  <small className="form-hint">
                    {(() => {
                      const m = analyzeTranscript(transcript);
                      return `${m.words} words · ${m.fillers} fillers`;
                    })()}
                  </small>
                </>
              ) : (
                <p className="empty-state">Waiting for your response...</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
