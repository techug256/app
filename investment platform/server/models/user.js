const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  capital: { type: Number, default: 0 },
  profit: { type: Number, default: 0 },
  lastProfitUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);