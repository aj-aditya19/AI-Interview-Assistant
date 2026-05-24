import { useEffect, useRef } from "react";
import { speechAPI } from "../../../utils/api";

export function useSpeechSynthesis({ setSpeechError }) {
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  };

  useEffect(() => stopPlayback, []);

  const speakReply = async (text) => {
    const trimmedText = String(text || "").trim();

    if (!trimmedText) {
      return;
    }

    try {
      stopPlayback();

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

  return { speakReply, stopPlayback };
}
