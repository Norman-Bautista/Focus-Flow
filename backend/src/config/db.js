import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const connectDB = async () => {
  console.log(`🚀 Starting MongoDB connection...`);
  
  // Get URI from environment
  const mongoURI = process.env.MONGODB_URI;
  
  if (!mongoURI) {
    console.error('❌ ERROR: MONGODB_URI is not defined in .env file');
    console.error('   Make sure your .env file has: MONGODB_URI=mongodb://mongo:27017/focusflow');
    process.exit(1);
  }
  
  console.log(`🔗 MongoDB URI: ${mongoURI}`);
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    
    console.log(`✅ MongoDB Connected!`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    console.log('💥 Exiting application');
    process.exit(1);
  }
};

export default connectDB;