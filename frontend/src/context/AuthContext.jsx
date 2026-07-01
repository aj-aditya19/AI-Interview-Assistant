import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("iq_token") || null);
  const [loading, setLoading] = useState(true);

  // On mount, if we have a stored token, fetch the user profile
  useEffect(() => {
    if (token) {
      api
        .get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          // Token is stale — clear it
          localStorage.removeItem("iq_token");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem("iq_token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("iq_token");
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    const res = await api.get("/auth/me");
    setUser(res.data);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
