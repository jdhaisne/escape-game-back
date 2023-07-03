import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { logger } from "./services/ESLogger";
import { connectDatabase } from "./db";
import { auth_routes } from "./routes/auth";
import { users_routes } from "./routes/users";
import { rooms_routes } from "./routes/rooms";
import { bookings_routes } from "./routes/bookings";
import { admin_routes } from "./routes/admin";
import { seedRooms } from "./seeders/roomSeeder";
import { seedUSer } from "./seeders/userSeeder";
import { seedBooking } from "./seeders/bookingSeeder";



const app = express();
const port = 3000;
dotenv.config();


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

app.get("/", (_, res) => res.send("Hello world from home !"))
app.use("/auth", auth_routes)
app.use("/users", users_routes)
app.use("/rooms", rooms_routes)
app.use("/bookings", bookings_routes)
app.use("/admin", admin_routes)




app.listen(port, async () => {
  // Connect to MongoDB
  await connectDatabase();

  // Seed Rooms : 
  seedRooms();
  // Seed User
  seedUSer();
  // Seed Booking
  seedBooking();
  logger.info(`app listening on http://localhost:${port}`)
});