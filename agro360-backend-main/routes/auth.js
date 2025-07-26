const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register Route
router.post("/register", async (req, res) => {
  const { name, mobile, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ msg: "Mobile number already registered" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      mobile,
      email,
      password: hashedPass,
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // ✅ Generate JWT token
    const payload = {
  user: {
    id: user._id,
    name: user.name,
    mobile: user.mobile
  }
};


    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ msg: "Login successful", token, user: payload.user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
