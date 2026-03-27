const express = require("express");
const router = express.Router();
const Transfer = require("../models/Transfer");

// ------------------------------------
// CREATE TRANSFER (SENT + RECEIVED)
// ------------------------------------
router.post("/", async (req, res) => {
  const { filename, size, sender, receiver } = req.body;

  // Basic validation
  if (!filename || !size || !sender || !receiver) {
    return res.status(400).json({ error: "Invalid transfer data" });
  }

  try {
    // 1️⃣ SENT RECORD
    await Transfer.create({
      filename,
      size,
      sender,
      receiver,
      role: "sent"
    });

    // 2️⃣ RECEIVED RECORD (COPY sender ✅)
    await Transfer.create({
      filename,
      size,
      sender,        // 🔥 THIS FIXES YOUR ISSUE
      receiver,
      role: "received"
    });

    res.json({ message: "Transfer logged successfully" });
  } catch (err) {
    console.error("Transfer log error:", err);
    res.status(500).json({ error: "Failed to log transfer" });
  }
});

// ------------------------------------
// GET RECEIVED FILES
// ------------------------------------
router.get("/received/:username", async (req, res) => {
  try {
    const data = await Transfer.find({
      receiver: req.params.username,
      role: "received"
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch received files" });
  }
});

// ------------------------------------
// GET SENT FILES
// ------------------------------------
router.get("/sent/:username", async (req, res) => {
  try {
    const data = await Transfer.find({
      sender: req.params.username,
      role: "sent"
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sent files" });
  }
});

// ------------------------------------
// GET FULL HISTORY
// ------------------------------------
// GET USER HISTORY (ONLY OWN ACTIONS)
router.get("/history/:username", async (req, res) => {
  const username = req.params.username;

  const data = await Transfer.find({
    $or: [
      { sender: username, role: "sent" },
      { receiver: username, role: "received" }
    ]
  }).sort({ createdAt: -1 });

  res.json(data);
});

// GET ALL LOGS (ADMIN)
router.get("/logs", async (req, res) => {
  try {
    const logs = await Transfer.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});



module.exports = router;
