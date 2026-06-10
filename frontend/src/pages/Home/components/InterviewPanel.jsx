import { useEffect, useRef, useState } from "react";
import avatarImg from "../assets/interview-avator.jpg";
import { defaultScores } from "../utils/constatns.jsx";
import "../styles/InterviewPanel.css";
import AnswerInput from "./AnswerInput.jsx";

function CamPanel({ question, answerText, isListening }) {
  const vidRef = useRef(null);
  const streamRef = useRef(null);
  const pipRef = useRef(null);
  const [on, setOn] = useState(false);
  const [err, setErr] = useState("");

  const startCam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;
      if (vidRef.current) vidRef.current.srcObject = stream;
      if (pipRef.current) pipRef.current.srcObject = stream;
      setOn(true);
      setErr("");
    } catch {
      setErr("Camera permission denied — check browser settings.");
    }
  };

  const stopCam = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (vidRef.current) vidRef.current.srcObject = null;
    if (pipRef.current) pipRef.current.srcObject = null;
    setOn(false);
  };

  useEffect(() => () => stopCam(), []);

  const subtitle =
    isListening && answerText
      ? { type: "a", text: answerText.slice(-160) }
      : question
        ? { type: "q", text: question }
        : null;

  return (
    <div className="lc lc-cam">
      <div className="lc-head">
        <h3>Interview Room</h3>
      </div>

      <div className="cam-wrap">
        <img src={avatarImg} className="cam-avatar" alt="AI Interviewer" />
        <div className="cam-ai-label">
          <span className="cam-ai-dot" />
          AI Interviewer
        </div>

        {err && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15,23,42,.75)",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontSize: ".82rem",
              padding: 20,
              textAlign: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            {err}
          </div>
        )}

        {subtitle && (
          <div className="cam-subs">
            <div className="cam-sub-lbl">
              {subtitle.type === "q" ? "Interviewer" : "You"}
            </div>
            <div className={`cam-sub-txt ${subtitle.type}`}>
              {subtitle.text}
            </div>
          </div>
        )}
      </div>

      <div className="cam-ctrls">
        <span className="cam-note">"Showing AI interviewer avatar"</span>
      </div>
    </div>
  );
}

function ScPanel({ scores }) {
  const ITEMS = [
    ["Accuracy", "accuracy"],
    ["Confidence", "confidence"],
    ["Vocab", "vocabulary"],
    ["English", "english"],
  ];
  const ov = Number(scores?.overall || 0);
  const msg =
    ov >= 8
      ? "Excellent! 🎉"
      : ov >= 6
        ? "Good effort 👍"
        : ov >= 4
          ? "Keep going 💪"
          : "Room to grow 📚";

  return (
    <div className="lc lc-sc">
      <div className="lc-head">
        <h3>Live Scores</h3>
        <span className="lbadge green">AI Graded</span>
      </div>

      {ov > 0 && (
        <div className="sc-overall">
          <div className="sc-ov-val">{ov}/10</div>
          <div>
            <div className="sc-ov-lbl">Overall Score</div>
            <div className="sc-ov-msg">{msg}</div>
          </div>
        </div>
      )}

      <div className="sc-grid">
        {ITEMS.map(([lbl, key]) => {
          const v = Number(scores?.[key] || 0);
          return (
            <div key={key} className={`sc-chip ${v > 0 ? "has" : ""}`}>
              <span>{lbl}</span>
              <strong>{v}/10</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FbPanel({ reviewData }) {
  const sum = reviewData?.summaryText || "";
  const imp = reviewData?.improvedAnswer || "";
  const nxt = reviewData?.nextQuestion || "";
  const st = reviewData?.statusText || "";
  const has = sum || imp || nxt;

  if (!has)
    return (
      <div className="lc lc-fb">
        <div className="lc-head">
          <h3>AI Feedback</h3>
          <span className="lbadge">Waiting</span>
        </div>
        <div className="fb-empty">
          💬 Submit your answer to see AI feedback here…
        </div>
      </div>
    );

  return (
    <div className="lc lc-fb">
      <div className="lc-head">
        <h3>AI Feedback</h3>
        <span className="lbadge green">✓ Updated</span>
      </div>
      {st && <div className="fb-status">{st}</div>}
      {(imp || sum) && (
        <div className="fb-block">
          <div className="fb-lbl">{imp ? "Improved Answer" : "Summary"}</div>
          <div className="fb-txt">{imp || sum}</div>
        </div>
      )}
      {nxt && (
        <div className="fb-next">
          <span>💬</span>
          <span>Next: {nxt}</span>
        </div>
      )}
    </div>
  );
}

function InterviewPanel({
  currentQuestion,
  reviewData,
  answerText,
  onAnswerChange,
  onReplayFeedback,
  onSendAnswer,
  onToggleListening,
  isListening,
  speechSupported,
  autoSubmitSilence,
  onToggleAutoSubmit,
  autoSpeakReply,
  onToggleAutoSpeak,
  loadingReview,
  speechError,
  voiceHint,
  error,
}) {
  const scores = reviewData?.scores || defaultScores;
  const hasFb = Boolean(
    reviewData?.summaryText ||
    reviewData?.improvedAnswer ||
    reviewData?.nextQuestion,
  );
  const hasAns = String(answerText || "").trim().length > 0;

  return (
    <div className="live-grid">
      <CamPanel
        question={currentQuestion}
        answerText={answerText}
        isListening={isListening}
      />

      <div className="lc lc-ans">
        <div className="lc-head">
          <h3>Your Answer</h3>
          {isListening && <span className="lbadge red">🎤 Listening</span>}
        </div>

        <AnswerInput
          style={{ height: "10px", borderRadius: "10px" }}
          value={answerText}
          onChange={onAnswerChange}
        />

        {voiceHint && !speechError && <div className="vhint">{voiceHint}</div>}
        {speechError && <div className="verr">⚠ {speechError}</div>}

        <div className="vrow">
          {speechSupported && (
            <button
              type="button"
              className={`vb ${isListening ? "vb-stop" : "vb-mic"}`}
              onClick={onToggleListening}
              disabled={loadingReview}
            >
              {isListening ? "⏹ Stop Mic" : "🎤 Start Mic"}
            </button>
          )}
          <button
            type="button"
            className="vb vb-sub"
            onClick={() => onSendAnswer(answerText)}
            disabled={loadingReview || !hasAns}
          >
            {loadingReview ? "⟳ Analyzing…" : "✓ Submit Answer"}
          </button>
          {hasFb && (
            <button
              type="button"
              className="vb vb-rep"
              onClick={onReplayFeedback}
              disabled={loadingReview}
              title="Replay feedback"
            >
              🔊
            </button>
          )}
        </div>

        <div className="vtogs">
          <label className="vtog">
            <input
              type="checkbox"
              checked={autoSubmitSilence}
              onChange={(e) => onToggleAutoSubmit(e.target.checked)}
            />
            Auto-submit on silence
          </label>
          <label className="vtog">
            <input
              type="checkbox"
              checked={autoSpeakReply}
              onChange={(e) => onToggleAutoSpeak(e.target.checked)}
            />
            AI speaks replies
          </label>
        </div>

        {error && <div className="perr">⚠ {error}</div>}
      </div>

      <FbPanel reviewData={reviewData} />
      <ScPanel scores={scores} />
    </div>
  );
}

export default InterviewPanel;
