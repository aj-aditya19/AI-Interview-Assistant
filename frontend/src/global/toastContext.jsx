import { createContext, useContext, useEffect, useRef, useState } from "react";

import ErrorToast from "./error";
import SuccessToast from "./success";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);
  const startedAtRef = useRef(0);
  const remainingRef = useRef(4000);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const dismissToast = () => {
    clearTimer();
    remainingRef.current = 4000;
    startedAtRef.current = 0;
    setToast(null);
  };

  const startTimer = (duration = remainingRef.current) => {
    clearTimer();
    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      dismissToast();
    }, duration);
  };

  const showToast = (type, message) => {
    remainingRef.current = 4000;
    setToast({ type, message });
    startTimer(4000);
  };

  const showError = (message) => {
    showToast("error", message);
  };

  const showSuccess = (message) => {
    showToast("success", message);
  };

  const pauseToast = () => {
    if (!toast || !timerRef.current) {
      return;
    }

    const elapsed = Date.now() - startedAtRef.current;
    remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    clearTimer();
  };

  const resumeToast = () => {
    if (!toast || timerRef.current || remainingRef.current <= 0) {
      return;
    }

    startTimer(remainingRef.current);
  };

  useEffect(() => clearTimer, []);

  return (
    <ToastContext.Provider value={{ showError, showSuccess }}>
      {children}

      {toast?.type === "error" && (
        <ErrorToast
          message={toast.message}
          onClose={dismissToast}
          onMouseEnter={pauseToast}
          onMouseLeave={resumeToast}
        />
      )}

      {toast?.type === "success" && (
        <SuccessToast
          message={toast.message}
          onClose={dismissToast}
          onMouseEnter={pauseToast}
          onMouseLeave={resumeToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
