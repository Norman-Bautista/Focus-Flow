import express from "express";
import morgan from "morgan";
import cors from "cors";
import global_Error_Middleware from "./middleware/global.middleware.js";
import auth_Routes from './modules/auth/auth.route.js';
import pomodoro_Routes from "./modules/pomodoro/pomodoro.route.js";
import task_Routes from "./modules/task/task.route.js";
import insight_Routes from "./modules/insight/insight.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "https://focus-flow-client-amber.vercel.app"
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());                         
app.use(express.urlencoded({ extended: true })); 
app.use(morgan("dev"));

// Routes
app.use('/api/v1/auth', auth_Routes);
app.use('/api/v1/pomodoro', pomodoro_Routes); 
app.use('/api/v1/task', task_Routes);
app.use('/api/v1/insights', insight_Routes);

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(global_Error_Middleware);

export default app;