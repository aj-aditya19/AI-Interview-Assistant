import { useEffect, useRef, useState } from "react";
import { initialVoiceHint } from "../utils/constatns.jsx";

export function useSpeechRecognition({
  onAutoSubmit,
  autoSubmitSilence,
  isBusy,
}) {
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const answerTextRef = useRef("");
  const isListeningRef = useRef(false);
  const onAutoSubmitRef = useRef(onAutoSubmit);
  const autoSubmitRef = useRef(autoSubmitSilence);
  const busyRef = useRef(isBusy);

  const [answerText, setAnswerText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState("");
  const [voiceHint, setVoiceHint] = useState(initialVoiceHint);

  useEffect(() => {
    onAutoSubmitRef.current = onAutoSubmit;
  }, [onAutoSubmit]);

  useEffect(() => {
    autoSubmitRef.current = autoSubmitSilence;
  }, [autoSubmitSilence]);

  useEffect(() => {
    busyRef.current = isBusy;
  }, [isBusy]);

  useEffect(() => {
    answerTextRef.current = answerText;
  }, [answerText]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  const scheduleAutoSubmit = (text) => {
    clearSilenceTimer();

    if (!autoSubmitRef.current || busyRef.current || !isListeningRef.current) {
      return;
    }

    silenceTimerRef.current = setTimeout(() => {
      const trimmed = String(text || answerTextRef.current || "").trim();

      if (trimmed && isListeningRef.current && !busyRef.current) {
        onAutoSubmitRef.current?.(trimmed, true);
      }
    }, 6000);
  };

  useEffect(() => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSpeechSupported(false);
      setSpeechError("Voice input is not supported in this browser.");
      return undefined;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      const nextText = (finalTranscript + interimTranscript).trim();

      setAnswerText(nextText);

      setSpeechError("");
      setVoiceHint("Listening... pause to submit automatically.");

      if (nextText) {
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
      if (isListeningRef.current) {
        try {
          recognition.start();
          return;
        } catch {}
      }

      setIsListening(false);
      clearSilenceTimer();
    };
    recognitionRef.current = recognition;

    return () => {
      clearSilenceTimer();
      recognition.abort();
    };
  }, []);

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

  const startListening = () => {
    if (!recognitionRef.current || !speechSupported) {
      setSpeechError("Voice input is not available in this browser.");
      return false;
    }

    setSpeechError("");

    try {
      recognitionRef.current.start();
      setIsListening(true);
      setVoiceHint("Listening for your answer.");
      return true;
    } catch {
      setSpeechError("Microphone could not be started. Try again.");
      setIsListening(false);
      return false;
    }
  };

  const toggleListening = () => {
    if (isListeningRef.current) {
      stopListening();
      return;
    }

    startListening();
  };

  return {
    answerText,
    setAnswerText,
    isListening,
    speechSupported,
    speechError,
    setSpeechError,
    voiceHint,
    setVoiceHint,
    startListening,
    stopListening,
    toggleListening,
    clearSilenceTimer,
  };
}
