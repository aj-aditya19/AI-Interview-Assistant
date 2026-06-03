import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../global/toastContext";

import { authAPI } from "../utils/api";

import "../styles/Auth.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  const { showError, showSuccess } = useToast();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await authAPI.login({
          email: form.email,
          password: form.password,
        });

        login(res.data.token, res.data.user);

        showSuccess("Login successful");

        navigate("/home");
      } else {
        const res = await authAPI.register(form);

        login(res.data.token, res.data.user);

        showSuccess("Registration successful");

        navigate("/home");
      }
    } catch (err) {
      showError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-card">
          <div className="auth-card-top">
            <span className="auth-card-chip">
              {isLogin ? "Sign in" : "Join now"}
            </span>
            <button
              className="auth-switch"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Need an account?" : "Already have an account?"}
            </button>
          </div>

          <h3 className="auth-form-title">{isLogin ? "Login" : "Register"}</h3>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit" className="auth-submit">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </section>
        <section className="auth-copy-panel">
          <p className="auth-eyebrow">Private workspace</p>
          <h2 className="auth-title">
            {isLogin ? "Welcome back" : "Create your profile"}
          </h2>
          <p className="auth-subtitle">
            {isLogin
              ? "Continue your tracked interview sessions with a clean, distraction-free interface."
              : "Set up your account once, then start interviews for internship, job, or language practice."}
          </p>

          <div className="auth-points">
            <div className="auth-point">
              <strong>Fast entry</strong>
              <span>Email and password login with instant access.</span>
            </div>
            <div className="auth-point">
              <strong>Track aware</strong>
              <span>
                Internship, job, and language flows live in one place.
              </span>
            </div>
            <div className="auth-point">
              <strong>Clean review</strong>
              <span>
                Clear scores, feedback, and final results after each session.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthPage;
