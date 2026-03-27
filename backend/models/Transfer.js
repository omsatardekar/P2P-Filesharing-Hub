const mongoose = require("mongoose");

const TransferSchema = new mongoose.Schema({
  filename: String,
  size: Number,

  sender: String,
  receiver: String,

  role: {
    type: String,
    enum: ["sent", "received"]
  },

  transferType: {
    type: String,
    enum: ["direct", "broadcast"],
    default: "direct"
  },

  via: {
    type: String,
    default: "webrtc"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transfer", TransferSchema);
