const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
exports.user_login_post = asyncHandler(async (req, res, next) => {
  try {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        const error = new Error("User does not exist");
        console.log(info);
        return res.status(403).json({
          info,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          next(err);
        }
        // create token
        const body = {
          _id: user._id,
          username: user.username,
          admin: user.admin,
        };

        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return res.status(200).json({ body, token });
      });
    })(req, res, next);
  } catch (err) {
    console.log(err);
    res.status(403).json({
      err,
    });
  }
});
