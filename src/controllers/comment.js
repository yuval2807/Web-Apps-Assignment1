const commentModel = require("../models/comment");

const getAllComments = () => commentModel.find();

const getCommentById = (id) => commentModel.findById(id);

const getCommentsByPostId =(postId)=>commentModel.aggregate([
  { $match: { post: mongoose.Types.ObjectId(postId) } }, // Filter by post ID
  {
    $lookup: {
      from: "posts", // Collection to join (Post)
      localField: "post",
      foreignField: "_id",
      // as: "postDetails",
    },
  },
  {
    $lookup: {
      from: "users", // Collection to join (User)
      localField: "user",
      foreignField: "_id",
      // as: "userDetails",
    },
  },
])

const addNewComment = (comment) => commentModel.create(comment);

const updateCommentById = (id, { message, post, user }) =>
  commentModel.findByIdAndUpdate(id, { message, post, user }, { new: true });

const deleteCommentById = (id) => commentModel.findByIdAndDelete(id);

module.exports = {
  getAllComments,
  getCommentById,
  addNewComment,
  updateCommentById,
  deleteCommentById,
  getCommentsByPostId
};
