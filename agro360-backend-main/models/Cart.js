const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Cart", CartSchema);
