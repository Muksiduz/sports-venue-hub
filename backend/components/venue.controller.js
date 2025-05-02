import Venue from "../models/Venue.models.js";
import Booking from "../models/bookings.models.js";

export const createVenue = async (req, res) => {
  const { name, location, description, price_per_hour } = req.body;
  const ownerId = req.user.id; // assuming req.user.id is available

  try {
    if (!name || !location || !description || !price_per_hour) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newVenue = new Venue({
      name,
      location,
      description,
      price_per_hour,
      ownerId, // store who created the venue
    });

    await newVenue.save();

    res.status(201).json({
      message: "Venue created successfully.",
      venue: newVenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating venue." });
  }
};

export const getOwnerVenues = async (req, res) => {
  const ownerId = req.user.id;

  try {
    const venues = await Venue.find({ ownerId });

    res.status(200).json({
      message: "Venues fetched successfully.",
      venues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching owner's venues." });
  }
};

export const updateVenue = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user.id;
  const updateData = req.body; // { name, location, description, price_per_hour }

  try {
    const venue = await Venue.findById(id);

    if (!venue) {
      return res.status(401).json({ message: "Venue not found." });
    }

    if (venue.ownerId.toString() !== ownerId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this venue." });
    }

    const updatedVenue = await Venue.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      message: "Venue updated successfully.",
      venue: updatedVenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating venue." });
  }
};

export const deleteVenue = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user.id;

  try {
    const venue = await Venue.findById(id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found." });
    }

    if (venue.ownerId.toString() !== ownerId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this venue." });
    }

    await Venue.findByIdAndDelete(id);

    res.status(200).json({ message: "Venue deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting venue." });
  }
};

export const venueBookings = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findById(id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found." });
    }

    const bookings = await Booking.find({ venueId: id });

    res.status(200).json({
      message: "Bookings fetched successfully.",
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in getting bookings." });
  }
};
