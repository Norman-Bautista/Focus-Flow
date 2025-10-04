import dotenv from 'dotenv';
import app from "./app.js";
import db_Connection from "./config/db.js";
import { PORT } from "./config/env.js";

dotenv.config();

db_Connection();

process.on("uncaughtException", (err) => {
  console.error("💥 UNHANDLED EXCEPTION:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION:", err);
  process.exit(1);
});

app.listen(PORT, () =>{
  console.log(`Server connected and running at localhost:${PORT}`)
});

