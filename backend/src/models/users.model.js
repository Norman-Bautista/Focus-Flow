import mongoose, { Schema } from "mongoose";

const user_Schema = new mongoose.Schema({
    
  name: {
      type: String,
      required: [true, 'Username is Required'],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },

    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 5,
      maxLength: 255,
      match: [/\S+@\S+\.\S+/, 'Please Enter a Valid Email address'],
    },
      
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minLength: 6,
    }
  }, {timestamps: true});

const User = mongoose.model('User', user_Schema)

export default User;