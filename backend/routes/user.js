const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* =========================================
   GET ALL USERS (ONLINE LIST)
   ========================================= */
router.get("/", async (req, res) => {
  try {
    const users = await User.find(
      {},
      "username role status avatar"
    );
    res.json(users);
  } catch (err) {
    console.error("GET USERS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/* =========================================
   GET USER PROFILE (NO PASSWORD)
   ========================================= */
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.params.username },
      "-password"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

/* =========================================
   UPDATE PROFILE (NAME / EMAIL / AVATAR)
   ❌ NO PASSWORD HERE
   ========================================= */
router.put("/profile/:username", async (req, res) => {
  try {
    const { fullName, email, avatar } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is required"
      });
    }

    const user = await User.findOne({
      username: req.params.username
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // Update only provided fields
    user.fullName = fullName ?? user.fullName;
    user.email = email;
    user.avatar = avatar ?? user.avatar;

    await user.save();

    res.json({
      message: "Profile updated successfully"
    });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({
      error: "Profile update failed"
    });
  }
});

/* =========================================
   CHANGE PASSWORD (OPTIONAL & SAFE)
   ========================================= */
router.put("/change-password/:username", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        error: "Both old and new passwords are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters"
      });
    }

    const user = await User.findOne({
      username: req.params.username
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        error: "Old password is incorrect"
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({
      message: "Password updated successfully"
    });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    res.status(500).json({
      error: "Password update failed"
    });
  }
});

module.exports = router;
