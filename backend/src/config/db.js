// backend/src/config/db.js
import mongoose from 'mongoose';

// Configuration matching your MongoDB URI parameters
const mongooseOptions = {

  serverSelectionTimeoutMS: 30000,    // Match your URI: serverSelectionTimeoutMS=30000
  socketTimeoutMS: 45000,             // Match your URI: socketTimeoutMS=45000
  family: 4,                          // Force IPv4 for better Asia connectivity
  maxPoolSize: 10,                    // Match your URI: maxPoolSize=10
  minPoolSize: 2,                     // Connection pool minimum
  retryWrites: true,                  // Match your URI: retryWrites=true
  w: 'majority',                      // Match your URI: w=majority
  appName: 'render-sg',               // Match your URI: appName=render-sg
};

const connectWithRetry = async (retries = 5, delay = 5000) => {
  console.log(`🌏 Connecting to MongoDB from Singapore...`);
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Connection attempt ${attempt}/${retries}`);
      
      const conn = await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
      
      console.log(`✅ MongoDB Connected!`);
      console.log(`   Host: ${conn.connection.host}`);
      console.log(`   Database: ${conn.connection.name}`);
      console.log(`   Ready State: ${conn.connection.readyState}`);
      
      return conn;
      
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed:`, error.message);
      
      if (attempt < retries) {
        const nextDelay = delay * attempt; // Exponential backoff
        console.log(`⏳ Retrying in ${nextDelay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, nextDelay));
      } else {
        console.error(`💥 All ${retries} connection attempts failed`);
        throw error;
      }
    }
  }
};

const connectDB = async () => {
  try {
    // Give Render time to fully initialize
    if (process.env.NODE_ENV === 'development') {
      console.log('⚡ Production mode detected (Render Singapore)');
      console.log('⏳ Waiting 3 seconds before DB connection...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    const connection = await connectWithRetry();
    
    // Event handlers for connection monitoring
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error event:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
      console.log('🔄 Will attempt auto-reconnect on next operation...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected successfully');
    });

    mongoose.connection.on('connected', () => {
      console.log('🔗 MongoDB connected event fired');
    });

    return connection;
    
  } catch (error) {
    console.error('💥 MongoDB connection failed after all retries:', error.message);
    
    // In production, don't crash - log and continue
    if (process.env.NODE_ENV === 'production') {
      console.log('🚨 Application will run without database connection');
      return null;
    } else {
      // In development, exit so we notice the issue
      process.exit(1);
    }
  }
};

export default connectDB;