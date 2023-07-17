const express = require("express");
const router = express.Router();
const passport = require("passport");
// Require controller modules.
const login_controller = require("../controllers/loginController");
const signup_controller = require("../controllers/signUpController");

//Login and Sign up routes
router.post("/login", login_controller.user_login_post);
router.post("/signup", signup_controller.user_signup_post);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You have accessed a protected route!");
  }
);
module.exports = router;
