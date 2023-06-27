import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
// import bodyParser from "body-parser";
import { logger } from "./services/ESLogger";
import { connectDatabase } from "./db";
import { users_routes } from "./routes/users";


const app = express();
const port = 3000;
dotenv.config();


// app.use(bodyParser.json());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());


app.use("/users", users_routes)
app.get("/", (_, res) => res.send("Hello world from home !"))




app.listen(port, () => {
  
  // Connect to MongoDB
  connectDatabase();

  
  logger.info(`app listening on http://localhost:${port}`)
});