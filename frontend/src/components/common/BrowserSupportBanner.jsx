import React from "react";
import { speechSupported } from "../../hooks/useSpeech.js";

export default function BrowserSupportBanner({ message }) {
  if (speechSupported()) return null;
  return (
    <div className="alert alert-info" role="status" style={{ margin: "12px 0" }}>
      {message ||
        "Voice input works best in Google Chrome or Microsoft Edge on desktop/Android. In this browser you can type your answers instead."}
    </div>
  );
}
