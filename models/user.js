const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  admin: { type: Boolean, default: false },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  joinDate: { type: Date, default: Date.now },
});

// Export model
module.exports = mongoose.model("User", UserSchema);
