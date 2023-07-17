const User = require("../models/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
exports.user_signup_post = asyncHandler(async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        admin: req.body.isAdmin,
      });
      await user.save();
    });
  } catch (err) {
    return next(err);
  }
});
