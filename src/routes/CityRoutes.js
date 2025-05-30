import express from "express";
import { getAllCities } from "../controllers/CityController.js";
import { createCity } from "../controllers/CityController.js";
const router = express.Router();

router.get("/", getAllCities);
router.post("/", createCity);

export default router;
