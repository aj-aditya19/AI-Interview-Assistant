import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/common/Navbar.jsx";
import api from "../utils/api.js";
import content from "../content/home.json";
import "./HomePage.css";

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifyLoading, setNotifyLoading] = useState("");
  const [notifyMsg, setNotifyMsg] = useState("");

  const handleNotify = async (feature) => {
    setNotifyLoading(feature);
    try {
      await api.post("/waitlist", { feature });
      setNotifyMsg(content.notifySuccess);
    } catch (err) {
      if (err.response?.status === 409) {
        setNotifyMsg(content.notifyAlready);
      }
    } finally {
      setNotifyLoading("");
      setTimeout(() => setNotifyMsg(""), 4000);
    }
  };

  const stats = user?.stats || {};

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container home-container">
        <div className="home-header">
          <div>
            <h1 className="display-heading">
              {greeting()}, {user?.fullName?.split(" ")[0]} 👋
            </h1>
            <p className="body-text mt-8">{content.subtitle}</p>
          </div>
        </div>

        <div className="home-stats">
          {[
            {
              label: content.stats.interviews,
              value: stats.totalInterviews ?? 0,
            },
            { label: content.stats.ppdt, value: stats.totalPPDTSessions ?? 0 },
            {
              label: content.stats.avgScore,
              value: stats.averageInterviewScore
                ? `${stats.averageInterviewScore}/10`
                : "—",
            },
            {
              label: content.stats.bestScore,
              value: stats.bestInterviewScore
                ? `${stats.bestInterviewScore}/10`
                : "—",
            },
          ].map((stat) => (
            <div key={stat.label} className="stat-card card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {notifyMsg && (
          <div className="alert alert-success mt-16">{notifyMsg}</div>
        )}

        <div className="home-tiles">
          <div className="module-tile card">
            <div className="tile-header">
              <div className="tile-icon tile-icon-primary">🎙️</div>
              <span className="badge badge-live">
                {content.tiles.interview.tag}
              </span>
            </div>
            <h3 className="tile-title">{content.tiles.interview.title}</h3>
            <p className="tile-desc">{content.tiles.interview.description}</p>
            <button
              className="btn btn-primary mt-20"
              onClick={() => navigate("/interview/setup")}
            >
              {content.tiles.interview.buttonText}
            </button>
          </div>

          <div className="module-tile card">
            <div className="tile-header">
              <div className="tile-icon tile-icon-secondary">🖼️</div>
              <span className="badge badge-live">{content.tiles.ppdt.tag}</span>
            </div>
            <h3 className="tile-title">{content.tiles.ppdt.title}</h3>
            <p className="tile-desc">{content.tiles.ppdt.description}</p>
            <button
              className="btn btn-primary mt-20"
              onClick={() => navigate("/ppdt/setup")}
            >
              {content.tiles.ppdt.buttonText}
            </button>
          </div>

          <div className="module-tile card">
            <div className="tile-header">
              <div className="tile-icon tile-icon-secondary">💬</div>
              <span className="badge badge-live">
                {content.tiles.communication.tag}
              </span>
            </div>
            <h3 className="tile-title">{content.tiles.communication.title}</h3>
            <p className="tile-desc">
              {content.tiles.communication.description}
            </p>
            <button
              className="btn btn-primary mt-20"
              onClick={() => navigate("/communication")}
            >
              {content.tiles.communication.buttonText}
            </button>
          </div>

          <div className="module-tile card tile-disabled">
            <div className="tile-header">
              <div className="tile-icon tile-icon-muted">📄</div>
              <span className="badge badge-muted">
                {content.tiles.ats.badge}
              </span>
            </div>
            <h3 className="tile-title">{content.tiles.ats.title}</h3>
            <p className="tile-desc">{content.tiles.ats.description}</p>
            <button
              className="btn btn-ghost mt-20"
              onClick={() => handleNotify("ats")}
              disabled={notifyLoading === "ats"}
            >
              {notifyLoading === "ats" ? (
                <span className="spinner" />
              ) : (
                content.tiles.ats.buttonText
              )}
            </button>
          </div>
        </div>

        <div className="home-quick mt-24">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate("/interview/history")}
          >
            View past interviews →
          </button>
        </div>
      </div>
    </div>
  );
}
