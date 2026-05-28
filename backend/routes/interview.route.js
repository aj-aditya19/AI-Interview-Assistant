import express from "express";
import axios from "axios";
import { randomUUID } from "crypto";
import { protect } from "../middleware/auth.js";

const interviewRouter = express.Router();
const interviewSessions = new Map();

import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createChatSession,
  finishChatSession,
  reviewChatSession,
} from "../services/chatsession.js";

const interviewRouter = express.Router();

interviewRouter.post("/interview/session", protect, async (req, res) => {
  try {
    const action = String(req.body?.action || "start").trim();

    if (action === "start") {
      const session = await createChatSession({
        user: req.user,
        setup: req.body?.setup || {},
      });

      return res.json(session);
    }

    if (action === "finish") {
      const result = await finishChatSession({
        user: req.user,
        sessionId: req.body?.sessionId,
        setup: req.body?.setup || {},
        history: Array.isArray(req.body?.history) ? req.body.history : [],
        reason: req.body?.reason,
      });

      return res.json(result);
    }

    const review = await reviewChatSession({
      user: req.user,
      sessionId: req.body?.sessionId,
      setup: req.body?.setup || {},
      question: req.body?.question,
      answer: req.body?.answer,
      history: Array.isArray(req.body?.history) ? req.body.history : [],
    });

    return res.json(review);
  } catch (error) {
    console.error(
      "Interview session error:",
      error.response?.data || error.message,
    );
    return res.status(500).json({
      message: error.message || "Failed to run interview chat session",
    });
  }
});

export default interviewRouter;
