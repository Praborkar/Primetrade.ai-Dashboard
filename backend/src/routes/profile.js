const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// GET PROFILE
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ user });  // wrap in an object
  } catch (err) {
    console.error("PROFILE GET ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// UPDATE PROFILE
router.put("/", auth, async (req, res) => {
  try {
    const { name, phone, location, bio } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user,
      { name, phone, location, bio },
      { new: true }
    ).select("-password");

    res.json({ user: updated }); // wrap in object
  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    res.status(500).json({ msg: "Update failed" });
  }
});

module.exports = router;
