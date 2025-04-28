const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Registration successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error during registration" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;






// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const router = express.Router();

// // ==========================
// // Register New User
// // ==========================
// router.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         // Check if user already exists
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Create new user
//         const newUser = new User({ username, email, password });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Registration error:', error);
//         res.status(500).json({ message: 'Error during registration', error: error.message });
//     }
// });


// // ==========================
// // Login User
// // ==========================
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Check password
//         const isMatch = await user.matchPassword(password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Create JWT Token
//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         res.status(200).json({
//             message: 'Login successful',
//             token,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Login error', error: error.message });
//     }
// });


// routes/authRoutes.js
//const express = require('express');
// const router = express.Router();

// Dummy login route (you can enhance it)
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   // Dummy authentication logic
//   if (email === 'user@example.com' && password === '123456') {
//     return res.status(200).json({ message: 'Login successful' });
//   }

//   return res.status(401).json({ message: 'Invalid credentials' });
// });

// module.exports = router;
