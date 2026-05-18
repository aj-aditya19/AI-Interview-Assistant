import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import groqRouter from "./routes/groq.route.js";

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

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const startServer = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
