import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.json());
app.use(cors());

// Required for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Optional: root route explicitly
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../template/", "index.html"));
});

// Serve static files from /src
app.use(express.static(path.join(__dirname, "../template/")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
