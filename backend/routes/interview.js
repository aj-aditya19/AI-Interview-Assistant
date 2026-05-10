const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const { body, validationResult } = require('express-validator');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const ROLES = {
  'Software Engineer': ['DSA', 'system design', 'OOP', 'problem-solving', 'coding best practices'],
  'Frontend Developer': ['React', 'CSS', 'JavaScript', 'performance', 'accessibility'],
  'Backend Developer': ['APIs', 'databases', 'scalability', 'security', 'microservices'],
  'Data Scientist': ['ML/AI', 'statistics', 'Python', 'data wrangling', 'model evaluation'],
  'Product Manager': ['product thinking', 'roadmap', 'stakeholder management', 'metrics', 'user research'],
  'HR / People Ops': ['behavioral', 'conflict resolution', 'culture', 'recruitment', 'communication'],
  'DevOps Engineer': ['CI/CD', 'Docker', 'Kubernetes', 'monitoring', 'cloud infrastructure'],
  'Full Stack Developer': ['React', 'Node.js', 'databases', 'deployment', 'API design'],
};

// GET /api/interview/roles
router.get('/roles', (req, res) => {
  res.json({ success: true, roles: Object.keys(ROLES) });
});

// POST /api/interview/generate-questions
router.post(
  '/generate-questions',
  [
    body('role').notEmpty().withMessage('Role is required'),
    body('difficulty').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty'),
    body('count').optional().isInt({ min: 3, max: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { role, difficulty, count = 5 } = req.body;
    const focusAreas = ROLES[role] || ['general skills', 'problem-solving', 'communication'];

    const prompt = `You are an expert technical interviewer. Generate exactly ${count} interview questions for a ${difficulty}-level ${role} position.

Focus areas: ${focusAreas.join(', ')}

Rules:
- Mix question types: technical, behavioral, situational
- Scale difficulty to ${difficulty} level
- Keep questions clear and specific
- Each question should be answerable in 1-3 minutes
- Vary question styles (explain, describe, tell me about, how would you, etc.)

Return ONLY a valid JSON array of strings. No preamble, no markdown, no explanation.
Example format: ["Question 1 here", "Question 2 here"]`;

    try {
      const message = await client.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      const raw = message.content[0].text.trim();
      const questions = JSON.parse(raw);

      res.json({ success: true, questions, role, difficulty });
    } catch (err) {
      console.error('Question generation error:', err);
      res.status(500).json({ success: false, message: 'Failed to generate questions' });
    }
  }
);

module.exports = router;
