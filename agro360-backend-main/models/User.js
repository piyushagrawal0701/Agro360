const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
