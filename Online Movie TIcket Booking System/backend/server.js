const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const authRoutes = require("./routes/auth");
// const sendTicketEmail = require("./utils/sendTicketEmail");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// // ✅ MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // 🔐 Auth Routes
// app.use("/api/auth", authRoutes);

// // 🎭 Theater Data (Mock)
// const theaters = [
//   {
//     id: 1,
//     name: "PVR Cinemas",
//     location: "Delhi",
//     movieId: "575264",
//     showtimes: ["10:00 AM", "1:30 PM", "4:45 PM", "8:00 PM"],
//     price: 250,
//     seats: 120,
//   },
//   {
//     id: 2,
//     name: "INOX Movies",
//     location: "Delhi",
//     movieId: "575264",
//     showtimes: ["11:00 AM", "2:30 PM", "5:45 PM", "9:00 PM"],
//     price: 300,
//     seats: 80,
//   },
// ];

// // 🎟 Theater API
// app.get("/api/theaters", (req, res) => {
//   const { movieId, location } = req.query;
//   let results = theaters;

//   if (movieId) results = results.filter(t => t.movieId === movieId);
//   if (location) results = results.filter(t => t.location.toLowerCase() === location.toLowerCase());

//   res.json(results);
// });

// // 📧 Send Ticket Email API
// app.post("/api/send-confirmation", async (req, res) => {
//   try {
//     await sendTicketEmail(req.body);
//     res.status(200).json({ message: "✅ Email sent successfully" });
//   } catch (error) {
//     console.error("❌ Email send failed:", error);
//     res.status(500).json({ message: "❌ Failed to send email" });
//   }
// });

// // ❌ Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something went wrong!" });
// });

// // 🚀 Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🌐 Server running at http://localhost:${PORT}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Authentication Routes
// app.use('/api/auth', authRoutes);

// // Mock Theater Database
// const theaters = [
//   {
//     id: 1,
//     name: 'PVR Cinemas',
//     location: 'Delhi',
//     movieId: '575264',
//     showtimes: ['10:00 AM', '1:30 PM', '4:45 PM', '8:00 PM'],
//     price: 250,
//     seats: 120
//   },
//   {
//     id: 2,
//     name: 'INOX Movies',
//     location: 'Delhi',
//     movieId: '575264',
//     showtimes: ['11:00 AM', '2:30 PM', '5:45 PM', '9:00 PM'],
//     price: 300,
//     seats: 80
//   },
//   {
//     id: 3,
//     name: 'Cinepolis',
//     location: 'Mumbai',
//     movieId: '575264',
//     showtimes: ['9:30 AM', '12:45 PM', '4:00 PM', '7:15 PM'],
//     price: 350,
//     seats: 150
//   },
// ];

// // Theater API Route
// app.get('/api/theaters', (req, res) => {
//   const { movieId, location } = req.query;
//   let results = theaters;

//   if (movieId) {
//     results = results.filter(t => t.movieId === movieId);
//   }

//   if (location) {
//     results = results.filter(t => t.location.toLowerCase() === location.toLowerCase());
//   }

//   res.json(results);
// });

// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
















