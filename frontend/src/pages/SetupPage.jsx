import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Brain, ChevronLeft, Loader, ArrowRight } from 'lucide-react';
import { interviewAPI, sessionAPI } from '../utils/api';
import { useInterview } from '../context/InterviewContext';

const DIFFICULTIES = [
  { value: 'beginner', label: 'Beginner', desc: 'Fresher / entry-level', color: 'var(--green)' },
  { value: 'intermediate', label: 'Intermediate', desc: '1-3 years experience', color: 'var(--amber)' },
  { value: 'advanced', label: 'Advanced', desc: '3+ years / senior', color: 'var(--red)' },
];

const COUNTS = [3, 5, 7, 10];

export default function SetupPage() {
  const nav = useNavigate();
  const { setRoleConfig, setQuestions, setSession, reset } = useInterview();

  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1=role, 2=config

  useEffect(() => {
    reset();
    interviewAPI.getRoles().then(r => setRoles(r.data.roles)).catch(() => toast.error('Failed to load roles'));
  }, [reset]);

  const handleNext = () => {
    if (!role) { toast.error('Please select a role'); return; }
    setStep(2);
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const qRes = await interviewAPI.generateQuestions(role, difficulty, count);
      const questions = qRes.data.questions;
      const sRes = await sessionAPI.create(role, difficulty, questions);
      const { sessionId } = sRes.data;

      setRoleConfig(role, difficulty);
      setQuestions(questions);
      setSession(sessionId);

      nav('/interview');
    } catch (err) {
      toast.error(err.message || 'Failed to start interview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 620 }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <button className="btn btn-ghost" onClick={() => step === 2 ? setStep(1) : nav('/')} style={{ padding: '0.4rem' }}>
            <ChevronLeft size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Brain size={20} color="var(--accent)" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>InterviewAI</span>
          </div>
          <span style={{ marginLeft: 'auto', color: 'var(--text2)', fontSize: '0.85rem' }}>Step {step} of 2</span>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          {step === 1 && (
            <>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Choose your role</h2>
              <p style={{ color: 'var(--text2)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Questions will be tailored specifically to this position.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {roles.map(r => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    style={{
                      padding: '0.9rem 1rem',
                      borderRadius: 'var(--radius)',
                      border: `1px solid ${role === r ? 'var(--accent)' : 'var(--border2)'}`,
                      background: role === r ? 'rgba(108,99,255,0.12)' : 'var(--surface2)',
                      color: role === r ? 'var(--accent2)' : 'var(--text)',
                      textAlign: 'left',
                      fontSize: '0.9rem',
                      fontWeight: role === r ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNext} disabled={!role}>
                Continue <ArrowRight size={16} />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Configure your interview</h2>
              <p style={{ color: 'var(--text2)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Role: <strong style={{ color: 'var(--accent2)' }}>{role}</strong>
              </p>

              {/* Difficulty */}
              <label style={{ fontSize: '0.85rem', color: 'var(--text2)', display: 'block', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Difficulty</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {DIFFICULTIES.map(d => (
                  <button
                    key={d.value}
                    onClick={() => setDifficulty(d.value)}
                    style={{
                      padding: '0.9rem',
                      borderRadius: 'var(--radius)',
                      border: `1px solid ${difficulty === d.value ? d.color : 'var(--border2)'}`,
                      background: difficulty === d.value ? `${d.color}18` : 'var(--surface2)',
                      color: difficulty === d.value ? d.color : 'var(--text2)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{d.label}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: 2 }}>{d.desc}</div>
                  </button>
                ))}
              </div>

              {/* Count */}
              <label style={{ fontSize: '0.85rem', color: 'var(--text2)', display: 'block', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Number of Questions</label>
              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
                {COUNTS.map(c => (
                  <button
                    key={c}
                    onClick={() => setCount(c)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: 'var(--radius)',
                      border: `1px solid ${count === c ? 'var(--accent)' : 'var(--border2)'}`,
                      background: count === c ? 'rgba(108,99,255,0.12)' : 'var(--surface2)',
                      color: count === c ? 'var(--accent2)' : 'var(--text2)',
                      fontWeight: count === c ? 700 : 400,
                      cursor: 'pointer',
                      fontSize: '1rem',
                      transition: 'all 0.15s',
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <motion.button
                className="btn btn-primary"
                style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}
                onClick={handleStart}
                disabled={loading}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <><span className="loading-spinner" style={{ width: 18, height: 18 }} /> Generating questions…</> : <>Start Interview <ArrowRight size={16} /></>}
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
