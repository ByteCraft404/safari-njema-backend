import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import Customer from "../models/Customer.js";
import { initiateStkPush } from "../services/daraja.js";

export const createBooking = async (req, res) => {
  const { customerId, tripId, seatNumbers, paymentMethod } = req.body;

  try {
    const trip = await Trip.findById(tripId);
    const customer = await Customer.findById(customerId);

    const totalAmount = seatNumbers.length * trip.price;

    const booking = await Booking.create({
      customerId,
      tripId,
      seatNumbers,
      totalAmount,
      paymentMethod,
    });

    const stkResponse = await initiateStkPush({
      phone: customer.phoneNumber,
      amount: totalAmount,
      bookingId: booking._id,
    });

    res
      .status(201)
      .json({
        message: "Booking created. Payment initiated.",
        booking,
        stkResponse,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed", paymentStatus: "completed" },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled", paymentStatus: "failed" },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
