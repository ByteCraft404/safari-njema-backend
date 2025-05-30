import Schedule from "../models/Schedule.js";

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("vehicleId")
      .populate("driverId")
      .populate("routeId");
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSchedule = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const {
      route,
      departureTime,
      arrivalTime,
      daysOfWeek,
      vehicle,
      driver,
      status,
    } = req.body;

    // Basic validation
    if (
      !route ||
      !departureTime ||
      !arrivalTime ||
      !daysOfWeek ||
      !vehicle ||
      !driver
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const schedule = new Schedule({
      route,
      departureTime,
      arrivalTime,
      daysOfWeek,
      vehicle,
      driver,
      status: status || "Active",
    });

    const savedSchedule = await schedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error("Error creating schedule:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!schedule)
      return res.status(404).json({ message: "Schedule not found" });
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule)
      return res.status(404).json({ message: "Schedule not found" });
    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
