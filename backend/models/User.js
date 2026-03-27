const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  avatar: {
    type: String, // file path / URL
    default: ""
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Student", "Admin"],
    default: "Student"
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
