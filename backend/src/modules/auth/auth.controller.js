import User from "../../models/users.model.js";
import { hashed_Password, compared_Password } from "../../utils/password.hash.js";
import { generate_Access_Token, generate_Refresh_Token } from "../../utils/generate.token.js";

export const sign_Up = async (req,res,next) => {
  try {
    const {name, email, password} = req.body;

    // validates input if not empty
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // checking if user already exist
    const user_Exist = await User.findOne({email});
    if (user_Exist) {
      return res.status(400).json({message: "Email already in use."});
    }

    // if user is new, hash password then create and save in database
    if (!user_Exist) {
      const new_User = await User.create({name, email, password});

      const token = generate_Access_Token(new_User._id);

      res.status(201).json({
        message: "Signup successful.",
        token,
        user: {
          id: new_User._id,
          name: new_User.name,
          email: new_User.email,
        },
      });
    }
  } catch (error) {
    next(error) 
    // this mean next -> global error middleware
    // error means Express’s built-in error propagation system
    // so it will go next to a component with err parameter like the global error middleware
  }
  

}

export const sign_In = async (req,res,next) => {
  try { 
    const {email , password} = req.body;
    
    // validate the input if not empty 
    if (!email || !password) {
      return res.status(400).json({message:"Email and password are required."});
    }

    // check if email and pass input are matched in database
    const user = await User.findOne({email})

    if (!user) {
      return res.status(401).json({message: "Invalid Email or Password"});
    }

    const password_Match = await compared_Password(password, user.password);
    if (password_Match === compared_Password) {
      if (!isMatch) return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    // Generate tokens
    const accessToken = generate_Access_Token(user._id);
    const refreshToken = generate_Refresh_Token(user._id);

    // Respond
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
      tokens: {
        access: accessToken,
        refresh: refreshToken,
      },
    });

  } catch (error) {
    next(error); // next error 
  }
}