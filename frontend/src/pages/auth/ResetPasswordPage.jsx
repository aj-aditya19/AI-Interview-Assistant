import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import content from "../../content/auth.json";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const c = content.resetPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) { setError(content.errors.passwordTooShort); return; }
    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { newPassword: password });
      setDone(true);
      setTimeout(() => navigate("/auth"), 2500);
    } catch (err) {
      setError(err.response?.data?.message || content.errors.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div className="card">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", fontWeight: 700, marginBottom: 6 }}>
            {c.heading}
          </h2>
          <p className="body-text" style={{ marginBottom: 24 }}>{c.subheading}</p>

          {done ? (
            <div className="alert alert-success">{c.successMessage}</div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {error && <div className="alert alert-error">{error}</div>}
              <div className="form-group">
                <label className="form-label">{c.passwordLabel}</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder={c.passwordPlaceholder}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  autoComplete="new-password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? <span className="spinner" style={{ borderTopColor: "#fff" }} /> : c.submitButton}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
