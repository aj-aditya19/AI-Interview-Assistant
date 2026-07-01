import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import content from "../../content/admin.json";
import "./AdminLoginPage.css";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const c = content.login;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      if (res.data.user.role !== "admin") {
        setError(c.notAdmin);
        return;
      }
      localStorage.setItem("iq_token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card card">
        <div className="admin-login-logo">
          <div className="admin-logo-icon">IQ</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>InterviewIQ</div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Admin portal</div>
          </div>
        </div>

        <h2 className="section-heading mt-24 mb-8">{c.heading}</h2>
        <p className="body-text mb-24" style={{ fontSize: "0.875rem" }}>{c.subheading}</p>

        {error && <div className="alert alert-error mb-16">{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="form-group">
            <label className="form-label">{c.emailLabel}</label>
            <input
              className="form-input"
              type="email"
              placeholder={c.emailPlaceholder}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">{c.passwordLabel}</label>
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? <span className="spinner" style={{ borderTopColor: "#fff" }} /> : c.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
}
