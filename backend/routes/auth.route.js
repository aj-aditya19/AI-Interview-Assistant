import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import protect from "../middleware/auth.js";
import { sendPasswordResetEmail } from "../services/mail.service.js";

const router = express.Router();

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Full name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists" });
    }

    const user = await User.create({
      fullName,
      email,
      passwordHash: password,
      phoneNumber,
    });

    const token = createToken(user._id);
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Update lastLogin time
    user.lastLogin = new Date();
    await user.save();

    const token = createToken(user._id);
    res.json({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        stats: user.stats,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
});

// GET /api/auth/me — get logged-in user's profile
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-passwordHash -resetPasswordToken -resetPasswordExpiry",
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// PUT /api/auth/profile — update profile fields
router.put("/profile", protect, async (req, res) => {
  try {
    const allowedFields = [
      "fullName",
      "phoneNumber",
      "profilePicture",
      "education",
      "experience",
      "skills",
      "projects",
      "resume",
    ];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true },
    ).select("-passwordHash -resetPasswordToken -resetPasswordExpiry");

    res.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error.message);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// POST /api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    // Always respond with success to avoid revealing which emails are registered
    if (!user) {
      return res.json({
        message: "If that email exists, a reset link has been sent",
      });
    }

    // Generate a random token, store the hash, keep the raw token for the email
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, rawToken);

    res.json({ message: "If that email exists, a reset link has been sent" });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({ message: "Failed to send reset email" });
  }
});

// POST /api/auth/reset-password/:token
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword)
      return res.status(400).json({ message: "New password is required" });

    // Hash the incoming token so we can compare with the stored hash
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: new Date() }, // token must not be expired
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Reset link is invalid or has expired" });
    }

    // Set the new password — the pre-save hook will hash it
    user.passwordHash = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({ message: "Password reset failed" });
  }
});

export default router;
