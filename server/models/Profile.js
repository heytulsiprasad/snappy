const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bio: String,
  company: String,
  location: String,
  twitterlink: String,
  facebooklink: String,
  instagramlink: String,
  githublink: String,
  linkedinlink: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
