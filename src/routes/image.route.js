import express from "express";
import multer from "multer";
import { downloadController, imageUploadController } from "../controllers/image.controller.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/upload-image", upload.single("image"), imageUploadController);
router.get("/get-image/:name", downloadController);

export default router;
