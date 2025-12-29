import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
//import OpenAI from "openai";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.host, // "mysql" if Node is in Docker
  user: process.env.username,
  password: process.env.password,
  database: process.env.database,
  port: parseInt(process.env.port),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync("../cert/ca-certificate.crt"),
  },
});
/*
const client = new OpenAI({
  apiKey: process.env.openai, // This is the default and can be omitted
  timeout: 180 * 1000,
});
*/
// Required for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Optional: root route explicitly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Serve static files from /src
app.use(express.static(path.join(__dirname, "src")));
