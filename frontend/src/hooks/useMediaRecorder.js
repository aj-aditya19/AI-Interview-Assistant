import { useState, useRef, useCallback } from 'react';

export default function useMediaRecorder() {
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [permissionError, setPermissionError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const videoRef = useRef(null);

  const requestPermissions = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      setPermissionError(null);
      if (videoRef.current) videoRef.current.srcObject = s;
      return s;
    } catch (err) {
      setPermissionError('Camera/microphone access denied. Please allow permissions.');
      return null;
    }
  }, []);

  const startRecording = useCallback((streamToRecord) => {
    const s = streamToRecord || stream;
    if (!s) return;
    chunksRef.current = [];
    const mr = new MediaRecorder(s, { mimeType: 'video/webm;codecs=vp9,opus' });
    mediaRecorderRef.current = mr;
    mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.start(500);
    setRecording(true);
  }, [stream]);

  const stopRecording = useCallback(() => {
    return new Promise((resolve) => {
      const mr = mediaRecorderRef.current;
      if (!mr || mr.state === 'inactive') { resolve(null); return; }
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecording(false);
        resolve(blob);
      };
      mr.stop();
    });
  }, []);

  const stopStream = useCallback(() => {
    if (stream) stream.getTracks().forEach((t) => t.stop());
    setStream(null);
    setRecording(false);
  }, [stream]);

  return {
    stream, recording, permissionError, videoRef,
    requestPermissions, startRecording, stopRecording, stopStream,
  };
}
