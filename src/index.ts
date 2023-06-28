import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { logger } from "./services/ESLogger";
import { connectDatabase } from "./db";
import { auth_routes } from "./routes/auth";
import { users_routes } from "./routes/users";
import { seedRooms } from "./seeders/roomSeeder";



const app = express();
const port = 3000;
dotenv.config();


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());


app.use("/auth", auth_routes)
app.use("/users", users_routes)
app.get("/", (_, res) => res.send("Hello world from home !"))




app.listen(port, async () => {
  
  // Connect to MongoDB
  await connectDatabase();

  // Seed Rooms : 
  seedRooms();
  
  logger.info(`app listening on http://localhost:${port}`)
});