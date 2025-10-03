import dotenv from 'dotenv';
import app from "./app.js";
import db_Connection from "./config/db.js";
import { PORT } from "./config/env.js";

dotenv.config();

db_Connection();

app.listen(PORT, () =>{
  console.log(`Server connected and running at localhost:${PORT}`)
});

