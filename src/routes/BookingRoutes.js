import express from "express";
import {
  createBooking,
  confirmBooking,
} from "../controllers/BookingController.js";
import { cancelBooking } from "../controllers/BookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.post("/confirm/:id", confirmBooking);
router.post("/cancel/:id", cancelBooking);

export default router;
