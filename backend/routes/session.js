const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Session = require('../models/Session');

// POST /api/session/create
router.post('/create', async (req, res) => {
  try {
    const { role, difficulty, questions } = req.body;
    const sessionId = uuidv4();

    const session = new Session({
      sessionId,
      role,
      difficulty,
      questions,
      status: 'in_progress',
    });

    await session.save();
    res.json({ success: true, sessionId, session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create session' });
  }
});

// GET /api/session/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/session/:sessionId/answer
router.post('/:sessionId/answer', async (req, res) => {
  try {
    const { questionIndex, question, transcript } = req.body;
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    // Replace or push answer
    const existingIdx = session.answers.findIndex((a) => a.questionIndex === questionIndex);
    const answerData = { questionIndex, question, transcript };

    if (existingIdx >= 0) {
      session.answers[existingIdx] = { ...session.answers[existingIdx].toObject(), ...answerData };
    } else {
      session.answers.push(answerData);
    }

    await session.save();
    res.json({ success: true, message: 'Answer saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to save answer' });
  }
});

// PATCH /api/session/:sessionId/complete
router.patch('/:sessionId/complete', async (req, res) => {
  try {
    const { totalDuration } = req.body;
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    session.status = 'completed';
    session.completedAt = new Date();
    session.totalDuration = totalDuration || 0;
    await session.save();

    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/session/list/all
router.get('/list/all', async (req, res) => {
  try {
    const sessions = await Session.find({})
      .select('sessionId role difficulty status overallScore completedAt createdAt')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({ success: true, sessions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
