import mongoose from "mongoose";

const waitlistInterestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feature: { type: String, enum: ["communication", "ats"], required: true },
  },
  { timestamps: true },
);

waitlistInterestSchema.index({ userId: 1, feature: 1 }, { unique: true });

const WaitlistInterest = mongoose.model(
  "WaitlistInterest",
  waitlistInterestSchema,
);
export default WaitlistInterest;
