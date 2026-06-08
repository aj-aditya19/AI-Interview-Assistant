import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import groqRouter from "./routes/groq.route.js";
import speechRouter from "./routes/speech.route.js";
import interviewRouter from "./routes/interview.route.js";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import avatarRouter from "./routes/avatar.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", authRouter);
app.use("/api", groqRouter);
app.use("/api", speechRouter);
app.use("/api", interviewRouter);
app.use("/api", avatarRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cameraProcess;

const startServer = async () => {
  await connectDb();

  const cameraScript = path.join(__dirname, "python", "interview", "camera.py");

  cameraProcess = spawn("python", [cameraScript], {
    stdio: "inherit",
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
