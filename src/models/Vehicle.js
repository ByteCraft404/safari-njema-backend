import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  regNumber: String,
  type: String,
  make: String,
  model: String,
  year: String,
  capacity: Number,
  fuelType: String,
  fuelCapacity: String,
  condition: String,
  purchaseDate: String,
  assignedDriver: String,
  route: String,
  departureTime: String,
  arrivalTime: String,
  status: String,
  airConditioned: Boolean,
  wifi: Boolean,
  tv: Boolean,
  refreshments: Boolean,
  imageUrl: String,
  lastMaintenance: String,
  assignedVehicle: { type: String, default: "" }, // store vehicle id or regNumber
});

export default mongoose.model("Vehicle", vehicleSchema);
