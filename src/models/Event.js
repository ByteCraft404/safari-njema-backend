import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
});

export default mongoose.model("Event", eventSchema);
