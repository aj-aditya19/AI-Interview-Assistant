import mongoose from "mongoose";

const practiceRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["wat", "srt", "tat", "sdt", "gd", "daily", "comm"],
      required: true,
    },
    overallScore: { type: Number, default: 0 },
    result: { type: mongoose.Schema.Types.Mixed, default: {} },
    items: { type: mongoose.Schema.Types.Mixed, default: [] },
    olq: { type: mongoose.Schema.Types.Mixed, default: {} },
    patterns: [{ type: String }],
    recommendations: [{ type: String }],
    summary: { type: String },
    durationSeconds: { type: Number },
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
);
practiceRecordSchema.index({ userId: 1, type: 1, createdAt: -1 });

export default mongoose.model("PracticeRecord", practiceRecordSchema);
