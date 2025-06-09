import Trip from "../models/Trip.js";

export const searchTrips = async (req, res) => {
  const { fromCity, toCity } = req.query;
  try {
    const trips = await Trip.find({ fromCity, toCity });
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTripDetails = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
