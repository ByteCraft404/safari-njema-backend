import { Router } from "express";
import { getAllDrivers, addDriver } from "../controllers/DriverController.js";
const router = Router();
router.get("/", getAllDrivers);
router.post("/", addDriver);

export default router;
