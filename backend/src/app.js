import express from "express";
import morgan from "morgan";

import global_Error_Middleware from "./middleware/global.middleware";
import auth_Routes from './modules/auth/auth.route.js';
import pomodoro_Routes from "./modules/pomodoro/pomodoro.route.js";
import task_Routes from "./modules/task/task.route.js";

const app = express();

// ✅ Core Middlewares
app.use(express.json());                         // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("dev"));                          // Logging

// Internal middlewares
app.use(global_Error_Middleware);


// ✅ Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "FocusFlow backend is running 🚀" });
});

// Route Mounting
app.use('/api/v1/auth', auth_Routes);
app.use('/api/v1/pomodoro', pomodoro_Routes);
app.use('/api/v1/tasks', task_Routes);

// ✅ Export app for server.js
export default app;
