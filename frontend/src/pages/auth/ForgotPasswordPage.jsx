import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api.js";
import content from "../../content/auth.json";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const c = content.forgotPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError(content.errors.required); return; }
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || content.errors.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ marginBottom: 8 }}>
          <Link to="/auth" style={{ fontSize: "0.875rem", color: "var(--color-primary)", display: "inline-flex", alignItems: "center", gap: 4 }}>
            ← {c.backToLogin}
          </Link>
        </div>
        <div className="card mt-16">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", fontWeight: 700, marginBottom: 6 }}>
            {c.heading}
          </h2>
          <p className="body-text" style={{ marginBottom: 24 }}>{c.subheading}</p>

          {sent ? (
            <div className="alert alert-success">{c.successMessage}</div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {error && <div className="alert alert-error">{error}</div>}
              <div className="form-group">
                <label className="form-label">{c.emailLabel}</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder={c.emailPlaceholder}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
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
