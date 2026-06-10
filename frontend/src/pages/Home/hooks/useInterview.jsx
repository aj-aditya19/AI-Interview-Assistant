import { useEffect, useRef, useState } from "react";
// import { interviewAPI, avatarAPI } from "../../../utils/api";
import { interviewAPI } from "../../../utils/api";
import {
  defaultScores,
  defaultSetup,
  getSetupFields,
  getSetupValidationMessage,
  getTrackLabel,
  isValidInterviewSetup,
} from "../utils/constatns.jsx";
import { useSpeechRecognition } from "./useSpeechRecongnition.jsx";
import { useSpeechSynthesis } from "./useSpeechSynthesis.jsx";

const toText = (value) => String(value || "").trim();

const formatDuration = (totalSeconds) => {
  const safeSeconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
};

const buildEmptyReview = () => ({
  analysisPoints: [],
  scores: defaultScores,
  summaryText: "",
  improvedAnswer: "",
  improvedQuestion: "",
  nextQuestion: "",
  attemptNumber: 0,
  shouldRetry: false,
  statusText: "",
  rate: 0,
  result: 0,
  total: 10,
});

export function useInterview() {
  // const [videoUrl, setVideoUrl] = useState("");
  const [timeElapsedSeconds, setTimeElapsedSeconds] = useState(0);
  const [setup, setSetup] = useState(defaultSetup);
  const [interviewPhase, setInterviewPhase] = useState("setup");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [reviewData, setReviewData] = useState(buildEmptyReview());
  const [history, setHistory] = useState([]);
  const [startingInterview, setStartingInterview] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);
  const [finishingInterview, setFinishingInterview] = useState(false);
  const [error, setError] = useState("");
  const [setupError, setSetupError] = useState("");
  const [autoSpeakReply, setAutoSpeakReply] = useState(true);
  const [autoSubmitSilence, setAutoSubmitSilence] = useState(true);
  const [resultData, setResultData] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [sessionStartedAt, setSessionStartedAt] = useState(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const setupRef = useRef(defaultSetup);
  const currentQuestionRef = useRef("");
  const historyRef = useRef([]);
  const loadingReviewRef = useRef(false);
  const submittingRef = useRef(false);
  const finishingRef = useRef(false);
  const finishTimerRef = useRef(null);
  const submitAnswerRef = useRef(() => {});
  const sessionIdRef = useRef("");
  const sessionStartedAtRef = useRef(0);
  const durationMinutesRef = useRef(Number(defaultSetup.durationMinutes) || 3);

  useEffect(() => {
    setupRef.current = setup;
    durationMinutesRef.current = Number(setup.durationMinutes) || 3;
  }, [setup]);

  useEffect(() => {
    currentQuestionRef.current = currentQuestion;
  }, [currentQuestion]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    loadingReviewRef.current = loadingReview;
  }, [loadingReview]);

  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  useEffect(() => {
    sessionStartedAtRef.current = sessionStartedAt;
  }, [sessionStartedAt]);

  // on mount: if a previous interview was in progress and the user reloaded,
  // restart the interview from zero using the saved setup
  // useEffect(() => {
  //   try {
  //     const inProgress = localStorage.getItem("aiInterview.inProgress");
  //     const saved = localStorage.getItem("aiInterview.setup");

  //     if (inProgress === "1" && saved) {
  //       const parsed = JSON.parse(saved);
  //       // restore setup state then start interview automatically
  //       setSetup((prev) => ({ ...prev, ...parsed }));
  //       // small timeout to allow refs/state to settle
  //       setTimeout(() => {
  //         void internalStartInterview(parsed);
  //       }, 50);
  //     }
  //   } catch (e) {}
  //   // run only once on mount
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect(() => {
    const handleUnload = () => {
      try {
        if (sessionIdRef.current) {
          fetch(
            `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/interview/session/${sessionIdRef.current}`,
            {
              method: "DELETE",
              keepalive: true,
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            },
          );
        }

        localStorage.removeItem("aiInterview.inProgress");
        localStorage.removeItem("aiInterview.setup");
      } catch (e) {}
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  useEffect(() => {
    if (interviewPhase !== "live" || !sessionStartedAtRef.current) {
      return undefined;
    }

    const totalSeconds = durationMinutesRef.current * 60;

    const updateTimer = () => {
      const elapsed = Math.max(
        0,
        Math.floor((Date.now() - sessionStartedAtRef.current) / 1000),
      );
      const remaining = Math.max(0, totalSeconds - elapsed);

      try {
        // debug timer values
        // eslint-disable-next-line no-console
        console.debug(
          "[timer] elapsed=",
          elapsed,
          "remaining=",
          remaining,
          "phase=",
          interviewPhase,
        );
      } catch (e) {}

      setTimeElapsedSeconds(Math.min(elapsed, totalSeconds));
      setTimeRemainingSeconds(remaining);

      if (remaining <= 0 && interviewPhase === "live") {
        // eslint-disable-next-line no-console
        console.debug("[timer] time expired, calling finishInterview");
        void finishInterview("time-limit");
      }
    };

    updateTimer();
    finishTimerRef.current = window.setInterval(updateTimer, 1000);

    return () => {
      if (finishTimerRef.current) {
        clearInterval(finishTimerRef.current);
        finishTimerRef.current = null;
      }
    };
  }, [interviewPhase, sessionStartedAt]);

  const {
    answerText,
    setAnswerText,
    isListening,
    speechSupported,
    speechError,
    setSpeechError,
    voiceHint,
    setVoiceHint,
    startListening,
    toggleListening,
    stopListening,
  } = useSpeechRecognition({
    onAutoSubmit: (text, fromAuto) => submitAnswerRef.current(text, fromAuto),
    autoSubmitSilence,
    isBusy: loadingReview || startingInterview,
  });

  const { speakReply, stopPlayback } = useSpeechSynthesis({
    setSpeechError,
  });

  const updateSetupField = (fieldName, value) => {
    setSetup((previous) => ({
      ...previous,
      [fieldName]: value,
    }));
  };

  const updateTrack = (track) => {
    setSetup((previous) => ({
      ...defaultSetup,
      ...previous,
      track,
    }));
  };

  const buildFinalResult = () => ({
    trackLabel: getTrackLabel(setupRef.current.track),
    setup: setupRef.current,
    history: historyRef.current,
    scores: reviewData.scores,
    analysisPoints: reviewData.analysisPoints,
    summaryText: reviewData.summaryText,
    focusText: reviewData.statusText,
    followUpQuestion: reviewData.nextQuestion,
    improvedAnswer: reviewData.improvedAnswer,
    timeRemainingLabel: formatDuration(timeRemainingSeconds),
    timeElapsedLabel: formatDuration(timeElapsedSeconds),
  });
  // const playAvatar = async (text) => {
  //   try {
  //     const avatar = await avatarAPI.speak(text);

  //     const talkId = avatar.data.id;

  //     return new Promise((resolve, reject) => {
  //       const pollInterval = setInterval(async () => {
  //         try {
  //           const result = await avatarAPI.status(talkId);

  //           if (result.data.status === "done") {
  //             clearInterval(pollInterval);

  //             setVideoUrl(result.data.result_url);

  //             resolve(result.data.result_url);
  //           }

  //           if (result.data.status === "failed") {
  //             clearInterval(pollInterval);

  //             reject(new Error("Avatar generation failed"));
  //           }
  //         } catch (err) {
  //           clearInterval(pollInterval);

  //           reject(err);
  //         }
  //       }, 3000);
  //     });
  //   } catch (err) {
  //     console.error("Avatar error", err);
  //   }
  // };
  const submitAnswer = async (submittedAnswer, fromAuto = false) => {
    if (interviewPhase !== "live") {
      return;
    }

    const trimmedAnswer = toText(submittedAnswer);

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
      stopListening();

      const response = await interviewAPI.review({
        setup: setupRef.current,
        sessionId: sessionIdRef.current,
        question: currentQuestionRef.current,
        answer: trimmedAnswer,
        history: historyRef.current,
      });

      const nextAnalysis = Array.isArray(response.data.analysis)
        ? response.data.analysis
        : [];
      const nextScores = {
        ...defaultScores,
        ...response.data.scores,
      };
      const nextQuestion =
        response.data.nextQuestion || currentQuestionRef.current;

      setReviewData({
        analysisPoints: nextAnalysis,
        scores: nextScores,
        summaryText: response.data.summary || "",
        improvedAnswer: response.data.improvedAnswer || "",
        improvedQuestion: response.data.improvedQuestion || "",
        nextQuestion,
        attemptNumber: response.data.attemptNumber || 1,
        shouldRetry: Boolean(response.data.shouldRetry),
        rate:
          Number(
            response.data.rate ?? response.data.result ?? nextScores.overall,
          ) || 0,
        result:
          Number(
            response.data.result ?? response.data.rate ?? nextScores.overall,
          ) || 0,
        total: Number(response.data.total || 10) || 10,
        statusText: response.data.shouldRetry
          ? response.data.retryQuestion || "Try the answer once more."
          : response.data.sessionState === "advance"
            ? "Moving to the next interview question."
            : "Interview feedback updated.",
      });

      setHistory((previous) => {
        const nextHistory = [
          ...previous,
          {
            question: currentQuestionRef.current,
            answer: trimmedAnswer,
            analysis: nextAnalysis,
            scores: nextScores,
            summary: response.data.summary || "",
            improvedAnswer: response.data.improvedAnswer || "",
            improvedQuestion: response.data.improvedQuestion || "",
            nextQuestion,
            attemptNumber: response.data.attemptNumber || 1,
            shouldRetry: Boolean(response.data.shouldRetry),
            rate:
              Number(
                response.data.rate ??
                  response.data.result ??
                  nextScores.overall,
              ) || 0,
            result:
              Number(
                response.data.result ??
                  response.data.rate ??
                  nextScores.overall,
              ) || 0,
            total: Number(response.data.total || 10) || 10,
          },
        ];

        historyRef.current = nextHistory;
        return nextHistory;
      });

      currentQuestionRef.current = nextQuestion;
      setCurrentQuestion(nextQuestion);
      // await playAvatar(nextQuestion);
      if (autoSpeakReply) {
        await speakReply(
          [response.data.summary, response.data.improvedAnswer, nextQuestion]
            .filter(Boolean)
            .join("\n\n"),
          () => {
            startListening();
          },
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

  useEffect(() => {
    submitAnswerRef.current = submitAnswer;
  }, [submitAnswer]);

  const finishInterview = async (reason = "manual") => {
    if (finishingRef.current || interviewPhase !== "live") {
      return;
    }

    finishingRef.current = true;
    setFinishingInterview(true);
    // eslint-disable-next-line no-console
    console.debug("[finishInterview] start", {
      reason,
      sessionId: sessionIdRef.current,
    });
    stopListening();
    stopPlayback();

    if (finishTimerRef.current) {
      clearInterval(finishTimerRef.current);
      finishTimerRef.current = null;
    }

    try {
      const response = await interviewAPI.finish({
        setup: setupRef.current,
        sessionId: sessionIdRef.current,
        history: historyRef.current,
        currentQuestion: currentQuestionRef.current,
        reason,
      });

      // eslint-disable-next-line no-console
      console.debug("[finishInterview] finish response", response?.data);
      setResultData({
        ...buildFinalResult(),
        ...response.data,
      });
    } catch {
      // eslint-disable-next-line no-console
      console.error("[finishInterview] error finishing interview");
      setResultData(buildFinalResult());
    } finally {
      // clear local restart marker so reloads don't auto-restart
      try {
        localStorage.removeItem("aiInterview.inProgress");
        localStorage.removeItem("aiInterview.setup");
      } catch (e) {}
      setInterviewPhase("result");
      setFinishingInterview(false);
      finishingRef.current = false;
      // try to clear session state on server and reset local sessionId
      try {
        if (sessionIdRef.current) {
          // eslint-disable-next-line no-console
          console.debug(
            "[finishInterview] clearing server session",
            sessionIdRef.current,
          );
          void interviewAPI.clear(sessionIdRef.current).catch((err) => {
            // eslint-disable-next-line no-console
            console.warn("[finishInterview] clear failed", err?.message || err);
          });
        }
      } catch (clearErr) {
        // eslint-disable-next-line no-console
        console.warn(
          "[finishInterview] clear attempt error",
          clearErr?.message || clearErr,
        );
      }
      sessionIdRef.current = "";
      setSessionId("");
    }
  };

  const startInterview = async (event) => {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }

    // delegate to internalStartInterview which accepts a setup object
    await internalStartInterview(setupRef.current);
  };

  const internalStartInterview = async (setupObj) => {
    const validationMessage = getSetupValidationMessage(setupObj);

    if (!isValidInterviewSetup(setupObj)) {
      setSetupError(
        validationMessage || "Please complete the interview setup.",
      );
      return;
    }

    const track = setupObj.track;

    if (track === "language") {
      if (!setupObj.language.trim() || !setupObj.languageLevel.trim()) {
        setSetupError(
          "Language and level are required to start the interview.",
        );
        return;
      }
    } else if (!setupObj.role.trim() || !setupObj.subjects.trim()) {
      setSetupError("Role and subjects are required to start the interview.");
      return;
    }

    try {
      setStartingInterview(true);
      setSetupError("");
      setError("");
      setResultData(null);
      setReviewData(buildEmptyReview());
      setHistory([]);
      historyRef.current = [];
      setAnswerText("");
      stopPlayback();

      const response = await interviewAPI.start(setupObj);

      const firstQuestion =
        response.data.question || "Please introduce yourself.";
      const nextSessionId = response.data.sessionId || "";
      const rawStartedAt = response.data.startedAt || Date.now();
      const nextStartedAt =
        typeof rawStartedAt === "number"
          ? rawStartedAt
          : Number(new Date(rawStartedAt)) || Date.now();
      const nextDurationMinutes =
        Number(response.data.durationMinutes) ||
        Number(setupObj.durationMinutes) ||
        3;

      setSessionId(nextSessionId);
      setSessionStartedAt(nextStartedAt);
      durationMinutesRef.current = nextDurationMinutes;
      sessionIdRef.current = nextSessionId;
      sessionStartedAtRef.current = nextStartedAt;

      currentQuestionRef.current = firstQuestion;
      setCurrentQuestion(firstQuestion);
      setInterviewPhase("live");
      // await playAvatar(firstQuestion);
      setTimeout(() => {
        startListening();
      }, 1000);
      // mark in localStorage so reloads auto-restart
      // try {
      //   localStorage.setItem("aiInterview.inProgress", "1");
      //   localStorage.setItem("aiInterview.setup", JSON.stringify(setupObj));
      // } catch (e) {}

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

  const restartInterview = () => {
    if (finishTimerRef.current) {
      clearInterval(finishTimerRef.current);
      finishTimerRef.current = null;
    }

    setInterviewPhase("setup");
    setResultData(null);
    setSessionId("");
    setSessionStartedAt(0);
    sessionIdRef.current = "";
    sessionStartedAtRef.current = 0;
    setTimeRemainingSeconds(0);
    setTimeElapsedSeconds(0);
    setCurrentQuestion("");
    setReviewData(buildEmptyReview());
    setHistory([]);
    historyRef.current = [];
    setError("");
    setSetupError("");
    setAnswerText("");
    setVoiceHint("Interview reset. Choose a new track to begin again.");
    stopListening();
    stopPlayback();
    try {
      localStorage.removeItem("aiInterview.inProgress");
      localStorage.removeItem("aiInterview.setup");
    } catch (e) {}
  };

  const replayFeedback = () => {
    void speakReply(
      [
        reviewData.summaryText,
        reviewData.improvedAnswer,
        reviewData.nextQuestion,
      ]
        .filter(Boolean)
        .join("\n\n"),
    );
  };

  return {
    setup,
    setupFields: getSetupFields(setup.track),
    interviewPhase,
    interviewStarted: interviewPhase === "live",
    interviewFinished: interviewPhase === "result",
    currentQuestion,
    analysisPoints: reviewData.analysisPoints,
    scores: reviewData.scores,
    summaryText: reviewData.summaryText,
    followUpQuestion: reviewData.nextQuestion,
    focusText: reviewData.statusText,
    improvedAnswer: reviewData.improvedAnswer,
    reviewData,
    history,
    startingInterview,
    loadingReview,
    error,
    setupError,
    autoSpeakReply,
    setAutoSpeakReply,
    autoSubmitSilence,
    setAutoSubmitSilence,
    answerText,
    setAnswerText,
    isListening,
    speechSupported,
    speechError,
    setSpeechError,
    voiceHint,
    setVoiceHint,
    updateSetupField,
    updateTrack,
    startInterview,
    submitAnswer,
    sendAnswer: submitAnswer,
    toggleListening,
    stopListening,
    replayFeedback,
    finishInterview,
    finishingInterview,
    resultData,
    restartInterview,
    sessionId,
    // videoUrl,
    timeRemainingLabel: formatDuration(timeRemainingSeconds),
    timeElapsedLabel: formatDuration(timeElapsedSeconds),
    totalTimeLabel: `${durationMinutesRef.current} minutes`,
  };
}
