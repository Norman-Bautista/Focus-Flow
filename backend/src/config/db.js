import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'development';
  
  console.log(`🚀 Starting MongoDB connection...`);
  console.log(`🌍 Environment: ${isProduction ? 'Production' : 'Development'}`);
  
  // Get URI from environment
  const mongoURI = process.env.MONGODB_URI;
  
  if (!mongoURI) {
    console.error('❌ ERROR: MONGODB_URI is not defined in .env file');
    process.exit(1);
  }
  
  // Log sanitized URI (hide password)
  const safeURI = mongoURI.includes('@') 
    ? mongoURI.replace(/:([^:@]+)@/, ':****@')
    : mongoURI;
  console.log(`🔗 MongoDB URI: ${safeURI}`);
  
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
    
    if (isProduction) {
      console.log('⚠️ Running without database in production');
      return null;
    } else {
      console.log('💥 Exiting in development mode');
      process.exit(1);
    }
  }
};

export default connectDB;