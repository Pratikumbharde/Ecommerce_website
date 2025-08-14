const express = require("express");
const router = express.Router();
const verifyToken = require("./middleware/verification");
const isAdmin = require("./middleware/isAdmin");
const User = require("./models/User");


router.get("/users",verifyToken,isAdmin,async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;
