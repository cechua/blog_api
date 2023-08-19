const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;
const User = require("./user");
const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likeCount: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Virtual for post URL
PostSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/post/${this._id}`;
});

PostSchema.virtual("postedDate_formatted").get(function () {
  return this.postedDate
    ? DateTime.fromJSDate(this.postedDate).toLocaleString(DateTime.DATE_MED)
    : "";
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
