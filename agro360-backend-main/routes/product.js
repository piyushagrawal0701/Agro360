const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// ✅ Create a new product
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, category, description, price, quantity } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({
      name,
      category,
      description,
      price,
      quantity,
      image,
      sellerId: req.user.id, // req.user from token
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
