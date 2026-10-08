import express from "express";
import multer from "multer";
import FormData from "form-data";
import axios from "axios";
import protect from "../middleware/auth.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\//.test(file.mimetype)),
});

router.post("/", protect, upload.single("image"), async (req, res) => {
  if (!req.file || !process.env.PYTHON_API_URL)
    return res.json({ success: false });
  try {
    const form = new FormData();
    form.append("image", req.file.buffer, {
      filename: "frame.jpg",
      contentType: req.file.mimetype,
    });
    const response = await axios.post(
      `${process.env.PYTHON_API_URL}/detect`,
      form,
      {
        headers: form.getHeaders(),
        timeout: 4000,
      },
    );
    res.json(response.data);
  } catch {
    res.json({ success: false });
  }
});

export default router;
