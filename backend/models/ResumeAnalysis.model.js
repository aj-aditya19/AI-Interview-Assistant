import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fileName: { type: String },
    targetRole: { type: String },
    hadJobDescription: { type: Boolean, default: false },
    atsScore: { type: Number },
    analysis: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
);

export default mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
