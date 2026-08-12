import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import content from "../../content/auth.json";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const c = content.forgotPassword;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError(content.errors.required);
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setOtpSent(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || content.errors.genericError);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError(content.errors.passwordTooShort);
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password-otp", {
        email,
        otp,
        newPassword,
      });
      setError("");
      navigate("/auth", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || content.errors.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ marginBottom: 8 }}>
          <Link
            to="/auth"
            style={{
              fontSize: "0.875rem",
              color: "var(--color-primary)",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ← {c.backToLogin}
          </Link>
        </div>
        <div className="card mt-16">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.375rem",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {c.heading}
          </h2>
          <p className="body-text" style={{ marginBottom: 24 }}>
            {c.subheading}
          </p>

          {!otpSent ? (
            <form
              onSubmit={handleSendOtp}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {error && <div className="alert alert-error">{error}</div>}
              <div className="form-group">
                <label className="form-label">{c.emailLabel}</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder={c.emailPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner"
                    style={{ borderTopColor: "#fff" }}
                  />
                ) : (
                  c.submitButton
                )}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleResetPassword}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div className="alert alert-success">{c.successMessage}</div>
              {error && <div className="alert alert-error">{error}</div>}

              <div className="form-group">
                <label className="form-label">{c.otpLabel}</label>
                <input
                  className="form-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder={c.otpPlaceholder}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError("");
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{c.newPasswordLabel}</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder={c.newPasswordPlaceholder}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner"
                    style={{ borderTopColor: "#fff" }}
                  />
                ) : (
                  c.confirmButton
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
