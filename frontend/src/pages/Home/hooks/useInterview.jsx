import { useEffect, useRef, useState } from "react";
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

export function useInterview() {
  const [setup, setSetup] = useState(defaultSetup);
  const [interviewPhase, setInterviewPhase] = useState("setup");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [analysisPoints, setAnalysisPoints] = useState([]);
  const [scores, setScores] = useState(defaultScores);
  const [summaryText, setSummaryText] = useState("");
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [focusText, setFocusText] = useState("");
  const [history, setHistory] = useState([]);
  const [startingInterview, setStartingInterview] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);
  const [finishingInterview, setFinishingInterview] = useState(false);
  const [error, setError] = useState("");
  const [setupError, setSetupError] = useState("");
  const [autoSpeakReply, setAutoSpeakReply] = useState(true);
  const [autoSubmitSilence, setAutoSubmitSilence] = useState(true);
  const [resultData, setResultData] = useState(null);

  const setupRef = useRef(defaultSetup);
  const currentQuestionRef = useRef("");
  const historyRef = useRef([]);
  const loadingReviewRef = useRef(false);
  const submittingRef = useRef(false);
  const finishingRef = useRef(false);
  const finishTimerRef = useRef(null);
  const submitAnswerRef = useRef(() => {});

  useEffect(() => {
    setupRef.current = setup;
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
    if (interviewPhase !== "live") {
      return undefined;
    }

    const durationMinutes = Number(setupRef.current.durationMinutes) || 3;

    finishTimerRef.current = window.setTimeout(
      () => {
        void finishInterview("time-limit");
      },
      durationMinutes * 60 * 1000,
    );

    return () => {
      if (finishTimerRef.current) {
        clearTimeout(finishTimerRef.current);
        finishTimerRef.current = null;
      }
    };
  }, [interviewPhase]);

  const { speakReply, stopPlayback } = useSpeechSynthesis({
    setSpeechError: setError,
  });

  const {
    answerText,
    setAnswerText,
    isListening,
    speechSupported,
    speechError,
    setSpeechError,
    voiceHint,
    setVoiceHint,
    toggleListening,
    stopListening,
  } = useSpeechRecognition({
    onAutoSubmit: (text, fromAuto) => submitAnswerRef.current(text, fromAuto),
    autoSubmitSilence,
    isBusy: loadingReview || startingInterview,
  });

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

      if (autoSpeakReply) {
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

  useEffect(() => {
    submitAnswerRef.current = submitAnswer;
  }, [submitAnswer]);

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
    scores,
    analysisPoints,
    summaryText,
    focusText,
    followUpQuestion,
  });

  const finishInterview = async (reason = "manual") => {
    if (finishingRef.current || interviewPhase !== "live") {
      return;
    }

    finishingRef.current = true;
    setFinishingInterview(true);
    stopListening();
    stopPlayback();

    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }

    try {
      const response = await interviewAPI.finish({
        setup: setupRef.current,
        history: historyRef.current,
        currentQuestion: currentQuestionRef.current,
        reason,
      });

      setResultData({
        ...buildFinalResult(),
        ...response.data,
      });
    } catch {
      setResultData(buildFinalResult());
    } finally {
      setInterviewPhase("result");
      setFinishingInterview(false);
      finishingRef.current = false;
    }
  };

  const restartInterview = () => {
    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }

    setInterviewPhase("setup");
    setResultData(null);
    setCurrentQuestion("");
    setAnalysisPoints([]);
    setScores(defaultScores);
    setSummaryText("");
    setFollowUpQuestion("");
    setFocusText("");
    setHistory([]);
    historyRef.current = [];
    setError("");
    setSetupError("");
    setAnswerText("");
    setVoiceHint("Interview reset. Choose a new track to begin again.");
    stopListening();
    stopPlayback();
  };

  const startInterview = async (event) => {
    event.preventDefault();

    const validationMessage = getSetupValidationMessage(setupRef.current);

    if (!isValidInterviewSetup(setupRef.current)) {
      setSetupError(
        validationMessage || "Please complete the interview setup.",
      );
      return;
    }

    const track = setupRef.current.track;

    if (track === "language") {
      if (
        !setupRef.current.language.trim() ||
        !setupRef.current.languageLevel.trim()
      ) {
        setSetupError(
          "Language and level are required to start the interview.",
        );
        return;
      }
    } else if (
      !setupRef.current.role.trim() ||
      !setupRef.current.skills.trim()
    ) {
      setSetupError("Role and skills are required to start the interview.");
      return;
    }

    try {
      setStartingInterview(true);
      setSetupError("");
      setError("");
      setResultData(null);
      setAnalysisPoints([]);
      setScores(defaultScores);
      setSummaryText("");
      setFollowUpQuestion("");
      setFocusText("");
      setHistory([]);
      historyRef.current = [];
      setAnswerText("");
      stopPlayback();

      const response = await interviewAPI.start(setupRef.current);
      const firstQuestion = response.data.question || "Tell me about yourself.";

      currentQuestionRef.current = firstQuestion;
      setCurrentQuestion(firstQuestion);
      setInterviewPhase("live");

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

  const replayFeedback = () => {
    void speakReply(
      [summaryText, followUpQuestion].filter(Boolean).join("\n\n"),
    );
  };

  return {
    setup,
    setupFields: getSetupFields(setup.track),
    interviewPhase,
    interviewStarted: interviewPhase === "live",
    interviewFinished: interviewPhase === "result",
    currentQuestion,
    analysisPoints,
    scores,
    summaryText,
    followUpQuestion,
    focusText,
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
  };
}
