import express from "express";
import InterviewProfile from "../models/InterviewProfile.model.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// GET /api/interview-profiles — list all profiles for the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const profiles = await InterviewProfile.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profiles" });
  }
});

// POST /api/interview-profiles — create a new profile
router.post("/", protect, async (req, res) => {
  try {
    const {
      label, reason, targetRole, targetCompany,
      skills, projects, techStack, experienceSummary,
      strengths, additionalMessage, difficulty, rounds, isDefault,
    } = req.body;

    if (!label || !reason || !targetRole) {
      return res.status(400).json({ message: "Label, reason, and target role are required" });
    }

    // If user marks this as default, unset the old default first
    if (isDefault) {
      await InterviewProfile.updateMany({ userId: req.user._id }, { isDefault: false });
    }

    const profile = await InterviewProfile.create({
      userId: req.user._id,
      label, reason, targetRole, targetCompany,
      skills, projects, techStack, experienceSummary,
      strengths, additionalMessage, difficulty,
      rounds: rounds || ["hr", "technical"],
      isDefault: isDefault || false,
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error("Create profile error:", error.message);
    res.status(500).json({ message: "Failed to create profile" });
  }
});

// PUT /api/interview-profiles/:id — update an existing profile
router.put("/:id", protect, async (req, res) => {
  try {
    const profile = await InterviewProfile.findOne({ _id: req.params.id, userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // If switching this profile to default, clear others first
    if (req.body.isDefault) {
      await InterviewProfile.updateMany({ userId: req.user._id }, { isDefault: false });
    }

    const updatedProfile = await InterviewProfile.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedProfile);
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

export default router;
