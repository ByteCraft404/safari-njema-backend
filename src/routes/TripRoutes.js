import express from "express";
import { searchTrips, getTripDetails } from "../controllers/TripController.js";

const router = express.Router();

router.get("/search", searchTrips);
router.get("/:id", getTripDetails);

export default router;
