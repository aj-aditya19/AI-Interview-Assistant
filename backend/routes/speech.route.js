import express from "express";
import { spawn } from "child_process";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { protect } from "../middleware/auth.js";

const speechRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const synthesizeSpeech = (text) =>
  new Promise((resolve, reject) => {
    const pythonCommand = process.env.PYTHON_BINARY || "python";
    const scriptPath = path.join(__dirname, "..", "python", "tts.py");
    const tempFileName = path.join(
      os.tmpdir(),
      `ai-interview-voice-${Date.now()}-${Math.random().toString(16).slice(2)}.wav`,
    );

    const child = spawn(
      pythonCommand,
      [scriptPath, "--text", text, "--output", tempFileName],
      {
        stdio: ["ignore", "pipe", "pipe"],
      },
    );

    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", async (error) => {
      await fs.unlink(tempFileName).catch(() => {});
      reject(error);
    });

    child.on("close", async (code) => {
      if (code !== 0) {
        await fs.unlink(tempFileName).catch(() => {});
        reject(new Error(stderr || "Python TTS process failed"));
        return;
      }

      try {
        const audioBuffer = await fs.readFile(tempFileName);
        await fs.unlink(tempFileName).catch(() => {});
        resolve(audioBuffer);
      } catch (error) {
        await fs.unlink(tempFileName).catch(() => {});
        reject(error);
      }
    });
  });

speechRouter.post("/speech/speak", protect, async (req, res) => {
  try {
    const text = String(req.body?.text || "").trim();

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const audioBuffer = await synthesizeSpeech(text);
    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Content-Disposition", 'inline; filename="reply.wav"');
    res.send(audioBuffer);
  } catch (error) {
    console.error("Speech synthesis error:", error.message);
    res.status(500).json({
      message: "Failed to generate spoken audio",
    });
  }
});

export default speechRouter;
