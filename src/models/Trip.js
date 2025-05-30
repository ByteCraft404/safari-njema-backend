import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  routeId: String,
  company: String,
  vehicleType: String,
  service: String,
  departureTime: String,
  arrivalTime: String,
  price: Number,
  availableSeats: Number,
  totalSeats: Number,
  features: [String],
  fromCity: String,
  toCity: String,
});

export default mongoose.model("Trip", tripSchema);
