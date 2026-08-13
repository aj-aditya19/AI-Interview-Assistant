import express from "express";
import multer from "multer";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
      });
    }

    const form = new FormData();

    form.append("image", fs.createReadStream(req.file.path));

    const response = await axios.post(
      `${process.env.PYTHON_API_URL}/detect`,
      form,
      {
        headers: form.getHeaders(),
      },
    );

    fs.unlinkSync(req.file.path);

    res.json(response.data);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
});

export default router;
