import { Router } from "express";
import {
  getAllVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle
} from "../controllers/VehicleController.js";

const router = Router();

router.get("/", getAllVehicles);
router.post("/", addVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
