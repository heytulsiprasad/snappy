const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const User = require("../models/User");

const { isAuthenticated } = require("../middleware/auth");

/**
 * @route   GET api/posts
 * @desc    Get all posts
 * @access  Private
 */

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find().populate("author");

    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   POST api/posts/new
 * @desc    Create a post
 * @access  Private
 */

router.post("/new", isAuthenticated, async (req, res) => {
  // Destructure the body
  const { content, image } = req.body;

  console.log(content);

  try {
    const newPost = new Post({
      content,
      author: req.user.id,
      image: image ? image : null,
    });

    await newPost.save();
    return res.status(200).json({ post: newPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   POST api/posts/like/:id
 * @desc    Like a post
 * @access  Private
 */

router.post("/like/:postId", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if the post has already been liked
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.push(req.user.id);
    await post.save();

    const newPost = await post.populate("author");

    return res.status(200).json({ post: newPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   POST api/posts/unlike/:id
 * @desc    Unlike a post
 * @access  Private
 */

router.post("/unlike/:postId", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if post has been liked
    if (post.likes.includes(req.user.id)) {
      const index = post.likes.indexOf(req.user.id);
      post.likes.splice(index, 1);
      await post.save();

      const newPost = await post.populate("author");

      return res.status(200).json({ post: newPost });
    } else {
      return res.status(400).json({ msg: "Post has not been liked" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   POST api/posts/comment/:postId
 * @desc    Comment on a post
 * @access  Private
 */

router.post("/comment/:postId", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    const newComment = { content: req.body.content, author: req.user.id };

    post.comments.push(newComment);
    await post.save();

    const newPost = await post.populate("author");

    return res.status(200).json({ post: newPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   DELETE api/posts/comment/:postId/:commentId
 * @desc    Delete a comment
 * @access  Private
 */

router.post(
  "/comment/:postId/:commentId",
  isAuthenticated,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      // Check if comment exists
      const comment = post.comments.find(
        (comment) => comment.id === req.params.commentId
      );

      if (!comment) {
        return res.status(404).json({ msg: "Comment does not exist" });
      }

      // Check if user is the author of the comment
      if (comment.author.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      // Delete the comment
      const index = post.comments.indexOf(comment);
      post.comments.splice(index, 1);
      await post.save();

      const newPost = await post.populate("author");

      return res.status(200).json({ post: newPost });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route   DELETE api/posts/:id
 * @desc    Delete a post
 * @access  Private
 */

router.delete("/:postId", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: "Post does not exist" });
    }

    // Check if user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Delete the post
    await post.remove();

    return res.status(200).json({ msg: "Post deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
