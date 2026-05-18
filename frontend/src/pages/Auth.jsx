import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../utils/api";
import "../styles/Auth.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const res = await authAPI.login({
          email: form.email,
          password: form.password,
        });
        login(res.data.token, res.data.user);
        navigate("/home");
      } else {
        const res = await authAPI.register(form);
        login(res.data.token, res.data.user);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">{isLogin ? "Login" : "Register"}</h2>
        <p className="auth-subtitle">
          {isLogin
            ? "Access your interview practice dashboard"
            : "Create your account to start practicing"}
        </p>

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

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <button className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
