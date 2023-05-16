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

module.exports = router;
