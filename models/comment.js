const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  comment: { type: String, required: true },
  commentDate: { type: Date, default: Date.now },
  editedDate: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  likeCount: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
