import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const educationSchema = new mongoose.Schema({
  collegeName: { type: String },
  degree: { type: String },
  specialization: { type: String },
  batchStart: { type: Number },
  batchEnd: { type: Number },
  cgpa: { type: Number },
});

const experienceSchema = new mongoose.Schema({
  companyName: { type: String },
  role: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  currentlyWorking: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    phoneNumber: { type: String },
    profilePicture: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
    education: [educationSchema],
    experience: [experienceSchema],
    skills: [{ type: String }],
    projects: [
      {
        name: { type: String },
        description: { type: String },
        techStack: [{ type: String }],
        link: { type: String },
      },
    ],
    resume: {
      url: { type: String },
      updatedAt: { type: Date },
    },
    stats: {
      totalInterviews: { type: Number, default: 0 },
      totalPPDTSessions: { type: Number, default: 0 },
      totalTimeSpentMinutes: { type: Number, default: 0 },
      averageInterviewScore: { type: Number, default: 0 },
      averagePPDTScore: { type: Number, default: 0 },
      bestInterviewScore: { type: Number, default: 0 },
      bestPPDTScore: { type: Number, default: 0 },
    },
    gamification: {
      xp: { type: Number, default: 0 },
      level: { type: Number, default: 1 },
      streak: {
        current: { type: Number, default: 0 },
        longest: { type: Number, default: 0 },
        lastDate: { type: String, default: null },
      },
      weekly: {
        key: { type: String, default: null },
        xp: { type: Number, default: 0 },
      },
      activity: [
        { _id: false, date: String, sessions: Number, xp: Number },
      ],
      counts: { type: mongoose.Schema.Types.Mixed, default: {} },
      badges: [{ _id: false, id: String, earnedAt: Date }],
      lastDaily: { type: String, default: null },
    },
    preferences: {
      displayName: { type: String, trim: true, maxlength: 24 },
      showOnLeaderboard: { type: Boolean, default: false },
      goal: {
        type: String,
        enum: ["interview", "ssb", "english", "all"],
        default: "all",
      },
      dailyGoal: { type: Number, default: 1, min: 1, max: 10 },
      onboarded: { type: Boolean, default: false },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

const User = mongoose.model("User", userSchema);
export default User;
