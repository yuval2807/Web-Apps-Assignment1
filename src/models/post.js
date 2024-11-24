const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
// import User from "./user";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  }, // Reference to User
});

module.exports = mongoose.model("Post", postSchema);
// const postModel = mongoose.model("Post", postSchema);
