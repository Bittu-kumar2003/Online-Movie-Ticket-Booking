const Booking = require('../models/Booking');

exports.saveBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving booking.' });
  }
};

exports.getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await Booking.find({ email }).sort({ bookedAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings.' });
  }
};



// const Booking = require('../models/Booking');

// // Save booking details to DB
// exports.saveBooking = async (req, res) => {
//   try {
//     const newBooking = new Booking(req.body);
//     await newBooking.save();
//     res.status(201).json({ message: 'Booking saved successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error saving booking.' });
//   }
// };
