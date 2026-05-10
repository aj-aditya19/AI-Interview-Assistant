const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionIndex: { type: Number, required: true },
  question: { type: String, required: true },
  transcript: { type: String, default: '' },
  videoBlob: { type: String, default: null }, // base64 or storage URL
  scores: {
    relevance: { type: Number, min: 0, max: 10, default: 0 },
    clarity: { type: Number, min: 0, max: 10, default: 0 },
    completeness: { type: Number, min: 0, max: 10, default: 0 },
    communication: { type: Number, min: 0, max: 10, default: 0 },
    overall: { type: Number, min: 0, max: 10, default: 0 },
  },
  feedback: { type: String, default: '' },
  sampleAnswer: { type: String, default: '' },
  strengths: [String],
  improvements: [String],
  evaluated: { type: Boolean, default: false },
});

const SessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    questions: [String],
    answers: [AnswerSchema],
    status: {
      type: String,
      enum: ['setup', 'in_progress', 'completed', 'evaluated'],
      default: 'setup',
    },
    overallScore: { type: Number, min: 0, max: 10, default: 0 },
    overallFeedback: { type: String, default: '' },
    totalDuration: { type: Number, default: 0 }, // seconds
    completedAt: { type: Date, default: null },
    sentimentData: { type: Object, default: null }, // from Python NLP service
  },
  { timestamps: true }
);

module.exports = mongoose.model('Session', SessionSchema);
