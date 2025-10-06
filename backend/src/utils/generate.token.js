
import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN} from '../config/env.js';
import jwt from 'jsonwebtoken';

export const generate_Access_Token = async (userId) => {
  return jwt.sign({userId: userId._id},ACCESS_TOKEN_SECRET, {expiresIn: JWT_ACCESS_EXPIRES_IN});
};

export const generate_Refresh_Token = async (userId) => {
  return jwt.sign({userId: userId._id}, REFRESH_TOKEN_SECRET, {expiresIn: JWT_REFRESH_EXPIRES_IN});
};