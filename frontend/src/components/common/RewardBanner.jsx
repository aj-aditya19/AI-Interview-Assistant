import React from "react";

export default function RewardBanner({ gamification }) {
  if (!gamification) return null;
  const { xpGained, level, streak, newBadges = [] } = gamification;
  return (
    <div className="reward" role="status">
      <div className="reward-main">
        <strong>+{xpGained} XP</strong>
        <span>Level {level}</span>
        {streak > 0 && <span>🔥 {streak}-day streak</span>}
      </div>
      {newBadges.map((b) => (
        <div key={b.id} className="reward-badge">
          🏅 New badge: <strong>{b.title}</strong> — {b.desc}
        </div>
      ))}
    </div>
  );
}
