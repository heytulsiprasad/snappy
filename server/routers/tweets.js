const express = require("express");
const router = express.Router();

const Tweet = require("../models/Tweet");
const User = require("../models/User");

const { isAuthenticated } = require("../middleware/auth");

/**
 * @route   GET api/tweets
 * @desc    Get all tweets
 * @access  Private
 */

router.get("/", isAuthenticated, async (req, res) => {
  try {
    // Populate author object inside comments array
    const tweets = await Tweet.find()
      .populate("author")
      .populate({
        path: "comments",
        populate: { path: "author", select: "_id name image" },
      });

    return res.json(tweets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   POST api/tweets/new
 * @desc    Create new tweet
 * @access  Private
 */

router.post("/new", isAuthenticated, async (req, res) => {
  // Destructure the body
  const { content, image } = req.body;

  console.log(content);

  try {
    const newTweet = new Tweet({
      content,
      author: req.user.id,
      image: image ? image : null,
    });

    await newTweet.save();
    return res.status(200).json({ tweet: newTweet });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   POST api/tweets/like/:id
 * @desc    Like a tweet
 * @access  Private
 */

router.post("/like/:tweetId", isAuthenticated, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);

    // Check if the tweet has already been liked
    if (tweet.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: "Tweet already liked" });
    }

    tweet.likes.push(req.user.id);
    await tweet.save();

    const newTweet = await tweet.populate("author");

    return res.status(200).json({ tweet: newTweet });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   POST api/tweets/unlike/:id
 * @desc    Unlike a tweet
 * @access  Private
 */

router.post("/unlike/:tweetId", isAuthenticated, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);

    // Check if tweet has been liked
    if (tweet.likes.includes(req.user.id)) {
      const index = tweet.likes.indexOf(req.user.id);
      tweet.likes.splice(index, 1);
      await tweet.save();

      const newTweet = await tweet.populate("author");

      return res.status(200).json({ tweet: newTweet });
    } else {
      return res.status(400).json({ msg: "Post has not been liked" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   POST api/tweets/comment/:tweetId
 * @desc    Comment on a tweet
 * @access  Private
 */

router.post("/comment/:tweetId", isAuthenticated, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);

    const newComment = { content: req.body.content, author: req.user.id };

    tweet.comments.push(newComment);
    await tweet.save();

    const newTweet = await (
      await tweet.populate("author")
    ).populate({
      path: "comments",
      populate: { path: "author" },
    });

    return res.status(200).json({ tweet: newTweet });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   DELETE api/tweets/comment/:tweetId/:commentId
 * @desc    Delete a comment on a tweet
 * @access  Private
 */

router.delete(
  "/comment/:tweetId/:commentId",
  isAuthenticated,
  async (req, res) => {
    try {
      const tweet = await Tweet.findById(req.params.tweetId);

      // Check if comment exists
      const comment = tweet.comments.find(
        (comment) => comment.id === req.params.commentId
      );

      if (!comment) {
        return res.status(404).json({ msg: "Comment does not exist" });
      }

      // Check if user is the author of the comment
      if (comment.author.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: "User can only delete their tweets" });
      }

      // Delete the comment
      const index = tweet.comments.indexOf(comment);
      tweet.comments.splice(index, 1);
      await tweet.save();

      const newTweet = await (
        await tweet.populate("author")
      ).populate({
        path: "comments",
        populate: { path: "author" },
      });

      return res.status(200).json({ post: newTweet });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route   DELETE api/tweets/:id
 * @desc    Delete a tweet
 * @access  Private
 */

router.delete("/:tweetId", isAuthenticated, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);

    // Check if tweet exists
    if (!tweet) {
      return res.status(404).json({ msg: "Tweet does not exist" });
    }

    // Check if user is the author of the post
    if (tweet.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Delete the post
    await Tweet.findByIdAndDelete(req.params.tweetId);

    return res.status(200).json({ msg: "Post deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
