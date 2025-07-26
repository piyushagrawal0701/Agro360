const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  total: Number,
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Order", OrderSchema);
