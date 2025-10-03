import express from "express";
import morgan from "morgan";

const app = express();

// ✅ Core Middlewares
app.use(express.json());                         // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("dev"));                          // Logging

// ✅ Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "FocusFlow backend is running 🚀" });
});

// Route Mounting

// ✅ Export app for server.js
export default app;
