const express = require("express");
const router = express.Router(); // ✅ Required
const auth = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Product = require("../models/Product"); // optional if used

// Add to Cart
router.post("/", auth, async (req, res) => {
  const { items } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = new Cart({ userId: req.user.id, items });
      await cart.save();
    }

    res.json({ msg: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get Cart
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
