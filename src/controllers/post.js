const postModel = require("../models/post");

const getAllPosts = () => postModel.find();

const getPostById = (id) => postModel.findById(id);

const getPostBySender = (sender) => postModel.find({ sender });

const addNewPost = (post) => postModel.create(post);

const updatePostById = (id, { title, content, sender }) =>
  postModel.findByIdAndUpdate(id, { title, content, sender }, { new: true });

module.exports = {
  getAllPosts,
  getPostById,
  getPostBySender,
  addNewPost,
  updatePostById,
};
