import { useRef, useState, useCallback, useEffect } from "react";

export const speechSupported = () =>
  typeof window !== "undefined" &&
  !!(window.SpeechRecognition || window.webkitSpeechRecognition);

export default function useSpeech({ lang = "en-IN" } = {}) {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const recRef = useRef(null);
  const finalRef = useRef("");
  const startedAt = useRef(0);
  const [seconds, setSeconds] = useState(0);
  const supported = speechSupported();

  const stop = useCallback(() => {
    recRef.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(() => {
    if (!supported) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = lang;
    finalRef.current = "";
    setText("");
    setError("");
    startedAt.current = Date.now();

    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const piece = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalRef.current += piece + " ";
        else interim += piece;
      }
      setText((finalRef.current + " " + interim).trim());
    };
    rec.onerror = (e) => {
      if (e.error !== "no-speech" && e.error !== "aborted")
        setError(`Microphone error: ${e.error}`);
      setListening(false);
    };
    rec.onend = () => {
      setSeconds(Math.round((Date.now() - startedAt.current) / 1000));
      setListening(false);
    };
    rec.start();
    recRef.current = rec;
    setListening(true);
  }, [lang, supported]);

  const reset = useCallback(() => {
    finalRef.current = "";
    setText("");
    setSeconds(0);
  }, []);

  useEffect(() => () => recRef.current?.abort?.(), []);

  return {
    text,
    setText,
    listening,
    start,
    stop,
    reset,
    error,
    supported,
    seconds,
  };
}
