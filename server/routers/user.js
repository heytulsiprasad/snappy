const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const { isAuthenticated } = require("../middleware/auth");
const Profile = require("../models/Profile");

/**
 * @route  GET api/user/search
 * @desc   Search users
 * @access Private
 */

router.get("/search", isAuthenticated, async (req, res) => {
  const search = req.query.search || "";
  const limit = req.query.limit || 5;

  try {
    const users = await User.find({
      name: { $regex: search, $options: "i" },
    }).limit(limit);

    const totalUsers = await User.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    return res.status(200).json({ users, totalUsers });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

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
 * @desc  Get any user info
 * @route GET api/user/:userId
 * @access Private
 */

router.get(
  "/:userId",
  isAuthenticated,
  [
    check("userId", "User ID is required")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("Invalid mongo user ID"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { userId } = req.params;

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const user = await User.findById(userId).select("-password");

        // If profile exists then also add profile data
        const profileData = await Profile.find({ user: userId });

        let userData = user.toObject();
        if (profileData.length > 0) {
          userData = {
            ...userData,
            profile: profileData[0],
          };
        }

        return res.status(200).json({ user: userData });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
);

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

/**
 * @desc  Update user name
 * @route PUT api/user/update-name
 * @access Private
 */

router.put("/update-name", isAuthenticated, async (req, res) => {
  try {
    console.log(req.body.name);
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { name: req.body.name } },
      { new: true }
    );

    const profile = await Profile.findOne({ user: req.user.id });
    const userData = {
      ...user.toObject(),
      profile,
    };

    return res.status(200).json({ user: userData });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
