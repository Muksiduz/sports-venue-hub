import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
    },
    start_time: {
      type: String, // e.g., "10:00 AM"
      required: true,
    },
    end_time: {
      type: String, // e.g., "12:00 PM"
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    status_booking: {
      type: String,
      enum: ["booked", "cancelled"],
    },
  },
  { timestamps: true }
);
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
