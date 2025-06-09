import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/image.route.js";

const app = express();

// Handle __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// ✅ This serves static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Your routes
app.use("/v1", router);

export default app;
