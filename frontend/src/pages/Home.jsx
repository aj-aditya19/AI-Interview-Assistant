import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { interviewAPI, speechAPI } from "../utils/api";
import { Mic, MicOff, Volume2 } from "lucide-react";
import "../styles/Home.css";

const defaultSetup = {
  role: "",
  company: "",
  domain: "",
  fieldOfInterest: "",
  skills: "",
  expertiseLevel: "Beginner",
};

const defaultScores = {
  accuracy: 0,
  confidence: 0,
  vocabulary: 0,
  english: 0,
  overall: 0,
};

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);
  const submittingRef = useRef(false);
  const answerTextRef = useRef("");
  const currentQuestionRef = useRef("");
  const historyRef = useRef([]);
  const setupRef = useRef(defaultSetup);
  const isListeningRef = useRef(false);
  const loadingReviewRef = useRef(false);
  const autoSpeakReplyRef = useRef(true);
  const autoSubmitSilenceRef = useRef(true);
  const [setup, setSetup] = useState(defaultSetup);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [analysisPoints, setAnalysisPoints] = useState([]);
  const [scores, setScores] = useState(defaultScores);
  const [summaryText, setSummaryText] = useState("");
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [focusText, setFocusText] = useState("");
  const [history, setHistory] = useState([]);
  const [startingInterview, setStartingInterview] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);
  const [error, setError] = useState("");
  const [setupError, setSetupError] = useState("");
  const [speechError, setSpeechError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [autoSpeakReply, setAutoSpeakReply] = useState(true);
  const [autoSubmitSilence, setAutoSubmitSilence] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voiceHint, setVoiceHint] = useState(
    "Speak your answer, then pause for 3-4 seconds to submit.",
  );

  useEffect(() => {
    answerTextRef.current = answerText;
  }, [answerText]);

  useEffect(() => {
    currentQuestionRef.current = currentQuestion;
  }, [currentQuestion]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    setupRef.current = setup;
  }, [setup]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    loadingReviewRef.current = loadingReview;
  }, [loadingReview]);

  useEffect(() => {
    autoSpeakReplyRef.current = autoSpeakReply;
  }, [autoSpeakReply]);

  useEffect(() => {
    autoSubmitSilenceRef.current = autoSubmitSilence;
  }, [autoSubmitSilence]);

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  useEffect(() => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSpeechSupported(false);
      setSpeechError("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    const scheduleAutoSubmit = (text) => {
      clearSilenceTimer();

      if (
        !autoSubmitSilenceRef.current ||
        !isListeningRef.current ||
        loadingReviewRef.current ||
        submittingRef.current
      ) {
        return;
      }

      silenceTimerRef.current = setTimeout(() => {
        const trimmed = String(text || answerTextRef.current || "").trim();

        if (
          trimmed &&
          isListeningRef.current &&
          !loadingReviewRef.current &&
          !submittingRef.current
        ) {
          void submitAnswer(trimmed, true);
        }
      }, 3500);
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let index = event.resultIndex;
        index < event.results.length;
        index += 1
      ) {
        transcript += event.results[index][0].transcript;
      }

      const nextText = transcript.trim();
      setAnswerText(nextText);
      setSpeechError("");
      setVoiceHint("Listening... pause to submit automatically.");

      if (nextText) {
        scheduleAutoSubmit(nextText);
      }

      if (event.results[event.results.length - 1]?.isFinal) {
        scheduleAutoSubmit(nextText);
      }
    };

    recognition.onerror = (event) => {
      setSpeechError(event.error || "Could not access the microphone.");
      setIsListening(false);
      clearSilenceTimer();
      setVoiceHint("Microphone stopped.");
    };

    recognition.onend = () => {
      setIsListening(false);
      clearSilenceTimer();
      setVoiceHint("Pause detected or listening stopped.");
    };

    recognitionRef.current = recognition;

    return () => {
      clearSilenceTimer();
      recognition.abort();
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  const setupFields = useMemo(
    () => [
      ["role", "Role"],
      ["company", "Company"],
      ["domain", "Domain"],
      ["fieldOfInterest", "Field of interest"],
      ["expertiseLevel", "Expertise level"],
    ],
    [],
  );

  const speakReply = async (text) => {
    const trimmedText = String(text || "").trim();

    if (!trimmedText) return;

    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }

      const response = await speechAPI.speak(trimmedText);
      const audioBlob = new Blob([response.data], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        if (audioUrlRef.current === audioUrl) {
          URL.revokeObjectURL(audioUrl);
          audioUrlRef.current = null;
        }
      };

      audio.onerror = () => {
        if (audioUrlRef.current === audioUrl) {
          URL.revokeObjectURL(audioUrl);
          audioUrlRef.current = null;
        }
        setSpeechError("The Python speaker service could not play the audio.");
      };

      audio.play().catch((voiceError) => {
        setSpeechError(
          voiceError?.response?.data?.message ||
            voiceError.message ||
            "Could not generate spoken audio.",
        );
      });
    } catch (voiceError) {
      setSpeechError(
        voiceError?.response?.data?.message ||
          voiceError.message ||
          "Could not generate spoken audio.",
      );
    }
  };

  const stopListening = () => {
    clearSilenceTimer();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        recognitionRef.current.abort();
      }
    }

    setIsListening(false);
    isListeningRef.current = false;
    setVoiceHint("Listening stopped.");
  };

  const submitAnswer = async (submittedAnswer, fromAuto = false) => {
    const trimmedAnswer = String(
      submittedAnswer || answerTextRef.current || "",
    ).trim();

    if (!trimmedAnswer) {
      setError("Please enter or speak an answer first.");
      return;
    }

    if (!currentQuestionRef.current) {
      setError("Start the interview first.");
      return;
    }

    if (submittingRef.current) {
      return;
    }

    submittingRef.current = true;

    try {
      setLoadingReview(true);
      loadingReviewRef.current = true;
      setError("");
      setSpeechError("");
      stopListening();

      const response = await interviewAPI.review({
        setup: setupRef.current,
        question: currentQuestionRef.current,
        answer: trimmedAnswer,
        history: historyRef.current,
      });

      const nextAnalysis = Array.isArray(response.data.analysis)
        ? response.data.analysis
        : [];

      setAnalysisPoints(nextAnalysis);
      setScores({
        accuracy: response.data.scores?.accuracy || 0,
        confidence: response.data.scores?.confidence || 0,
        vocabulary: response.data.scores?.vocabulary || 0,
        english: response.data.scores?.english || 0,
        overall: response.data.scores?.overall || 0,
      });
      setSummaryText(response.data.summary || "");
      setFocusText(response.data.strengthFocus || "");
      setFollowUpQuestion(response.data.nextQuestion || "");
      setHistory((previous) => {
        const nextHistory = [
          ...previous,
          {
            question: currentQuestionRef.current,
            answer: trimmedAnswer,
            summary: response.data.summary || "",
          },
        ];

        historyRef.current = nextHistory;
        return nextHistory;
      });

      const nextQuestion =
        response.data.nextQuestion || currentQuestionRef.current;
      currentQuestionRef.current = nextQuestion;
      setCurrentQuestion(nextQuestion);
      setAnswerText("");
      answerTextRef.current = "";

      if (autoSpeakReplyRef.current) {
        await speakReply(
          [response.data.summary, response.data.nextQuestion]
            .filter(Boolean)
            .join("\n\n"),
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not get feedback from the AI interviewer.",
      );
    } finally {
      setLoadingReview(false);
      loadingReviewRef.current = false;
      submittingRef.current = false;
      if (fromAuto) {
        setVoiceHint("Answer submitted automatically after silence.");
      }
    }
  };

  const startInterview = async (event) => {
    event.preventDefault();

    if (!setup.role.trim() || !setup.skills.trim()) {
      setSetupError("Role and skills are required to start the interview.");
      return;
    }

    try {
      setStartingInterview(true);
      setSetupError("");
      setError("");
      setAnalysisPoints([]);
      setScores(defaultScores);
      setSummaryText("");
      setFollowUpQuestion("");
      setFocusText("");
      setHistory([]);
      historyRef.current = [];
      setAnswerText("");
      answerTextRef.current = "";

      const response = await interviewAPI.start(setupRef.current);
      const firstQuestion = response.data.question || "Tell me about yourself.";
      currentQuestionRef.current = firstQuestion;
      setCurrentQuestion(firstQuestion);
      setInterviewStarted(true);
      if (response.data.intro) {
        setVoiceHint(response.data.intro);
      }
    } catch (err) {
      setSetupError(
        err.response?.data?.message || "Could not start the interview session.",
      );
    } finally {
      setStartingInterview(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current || !speechSupported) {
      setSpeechError("Voice input is not available in this browser.");
      return;
    }

    setSpeechError("");

    if (isListening) {
      stopListening();
      return;
    }

    try {
      if (!answerText.trim()) {
        setVoiceHint("Speak an answer for the current interview question.");
      }

      recognitionRef.current.start();
      setIsListening(true);
      setVoiceHint("Listening for your answer.");
    } catch (voiceError) {
      setSpeechError("Microphone could not be started. Try again.");
      setIsListening(false);
    }
  };

  if (!user) return <p className="home-loading">Loading user info...</p>;

  return (
    <div className="home-page">
      <div className="home-header">
        <div>
          <h2>Interview Assistant</h2>
          <p>
            Hello, <strong>{user.name}</strong>. Build your interview profile,
            answer by voice or text, and get scored by the AI interviewer.
          </p>
        </div>
        <button
          className="home-logout"
          onClick={() => {
            logout();
            navigate("/auth");
          }}
        >
          Logout
        </button>
      </div>

      {!interviewStarted ? (
        <form className="home-box home-setup-box" onSubmit={startInterview}>
          <div className="home-box-head">
            <div>
              <label>Interview setup</label>
              <p>
                Tell the AI who to interview and it will generate the first
                question.
              </p>
            </div>
            <span className="home-badge">Step 1</span>
          </div>

          <div className="home-setup-grid">
            {setupFields.map(([key, label]) => (
              <label key={key} className="home-field">
                <span>{label}</span>
                <input
                  value={setup[key]}
                  onChange={(event) =>
                    setSetup((previous) => ({
                      ...previous,
                      [key]: event.target.value,
                    }))
                  }
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  required={key === "role" || key === "skills"}
                />
              </label>
            ))}
            <label className="home-field home-field-wide">
              <span>Skills</span>
              <textarea
                value={setup.skills}
                onChange={(event) =>
                  setSetup((previous) => ({
                    ...previous,
                    skills: event.target.value,
                  }))
                }
                placeholder="List your skills, e.g. React, Node.js, communication, SQL"
                rows="4"
                required
              />
            </label>
          </div>

          {setupError ? <p className="home-error">{setupError}</p> : null}

          <button
            className="home-primary-button"
            type="submit"
            disabled={startingInterview}
          >
            {startingInterview
              ? "Preparing interview..."
              : "Start AI interview"}
          </button>
        </form>
      ) : (
        <div className="home-grid home-grid-interview">
          <section className="home-box home-question-box">
            <div className="home-box-head">
              <div>
                <label>Question</label>
                <p>The AI asks one question at a time based on your profile.</p>
              </div>
              <span className="home-badge">Live</span>
            </div>
            <div className="home-question-card">
              <p>
                {currentQuestion || "Your first question will appear here."}
              </p>
            </div>
            <div className="home-question-meta">
              <span>Role: {setup.role || "Not set"}</span>
              <span>Company: {setup.company || "Not set"}</span>
            </div>
          </section>

          <section className="home-box home-score-box">
            <div className="home-box-head">
              <div>
                <label>AI analysis</label>
                <p>Ranked by accuracy, confidence, vocabulary, and English.</p>
              </div>
              <span className="home-badge">Step 2</span>
            </div>

            <div className="home-score-grid">
              {[
                ["Accuracy", scores.accuracy],
                ["Confidence", scores.confidence],
                ["Vocabulary", scores.vocabulary],
                ["English", scores.english],
                ["Overall", scores.overall],
              ].map(([label, value]) => (
                <div key={label} className="home-score-chip">
                  <span>{label}</span>
                  <strong>{value}/10</strong>
                </div>
              ))}
            </div>

            <div className="home-analysis-card">
              <h4>Point to point feedback</h4>
              {analysisPoints.length > 0 ? (
                <ul>
                  {analysisPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="home-placeholder">
                  Your feedback will appear here after you answer.
                </p>
              )}
            </div>

            <div className="home-summary-card">
              <h4>Summary</h4>
              <p>{summaryText || "AI summary will appear here."}</p>
              {focusText ? (
                <p className="home-summary-focus">Focus: {focusText}</p>
              ) : null}
              {followUpQuestion ? (
                <p className="home-summary-focus">
                  Next question suggestion: {followUpQuestion}
                </p>
              ) : null}
            </div>
          </section>

          <section className="home-box home-answer-box">
            <div className="home-box-head">
              <div>
                <label>Your answer</label>
                <p>
                  Speak clearly. If nothing is detected for 3-4 seconds, the
                  answer is sent automatically.
                </p>
              </div>
              <span className="home-badge">Step 3</span>
            </div>
            <textarea
              className="home-answer-input"
              value={answerText}
              onChange={(event) => setAnswerText(event.target.value)}
              placeholder="Speak or type your answer here..."
              rows="10"
            />
            <div className="home-voice-options">
              <label className="home-toggle">
                <input
                  type="checkbox"
                  checked={autoSubmitSilence}
                  onChange={(event) =>
                    setAutoSubmitSilence(event.target.checked)
                  }
                />
                <span>Auto submit after silence</span>
              </label>
              <label className="home-toggle">
                <input
                  type="checkbox"
                  checked={autoSpeakReply}
                  onChange={(event) => setAutoSpeakReply(event.target.checked)}
                />
                <span>Read AI feedback aloud</span>
              </label>
            </div>
            <div className="home-voice-row">
              <button
                type="button"
                className={`home-voice-button ${isListening ? "is-listening" : ""}`}
                onClick={toggleListening}
                disabled={
                  !speechSupported || loadingReview || startingInterview
                }
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                {isListening ? "Stop listening" : "Speak answer"}
              </button>
              <button
                type="button"
                className="home-secondary-button"
                onClick={() =>
                  void speakReply(
                    [summaryText, followUpQuestion]
                      .filter(Boolean)
                      .join("\n\n"),
                  )
                }
                disabled={!summaryText && !followUpQuestion}
              >
                <Volume2 size={16} />
                Replay feedback
              </button>
              <button
                type="button"
                className="home-secondary-button"
                onClick={() => void submitAnswer(answerText, false)}
                disabled={loadingReview || startingInterview}
              >
                {loadingReview ? "Analysing..." : "Send answer"}
              </button>
            </div>
            <p className="home-support-note">{voiceHint}</p>
            {speechError ? <p className="home-error">{speechError}</p> : null}
            {error ? <p className="home-error">{error}</p> : null}
          </section>
        </div>
      )}
    </div>
  );
}

export default HomePage;
