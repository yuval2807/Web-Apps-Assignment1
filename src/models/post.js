const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
// const postModel = mongoose.model("Post", postSchema);
