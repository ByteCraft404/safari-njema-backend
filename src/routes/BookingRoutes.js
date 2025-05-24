import express from "express";
import {
  createBooking,
  updateBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
} from "../controllers/bookingcontroller.js";

const router = express.Router();

// Create a new booking
router.post("/", createBooking);

// Update a booking (requires token in Authorization header)
router.put("/:id", updateBooking);

// Delete a booking (requires token in Authorization header)
router.delete("/:id", deleteBooking);

// Get all bookings (useful for admin/testing)
router.get("/", getAllBookings);

// Get a specific booking by ID (optional)
router.get("/:id", getBookingById);

export default router;
