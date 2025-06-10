import { Router } from "express";
import { getAllDrivers, addDriver, updateDriver, updateDriverStatus, deleteDriver } from "../controllers/DriverController.js";
const router = Router();
router.get("/", getAllDrivers);
router.post("/", addDriver);
router.put("/:id", updateDriver);    // For editing/updating
router.patch("/:id/status", updateDriverStatus); // (Optional) For status change
router.delete("/:id", deleteDriver); // For deleting

export default router;
