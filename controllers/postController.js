const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const jwtTokenDecode = require("../helpers/jwtTokenDecode");
exports.post_createPost_post = asyncHandler(async (req, res, next) => {
  try {
    const payload = jwtTokenDecode.jwtTokenDecode(req.headers["authorization"]);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      postedBy: payload.user._id,
    });
    await post.save();
    res.status(200).json("Posted Successfully");
  } catch (err) {
    return next(err);
  }
});

exports.post_getPosts_get = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "username email") //populate the postedBy Field as referenced to User. Only get username and email field as indicated in the second argument
      .exec();
    res.status(200).json({ posts });
  } catch (err) {
    return next(err);
  }
});
