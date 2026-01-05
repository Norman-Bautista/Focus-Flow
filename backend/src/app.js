import express from "express";
import morgan from "morgan";
import cors from "cors";
import global_Error_Middleware from "./middleware/global.middleware.js";
import auth_Routes from './modules/auth/auth.route.js';
import pomodoro_Routes from "./modules/pomodoro/pomodoro.route.js";
import task_Routes from "./modules/task/task.route.js";
import insight_Routes from "./modules/insight/insight.routes.js";

const app = express();

// ✅ 1. CORS FIRST - Before any other middleware
const allowedOrigins = ["http://localhost:5173", "https://focus-flow-client-amber.vercel.app", "https://your-backend-service-name.onrender.com" ];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['set-cookie']
};

app.use(cors(corsOptions));

// ✅ 2. Explicit OPTIONS handler for all routes
app.options('*', cors(corsOptions));

// ✅ 3. Other core middlewares AFTER CORS
app.use(express.json());                         
app.use(express.urlencoded({ extended: true })); 
app.use(morgan("dev"));

// Route Mounting
app.use('/api/v1/auth', auth_Routes);
app.use('/api/v1/pomodoro', pomodoro_Routes); 
app.use('/api/v1/task', task_Routes);
app.use('/api/v1/insights', insight_Routes);

// ✅ 4. Add this before global error middleware - Additional CORS headers for all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Internal middlewares
app.use(global_Error_Middleware);

// ✅ Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "FocusFlow backend is running 🚀" });
});

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Export app for server.js
export default app;