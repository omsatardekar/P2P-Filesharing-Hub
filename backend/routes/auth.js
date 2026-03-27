const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "lab_secret_key";

/* =========================================
   REGISTER
   ========================================= */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role, fullName } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      fullName: fullName || "",
      avatar: ""
    });

    await user.save();

    res.status(201).json({
      message: "Registered successfully"
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      message: "Registration failed"
    });
  }
});

/* =========================================
   LOGIN
   ========================================= */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Missing credentials"
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ UPDATE USER STATUS & LAST LOGIN
    user.status = "online";
    user.lastLogin = new Date();
    await user.save();

    res.json({
      token,
      role: user.role,
      username: user.username,
      fullName: user.fullName,
      avatar: user.avatar
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      error: "Login failed"
    });
  }
});

module.exports = router;
