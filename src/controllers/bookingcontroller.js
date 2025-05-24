import Booking from "../models/Booking.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

function generateShortId(bookingId) {
  const hash = crypto
    .createHash("sha256")
    .update(bookingId.toString())
    .digest("hex");
  return parseInt(hash.slice(0, 8), 16).toString(36).slice(0, 6).toUpperCase();
}

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new booking
export const createBooking = async (req, res) => {
  const {
    location,
    destination,
    name,
    email,
    traveldate,
    vehicle,
    seatnumber,
    price,
    phone,
  } = req.body;

  try {
    const booking = await Booking.create({
      location,
      destination,
      name,
      email,
      traveldate,
      vehicle,
      seatnumber,
      price,
      phone,
    });

    // Create token
    const token = jwt.sign({ phone, bookingId: booking._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const shortId = generateShortId(booking._id); // 6-character ID
    booking.shortId = shortId;

    res.status(201).json({ message: "Booking successful", booking, token });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { phone, bookingId } = decoded;

    // Ensure user is authorized to update this booking
    if (req.params.id !== bookingId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this booking" });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, phone },
      req.body,
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });
    }

    res.status(200).json({ message: "Booking updated", booking });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { phone, bookingId } = decoded;

    // Ensure user is authorized to delete this booking
    if (req.params.id !== bookingId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this booking" });
    }

    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      phone,
    });

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};
