import Booking from "../models/Booking.js";

// Middleware to validate phone number and check seat availability
export const validateBooking = async (req, res, next) => {
  const { phone, seatnumber, location, destination, traveldate, vehicle } =
    req.body;

  // Validate phone number format
  if (!/^0\d{9}$/.test(phone)) {
    return res
      .status(400)
      .json({ message: "Phone number must be 10 digits and start with 0" });
  }

  // Check if the seat is already booked for that route/date/vehicle
  const existingBooking = await Booking.findOne({
    seatnumber,
    location,
    destination,
    traveldate,
    vehicle,
  });

  if (existingBooking) {
    return res.status(400).json({
      message: `Seat number ${seatnumber} is already booked for ${vehicle} on ${traveldate} from ${location} to ${destination}`,
    });
  }

  next(); // Validation passed, continue to controller
};
