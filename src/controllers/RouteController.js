import Route from "../models/Route.js";

export const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const createRoute = async (req, res) => {
  try {
    const {
      name,
      distance,
      fare,
      stops,
      startTime,
      arrivalTime,
      duration,
      schedules,
      active,
    } = req.body;

    if (
      !name ||
      !distance ||
      !fare ||
      !stops ||
      !startTime ||
      !arrivalTime ||
      !duration
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const newRoute = new Route({
      name,
      distance,
      fare,
      stops,
      startTime,
      arrivalTime,
      duration,
      schedules,
      active,
    });

    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
  } catch (error) {
    console.error("Error adding route:", error);
    res.status(500).json({ message: "Server error while adding route." });
  }
};
