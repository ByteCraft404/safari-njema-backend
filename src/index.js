import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import BookingRoutes from "./routes/BookingRoutes.js";

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
  res.send("hello world");
});
app.use("/auth", AuthRoutes);
app.use("/bookings", BookingRoutes);

app.listen(PORT, async () => {
  await ConnectToDB();
  console.log(`app running at http://localhost:${PORT}`);
});
