const express = require("express");
const router = express.Router();
const multer = require("multer");

const Profile = require("../models/Profile");
const { isAuthenticated } = require("../middleware/auth");
// const { upload } = require("../server");
const fs = require("fs");
const path = require("path");

function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

// CRUD routes on Profile model

// Create a profile
router.post("/edit", isAuthenticated, async (req, res) => {
  const {
    bio,
    company,
    location,
    twitterlink,
    facebooklink,
    instagramlink,
    githublink,
    linkedinlink,
    dateOfBirth,
    gender,
  } = req.body;

  const sanitizedProfile = removeEmpty({
    bio,
    company,
    location,
    twitterlink,
    facebooklink,
    instagramlink,
    githublink,
    linkedinlink,
    dateOfBirth,
    gender,
  });

  try {
    // Create a new profile or update existing one
    const profileExists = await Profile.find({ user: req.user.id });

    // Update existing profile
    if (profileExists.length > 0) {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: sanitizedProfile },
        { new: true }
      );

      return res.status(200).json({ profile });
    } else {
      // Create a new profile
      const profile = new Profile({
        user: req.user.id,
        ...sanitizedProfile,
      });

      await profile.save();
      return res.status(200).json({ profile });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @desc  Update user profile pic
 * @route PUT api/profile/edit/image
 * @access Private
 */

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // cb(err, filename)
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/edit/image",
  isAuthenticated,
  upload.single("profilePic"),
  async (req, res) => {
    const profileExists = await Profile.find({ user: req.user.id });

    const imageData = {
      data: fs.readFileSync(
        path.join(__dirname + "/../uploads/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    };

    try {
      if (profileExists.length > 0) {
        const profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: { image: imageData } },
          { new: true }
        );

        return res.status(200).json({ profile });
      } else {
        const profile = new Profile({
          user: req.user.id,
          image: imageData,
        });

        await profile.save();
        return res.status(200).json({ profile });
      }
    } catch (err) {
      console.error(err);
    }
  }
);

/*
 * @desc  Search across all profiles
 * @route GET api/profile/search
 * @access Private
 * @query search
 */

router.get("/search", isAuthenticated, async (req, res) => {
  const { search } = req.query;

  try {
    const profiles = await Profile.find({
      $or: [
        { username: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ],
    });

    return res.status(200).json({ profiles });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @desc  Send friend request
 * @route PUT api/profile/friend-request/:id
 * @access Private
 */

router.put("/friend-request/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $push: { friendRequests: req.user.id } },
      { new: true }
    );

    return res.status(200).json({ profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @desc Accept friend request
 * @route PUT api/profile/accept-friend-request/:userId
 * @access Private
 */

router.put(
  "/accept-friend-request/:userId",
  isAuthenticated,
  async (req, res) => {
    const { userId } = req.params;

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (profile.friendRequests.includes(userId)) {
        profile.friends.push(userId);
        profile.friendRequests = profile.friendRequests.filter(
          (friend) => friend != userId
        );

        await profile.save();
        return res.status(200).json({ profile });
      } else {
        return res.status(400).json({ msg: "No friend request found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @desc  Reject friend request
 * @route PUT api/profile/reject-friend-request/:userId
 * @access Private
 */

router.put(
  "/reject-friend-request/:userId",
  isAuthenticated,
  async (req, res) => {
    const { userId } = req.params;

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (profile.friendRequests.includes(userId)) {
        profile.friendRequests = profile.friendRequests.filter(
          (friend) => friend != userId
        );

        await profile.save();
        return res.status(200).json({ profile });
      } else {
        return res.status(400).json({ msg: "No friend request found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
