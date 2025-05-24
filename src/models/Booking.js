import mongoose from "mongoose";
const BookingSchema = mongoose.Schema(
  {
    location: { type: "string", required: [true] },
    destination: { type: "string", required: [true] },
    traveldate: { type: "date", required: [true] },
    name: { type: "string", required: [true] },
    email: { type: "string" },
    vehicle: { type: "string", required: [true] },
    seatnumber: { type: "string", required: [true] },
    price: { type: "number", required: [true] },
    phone: { type: "string", required: [true] },
  },
  {
    versionKey: false,
  }
);
const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
