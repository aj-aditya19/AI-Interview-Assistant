const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// GET /api/report/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    if (session.status !== 'evaluated') {
      return res.status(400).json({ success: false, message: 'Session not yet evaluated' });
    }

    const scoredAnswers = session.answers.filter((a) => a.evaluated);

    // Aggregate stats
    const avgScores = {
      relevance: 0, clarity: 0, completeness: 0, communication: 0,
    };

    scoredAnswers.forEach((a) => {
      avgScores.relevance += a.scores?.relevance || 0;
      avgScores.clarity += a.scores?.clarity || 0;
      avgScores.completeness += a.scores?.completeness || 0;
      avgScores.communication += a.scores?.communication || 0;
    });

    const n = scoredAnswers.length || 1;
    Object.keys(avgScores).forEach((k) => {
      avgScores[k] = Math.round((avgScores[k] / n) * 10) / 10;
    });

    // Collect all strengths & improvements
    const allStrengths = [...new Set(scoredAnswers.flatMap((a) => a.strengths || []))];
    const allImprovements = [...new Set(scoredAnswers.flatMap((a) => a.improvements || []))];

    const report = {
      sessionId: session.sessionId,
      role: session.role,
      difficulty: session.difficulty,
      overallScore: session.overallScore,
      overallFeedback: session.overallFeedback,
      totalDuration: session.totalDuration,
      completedAt: session.completedAt,
      avgScores,
      allStrengths,
      allImprovements,
      answers: session.answers,
      questionsCount: session.questions.length,
      answeredCount: scoredAnswers.length,
      sentimentData: session.sentimentData,
    };

    res.json({ success: true, report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to generate report' });
  }
});

module.exports = router;
