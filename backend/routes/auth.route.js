import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { generateOtp, storeOtp, verifyOtp } from "../utils/otp.js";
import { sendOtpEmail } from "../utils/email.js";
import { protect } from "../middleware/auth.js";

const auth_router = express.Router();

auth_router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "viewer",
      status: "active",
    });

    const otp = generateOtp();
    storeOtp(email, otp);
    await sendOtpEmail(email, otp, name);

    res.status(201).json({
      message: "OTP sent to email. Verify to complete registration",
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during registration" });
  }
});

auth_router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const result = verifyOtp(email, otp);

    if (!result.valid) {
      return res.status(400).json({ message: result.reason });
    }

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { isVerified: true },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

auth_router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.status === "inactive") {
      return res.status(403).json({ message: "Account inactive" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
});

auth_router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const otp = generateOtp();
    storeOtp(email, otp);
    await sendOtpEmail(email, otp, user.name);

    res.json({ message: "OTP resent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

auth_router.get("/me", protect, async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

auth_router.put("/profile", protect, async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true },
    ).select("-password");

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default auth_router;
