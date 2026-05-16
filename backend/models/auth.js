import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    Number: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastlogin: {
      type: Date,
    },

    totaltimespent: {
      type: Number,
      default: 0,
    },

    totalinterviews: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    otherdetails: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", User);
