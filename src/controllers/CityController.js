import City from "../models/City.js";
export const createCity = async (req, res) => {
  try {
    const { name } = req.body;
    const city = new City({ name });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
