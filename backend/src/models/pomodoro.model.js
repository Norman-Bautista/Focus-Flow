
import mongoose, { mongo } from "mongoose";

const pomodoro_Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  focus_Duration: {
    type: Number,
    default: 25,
  },

  rest_Duration: {
    type: Number,
    default: 5,
  },

  longBreak_Duration: {
    type: Number,
    default: 15,
  },

  setCycle_Before_Longbreak: {
    type: Number,
    default: 4,
  },

  updated_At: {
    type: Date,
    default: Date.now(),  
  }

}, {timestamps: true});


const Pomodoro = mongoose.model('Pomodoro', pomodoro_Schema);

export default Pomodoro;

