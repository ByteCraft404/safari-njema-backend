import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import TripRoutes from "./routes/TripRoutes.js";
import BookingRoutes from "./routes/BookingRoutes.js";
import CustomerRoutes from "./routes/CustomerRoutes.js";
import CityRoutes from "./routes/CityRoutes.js";
import RouteRoutes from "./routes/RouteRoutes.js";
import DriverRoutes from "./routes/DriverRoutes.js";
import EventRoutes from "./routes/EventRoutes.js";
import ScheduleRoutes from "./routes/ScheduleRoutes.js";
import VehicleRoutes from "./routes/VehicleRoutes.js";


import ConnectToDB from "./config/db.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/auth", AuthRoutes);
app.use("/trips", TripRoutes);
app.use("/bookings", BookingRoutes);
app.use("/customers", CustomerRoutes);
app.use("/api/cities", CityRoutes);
app.use("/api/routes", RouteRoutes);
app.use("/api/driver", DriverRoutes);
app.use("/api/events", EventRoutes);
app.use("/api/schedules", ScheduleRoutes);
app.use("/api/vehicles", VehicleRoutes);

app.listen(PORT, async () => {
  try {
    await ConnectToDB();
    console.log(`Server Backend running at localhost:${PORT}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("MONGO_URI:", process.env.MONGO_URL);
console.log("PORT:", PORT);
