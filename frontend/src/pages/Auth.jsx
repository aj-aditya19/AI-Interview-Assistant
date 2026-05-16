import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        navigate("/home");
      } else {
        await authAPI.register(form);
        alert("Registered. Check OTP and verify.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input name="name" placeholder="Name" onChange={handleChange} />
        )}
        <br />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <br />
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Register" : "Login"}
      </button>
    </div>
  );
}

export default AuthPage;
