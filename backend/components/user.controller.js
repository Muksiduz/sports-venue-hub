import Venue from "../models/Venue.models.js";
import Booking from "../models/bookings.models.js";

export const getAllVenues = async (req, res) => {
  try {
    const venue = await Venue.find();
    if (!venue) {
      return res.status(404).json({
        message: "No venue found",
      });
    }
    res.status(201).json({
      venue,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error in getting venue",
    });
  }
};
export const getSingleVenue = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findById({ _id: id });
    if (!venue) {
      return res.status(404).json({
        message: "No venue found",
      });
    }
    res.status(201).json({
      venue,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error in getting venue",
    });
  }
};

export const createBookings = async (req, res) => {
  const { start_time, end_time, total_price, id } = req.body;
  const userId = req.user.id; // Assuming the user is logged in and their ID is in the request

  try {
    console.log("hello");

    const existingBooking = await Booking.findOne({
      venueId: id,
      start_time: { $lt: end_time },
      end_time: { $gt: start_time },
    });

    // 2. If there is an existing booking, return an error
    if (existingBooking) {
      return res.status(400).json({
        message: "Time slot is already booked. Please choose a different time.",
      });
    }

    // 3. Proceed with creating the new booking if no conflict is found
    const newBooking = new Booking({
      userId, // User ID of the person making the booking
      venueId: id, // Venue ID where the booking is for
      start_time, // Start time of the booking
      end_time, // End time of the booking
      total_price, // Price of the booking
    });

    // Save the new booking to the database
    await newBooking.save();

    res.status(201).json({
      message: "Booking successfully created.",
      booking: newBooking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in creating booking",
    });
  }
};

export const getAllBookings = async (req, res) => {
  const userId = req.user.id; // Get the authenticated user's ID

  try {
    // Find all bookings for the current user
    const bookings = await Booking.find({ userId });

    // If no bookings found
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        message: "No bookings found.",
      });
    }

    res.status(200).json({
      message: "Bookings fetched successfully.",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in fetching bookings",
    });
  }
};

export const getSingleBookings = async (req, res) => {
  const { bookingId } = req.params; // Get booking ID from route params

  try {
    // Find the booking by ID
    const booking = await Booking.findById(bookingId);

    // If booking not found
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // Ensure that the booking belongs to the authenticated user
    if (booking.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You do not have permission to view this booking.",
      });
    }

    res.status(200).json({
      message: "Booking fetched successfully.",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in fetching booking",
    });
  }
};
