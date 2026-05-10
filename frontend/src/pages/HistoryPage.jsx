import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ArrowLeft, ExternalLink, Clock } from 'lucide-react';
import { sessionAPI } from '../utils/api';

const ScoreColor = (s) => s >= 8 ? 'var(--green)' : s >= 6 ? 'var(--amber)' : s > 0 ? 'var(--red)' : 'var(--text2)';
const DiffBadge = { beginner: 'badge-green', intermediate: 'badge-amber', advanced: 'badge-red' };

export default function HistoryPage() {
  const nav = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionAPI.listAll()
      .then(r => setSessions(r.data.sessions))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button className="btn btn-ghost" onClick={() => nav('/')} style={{ padding: '0.4rem' }}><ArrowLeft size={18} /></button>
        <Brain size={20} color="var(--accent)" />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Past Sessions</span>
      </nav>

      <div className="container" style={{ paddingTop: '2rem' }}>
        {loading && <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text2)' }}><div className="loading-spinner" style={{ margin: '0 auto 1rem' }} /> Loading…</div>}

        {!loading && sessions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: 'var(--text2)' }}>No sessions yet</h3>
            <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>Complete your first interview to see your history here.</p>
            <button className="btn btn-primary" onClick={() => nav('/setup')}>Start Interview</button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sessions.map((s, i) => (
            <motion.div
              key={s.sessionId}
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.25rem', cursor: 'pointer' }}
              onClick={() => s.status === 'evaluated' && nav(`/report/${s.sessionId}`)}
            >
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: ScoreColor(s.overallScore) }}>
                  {s.overallScore > 0 ? s.overallScore : '—'}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, marginBottom: 3 }}>{s.role}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className={`badge ${DiffBadge[s.difficulty] || 'badge-purple'}`}>{s.difficulty}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} />
                    {s.completedAt ? new Date(s.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : new Date(s.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                <span className={`badge ${s.status === 'evaluated' ? 'badge-green' : 'badge-amber'}`}>{s.status}</span>
                {s.status === 'evaluated' && <ExternalLink size={16} color="var(--text2)" />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
