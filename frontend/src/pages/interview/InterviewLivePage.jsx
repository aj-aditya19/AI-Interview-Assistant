import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api.js";
import content from "../../content/interviewLive.json";
import "./InterviewLivePage.css";

export default function InterviewLivePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  // If someone navigates here directly without state, send them back
  useEffect(() => {
    if (!state?.sessionId) navigate("/interview/setup", { replace: true });
  }, []);

  const {
    sessionId, firstQuestion, currentRound: initialRound,
    currentRoundIndex: initialRoundIndex, totalRounds,
    rounds = [], targetRole = "", difficulty = "",
  } = state || {};

  // Interview state
  const [currentQuestion, setCurrentQuestion] = useState(firstQuestion || "");
  const [currentRound, setCurrentRound] = useState(initialRound || "hr");
  const [currentRoundIndex, setCurrentRoundIndex] = useState(initialRoundIndex || 0);
  const [status, setStatus] = useState("waitingForAnswer"); // aiSpeaking | waitingForAnswer | listening | processing
  const [transcript, setTranscript] = useState("");
  const [conversation, setConversation] = useState([
    { role: "ai", text: firstQuestion || "" }
  ]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [roundSeconds, setRoundSeconds] = useState(0);
  const [interviewDone, setInterviewDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Refs
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const roundTimerRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const conversationEndRef = useRef(null);

  // ── Timers ──────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    roundTimerRef.current = setInterval(() => setRoundSeconds((s) => s + 1), 1000);
    return () => clearInterval(roundTimerRef.current);
  }, [currentRound]);

  // ── Camera ──────────────────────────────────────────────
  useEffect(() => {
    navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
      .then((stream) => { if (videoRef.current) videoRef.current.srcObject = stream; })
      .catch(() => {});
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // ── Speech synthesis (AI speaks the question) ───────────
  const speakText = useCallback((text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onstart = () => setStatus("aiSpeaking");
    utterance.onend = () => setStatus("waitingForAnswer");
    synthRef.current.speak(utterance);
  }, []);

  // Speak the first question on mount
  useEffect(() => {
    if (firstQuestion) speakText(firstQuestion);
  }, []);

  // Auto-scroll conversation panel
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // ── Speech recognition (user answers) ───────────────────
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError(content.micError);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (e) => {
      let finalText = "";
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript;
        else interimText += e.results[i][0].transcript;
      }
      setTranscript((prev) => prev + finalText + (interimText ? ` ${interimText}` : ""));
    };

    recognition.onerror = (e) => {
      if (e.error !== "no-speech") setError("Microphone error: " + e.error);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setStatus("listening");
    setTranscript("");
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setStatus("waitingForAnswer");
  };

  // ── Submit answer ────────────────────────────────────────
  const submitAnswer = async () => {
    const answer = transcript.trim();
    if (!answer) return;

    stopListening();
    setStatus("processing");
    setLoading(true);

    // Add user turn to conversation immediately
    setConversation((prev) => [...prev, { role: "user", text: answer }]);
    setTranscript("");

    try {
      const res = await api.post("/interview/session", {
        action: "answer",
        sessionId,
        answer,
      });

      const { nextQuestion, interviewComplete, roundComplete, currentRound: newRound, currentRoundIndex: newRoundIndex } = res.data;

      if (interviewComplete) {
        setInterviewDone(true);
        const endMsg = "That concludes our interview. Thank you for your time! I'll now prepare your detailed feedback report.";
        setConversation((prev) => [...prev, { role: "ai", text: endMsg }]);
        speakText(endMsg);
        setStatus("interviewComplete");
      } else {
        if (roundComplete) {
          const transitionMsg = `Great work on the ${content.roundLabels[currentRound]} round. Let's move on to the ${content.roundLabels[newRound]} round.`;
          setConversation((prev) => [...prev, { role: "ai", text: transitionMsg }]);
          setCurrentRound(newRound);
          setCurrentRoundIndex(newRoundIndex);
          setRoundSeconds(0);
          speakText(transitionMsg);
          // Small delay before showing next question
          setTimeout(() => {
            setCurrentQuestion(nextQuestion);
            setConversation((prev) => [...prev, { role: "ai", text: nextQuestion }]);
            speakText(nextQuestion);
          }, 3000);
        } else {
          setCurrentQuestion(nextQuestion);
          setConversation((prev) => [...prev, { role: "ai", text: nextQuestion }]);
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

  // ── Finish interview ─────────────────────────────────────
  const finishInterview = async () => {
    setLoading(true);
    synthRef.current?.cancel();
    try {
      const res = await api.post("/interview/session", {
        action: "finish",
        sessionId,
        durationSeconds: elapsedSeconds,
      });
      navigate("/interview/result", { state: { record: res.data.record } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to finish interview");
    } finally {
      setLoading(false);
    }
  };

  // ── 10-minute round warning ──────────────────────────────
  const roundWarning = roundSeconds >= 570 && !interviewDone; // 9:30 mark

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!state?.sessionId) return null;

  return (
    <div className="live-page">
      {/* Top bar */}
      <div className="live-topbar">
        <div className="live-topbar-left">
          <div className="live-logo">IQ</div>
          <span className="live-title">InterviewIQ</span>
        </div>
        <div className="live-round-indicator">
          {rounds.map((r, i) => (
            <div
              key={r}
              className={`round-pill ${i === currentRoundIndex ? "active" : ""} ${i < currentRoundIndex ? "done" : ""}`}
            >
              {content.roundLabels[r]}
            </div>
          ))}
        </div>
        <div className="live-timer">
          <span className="timer-label">{content.timer.elapsed}</span>
          <span className="timer-value">{formatTime(elapsedSeconds)}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="live-main">
        {/* Left: Avatar + question */}
        <div className="live-left">
          {/* AI Avatar */}
          <div className="avatar-panel card">
            <div className="avatar-wrap">
              <div className="avatar-circle">
                <span className="avatar-initials">AI</span>
                {status === "aiSpeaking" && <div className="avatar-speaking-ring" />}
              </div>
              <div className="avatar-name">{content.conversationLabels.aiLabel}</div>
              <div className="avatar-status">
                {status === "aiSpeaking" && <><span className="pulse-dot" style={{ background: "var(--color-primary)" }} /><span>{content.status.aiSpeaking}</span></>}
                {status === "listening" && <><span className="pulse-dot" /><span>{content.status.listening}</span></>}
                {status === "processing" && <><span className="spinner" /><span>{content.status.processing}</span></>}
                {status === "waitingForAnswer" && <span>{content.status.waitingForAnswer}</span>}
                {status === "interviewComplete" && <span>{content.status.interviewComplete}</span>}
              </div>
            </div>
          </div>

          {/* Current question display */}
          <div className="question-card card">
            <div className="question-badge">
              <span className="badge badge-primary">{content.roundLabels[currentRound]}</span>
              {roundWarning && <span className="badge badge-secondary">{content.hints.timerWarning}</span>}
            </div>
            <p className="current-question">{currentQuestion}</p>
          </div>

          {/* Controls */}
          <div className="live-controls">
            {!interviewDone ? (
              <>
                {status === "listening" ? (
                  <button className="btn btn-danger btn-lg" onClick={stopListening}>
                    <span className="pulse-dot" />
                    {content.controls.stopAnswering}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={startListening}
                    disabled={status === "aiSpeaking" || status === "processing" || loading}
                  >
                    {content.controls.startAnswering}
                  </button>
                )}
                {transcript && status !== "listening" && (
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={submitAnswer}
                    disabled={loading}
                  >
                    {loading ? <span className="spinner" /> : content.controls.submitAnswer}
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
                {loading ? <span className="spinner" style={{ borderTopColor: "#fff" }} /> : "View my results →"}
              </button>
            )}
          </div>

          {error && <div className="alert alert-error mt-16">{error}</div>}
        </div>

        {/* Right: Camera + conversation */}
        <div className="live-right">
          {/* Live camera */}
          <div className="camera-panel card">
            <div className="camera-label">{content.cameraLabel}</div>
            <div className="camera-wrap">
              <video ref={videoRef} autoPlay muted playsInline className="camera-video" />
            </div>
          </div>

          {/* Conversation panel */}
          <div className="conversation-panel card">
            <div className="conversation-header">Live conversation</div>
            <div className="conversation-body">
              {conversation.map((msg, i) => (
                <div key={i} className={`convo-msg ${msg.role}`}>
                  <span className="convo-name">
                    {msg.role === "ai" ? content.conversationLabels.aiLabel : content.conversationLabels.youLabel}
                  </span>
                  <p className="convo-text">{msg.text}</p>
                </div>
              ))}

              {/* Live transcript */}
              {status === "listening" && transcript && (
                <div className="convo-msg user live">
                  <span className="convo-name">{content.conversationLabels.youLabel} <span className="live-dot" /></span>
                  <p className="convo-text">{transcript}</p>
                </div>
              )}
              <div ref={conversationEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
