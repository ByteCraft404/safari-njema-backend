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
  airConditioned: Boolean,
  wifi: Boolean,
  tv: Boolean,
  refreshments: Boolean,
  imageUrl: String,
});

export default mongoose.model("Vehicle", vehicleSchema);
