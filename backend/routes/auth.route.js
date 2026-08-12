import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import protect from "../middleware/auth.js";
import { sendOtpEmail } from "../services/mail.service.js";

const router = express.Router();

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const hashValue = (value) =>
  crypto.createHash("sha256").update(String(value)).digest("hex");

const createOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

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

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({
        message: "If that email exists, an OTP has been sent.",
      });
    }

    const otp = createOtp();
    const hashedOtp = hashValue(otp);

    user.resetPasswordToken = hashedOtp;
    user.resetPasswordExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOtpEmail(user.email, otp);

    res.json({
      message: "OTP sent to your email. Enter it below to reset your password.",
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({ message: "Failed to send OTP email" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "OTP is invalid or has expired" });
    }

    const hashedOtp = hashValue(otp);
    if (user.resetPasswordToken !== hashedOtp) {
      return res.status(400).json({ message: "OTP is invalid or has expired" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error.message);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
});

router.post("/reset-password-otp", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, OTP and new password are required" });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "OTP is invalid or has expired" });
    }

    const hashedOtp = hashValue(otp);
    if (user.resetPasswordToken !== hashedOtp) {
      return res.status(400).json({ message: "OTP is invalid or has expired" });
    }

    user.passwordHash = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password OTP error:", error.message);
    res.status(500).json({ message: "Password reset failed" });
  }
});

// Legacy route kept for compatibility
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword)
      return res.status(400).json({ message: "New password is required" });

    const hashedToken = hashValue(req.params.token);

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Reset link is invalid or has expired" });
    }

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
