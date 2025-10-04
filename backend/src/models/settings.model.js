
import mongoose from "mongoose";

const setting_Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  display_Name: {
    type: String,
    default: "default",
  },

  focus_Duration: {
    type: Number,
  },

  break_Duration: {
    type: Number,
  },

  longBreak_Duration: {
    type: Number,
  },

  setCycle_Before_Longbreak: {
    type: Number,
  }
});




// pomodoro: {
//     focusDuration: {
//       type: Number,
//       default: 25,
//     },
//     restDuration: {
//       type: Number,
//       default: 5,
//     },
//     longBreakDuration: {
//       type: Number,
//       default: 15,
//     }
    
//   }