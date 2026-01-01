// backend/src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000,  // Increase timeout
      socketTimeoutMS: 45000,
      family: 4,  // Force IPv4
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Retry logic for production
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Retrying connection in 10 seconds...');
      setTimeout(connectDB, 10000);
    } else {
      process.exit(1);
    }
  }
};

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  if (process.env.NODE_ENV === 'production') {
    setTimeout(connectDB, 5000);
  }
});

export default connectDB;