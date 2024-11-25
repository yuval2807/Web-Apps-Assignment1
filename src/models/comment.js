const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Post = require("./post");

const commentSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post,
    required: true,
  }, // Reference to Post
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  }, // Reference to User
});

module.exports = mongoose.model("Comment", commentSchema);
