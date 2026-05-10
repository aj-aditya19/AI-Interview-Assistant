import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Brain, Trophy, Clock, ChevronDown, ChevronUp, ArrowLeft, RotateCcw, Star } from 'lucide-react';
import { reportAPI } from '../utils/api';

const ScoreColor = (s) => s >= 8 ? 'var(--green)' : s >= 6 ? 'var(--amber)' : 'var(--red)';
const ScoreLabel = (s) => s >= 8 ? 'Excellent' : s >= 6 ? 'Good' : s >= 4 ? 'Needs Work' : 'Poor';

function ScoreRing({ score, size = 80 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 10) * circ;
  const color = ScoreColor(score);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--surface2)" strokeWidth={6} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="middle"
        style={{ transform: `rotate(90deg) translateX(${-size/2}px) translateY(${size/2}px)`, fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: size * 0.22, fill: color }}>
        {score}
      </text>
    </svg>
  );
}

function QACard({ answer, index }) {
  const [open, setOpen] = useState(false);
  const s = answer.scores || {};
  const overall = s.overall || 0;

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', padding: '1.1rem 1.25rem', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}
      >
        <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0, color: 'var(--text2)' }}>Q{index + 1}</span>
        <span style={{ flex: 1, fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)' }}>{answer.question}</span>
        <span className="badge" style={{ background: `${ScoreColor(overall)}18`, color: ScoreColor(overall), border: `1px solid ${ScoreColor(overall)}40`, flexShrink: 0 }}>
          {overall}/10
        </span>
        {open ? <ChevronUp size={16} color="var(--text2)" /> : <ChevronDown size={16} color="var(--text2)" />}
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '1.25rem' }}>
          {/* Score bars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {[['Relevance', s.relevance], ['Clarity', s.clarity], ['Completeness', s.completeness], ['Communication', s.communication]].map(([label, val]) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text2)' }}>{label}</span>
                  <span style={{ color: ScoreColor(val || 0), fontWeight: 600 }}>{val || 0}/10</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: 'var(--surface2)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(val || 0) * 10}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ height: '100%', borderRadius: 3, background: ScoreColor(val || 0) }} />
                </div>
              </div>
            ))}
          </div>

          {answer.transcript && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Your Answer</p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text2)', background: 'var(--surface2)', borderRadius: 8, padding: '0.75rem' }}>{answer.transcript}</p>
            </div>
          )}

          {answer.feedback && (
            <div style={{ marginBottom: '1rem', padding: '0.9rem', background: 'rgba(108,99,255,0.07)', borderRadius: 8, borderLeft: '3px solid var(--accent)' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--accent2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>AI Feedback</p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{answer.feedback}</p>
            </div>
          )}

          {answer.sampleAnswer && (
            <div style={{ marginBottom: '1rem', padding: '0.9rem', background: 'rgba(74,222,128,0.07)', borderRadius: 8, borderLeft: '3px solid var(--green)' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Model Answer</p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{answer.sampleAnswer}</p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {answer.strengths?.length > 0 && (
              <div>
                <p style={{ fontSize: '0.78rem', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Strengths</p>
                {answer.strengths.map((s, i) => <p key={i} style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: 4 }}>✓ {s}</p>)}
              </div>
            )}
            {answer.improvements?.length > 0 && (
              <div>
                <p style={{ fontSize: '0.78rem', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Improve</p>
                {answer.improvements.map((s, i) => <p key={i} style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: 4 }}>→ {s}</p>)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReportPage() {
  const { sessionId } = useParams();
  const nav = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await reportAPI.get(sessionId);
        setReport(res.data.report);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sessionId]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <div className="loading-spinner" style={{ width: 40, height: 40, borderWidth: 3 }} />
      <p style={{ color: 'var(--text2)' }}>Loading your report…</p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ color: 'var(--red)' }}>Error: {error}</p>
      <button className="btn btn-outline" onClick={() => nav('/')}>Go Home</button>
    </div>
  );

  if (!report) return null;

  const { avgScores } = report;
  const radarData = [
    { axis: 'Relevance', score: avgScores.relevance },
    { axis: 'Clarity', score: avgScores.clarity },
    { axis: 'Completeness', score: avgScores.completeness },
    { axis: 'Communication', score: avgScores.communication },
  ];

  const barData = report.answers
    .filter(a => a.evaluated)
    .map((a, i) => ({ name: `Q${i + 1}`, score: a.scores?.overall || 0 }));

  const duration = report.totalDuration ? `${Math.floor(report.totalDuration / 60)}m ${report.totalDuration % 60}s` : '—';

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn btn-ghost" onClick={() => nav('/')} style={{ padding: '0.4rem' }}><ArrowLeft size={18} /></button>
          <Brain size={20} color="var(--accent)" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Interview Report</span>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <span className="badge badge-purple">{report.role}</span>
          <button className="btn btn-outline" style={{ fontSize: '0.85rem' }} onClick={() => nav('/setup')}>
            <RotateCcw size={14} /> New Interview
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Overall score hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem', padding: '2rem', flexWrap: 'wrap' }}
        >
          <ScoreRing score={report.overallScore} size={100} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Trophy size={18} color="var(--amber)" />
              <span style={{ color: 'var(--amber)', fontWeight: 600 }}>{ScoreLabel(report.overallScore)}</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Overall Score: {report.overallScore}/10</h2>
            <p style={{ color: 'var(--text2)', lineHeight: 1.6, fontSize: '0.95rem' }}>{report.overallFeedback}</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{report.answeredCount}/{report.questionsCount}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Answered</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={16} color="var(--text2)" />{duration}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Duration</div>
            </div>
          </div>
        </motion.div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text2)' }}>Skill Breakdown</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border2)" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: 'var(--text2)', fontSize: 12 }} />
                <Radar name="Score" dataKey="score" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.18} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text2)' }}>Per-Question Scores</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barSize={20}>
                <XAxis dataKey="name" tick={{ fill: 'var(--text2)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fill: 'var(--text2)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 8, color: 'var(--text)' }} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {barData.map((d, i) => <Cell key={i} fill={ScoreColor(d.score)} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strengths & improvements */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={16} color="var(--green)" /> Top Strengths
            </h3>
            {report.allStrengths.slice(0, 5).map((s, i) => (
              <p key={i} style={{ fontSize: '0.9rem', color: 'var(--text2)', marginBottom: '0.5rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--green)' }}>
                {s}
              </p>
            ))}
          </div>
          <div className="card">
            <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={16} color="var(--amber)" /> Key Improvements
            </h3>
            {report.allImprovements.slice(0, 5).map((s, i) => (
              <p key={i} style={{ fontSize: '0.9rem', color: 'var(--text2)', marginBottom: '0.5rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--amber)' }}>
                {s}
              </p>
            ))}
          </div>
        </div>

        {/* Q&A breakdown */}
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Question-by-Question Breakdown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {report.answers.map((a, i) => <QACard key={i} answer={a} index={i} />)}
        </div>
      </div>
    </div>
  );
}
