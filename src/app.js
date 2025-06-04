import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/image.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/v1", router);


export default app;