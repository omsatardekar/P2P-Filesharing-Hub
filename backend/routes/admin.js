const express = require("express");
const User = require("../models/User");

const router = express.Router();

// GET TOTAL USERS COUNT
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// GET ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(
      {},
      "username role status createdAt"
    ).sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error("ADMIN USERS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
