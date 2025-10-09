
import mongoose from "mongoose";

const todo_Schema = new mongoose.Schema({

  user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },

  description: {
    type: String, 
    minLength:10,
    maxLength: 120,
  },

  priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  
  focusCycles: {
      type: Number,
      default: 0,
    },

  status: {
    type: String,
    enum: ["Not done", "Completed"],
    default: "Not done"
  },

  created_At: {
    type: Date,
    default:Date.now(),
  }

}, {timestamps: true})

const Task = mongoose.model('Task', todo_Schema);

export default Task;