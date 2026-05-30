import mongoose from "mongoose";

const reviewTurnSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    improvedQuestion: { type: String, default: "" },
    improvedAnswer: { type: String, default: "" },
    rate: { type: Number, default: 0, min: 0, max: 10 },
    result: { type: Number, default: 0, min: 0, max: 10 },
    total: { type: Number, default: 10, min: 1, max: 10 },
    analysis: [{ type: String }],
    scores: {
      accuracy: { type: Number, default: 0, min: 0, max: 10 },
      confidence: { type: Number, default: 0, min: 0, max: 10 },
      vocabulary: { type: Number, default: 0, min: 0, max: 10 },
      english: { type: Number, default: 0, min: 0, max: 10 },
      overall: { type: Number, default: 0, min: 0, max: 10 },
    },
    summary: { type: String, default: "" },
    nextQuestion: { type: String, default: "" },
    shouldRetry: { type: Boolean, default: false },
    attemptNumber: { type: Number, default: 1, min: 1 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const chatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionId: { type: String, required: true, unique: true },
    setup: { type: mongoose.Schema.Types.Mixed, required: true },
    intro: { type: String, default: "" },
    currentQuestion: { type: String, default: "" },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    retryCount: { type: Number, default: 0 },
    turns: { type: [reviewTurnSchema], default: [] },
    overallScore: { type: Number, default: 0, min: 0, max: 10 },
    finalSummary: { type: String, default: "" },
    strengths: [{ type: String }],
    improvements: [{ type: String }],
    nextSteps: [{ type: String }],
    readinessLabel: { type: String, default: "" },
    closingMessage: { type: String, default: "" },
    startedAt: {
      type: Date,
      default: () => new Date(),
    },
    completedAt: { type: Date },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true },
);

chatSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
chatSessionSchema.index({ userId: 1, sessionId: 1 });

export default mongoose.model("ChatSession", chatSessionSchema);
