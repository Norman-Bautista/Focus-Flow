import express from "express";
import morgan from "morgan";
import cors from "cors";
import global_Error_Middleware from "./middleware/global.middleware.js";
import auth_Routes from './modules/auth/auth.route.js';
import pomodoro_Routes from "./modules/pomodoro/pomodoro.route.js";
import task_Routes from "./modules/task/task.route.js";
import insight_Routes from "./modules/insight/insight.routes.js";

const app = express();

// ✅ Core Middlewares
app.use(express.json());                         // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("dev"));                          // Logging
app.use(cors({
  origin: "http://localhost:5173", // or your React dev port
  credentials: true, // important for cookies and withCredentials
}));


// Route Mounting
app.use('/api/v1/auth', auth_Routes);
app.use('/api/v1/pomodoro', pomodoro_Routes); 
app.use('/api/v1/task', task_Routes);
app.use('/api/v1/insights', insight_Routes);


// Internal middlewares
app.use(global_Error_Middleware);


// ✅ Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "FocusFlow backend is running 🚀" });
});


// ✅ Export app for server.js
export default app;
