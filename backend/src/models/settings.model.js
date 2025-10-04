
import mongoose, { mongo } from "mongoose";

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
}, {timestamps: true});


const Settings = mongoose.model('Settings', setting_Schema);

export default Settings;

