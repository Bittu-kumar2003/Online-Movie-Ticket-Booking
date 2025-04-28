// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  email: String,
  movie: String,
  theater: String,
  showtime: String,
  selectedSeats: [String],
  totalPrice: Number,
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
