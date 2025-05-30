import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingReference: String,
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  seatNumbers: [Number],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
