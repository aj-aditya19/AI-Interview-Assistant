import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import interviewProfileRoutes from "./routes/interviewProfile.route.js";
import interviewRoutes from "./routes/interview.route.js";
import ppdtRoutes from "./routes/ppdt.route.js";
import adminRoutes from "./routes/admin.route.js";
import waitlistRoutes from "./routes/waitlist.route.js";
import faceRoutes from "./routes/face.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    // origin: process.env.CLIENT_URL || "http://localhost:5173",
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/interview-profiles", interviewProfileRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/ppdt", ppdtRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/waitlist", waitlistRoutes);
app.use("/api/face-detect", faceRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    project: "InterviewIQ",
    timestamp: new Date().toISOString(),
  });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`InterviewIQ backend running on port ${PORT}`);
});
