import {config} from 'dotenv';

config({
  path:`.env.${process.env.NODE_ENV || "development"}.local`,
});

export const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  ACCESS_TOKEN_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  JWT_REFRESH_EXPIRES_IN,
} = process.env;