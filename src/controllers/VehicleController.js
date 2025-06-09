import Vehicle from "../models/Vehicle.js";

// GET /api/vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/vehicles
export const addVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
