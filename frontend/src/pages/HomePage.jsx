import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Video, BarChart3, FileText, Zap, ArrowRight, History } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Question Generation', desc: 'Role-specific questions crafted by Claude AI tailored to your level.' },
  { icon: Video, title: 'Video Interview Mode', desc: 'Real webcam + microphone recording just like actual interviews.' },
  { icon: Zap, title: 'Instant AI Evaluation', desc: 'Each answer scored on relevance, clarity, and completeness in seconds.' },
  { icon: BarChart3, title: 'Deep Performance Analytics', desc: 'Radar charts, trends, and NLP sentiment analysis of your speech.' },
  { icon: FileText, title: 'Detailed Report', desc: 'Full session report with sample answers and actionable improvements.' },
];

const roles = ['Software Engineer', 'Frontend Developer', 'Data Scientist', 'Product Manager', 'HR / People Ops', 'DevOps Engineer'];

export default function HomePage() {
  const nav = useNavigate();

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg)' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>InterviewAI</span>
        </div>
        <button className="btn btn-ghost" onClick={() => nav('/history')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <History size={16} /> Past Sessions
        </button>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '6rem 2rem 4rem', maxWidth: 700, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="badge badge-purple" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
            <Zap size={12} /> Powered by Claude AI + Python NLP
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', marginBottom: '1.2rem', lineHeight: 1.1 }}>
            Ace Your Next<br />
            <span style={{ color: 'var(--accent)' }}>Interview</span> with AI
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Practice real video interviews, get instant AI feedback on every answer, and walk into your dream job confident and prepared.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              className="btn btn-primary"
              style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}
              onClick={() => nav('/setup')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Interview <ArrowRight size={16} />
            </motion.button>
            <button className="btn btn-outline" onClick={() => nav('/history')}>
              View Past Reports
            </button>
          </div>
        </motion.div>
      </section>

      {/* Role chips */}
      <section style={{ textAlign: 'center', padding: '0 2rem 4rem' }}>
        <p style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Supports roles including</p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {roles.map(r => (
            <span key={r} className="badge badge-purple" style={{ fontSize: '0.85rem', padding: '0.3rem 0.9rem' }}>{r}</span>
          ))}
          <span className="badge badge-cyan" style={{ fontSize: '0.85rem', padding: '0.3rem 0.9rem' }}>+ more</span>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '0 2rem 6rem', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '1.6rem' }}>Everything you need to prepare</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(108,99,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <f.icon size={20} color="var(--accent2)" />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{f.title}</h3>
              <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', textAlign: 'center', padding: '1.5rem', color: 'var(--text2)', fontSize: '0.85rem' }}>
        Built by Aditya Jaiswal · MERN + Python + Claude AI
      </footer>
    </div>
  );
}
