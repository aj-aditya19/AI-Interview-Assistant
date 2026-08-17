import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import content from "../../content/auth.json";
import "./AuthPage.css";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const c = content[mode];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError(content.errors.required);
      return;
    }
    if (mode === "register" && !form.fullName) {
      setError(content.errors.required);
      return;
    }
    if (form.password.length < 6) {
      setError(content.errors.passwordTooShort);
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : {
              fullName: form.fullName,
              email: form.email,
              password: form.password,
              phoneNumber: form.phoneNumber,
            };

      const res = await api.post(endpoint, payload);
      login(res.data.token, res.data.user);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || content.errors.genericError);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
    setForm({ fullName: "", email: "", password: "", phoneNumber: "" });
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo">IQ</div>
          <h1 className="auth-brand-name">InterviewIQ</h1>
        </div>
        <div className="auth-tagline">
          <p>Practice smarter.</p>
          <p>Interview better.</p>
        </div>
        <ul className="auth-features">
          <li>AI-powered mock interviews with real-time feedback</li>
          <li>HR, Technical, and behavioral rounds</li>
          <li>PPDT practice for SSB aspirants</li>
          <li>Detailed performance reports after every session</li>
        </ul>
      </div>

      <div className="auth-right">
        <div className="auth-form-card">
          <h2 className="auth-heading">{c.heading}</h2>
          <p className="auth-subheading">{c.subheading}</p>

          {error && <div className="alert alert-error mt-16">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {mode === "register" && (
              <div className="form-group">
                <label className="form-label">{c.nameLabel}</label>
                <input
                  className="form-input"
                  type="text"
                  name="fullName"
                  placeholder={c.namePlaceholder}
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">{c.emailLabel}</label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder={c.emailPlaceholder}
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {mode === "register" && (
              <div className="form-group">
                <label className="form-label">{c.phoneLabel}</label>
                <input
                  className="form-input"
                  type="tel"
                  name="phoneNumber"
                  placeholder={c.phonePlaceholder}
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <div className="flex justify-between items-center">
                <label className="form-label">{c.passwordLabel}</label>
                {mode === "login" && (
                  <Link to="/forgot-password" className="auth-forgot">
                    {content.login.forgotPassword}
                  </Link>
                )}
              </div>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder={c.passwordPlaceholder}
                value={form.password}
                onChange={handleChange}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full mt-8"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" style={{ borderTopColor: "#fff" }} />
              ) : (
                c.submitButton
              )}
            </button>
          </form>

          <p className="auth-switch">
            {mode === "login"
              ? content.login.noAccount
              : content.register.hasAccount}{" "}
            <button className="auth-switch-btn" onClick={switchMode}>
              {mode === "login"
                ? content.login.registerLink
                : content.register.loginLink}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
