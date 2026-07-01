import mongoose from "mongoose";

const ppdtSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageId: { type: String, required: true },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  viewDurationSeconds: { type: Number },
  responseDurationSeconds: { type: Number },
  userAnswer: { type: String },
  startedAt: { type: Date, default: Date.now },
  // TTL: MongoDB auto-deletes 1 hour after expiresAt
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

const PPDTSession = mongoose.model("PPDTSession", ppdtSessionSchema);
export default PPDTSession;
