import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
   route: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    daysOfWeek: {
      type: [String],
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    driver: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Schedule", scheduleSchema);
