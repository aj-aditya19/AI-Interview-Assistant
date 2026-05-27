import express from "express";
import axios from "axios";
import { protect } from "../middleware/auth.js";

const groqRouter = express.Router();

groqRouter.post("/groq/reply", protect, async (req, res) => {
  try {
    const prompt = String(req.body?.text || "").trim();

    if (!prompt) {
      return res.status(400).json({ message: "Text is required" });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ message: "GROQ_API_KEY is not configured" });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are an interview assistant. Reply clearly, helpfully, and concisely. ",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    const reply =
      response.data?.choices?.[0]?.message?.content?.trim() ||
      "No reply received.";

    res.json({ reply });
  } catch (error) {
    console.error("Groq reply error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to get reply from Groq",
    });
  }
});

export default groqRouter;
