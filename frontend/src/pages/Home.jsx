import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/home");
      } catch (err) {
        logout();
        navigate("/auth");
      }
    };
    fetchData();
  }, []);

  if (!user) return <p>Loading user info...</p>;

  return (
    <div style={{ padding: "50px" }}>
      <h2>Home</h2>
      <p>
        Welcome, <strong>{user.name}</strong>!
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
  );
}

export default HomePage;
