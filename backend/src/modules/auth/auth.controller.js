import User from "../../models/users.model.js";
import jwt from "jsonwebtoken";

import { hashed_Password, compared_Password } from "../../util/password.hash.js";
import { generate_Access_Token, generate_Refresh_Token } from "../../util/generate.token.js";
import { REFRESH_TOKEN_SECRET } from "../../config/env.js";


// ✅ SIGNUP
export const sign_Up = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // hash password and save
    const hashedPass = await hashed_Password(password);
    const newUser = await User.create({ name, email, password: hashedPass });

    // generate tokens
    const accessToken = await generate_Access_Token(newUser);
    const refreshToken = await generate_Refresh_Token(newUser);

    // store refresh token in cookie (httpOnly = safer)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // set to true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ LOGIN
export const sign_In = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await compared_Password(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const accessToken = await generate_Access_Token(user);
    const refreshToken = await generate_Refresh_Token(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, name: user.name },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// auto refresh token logic in backend when refreshing token request sent from frontend
export const refresh_Token = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // verify the refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    if (!decoded?.userId) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = await generate_Access_Token(user);

    res.status(200).json({
      user: { id: user._id, email: user.email, name: user.name },
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
