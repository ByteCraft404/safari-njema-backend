import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distance: { type: String, required: true },
  fare: { type: String, required: true },
  stops: { type: [String], required: true },
  startTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, required: true },
  schedules: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

export default mongoose.model("Route", routeSchema);
