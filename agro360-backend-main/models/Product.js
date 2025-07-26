// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: {
    type: String,
    enum: ["Crops", "Fertilizers", "Pesticides", "Seeds", "Land"],
    required: true,
  },
  description: String,
  price: Number,
  quantity: Number,
  image: String,
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Product", productSchema);
