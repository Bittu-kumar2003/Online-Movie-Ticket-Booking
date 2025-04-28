// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Make sure model is imported

// GET /api/bookings/:email
router.get('/:email', async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.params.email });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
