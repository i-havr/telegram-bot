const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  token: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
