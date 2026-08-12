import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import content from "../../content/communication.json";
import vocabWords from "../../content/vocabWords.json";
import hardWords from "../../content/hardWords.json";
import tongueTwisters from "../../content/tongueTwisters.json";
import tensesVerbs from "../../content/tensesVerbs.json";
import "./CommunicationPracticePage.css";

const DATA_BY_TYPE = {
  vocab: vocabWords,
  hardWords: hardWords,
  tongueTwisters: tongueTwisters,
  tenses: tensesVerbs,
};

function getMatchScore(target, spoken) {
  const clean = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);

  const targetWords = clean(target);
  const spokenWords = new Set(clean(spoken));

  if (targetWords.length === 0) return 0;

  const matched = targetWords.filter((w) => spokenWords.has(w)).length;
  return Math.round((matched / targetWords.length) * 100);
}

export default function CommunicationPracticePage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { practice } = content;
  const meta = practice.typeMeta[type];
  const items = DATA_BY_TYPE[type] || [];

  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");

  const current = items[index];
  const targetText = current?.word || current?.text || "";

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    finalTranscriptRef.current = "";
    setTranscript("");
    setChecked(false);

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

    recognition.onerror = () => setListening(false);
    recognition.onend = () => {
      setListening(false);
      setChecked(true);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
    setChecked(true);
  };

  const resetItemState = () => {
    setTranscript("");
    setChecked(false);
    finalTranscriptRef.current = "";
  };

  const handleNext = () => {
    if (index + 1 >= items.length) {
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    resetItemState();
  };

  const handleRestart = () => {
    setIndex(0);
    setFinished(false);
    resetItemState();
  };

  if (!meta || items.length === 0) {
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
    return (
      <div className="comm-practice-page">
        <Navbar />
        <div className="container comm-practice-main comm-practice-complete">
          <h2>{practice.completeHeading}</h2>
          <p>{practice.completeSubtext}</p>
          <div className="comm-practice-complete-actions">
            <button className="btn btn-secondary" onClick={handleRestart}>
              {practice.restartButton}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/communication")}
            >
              {practice.backButton}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const score = checked ? getMatchScore(targetText, transcript) : null;
  const scoreMessage =
    score === null
      ? ""
      : score >= 70
        ? practice.matchGood
        : score >= 40
          ? practice.matchOkay
          : practice.matchLow;

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

        <div className="comm-practice-progress">
          {practice.progressLabel} {index + 1} / {items.length}
        </div>

        <div className="comm-practice-card">
          <p className="comm-practice-target">{targetText}</p>
          {current.hint && (
            <p className="comm-practice-hint">/ {current.hint} /</p>
          )}
          {current.tense && (
            <p className="comm-practice-tense">({current.tense})</p>
          )}
        </div>

        <div className="comm-practice-mic-area">
          <button
            className={`comm-practice-mic-btn ${listening ? "listening" : ""}`}
            onClick={listening ? stopListening : startListening}
          >
            {listening ? practice.micListening : practice.micStart}
          </button>
        </div>

        {transcript && (
          <div className="comm-practice-transcript">
            <span className="comm-practice-transcript-label">
              {practice.yourSpeechLabel}:
            </span>{" "}
            {transcript}
          </div>
        )}

        {checked && (
          <div className="comm-practice-feedback">
            <span className="comm-practice-score">{score}%</span> {scoreMessage}
          </div>
        )}

        {checked && (current.meaning || current.example) && (
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
          </div>
        )}

        <div className="comm-practice-actions">
          <button className="btn btn-primary" onClick={handleNext}>
            {index + 1 >= items.length
              ? practice.finishButton
              : practice.nextButton}
          </button>
        </div>
      </div>
    </div>
  );
}
