import app from './app.js'; // Import the app from app.js
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try {
    console.log('🚀 Starting FocusFlow Backend...');
    
    // Connect to MongoDB
    await connectDB();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error('💥 Server startup failed:', error.message);
    process.exit(1);
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

startServer();