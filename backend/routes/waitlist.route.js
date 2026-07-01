import express from "express";
import WaitlistInterest from "../models/WaitlistInterest.model.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// POST /api/waitlist — join waitlist for a coming-soon feature
router.post("/", protect, async (req, res) => {
  try {
    const { feature } = req.body;

    if (!feature || !["communication", "ats"].includes(feature)) {
      return res.status(400).json({ message: "Feature must be 'communication' or 'ats'" });
    }

    // Try to create — will fail with duplicate key error if already joined
    const entry = await WaitlistInterest.create({
      userId: req.user._id,
      feature,
    });

    res.status(201).json({
      message: `You're on the waitlist for ${feature}! We'll notify you when it launches.`,
      entry,
    });
  } catch (error) {
    // Mongo duplicate key error code is 11000
    if (error.code === 11000) {
      return res.status(409).json({ message: "You're already on the waitlist for this feature." });
    }
    console.error("Waitlist error:", error.message);
    res.status(500).json({ message: "Failed to join waitlist" });
  }
});

export default router;
