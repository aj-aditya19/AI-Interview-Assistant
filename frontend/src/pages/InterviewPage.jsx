import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Mic, MicOff, Video, VideoOff, ChevronRight, ChevronLeft,
  Clock, AlertCircle, CheckCircle, Loader, Brain
} from 'lucide-react';
import { useInterview } from '../context/InterviewContext';
import { sessionAPI, evaluationAPI } from '../utils/api';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import useMediaRecorder from '../hooks/useMediaRecorder';

export default function InterviewPage() {
  const nav = useNavigate();
  const {
    role, difficulty, questions, sessionId, answers,
    saveAnswer, setStatus, currentQ, setCurrentQ
  } = useInterview();

  const [phase, setPhase] = useState('camera'); // camera | interview | done
  const [timer, setTimer] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [sessionEvaluating, setSessionEvaluating] = useState(false);
  const timerRef = useRef(null);
  const sessionStartRef = useRef(null);

  const speech = useSpeechRecognition();
  const media = useMediaRecorder();

  // Redirect if no session
  useEffect(() => {
    if (!sessionId || !questions.length) nav('/setup');
  }, [sessionId, questions, nav]);

  // Timer
  useEffect(() => {
    if (isAnswering) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isAnswering]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const startCamera = async () => {
    const s = await media.requestPermissions();
    if (s) {
      setPhase('interview');
      sessionStartRef.current = Date.now();
    }
  };

  const startAnswer = useCallback(() => {
    setTimer(0);
    speech.reset();
    speech.start();
    media.startRecording();
    setIsAnswering(true);
  }, [speech, media]);

  const stopAnswer = useCallback(async () => {
    speech.stop();
    await media.stopRecording();
    setIsAnswering(false);
  }, [speech, media]);

  const submitAnswer = useCallback(async () => {
    if (isAnswering) await stopAnswer();

    const transcript = speech.transcript.trim();
    if (!transcript) {
      toast.error('No answer detected — try speaking clearly or type your answer below.');
    }

    setEvaluating(true);
    const question = questions[currentQ];

    try {
      const res = await evaluationAPI.evaluateAnswer(question, transcript, role, difficulty);
      const evalData = res.data;

      const answer = {
        questionIndex: currentQ,
        question,
        transcript,
        evaluation: evalData,
      };

      saveAnswer(answer);
      await sessionAPI.saveAnswer(sessionId, currentQ, question, transcript);

      toast.success('Answer saved!');
    } catch (err) {
      toast.error('Evaluation failed — answer saved without score.');
      saveAnswer({ questionIndex: currentQ, question, transcript, evaluation: null });
    } finally {
      setEvaluating(false);
      speech.reset();
    }
  }, [isAnswering, stopAnswer, speech, questions, currentQ, role, difficulty, saveAnswer, sessionId]);

  const goNext = async () => {
    if (isAnswering || evaluating) await submitAnswer();
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      speech.reset();
      setTimer(0);
    }
  };

  const goPrev = () => {
    if (isAnswering) { toast('Stop recording first.'); return; }
    if (currentQ > 0) { setCurrentQ(currentQ - 1); speech.reset(); setTimer(0); }
  };

  const finishInterview = async () => {
    if (isAnswering) await stopAnswer();

    // Save last answer if not saved
    const alreadySaved = answers.find(a => a.questionIndex === currentQ);
    if (!alreadySaved && speech.transcript.trim()) {
      await submitAnswer();
    }

    const duration = Math.round((Date.now() - (sessionStartRef.current || Date.now())) / 1000);
    await sessionAPI.complete(sessionId, duration);

    setPhase('done');
    setSessionEvaluating(true);
    setStatus('evaluating');

    try {
      const res = await evaluationAPI.evaluateSession(sessionId);
      media.stopStream();
      nav(`/report/${sessionId}`);
    } catch (err) {
      toast.error('Evaluation error — going to report anyway.');
      nav(`/report/${sessionId}`);
    }
  };

  const currentAnswer = answers.find(a => a.questionIndex === currentQ);
  const answeredCount = answers.length;

  // ── Camera Phase ─────────────────────────────────────────────────────────────
  if (phase === 'camera') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(108,99,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Video size={32} color="var(--accent)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Set up your camera</h2>
          <p style={{ color: 'var(--text2)', marginBottom: '2rem', lineHeight: 1.6 }}>
            InterviewAI needs access to your camera and microphone to simulate a real interview. Your video stays on your device.
          </p>
          {media.permissionError && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 'var(--radius)', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              <AlertCircle size={16} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ color: 'var(--red)', fontSize: '0.9rem' }}>{media.permissionError}</span>
            </div>
          )}
          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} onClick={startCamera}>
            Allow Camera &amp; Start Interview
          </button>
          <p style={{ color: 'var(--text3)', fontSize: '0.8rem', marginTop: '1rem' }}>
            {questions.length} questions · {role} · {difficulty}
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Done Phase ───────────────────────────────────────────────────────────────
  if (phase === 'done') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ width: 48, height: 48, margin: '0 auto 1.5rem', borderWidth: 3 }} />
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Evaluating your answers…</h2>
          <p style={{ color: 'var(--text2)' }}>Claude AI is scoring each response. This takes a moment.</p>
        </div>
      </div>
    );
  }

  // ── Interview Phase ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 0 }}>

      {/* Left — Video + Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1rem', borderRight: '1px solid var(--border)' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Brain size={18} color="var(--accent)" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>InterviewAI</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="badge badge-purple">{role}</span>
            <span className="badge badge-amber">{difficulty}</span>
            <span style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>{answeredCount}/{questions.length} answered</span>
          </div>
        </div>

        {/* Video */}
        <div style={{ flex: 1, background: '#0d0d16', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', minHeight: 320 }}>
          <video
            ref={media.videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
          />
          {/* Recording indicator */}
          {isAnswering && (
            <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(248,113,113,0.9)', borderRadius: 999, padding: '0.3rem 0.8rem', fontSize: '0.8rem', fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', animation: 'blink 1s ease-in-out infinite' }} />
              REC {formatTime(timer)}
            </div>
          )}
          {/* Timer */}
          {isAnswering && (
            <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(0,0,0,0.6)', borderRadius: 8, padding: '0.3rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <Clock size={14} /> {formatTime(timer)}
            </div>
          )}
        </div>

        {/* Record controls */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          {!isAnswering ? (
            <motion.button
              className="btn btn-primary"
              onClick={startAnswer}
              disabled={evaluating || !!currentAnswer}
              style={{ flex: 1, maxWidth: 240 }}
              whileTap={{ scale: 0.96 }}
            >
              <Mic size={16} />
              {currentAnswer ? 'Already answered' : 'Start Recording'}
            </motion.button>
          ) : (
            <motion.button
              className="btn btn-danger"
              onClick={stopAnswer}
              style={{ flex: 1, maxWidth: 240 }}
              whileTap={{ scale: 0.96 }}
            >
              <MicOff size={16} /> Stop Recording
            </motion.button>
          )}
          <button className="btn btn-outline" onClick={submitAnswer} disabled={isAnswering || evaluating || !speech.transcript}>
            {evaluating ? <><span className="loading-spinner" style={{ width: 14, height: 14 }} /> Evaluating…</> : <><CheckCircle size={16} /> Submit</>}
          </button>
        </div>

        {speech.error && <p style={{ color: 'var(--red)', fontSize: '0.85rem', textAlign: 'center' }}>{speech.error}</p>}
      </div>

      {/* Right — Question + Transcript */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1rem', overflowY: 'auto' }}>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {questions.map((_, i) => {
            const isDone = !!answers.find(a => a.questionIndex === i);
            return (
              <button
                key={i}
                onClick={() => { if (!isAnswering) setCurrentQ(i); }}
                style={{
                  width: 28, height: 28, borderRadius: '50%', border: '1px solid',
                  borderColor: i === currentQ ? 'var(--accent)' : isDone ? 'var(--green)' : 'var(--border2)',
                  background: i === currentQ ? 'rgba(108,99,255,0.2)' : isDone ? 'rgba(74,222,128,0.12)' : 'transparent',
                  color: i === currentQ ? 'var(--accent)' : isDone ? 'var(--green)' : 'var(--text2)',
                  fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                }}
              >
                {isDone ? '✓' : i + 1}
              </button>
            );
          })}
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
            style={{ background: 'rgba(108,99,255,0.07)', border: '1px solid rgba(108,99,255,0.2)' }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--accent2)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Question {currentQ + 1} of {questions.length}
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
              {questions[currentQ]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Live transcript */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isAnswering ? '● Live transcript' : 'Transcript'}
            </span>
            {speech.transcript && <button className="btn btn-ghost" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }} onClick={speech.reset}>Clear</button>}
          </div>
          <textarea
            value={speech.transcript}
            onChange={e => speech.setTranscript(e.target.value)}
            placeholder={isAnswering ? 'Listening…' : 'Your answer will appear here as you speak, or type directly.'}
            rows={6}
            style={{ resize: 'vertical', fontSize: '0.9rem', lineHeight: 1.6 }}
          />
        </div>

        {/* Previous answer badge */}
        {currentAnswer && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.75rem', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 'var(--radius)', fontSize: '0.85rem' }}>
            <CheckCircle size={14} color="var(--green)" />
            <span style={{ color: 'var(--green)' }}>Answer submitted</span>
            {currentAnswer.evaluation?.scores?.overall && (
              <span className="badge badge-green" style={{ marginLeft: 'auto' }}>
                {currentAnswer.evaluation.scores.overall}/10
              </span>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto' }}>
          <button className="btn btn-outline" onClick={goPrev} disabled={currentQ === 0 || isAnswering} style={{ flex: 1 }}>
            <ChevronLeft size={16} /> Prev
          </button>
          {currentQ < questions.length - 1 ? (
            <button className="btn btn-primary" onClick={goNext} style={{ flex: 1 }} disabled={evaluating}>
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <motion.button
              className="btn btn-primary"
              onClick={finishInterview}
              style={{ flex: 1, background: 'var(--green)', color: '#000' }}
              disabled={evaluating || sessionEvaluating}
              whileTap={{ scale: 0.97 }}
            >
              {sessionEvaluating ? <><span className="loading-spinner" style={{ width: 14, height: 14 }} /> Processing…</> : <>Finish & Get Report</>}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
