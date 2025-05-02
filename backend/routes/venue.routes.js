import express from "express";
import {
  createVenue,
  getOwnerVenues,
  updateVenue,
  deleteVenue,
  venueBookings,
} from "../components/venue.controller.js";
import { isLoggedIn, isVenueOwner } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create a new venue
router.post("/venues", isLoggedIn, isVenueOwner, createVenue);

// Get all venues by the owner
router.get("/owner/venues", isLoggedIn, isVenueOwner, getOwnerVenues);

// Update a venue
router.patch("/venues/:id", isLoggedIn, isVenueOwner, updateVenue);

//get all bookings
router.get("/venue-bookings/:id", isLoggedIn, isVenueOwner, venueBookings);

// Delete a venue
router.delete("/deletevenues/:id", isLoggedIn, isVenueOwner, deleteVenue);

// // Get all bookings for the owner's venues
// router.get("/owner/bookings", isLoggedIn, isVenueOwner, getOwnerBookings);

export default router;
