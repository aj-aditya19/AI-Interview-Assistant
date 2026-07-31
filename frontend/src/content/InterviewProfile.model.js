import mongoose from "mongoose";

const interviewProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    label: { type: String, required: true },
    reason: { type: String, enum: ["internship", "placement", "other"], required: true },
    targetRole: { type: String, required: true },
    targetCompany: { type: String },
    skills: [{ type: String }],
    projects: [{ type: String }],
    techStack: [{ type: String }],
    experienceSummary: { type: String },
    strengths: [{ type: String }],
    additionalMessage: { type: String },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },
    // rounds is an ordered array of round configs, each with its own time limit
    rounds: [
      {
        roundType: { type: String, enum: ["hr", "technical", "other"] },
        durationMinutes: { type: Number, default: 5, min: 1, max: 60 },
      },
    ],
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const InterviewProfile = mongoose.model("InterviewProfile", interviewProfileSchema);
export default InterviewProfile;
