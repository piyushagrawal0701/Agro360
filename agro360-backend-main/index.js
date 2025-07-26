const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config(); // Load variables from .env

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ✅ Basic route to confirm API is running
app.get("/", (req, res) => {
  res.send("🌾 AgriBazzar API is running!");
});

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/order", require("./routes/order"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/products", require("./routes/product"));

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
