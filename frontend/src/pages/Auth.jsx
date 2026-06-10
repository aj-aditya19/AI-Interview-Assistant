import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../global/toastContext";
import { authAPI } from "../utils/api";
import "../styles/Auth.css";

const POINTS = [
  {
    icon: "🎯",
    cls: "v",
    title: "Personalized Questions",
    desc: "Tailored to your role, stack and experience level",
  },
  {
    icon: "🎤",
    cls: "g",
    title: "Voice-First Practice",
    desc: "Speak your answers — just like the real interview",
  },
  {
    icon: "📊",
    cls: "o",
    title: "Instant AI Scoring",
    desc: "Accuracy, confidence, vocabulary scored live",
  },
  {
    icon: "🏆",
    cls: "y",
    title: "Full Result Report",
    desc: "Strengths, gaps and next steps after every session",
  },
];

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError, showSuccess } = useToast();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const r = await authAPI.login({
          email: form.email,
          password: form.password,
        });
        login(r.data.token, r.data.user);
        showSuccess("Welcome back! 🎉");
        navigate("/home");
      } else {
        const r = await authAPI.register(form);
        login(r.data.token, r.data.user);
        showSuccess("Account created! Let's ace those interviews 🚀");
        navigate("/home");
      }
    } catch (err) {
      showError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-copy">
          <span className="auth-eyebrow">⚡ AI-Powered Interview Prep</span>
          <h2>
            Land your dream <span>internship</span> or job
          </h2>
          <p>
            Practice with a real AI interviewer, get instant feedback, and
            improve fast.
          </p>
          <div className="auth-points">
            {POINTS.map((p) => (
              <div key={p.title} className="auth-point">
                <div className={`auth-pt-icon ${p.cls}`}>{p.icon}</div>
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-card-top">
            <span className="auth-chip">
              {isLogin ? "Sign in" : "Join now"}
            </span>
            <button
              className="auth-switch"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Need an account?" : "Have one already?"}
            </button>
          </div>

          <h3 className="auth-title">
            {isLogin ? "Welcome back 👋" : "Get started free"}
          </h3>

          <form className="auth-form" onSubmit={onSubmit}>
            {!isLogin && (
              <div className="auth-group">
                <label>Full name</label>
                <input
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>
            )}
            <div className="auth-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="auth-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>
            <button className="auth-submit" type="submit" disabled={loading}>
              {loading
                ? "Please wait…"
                : isLogin
                  ? "Sign In →"
                  : "Create Account →"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AuthPage;
