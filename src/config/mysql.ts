import fs from "fs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const sslConfig = process.env.DB_SSL_CA
  ? {
      ca: fs.readFileSync(path.resolve(process.env.DB_SSL_CA)),
    }
  : undefined;

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "outfit_creator",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ...(sslConfig && { ssl: sslConfig }), // Only add ssl if it exists
});
