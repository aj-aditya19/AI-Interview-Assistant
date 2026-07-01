import mongoose from "mongoose";

const ppdtRecordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageId: { type: String },
    imageUrl: { type: String },
    referenceDescription: { type: String },
    userAnswer: { type: String },
    overallScore: { type: Number },
    result: {
      observation: { type: Number },
      imagination: { type: Number },
      communication: { type: Number },
      confidence: { type: Number },
      storyStructure: { type: Number },
      officerLikeQualities: { type: Number },
    },
    recommendations: [{ type: String }],
    durationSeconds: { type: Number },
    difficulty: { type: String },
  },
  { timestamps: true }
);

const PPDTRecord = mongoose.model("PPDTRecord", ppdtRecordSchema);
export default PPDTRecord;
