import express from "express";
import multer from "multer";
import path from "path";
import {
  downloadController,
  imageUploadController,
} from "../controllers/image.controller.js";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_")
      .replace(/[^\w\-]/g, "");

    const uniqueName = `${Date.now()}-${baseName}${ext}`;
    cb(null, uniqueName);
  },
});

// ✅ File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mime = allowedTypes.test(file.mimetype.toLowerCase());
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mime && ext) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, or GIF images are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Optional: 5MB limit
  },
});

// Routes
router.post("/upload-image", upload.single("image"), imageUploadController);
router.get("/get-image/:name", downloadController);

export default router;
