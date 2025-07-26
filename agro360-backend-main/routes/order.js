const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

// Confirm Order
router.post("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ msg: "Cart is empty" });

    const total = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    // Update product quantities
    for (let item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product || product.quantity < item.quantity)
        return res.status(400).json({ msg: `Insufficient quantity for ${item.name}` });

      product.quantity -= item.quantity;
      await product.save();
    }

    const order = new Order({
      userId: req.user.id,
      items: cart.items,
      total,
    });

    await order.save();
    await Cart.findOneAndDelete({ userId: req.user.id });

    res.status(201).json({ msg: "Order confirmed", order });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
