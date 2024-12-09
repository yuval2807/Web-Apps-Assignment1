import postModel, { IPost } from "../models/post";

const getAllPosts = () => postModel.find();

const getPostById = (id: string) => postModel.findById(id);

const getPostBySender = (sender) => postModel.find({ sender });

const addNewPost = (post: IPost) => postModel.create(post);

const updatePostById = (id: string, { title, content, sender }) =>
  postModel.findByIdAndUpdate(id, { title, content, sender }, { new: true });

export {
  getAllPosts,
  getPostById,
  getPostBySender,
  addNewPost,
  updatePostById,
};
