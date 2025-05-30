import { Router } from "express";
import {
  getAllVehicles,
  addVehicle,
} from "../controllers/VehicleController.js";
const router = Router();

// GET all vehicles
router.get("/", getAllVehicles);

// POST a new vehicle
router.post("/", addVehicle);

export default router;
