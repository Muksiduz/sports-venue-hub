import express from "express";
import {
  createBookings,
  deleteBookings,
  getAllBookings,
  getAllVenues,
  getSingleBookings,
  getSingleVenue,
} from "../components/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/venues", isLoggedIn, getAllVenues);
router.get("/venues:venueId", isLoggedIn, getSingleVenue);

router.post("/createbookings", isLoggedIn, createBookings);
router.get("/bookings", isLoggedIn, getAllBookings);
router.get("/bookings:bookingId", isLoggedIn, getSingleBookings);

router.delete("/bookings:bookingId", isLoggedIn, deleteBookings);

export default router;
