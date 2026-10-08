import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getTheme, setTheme } from "../../utils/theme.js";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Dashboard", path: "/home", match: "/home" },
  { label: "Interview", path: "/interview/setup", match: "/interview" },
  { label: "PPDT", path: "/ssb", match: ["/ssb", "/ppdt"] },
  { label: "English", path: "/communication", match: "/communication" },
  { label: "Resume", path: "/resume", match: "/resume" },
  { label: "Progress", path: "/progress", match: "/progress" },
];

const isActive = (pathname, match) =>
  (Array.isArray(match) ? match : [match]).some((m) => pathname.startsWith(m));

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setThemeState] = useState(getTheme());

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  };

  const s = user?.gamification?.streak;
  const today = new Date().toLocaleDateString("en-CA");
  const yest = new Date(Date.now() - 86400000).toLocaleDateString("en-CA");
  const streak =
    s && (s.lastDate === today || s.lastDate === yest) ? s.current : 0;

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <button className="navbar-logo" onClick={() => navigate("/home")}>
          <span className="logo-icon">IQ</span>
          <span className="logo-text">InterviewIQ</span>
        </button>

        <div className="navbar-links">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              className={`navbar-link ${isActive(location.pathname, link.match) ? "active" : ""}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="navbar-user">
          {streak > 0 && (
            <button
              className="navbar-streak"
              onClick={() => navigate("/progress")}
              title="Practice streak"
            >
              🔥 {streak}
            </button>
          )}
          <button
            className="navbar-theme"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <div className="user-avatar" title={user?.fullName}>
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.fullName} />
            ) : (
              <span>{user?.fullName?.[0]?.toUpperCase() || "U"}</span>
            )}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            Sign out
          </button>
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              className="mobile-nav-link"
              onClick={() => {
                navigate(link.path);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </button>
          ))}
          <button className="mobile-nav-link" onClick={toggleTheme}>
            {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
          <button
            className="mobile-nav-link"
            style={{ color: "var(--color-error)" }}
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
}
