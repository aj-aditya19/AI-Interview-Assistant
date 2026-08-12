import express from "express";
import User from "../models/User.model.js";
import InterviewRecord from "../models/InterviewRecord.model.js";
import PPDTRecord from "../models/PPDTRecord.model.js";
import protect from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/users", protect, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-passwordHash -resetPasswordToken -resetPasswordExpiry")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({ users, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Admin users error:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/stats", protect, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalInterviews = await InterviewRecord.countDocuments();
    const totalPPDT = await PPDTRecord.countDocuments();

    const interviewScoreAgg = await InterviewRecord.aggregate([
      { $group: { _id: null, avgScore: { $avg: "$overallScore" } } },
    ]);
    const avgInterviewScore = interviewScoreAgg[0]?.avgScore?.toFixed(1) || 0;

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentSignups = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.json({
      totalUsers,
      totalAdmins,
      totalInterviews,
      totalPPDT,
      avgInterviewScore,
      recentSignups,
    });
  } catch (error) {
    console.error("Admin stats error:", error.message);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

router.get("/interview-records", protect, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const records = await InterviewRecord.find()
      .populate("userId", "fullName email")
      .select("-rounds.turns")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await InterviewRecord.countDocuments();

    res.json({ records, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch interview records" });
  }
});

router.get("/ppdt-records", protect, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const records = await PPDTRecord.find()
      .populate("userId", "fullName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await PPDTRecord.countDocuments();

    res.json({ records, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch PPDT records" });
  }
});

export default router;
