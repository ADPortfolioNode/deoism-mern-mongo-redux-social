const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Post = require("../../models/Posts");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route    Post api/post
//@desc     test route
//@access   Public
router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();
      return res.json(post);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("server errorrr");
    }
  }
);

//@route    DELETE api/post
//@desc    DELETE  posts VIA id
//@access   private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //User?
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized here" });
    }
    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//@route    PUT api/post/like/:id
//@desc    like a  posts VIA id
//@access   private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check post for previous like
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res
        .status(400)
        .json({ msg: `${req.params.id} Post has already been liked` });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status("500").send("Server Error ");
  }
});

//@route    PUT api/post/unlike/:id
//@desc    unlikelike a  posts VIA id
//@access   private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check post for previous like
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res
        .status(400)
        .json({ msg: `${req.params.id} Post has not been liked` });
    }

    /// get index to remove
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    console.log(removeIndex);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    return res.status("500").send("Server Error ");
  }
});
///@route Get api/posts
//@descc Get all posts
// @access private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(err.message);
    return res.status("500").send("Server Error ");
  }
});

module.exports = router;
