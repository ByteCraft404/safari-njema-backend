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
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(
  cors({
    origin: 'https://johnny-mg4p.onrender.com',
    methods: "GET,POST,PUT,DELETE,PATCH", 
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World Welcome To The Development Server Side of safariNjema....Its your boy ByteCraft404");
});
app.use("/auth", AuthRoutes);
app.use("/trips", TripRoutes);
app.use("/bookings", BookingRoutes);
app.use("/customers", CustomerRoutes);
app.use("/api/cities", CityRoutes);
app.use("/api/routes", RouteRoutes);
app.use("/api/drivers", DriverRoutes);
app.use("/api/events", EventRoutes);
app.use("/api/schedules", ScheduleRoutes);
app.use("/api/vehicles", VehicleRoutes);

app.listen(PORT, async () => {
  try {
    await ConnectToDB();
    console.log(`Server Is Awake And Running `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

console.log("Server Port:", PORT);
