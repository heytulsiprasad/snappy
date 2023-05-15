const express = require("express");
const router = express.Router();

const User = require("../models/User");
const isAuthenticated = require("../middleware/auth");

/**
 * @route   GET api/user/info
 * @desc    Get user info
 * @access  Private
 */

router.get("/info", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(error);
  }
});

module.exports = router;
