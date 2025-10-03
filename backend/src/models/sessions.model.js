
import mongoose from "mongoose";

const session_Schema = new mongoose.Schema({

  // Foreign Key Concept in mongoose Schema.type
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  started_At: {
    type: Date,
    default: Date.now,
  }
  


  streak: {
    type: Number,
    default: 0,
  },

  cycles_Completed: {
    type: Number,
    default: 0,
  },


}, {timestamps:true})