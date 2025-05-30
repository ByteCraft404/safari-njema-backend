import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  email: String,
  idNumber: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Customer", customerSchema);
