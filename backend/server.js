import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import interviewProfileRoutes from "./routes/interviewProfile.route.js";
import interviewRoutes from "./routes/interview.route.js";
import ppdtRoutes from "./routes/ppdt.route.js";
import adminRoutes from "./routes/admin.route.js";
import waitlistRoutes from "./routes/waitlist.route.js";
import faceRoutes from "./routes/face.route.js";
import practiceRoutes from "./routes/practice.route.js";
import progressRoutes from "./routes/progress.route.js";
import resumeRoutes from "./routes/resume.route.js";
import communicationRoutes from "./routes/communication.route.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

for (const key of ["JWT_SECRET", "GROQ_API_KEY", "MONGO_URI"]) {
  if (!process.env[key]) console.warn(`⚠️  ${key} is not set`);
}

connectDB();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

const allowed = (process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
app.use(
  cors({
    origin: allowed.length
      ? (origin, cb) =>
          !origin || allowed.includes(origin)
            ? cb(null, true)
            : cb(new Error("Not allowed by CORS"))
      : true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use(
  "/static",
  express.static(path.join(__dirname, "public"), { maxAge: "7d" }),
);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many requests. Please slow down a little." },
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many attempts. Try again in a few minutes." },
});

app.use("/api", globalLimiter);

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/interview-profiles", interviewProfileRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/ppdt", ppdtRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/communication", communicationRoutes);
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

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`InterviewIQ backend running on port ${PORT}`);
});
