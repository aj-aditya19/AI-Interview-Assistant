import { useState, useRef, useCallback, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

export default function useSpeechRecognition() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [isSupported] = useState(!!SpeechRecognition);
  const recognitionRef = useRef(null);
  const accumulatedRef = useRef('');

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const start = useCallback(() => {
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser. Please use Chrome.');
      return;
    }
    setError(null);
    accumulatedRef.current = '';
    setTranscript('');

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e) => {
      if (e.error !== 'no-speech') setError(`Speech error: ${e.error}`);
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let interim = '';
      let finalPart = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalPart += t + ' ';
        } else {
          interim += t;
        }
      }
      accumulatedRef.current += finalPart;
      setTranscript(accumulatedRef.current + interim);
    };

    recognition.start();
  }, []);

  const reset = useCallback(() => {
    stop();
    accumulatedRef.current = '';
    setTranscript('');
    setError(null);
  }, [stop]);

  useEffect(() => () => stop(), [stop]);

  return { transcript, isListening, error, isSupported, start, stop, reset, setTranscript };
}
