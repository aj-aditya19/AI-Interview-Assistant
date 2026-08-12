import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const navLinks = [
    { label: "Dashboard", path: "/home" },
    { label: "Interview", path: "/interview/setup" },
    { label: "PPDT", path: "/ppdt/setup" },
    { label: "Communication", path: "/communication" },
    { label: "History", path: "/interview/history" },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <button className="navbar-logo" onClick={() => navigate("/home")}>
          <span className="logo-icon">IQ</span>
          <span className="logo-text">InterviewIQ</span>
        </button>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <button
              key={link.path}
              className={`navbar-link ${location.pathname.startsWith(link.path.split("/")[1] === "home" ? "/home" : `/${link.path.split("/")[1]}`) ? "active" : ""}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="navbar-user">
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
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map((link) => (
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
