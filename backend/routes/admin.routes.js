import express from "express";
import {
  getAllVenuesAdmin,
  approveVenue,
  rejectVenue,
  deleteVenueAdmin,
  getAllUsersAdmin,
  deleteUserAdmin,
  getAllBookingsAdmin,
} from "../components/admin.controller.js";
import { isLoggedIn, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin Routes
router.get("/admin/venues", isLoggedIn, isAdmin, getAllVenuesAdmin);
router.patch("/admin/venues/:id/approve", isLoggedIn, isAdmin, approveVenue);
router.patch("/admin/venues/:id/reject", isLoggedIn, isAdmin, rejectVenue);
router.delete("/admin/venues/:id", isLoggedIn, isAdmin, deleteVenueAdmin);

router.get("/admin/users", isLoggedIn, isAdmin, getAllUsersAdmin);
router.delete("/admin/users/:id", isLoggedIn, isAdmin, deleteUserAdmin);

router.get("/admin/bookings", isLoggedIn, isAdmin, getAllBookingsAdmin);

export default router;
