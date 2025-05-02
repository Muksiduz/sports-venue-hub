import express from "express";
import {
  createBookings,
  getAllBookings,
  getAllVenues,
  getSingleBookings,
  getSingleVenue,
} from "../components/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/venues", isLoggedIn, getAllVenues);

router.get("/venues/:id", isLoggedIn, getSingleVenue);

router.post("/createbookings", isLoggedIn, createBookings);
router.get("/bookings", isLoggedIn, getAllBookings);
router.get("/bookings/:bookingId", isLoggedIn, getSingleBookings);

export default router;
