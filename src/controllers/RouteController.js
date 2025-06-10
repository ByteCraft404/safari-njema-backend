import Route from "../models/Route.js";

// Get all routes
export const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new route
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update route info
export const updateRoute = async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRoute)
      return res.status(404).json({ message: "Route not found" });
    res.json(updatedRoute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change route status (activate/deactivate)
export const updateRouteStatus = async (req, res) => {
  try {
    const { active } = req.body;
    const route = await Route.findByIdAndUpdate(
      req.params.id,
      { active },
      { new: true }
    );
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete route
export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route)
      return res.status(404).json({ message: "Route not found" });
    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
