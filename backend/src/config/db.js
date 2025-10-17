import mongoose from 'mongoose';
import { MONGO_URI } from './env.js';

if (!MONGO_URI) {
  throw new Error("Database not found!!!")
}

const db_Connection = async() => {

  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error("Connection failed. Something went wrong", error)
    process.exit(1);
  }
}
export default db_Connection;