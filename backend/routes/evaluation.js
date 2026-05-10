const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const axios = require('axios');
const Session = require('../models/Session');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// POST /api/evaluation/evaluate-answer
router.post('/evaluate-answer', async (req, res) => {
  try {
    const { question, transcript, role, difficulty } = req.body;

    if (!transcript || transcript.trim().length < 10) {
      return res.json({
        success: true,
        scores: { relevance: 0, clarity: 0, completeness: 0, communication: 0, overall: 0 },
        feedback: 'No answer was provided for this question.',
        sampleAnswer: '',
        strengths: [],
        improvements: ['Provide a complete answer', 'Speak clearly into the microphone'],
      });
    }

    const prompt = `You are an expert ${role} interviewer evaluating a candidate's answer.

Question: "${question}"
Candidate's Answer: "${transcript}"
Difficulty Level: ${difficulty}

Evaluate this answer and return ONLY a valid JSON object (no markdown, no preamble):
{
  "scores": {
    "relevance": <0-10, how relevant is the answer to the question>,
    "clarity": <0-10, how clear and structured is the response>,
    "completeness": <0-10, how thoroughly is the question addressed>,
    "communication": <0-10, quality of expression and vocabulary>,
    "overall": <0-10, weighted average>
  },
  "feedback": "<2-3 sentences of specific, constructive feedback>",
  "sampleAnswer": "<A model answer of 3-5 sentences showing what a strong response looks like>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>"]
}`;

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = message.content[0].text.trim();
    const result = JSON.parse(raw);

    // Optionally call Python NLP service for sentiment
    let sentimentData = null;
    if (process.env.PYTHON_SERVICE_URL) {
      try {
        const nlpRes = await axios.post(`${process.env.PYTHON_SERVICE_URL}/analyze`, {
          text: transcript,
        }, { timeout: 5000 });
        sentimentData = nlpRes.data;
      } catch (nlpErr) {
        console.warn('Python NLP service unavailable:', nlpErr.message);
      }
    }

    res.json({ success: true, ...result, sentimentData });
  } catch (err) {
    console.error('Evaluation error:', err);
    res.status(500).json({ success: false, message: 'Evaluation failed' });
  }
});

// POST /api/evaluation/evaluate-session
router.post('/evaluate-session', async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findOne({ sessionId });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    const evaluatedAnswers = [];

    for (const answer of session.answers) {
      if (!answer.transcript || answer.transcript.trim().length < 5) {
        evaluatedAnswers.push(answer);
        continue;
      }

      const prompt = `You are an expert ${session.role} interviewer.
Question: "${answer.question}"
Answer: "${answer.transcript}"

Return ONLY valid JSON (no markdown):
{
  "scores": { "relevance": 0-10, "clarity": 0-10, "completeness": 0-10, "communication": 0-10, "overall": 0-10 },
  "feedback": "2-3 sentences",
  "sampleAnswer": "model answer",
  "strengths": ["strength"],
  "improvements": ["improvement"]
}`;

      const message = await client.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      });

      const evalData = JSON.parse(message.content[0].text.trim());
      answer.scores = evalData.scores;
      answer.feedback = evalData.feedback;
      answer.sampleAnswer = evalData.sampleAnswer;
      answer.strengths = evalData.strengths;
      answer.improvements = evalData.improvements;
      answer.evaluated = true;
      evaluatedAnswers.push(answer);
    }

    // Compute overall session score
    const scoredAnswers = evaluatedAnswers.filter((a) => a.evaluated);
    const overallScore = scoredAnswers.length
      ? scoredAnswers.reduce((sum, a) => sum + (a.scores?.overall || 0), 0) / scoredAnswers.length
      : 0;

    // Generate overall feedback
    const summaryPrompt = `Based on these interview scores for a ${session.role} candidate:
${scoredAnswers.map((a, i) => `Q${i + 1}: Overall ${a.scores?.overall}/10`).join('\n')}

Write a short 2-3 sentence overall performance summary. Be constructive and specific.`;

    const summaryMsg = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 300,
      messages: [{ role: 'user', content: summaryPrompt }],
    });

    session.answers = evaluatedAnswers;
    session.overallScore = Math.round(overallScore * 10) / 10;
    session.overallFeedback = summaryMsg.content[0].text.trim();
    session.status = 'evaluated';
    await session.save();

    res.json({ success: true, session });
  } catch (err) {
    console.error('Session evaluation error:', err);
    res.status(500).json({ success: false, message: 'Session evaluation failed' });
  }
});

module.exports = router;
