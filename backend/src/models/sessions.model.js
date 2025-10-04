
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
  },

  ended_At: {
    type: Date,
  },

  streak: {
    type: Number,
    default: 0,
  },

  cycles_Completed: {
    type: Number,
    default: 0,
  },

  time_Spent: {
    type: Number,
    default: 0,
  }


}, {timestamps:true});

const Sessions = mongoose.model("Sessions", session_Schema);

export default Sessions;