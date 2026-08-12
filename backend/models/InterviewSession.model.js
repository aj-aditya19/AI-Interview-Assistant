import mongoose from "mongoose";

const turnSchema = new mongoose.Schema({
  round: { type: String },
  question: { type: String },
  answer: { type: String },
  improvedQuestion: { type: String },
  improvedAnswer: { type: String },
  scores: {
    accuracy: { type: Number },
    confidence: { type: Number },
    vocabulary: { type: Number },
    english: { type: Number },
    overall: { type: Number },
  },
  analysis: [{ type: String }],
  summary: { type: String },
  attemptNumber: { type: Number, default: 1 },
  shouldRetry: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const interviewSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: "InterviewProfile" },
  sessionId: { type: String, required: true, unique: true },
  rounds: [{ type: String }],
  currentRoundIndex: { type: Number, default: 0 },
  currentQuestion: { type: String },
  retryCount: { type: Number, default: 0 },
  turns: [turnSchema],
  durationMinutes: { type: Number },
  startedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

const InterviewSession = mongoose.model(
  "InterviewSession",
  interviewSessionSchema,
);
export default InterviewSession;
