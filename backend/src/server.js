// backend/server.js (partial)
import express from 'express';
import connectDB from './config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Enhanced health endpoint
app.get('/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStates = {
    0: 'disconnected',
    1: 'connected', 
    2: 'connecting',
    3: 'disconnecting'
  };
  
  const health = {
    status: dbState === 1 ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    region: 'Singapore',
    database: {
      state: dbStates[dbState] || 'unknown',
      code: dbState,
      host: dbState === 1 ? mongoose.connection.host : null,
      name: dbState === 1 ? mongoose.connection.name : null
    },
    memory: {
      rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`
    },
    environment: process.env.NODE_ENV || 'development'
  };
  
  // Health status code
  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

// Initialize database connection
let dbConnection = null;

const startServer = async () => {
  try {
    console.log('🚀 Starting FocusFlow Backend...');
    console.log(`🌏 Region: Singapore`);
    console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Connect to MongoDB
    dbConnection = await connectDB();
    
    // Start Express server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🔗 Health endpoint: http://0.0.0.0:${PORT}/health`);
      console.log(`🌐 Public URL: https://focus-flow-ioce.onrender.com`);
      
      if (dbConnection) {
        console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected'}`);
      }
    });
    
  } catch (error) {
    console.error('💥 Server startup failed:', error.message);
    
    // In production, try to restart
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Attempting restart in 10 seconds...');
      setTimeout(startServer, 10000);
    }
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

// Start the application
startServer();

export default app;