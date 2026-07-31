import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import content from "../../content/communication.json";
import "./CommunicationHub.css";

export default function CommunicationHub() {
  const navigate = useNavigate();
  const { hub } = content;

  return (
    <div className="comm-hub-page">
      <Navbar />
      <div className="container comm-hub-main">
        <h1 className="comm-hub-heading">{hub.heading}</h1>
        <p className="comm-hub-subheading">{hub.subheading}</p>

        <div className="comm-hub-grid">
          {hub.cards.map((card) => (
            <button
              key={card.type}
              className="comm-hub-card"
              onClick={() => navigate(`/communication/practice/${card.type}`)}
            >
              <h3 className="comm-hub-card-title">{card.title}</h3>
              <p className="comm-hub-card-desc">{card.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
