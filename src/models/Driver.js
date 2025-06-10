import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  email: String,
  phone: String,
  address: String,
  licenseNumber: String,
  licenseExpiry: String,
  vehicleReg: String,
  vehicleType: String,
  experience: String,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  profileImage: String,
  assignedVehicle: { type: String, default: "" }, // store vehicle id or regNumber
});

export default mongoose.model("Driver", driverSchema);
