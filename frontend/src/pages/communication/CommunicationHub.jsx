import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import content from "../../content/communication.json";
import vocabWords from "../../content/vocabWords.json";
import vocabBank from "../../content/vocabBank.json";
import { stats } from "../../utils/srs.js";
import { speak } from "../../utils/speak.js";
import "./CommunicationHub.css";

const ALL_VOCAB = [...vocabWords, ...vocabBank];

export default function CommunicationHub() {
  const navigate = useNavigate();
  const { hub } = content;

  const wotd = useMemo(() => {
    const day = Math.floor(Date.now() / 86400000);
    return vocabBank[day % vocabBank.length];
  }, []);
  const srs = useMemo(() => stats(ALL_VOCAB.map((w) => w.id)), []);

  return (
    <div className="comm-hub-page">
      <Navbar />
      <div className="container comm-hub-main">
        <h1 className="comm-hub-heading">{hub.heading}</h1>
        <p className="comm-hub-subheading">{hub.subheading}</p>

        <div className="ft-panel wotd">
          <div className="ft-between ft-wrap">
            <div>
              <span className="ft-muted">Word of the day · {wotd.level}</span>
              <h2 className="wotd-word">{wotd.word} <span className="wotd-hint">/ {wotd.hint} /</span></h2>
              <p className="body-text">{wotd.meaning}</p>
              <p className="wotd-example">“{wotd.example}”</p>
            </div>
            <div className="ft-row">
              <button className="btn btn-secondary" onClick={() => speak(wotd.word)} aria-label={`Hear ${wotd.word}`}>🔊 Hear it</button>
              <button className="btn btn-primary" onClick={() => navigate("/communication/sentence")}>Use it in a sentence</button>
            </div>
          </div>
        </div>

        <div className="ft-stats mt-16">
          <div className="ft-stat"><strong>{ALL_VOCAB.length}</strong><span>words in your bank</span></div>
          <div className="ft-stat"><strong>{srs.learned}</strong><span>words learned</span></div>
          <div className="ft-stat"><strong>{srs.due}</strong><span>due for review</span></div>
        </div>

        <div className="comm-hub-grid mt-24">
          {hub.cards.map((card) => (
            <button
              key={card.type}
              className="comm-hub-card"
              onClick={() => navigate(card.path || `/communication/practice/${card.type}`)}
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
