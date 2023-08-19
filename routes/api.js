const express = require("express");
const router = express.Router();
const passport = require("passport");
// Require controller modules.
const login_controller = require("../controllers/loginController");
const signup_controller = require("../controllers/signUpController");
const post_controller = require("../controllers/postController");
//Login and Sign up routes
router.post("/login", login_controller.user_login_post);
router.post("/signup", signup_controller.user_signup_post);
router.post(
  "/post/create",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_createPost_post
);
router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_getPosts_get
);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ result: "You have accessed a protected route!" });
  }
);
module.exports = router;
