const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const TweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    image: String,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("post", TweetSchema);

module.exports = Post;
