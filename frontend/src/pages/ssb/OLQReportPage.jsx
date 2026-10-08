import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import RadarChart from "../../components/common/RadarChart.jsx";
import ShareButton from "../../components/common/ShareButton.jsx";
import api from "../../utils/api.js";

const TIPS = {
  "Effective Intelligence": "Show practical, quick solutions with the resources at hand rather than theory.",
  "Reasoning Ability": "Link cause and effect in your stories: why you act, not just what you do.",
  "Organising Ability": "Mention planning, delegation and use of people/resources in your reactions.",
  "Power of Expression": "Be clear and sequenced. Short sentences, one idea each, no filler.",
  "Social Adaptability": "Show that you mix easily, respect others' views and adjust to new groups.",
  Cooperation: "Let heroes work with a team, and credit others for success.",
  "Sense of Responsibility": "Take ownership: heroes who step up instead of waiting for someone else.",
  Initiative: "Start the action yourself: don't wait for orders in every situation.",
  "Self Confidence": "Use decisive language. Avoid 'maybe' or 'I will try'; say 'I will'.",
  "Speed of Decision": "In SRT/WAT, commit to the first practical action quickly.",
  "Ability to Influence the Group": "In GD, convince with logic and summarise; don't just agree or shout.",
  Liveliness: "Keep a positive, cheerful tone; show humour and energy in stories.",
  Determination: "Heroes who keep trying after a setback, with a clear goal.",
  Courage: "Show calm action in danger or for what is right, within realistic limits.",
  Stamina: "Show perseverance through long, tiring tasks, with no giving up halfway.",
};

export default function OLQReportPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/progress/olq").then((r) => setData(r.data)).catch(() => setError("Couldn't load your report."));
  }, []);

  if (error) return <div className="page-wrapper"><Navbar /><div className="ft-page"><div className="alert alert-error">{error}</div></div></div>;
  if (!data) return <div className="page-wrapper"><Navbar /><div className="ft-page text-center"><div className="spinner" style={{ margin: "60px auto" }} /></div></div>;

  const measured = Object.entries(data.olq).filter(([, v]) => v.avg !== null);
  const radar = Object.entries(data.olq).map(([k, v]) => ({ label: k.replace("Ability to Influence the Group", "Influence").replace("Sense of Responsibility", "Responsibility").replace("Effective Intelligence", "Eff. Intelligence"), value: v.avg ?? 0 }));
  const sourcesTotal = Object.values(data.sources).reduce((a, b) => a + b, 0);

  return (
    <div className="page-wrapper"><Navbar />
      <div className="ft-page">
        <div className="ft-between ft-wrap mb-24">
          <div>
            <h1 className="display-heading">Your OLQ report</h1>
            <p className="body-text mt-8">Built from {sourcesTotal} recent PPDT, TAT, WAT, SRT, SDT and GD sessions. It is AI-estimated practice feedback, not an official assessment.</p>
          </div>
          {measured.length > 0 && (
            <ShareButton card={{ title: "My top Officer Like Qualities", score: Math.round((measured.reduce((s, [, v]) => s + v.avg, 0) / measured.length) * 10) / 10, subtitle: `Strongest: ${data.strongest.join(", ")}`, lines: data.weakest.length ? [`Working on: ${data.weakest.join(", ")}`] : [] }} />
          )}
        </div>

        {measured.length < 3 ? (
          <div className="ft-panel text-center">
            <p className="body-text">Complete a few SSB-style tests to unlock your report. Each test reveals different qualities.</p>
            <button className="btn btn-primary mt-16" onClick={() => navigate("/ssb")}>Start practising</button>
          </div>
        ) : (
          <>
            <div className="ft-grid-2">
              <div className="ft-panel ft-center-col"><RadarChart data={radar} size={420} /></div>
              <div className="ft-panel">
                <h2 className="section-heading mb-8">The 4 factors</h2>
                <div className="ft-stack">
                  {Object.entries(data.factors).map(([f, v]) => (
                    <div key={f}>
                      <div className="ft-between"><span>{f}</span><strong>{v ?? "—"}</strong></div>
                      <div className="score-bar-track mt-8"><div className="score-bar-fill" style={{ width: `${((v || 0) / 10) * 100}%` }} /></div>
                    </div>
                  ))}
                </div>
                <h3 className="section-heading mt-24 mb-8">Strongest</h3>
                <div className="tag-list">{data.strongest.map((n) => <span key={n} className="tag">{n}</span>)}</div>
              </div>
            </div>

            <div className="ft-panel mt-16">
              <h2 className="section-heading mb-8">Work on these first</h2>
              <div className="ft-stack">
                {data.weakest.map((n) => (
                  <div key={n} className="ft-item-body"><strong>{n}</strong> · {data.olq[n].avg}/10<p className="body-text">{TIPS[n]}</p></div>
                ))}
              </div>
            </div>
          </>
        )}

        {data.unmeasured.length > 0 && measured.length >= 3 && (
          <div className="ft-panel mt-16">
            <h2 className="section-heading mb-8">Not measured yet</h2>
            <p className="body-text mb-8">Different tests reveal different qualities. Try a Group Discussion (influence, liveliness) or SRT (initiative, speed of decision).</p>
            <div className="tag-list">{data.unmeasured.map((n) => <span key={n} className="tag">{n}</span>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
