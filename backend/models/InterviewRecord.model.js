import mongoose from "mongoose";

const turnRecordSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
  scores: {
    accuracy: { type: Number },
    confidence: { type: Number },
    vocabulary: { type: Number },
    english: { type: Number },
    overall: { type: Number },
  },
  analysis: [{ type: String }],
  summary: { type: String },
});

const roundRecordSchema = new mongoose.Schema({
  roundType: { type: String }, // "hr", "technical", "other"
  turns: [turnRecordSchema],
  roundScore: { type: Number },
});

const interviewRecordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: "InterviewProfile" },
    interviewType: {
      type: String,
      enum: ["HR", "Technical", "Behavioral", "Mixed"],
      default: "Mixed",
    },
    targetRole: { type: String },
    targetCompany: { type: String },
    difficulty: { type: String },
    status: { type: String, enum: ["Completed", "Cancelled"], default: "Completed" },
    durationSeconds: { type: Number },
    startedAt: { type: Date },
    endedAt: { type: Date },
    rounds: [roundRecordSchema],
    overallScore: { type: Number },
    result: {
      communication: { type: Number },
      confidence: { type: Number },
      technical: { type: Number },
      fluency: { type: Number },
      vocabulary: { type: Number },
      grammar: { type: Number },
      clarity: { type: Number },
    },
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    recommendations: [{ type: String }],
    finalSummary: { type: String },
    // e.g. "Interview Ready", "Needs Improvement", "Promising"
    readinessLabel: { type: String },
  },
  { timestamps: true }
);

const InterviewRecord = mongoose.model("InterviewRecord", interviewRecordSchema);
export default InterviewRecord;
