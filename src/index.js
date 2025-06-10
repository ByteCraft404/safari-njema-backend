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

const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));


const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://safari-njema-frontend.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS: Origin ${origin} not allowed.`);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  allowedHeaders: "Content-Type,Authorization", 
  credentials: true,
}));



app.get("/", (req, res) => {
  res.send("Hello World Safari Njema Backend is running.");
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



(async () => {
  try {
    await ConnectToDB();
    app.listen(PORT, () => {
      console.log(`Server is Awake And Running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to database connection error:', error.message);
    process.exit(1);
  }
})();

console.log("Server Port (at script start):", PORT); 