const commentModel = require("../models/comment");

const getAllComments = () => commentModel.find();

const getCommentById = (id) => commentModel.findById(id);

const getCommentsByPostId = (post) => commentModel.find({ post });

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
  getCommentsByPostId,
};
