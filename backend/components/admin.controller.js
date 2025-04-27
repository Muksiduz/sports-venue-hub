import Venue from "../models/Venue.models.js";
import User from "../models/User.models.js"; // Assuming you have a User model
import Booking from "../models/bookings.models.js"; // Assuming you have a Booking model

// GET /admin/venues → List all venues (pending + approved)
export const getAllVenuesAdmin = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json({ venues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching venues." });
  }
};

// PATCH /admin/venues/:id/approve → Approve a venue listing
export const approveVenue = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findById(id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found." });
    }

    venue.status = "approved"; // You must have a `status` field in Venue model
    await venue.save();

    res.status(200).json({ message: "Venue approved successfully.", venue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error approving venue." });
  }
};

// PATCH /admin/venues/:id/reject → Reject a venue listing
export const rejectVenue = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findById(id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found." });
    }

    venue.status = "rejected";
    await venue.save();

    res.status(200).json({ message: "Venue rejected successfully.", venue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error rejecting venue." });
  }
};

// DELETE /admin/venues/:id → Delete any venue
export const deleteVenueAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findById(id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found." });
    }

    await Venue.findByIdAndDelete(id);

    res.status(200).json({ message: "Venue deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting venue." });
  }
};

// GET /admin/users → List all users and owners
export const getAllUsersAdmin = async (req, res) => {
  try {
    const users = await User.find(); // List all users and owners

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users." });
  }
};

// DELETE /admin/users/:id → Delete a user or owner
export const deleteUserAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user." });
  }
};

// GET /admin/bookings → View all bookings
export const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings." });
  }
};
