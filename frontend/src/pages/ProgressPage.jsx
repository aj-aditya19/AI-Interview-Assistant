import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import TrendChart from "../components/common/TrendChart.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../utils/api.js";

const TYPE_LABEL = { interview: "Interview", ppdt: "PPDT", tat: "TAT", wat: "WAT", srt: "SRT", sdt: "SDT", gd: "GD" };

export default function ProgressPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [s, setS] = useState(null);
  const [board, setBoard] = useState(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const load = () => {
    api.get("/progress/summary").then((r) => { setS(r.data); setName(r.data.preferences?.displayName || ""); }).catch(() => {});
    api.get("/progress/leaderboard").then((r) => setBoard(r.data)).catch(() => {});
  };
  useEffect(load, []);

  const saveSettings = async (patch) => {
    setMsg("");
    try { await api.patch("/progress/settings", patch); await refreshUser(); load(); setMsg("Saved"); setTimeout(() => setMsg(""), 2000); }
    catch (e) { setMsg(e.response?.data?.message || "Couldn't save"); }
  };

  if (!s) return <div className="page-wrapper"><Navbar /><div className="ft-page text-center"><div className="spinner" style={{ margin: "60px auto" }} /></div></div>;

  const into = s.xp - s.levelStartXP, span = s.nextLevelXP - s.levelStartXP;
  const maxDay = Math.max(1, ...s.days.map((d) => d.sessions));
  const trend = s.trend.map((t) => ({ label: `${TYPE_LABEL[t.type] || t.type} · ${new Date(t.date).toLocaleDateString()}`, value: t.score }));

  return (
    <div className="page-wrapper"><Navbar />
      <div className="ft-page">
        <h1 className="display-heading">Your progress</h1>

        <div className="ft-grid-2 mt-24">
          <div className="ft-panel">
            <div className="ft-between"><h2 className="section-heading">Level {s.level}</h2><span className="ft-muted">{s.xp} XP</span></div>
            <div className="xp-track mt-12" role="progressbar" aria-valuenow={into} aria-valuemin={0} aria-valuemax={span}><div className="xp-fill" style={{ width: `${Math.min(100, (into / span) * 100)}%` }} /></div>
            <p className="form-hint mt-8">{s.nextLevelXP - s.xp} XP to level {s.level + 1}</p>
            <div className="ft-stats mt-16">
              <div className="ft-stat"><strong>🔥 {s.streak.current}</strong><span>day streak</span></div>
              <div className="ft-stat"><strong>{s.streak.longest}</strong><span>best streak</span></div>
              <div className="ft-stat"><strong>{s.weeklyXP}</strong><span>XP this week</span></div>
            </div>
          </div>
          <div className="ft-panel">
            <h2 className="section-heading mb-8">Last 14 days</h2>
            <div className="heat" role="img" aria-label="Practice activity for the last 14 days">
              {s.days.map((d) => (
                <div key={d.date} className="heat-cell" title={`${d.date}: ${d.sessions} sessions`} style={{ opacity: d.sessions ? 0.3 + 0.7 * (d.sessions / maxDay) : 0.12 }} />
              ))}
            </div>
            <p className="form-hint mt-12">Today: {s.todaySessions} / {s.dailyGoal} sessions (daily goal)</p>
          </div>
        </div>

        <div className="ft-panel mt-16">
          <h2 className="section-heading mb-8">Score trend</h2>
          <TrendChart points={trend} />
        </div>

        {Object.keys(s.skills).length > 0 && (
          <div className="ft-panel mt-16">
            <h2 className="section-heading mb-8">Interview skills (last 5 interviews)</h2>
            <div className="ft-stack">
              {Object.entries(s.skills).sort((a, b) => a[1] - b[1]).map(([k, v]) => (
                <div key={k}>
                  <div className="ft-between"><span style={{ textTransform: "capitalize" }}>{k}{k === s.weakest ? " · focus here" : ""}</span><strong>{v}</strong></div>
                  <div className="score-bar-track mt-8"><div className="score-bar-fill" style={{ width: `${v * 10}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="ft-panel mt-16">
          <h2 className="section-heading mb-8">Badges</h2>
          <div className="badge-grid">
            {s.allBadges.map((b) => (
              <div key={b.id} className={`badge-tile ${b.earned ? "earned" : ""}`}>
                <span aria-hidden="true">{b.earned ? "🏅" : "🔒"}</span>
                <strong>{b.title}</strong><small>{b.desc}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-panel mt-16">
          <div className="ft-between ft-wrap"><h2 className="section-heading">Weekly leaderboard</h2><span className="ft-muted">{board?.week}</span></div>
          {board?.rows?.length ? (
            <div className="ft-stack mt-12">
              {board.rows.map((r) => (
                <div key={r.rank} className={`leader-row ${r.me ? "me" : ""}`}>
                  <span className="leader-rank">{r.rank}</span><span className="leader-name">{r.name}</span><span className="ft-muted">Lv {r.level}</span><strong>{r.xp} XP</strong>
                </div>
              ))}
            </div>
          ) : <p className="body-text mt-8">No one is on the board yet this week. Be the first!</p>}

          <div className="ft-divider" />
          <h3 className="section-heading mb-8">Join the leaderboard</h3>
          <p className="form-hint mb-8">Only your display name and XP are shown, never your real name or email.</p>
          <div className="ft-row ft-wrap">
            <input className="form-input" style={{ maxWidth: 240 }} value={name} onChange={(e) => setName(e.target.value)} maxLength={24} placeholder="Display name" aria-label="Display name" />
            <button className="btn btn-secondary" onClick={() => saveSettings({ displayName: name, showOnLeaderboard: true })} disabled={!name.trim()}>
              {s.preferences?.showOnLeaderboard ? "Update name" : "Join"}
            </button>
            {s.preferences?.showOnLeaderboard && <button className="btn btn-ghost" onClick={() => saveSettings({ showOnLeaderboard: false })}>Leave</button>}
            {msg && <span className="form-hint">{msg}</span>}
          </div>
          <div className="ft-row mt-16">
            <label className="form-label" htmlFor="goal">Daily goal</label>
            <select id="goal" className="form-select" style={{ maxWidth: 160 }} value={s.dailyGoal} onChange={(e) => saveSettings({ dailyGoal: Number(e.target.value) })}>
              {[1, 2, 3, 5].map((n) => <option key={n} value={n}>{n} session{n > 1 ? "s" : ""}/day</option>)}
            </select>
          </div>
        </div>

        <div className="ft-row mt-24"><button className="btn btn-ghost" onClick={() => navigate("/home")}>Back to dashboard</button></div>
      </div>
    </div>
  );
}
