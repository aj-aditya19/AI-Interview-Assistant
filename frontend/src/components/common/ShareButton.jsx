import React, { useState } from "react";
import { shareCard } from "../../utils/shareCard.js";

export default function ShareButton({ card, label = "Share result", className = "btn btn-secondary" }) {
  const [msg, setMsg] = useState("");
  const onClick = async () => {
    const r = await shareCard(card);
    if (r === "downloaded") setMsg("Image saved — post it anywhere!");
    else if (r === "shared") setMsg("");
    if (r !== "cancelled") setTimeout(() => setMsg(""), 3500);
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <button type="button" className={className} onClick={onClick}>{label}</button>
      {msg && <span className="form-hint">{msg}</span>}
    </span>
  );
}
