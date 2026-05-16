import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "../styles/Home.css";

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get("/home");
      } catch (err) {
        logout();
        navigate("/auth");
      }
    };
    fetchData();
  }, [logout, navigate]);

  if (!user) return <p className="home-loading">Loading user info...</p>;

  return (
    <div className="home-page">
      <div className="home-card">
        <h2>Welcome Back</h2>
        <p>
          Hello, <strong>{user.name}</strong>. Your practice session is ready.
        </p>
        <button
          onClick={() => {
            logout();
            navigate("/auth");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
