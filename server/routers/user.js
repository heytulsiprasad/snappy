const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { isAuthenticated } = require("../middleware/auth");
const Profile = require("../models/Profile");

/**
 * @route   GET api/user/info
 * @desc    Get user info
 * @access  Private
 */

router.get("/info", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // If profile exists then also add profile data
    const profileData = await Profile.find({ user: req.user.id });

    let userData = user.toObject();
    if (profileData.length > 0) {
      userData = {
        ...userData,
        profile: profileData[0],
      };
    }

    res.status(200).json({ user: userData });
  } catch (err) {
    res.status(500).json(error);
  }
});

/**
 * @desc  Update user profile pic
 * @route PUT api/user/update-profile-pic
 * @access Private
 */

router.put("/update-profile-pic", isAuthenticated, async (req, res) => {
  try {
    console.log(req.body.image);
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { image: req.body.image } },
      { new: true }
    );

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json(error);
  }
});

module.exports = router;
