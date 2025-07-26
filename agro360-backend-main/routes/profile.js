const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const verifyToken = require("../middleware/verifyToken");// Simulated in-memory DB for now
let userProfiles = {}; // Key = userId, Value = { address, image }

router.post("/update", verifyToken, upload.single("image"), (req, res) => {
  const userId = req.user.id;
  const { address } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  // Save or update
  userProfiles[userId] = {
    ...userProfiles[userId],
    address: address || userProfiles[userId]?.address || "",
    image: image || userProfiles[userId]?.image || ""
  };

  res.json({
    msg: "Profile updated",
    profile: userProfiles[userId]
  });
});

router.get("/me", verifyToken, (req, res) => {
  const userId = req.user.id;
  const profile = userProfiles[userId];
  if (!profile) return res.status(404).json({ msg: "Profile not found" });

  res.json(profile);
});

module.exports = router;
