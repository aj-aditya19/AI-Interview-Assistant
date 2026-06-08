import express from "express";
import { protect } from "../middleware/auth.js";
import { createTalk, getTalk } from "../services/did.service.js";

const router = express.Router();

router.post("/avatar/speak", protect, async (req, res) => {
  try {
    const text = req.body?.text;

    if (!text) {
      return res.status(400).json({
        message: "Text required",
      });
    }

    const talk = await createTalk(text);

    res.json(talk);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      message: "Failed to create avatar video",
    });
  }
});

router.get("/avatar/status/:id", protect, async (req, res) => {
  try {
    const result = await getTalk(req.params.id);

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch status",
    });
  }
});

export default router;
