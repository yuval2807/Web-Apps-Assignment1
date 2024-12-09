import { ObjectId } from "mongoose";
import commentModel, { IComment } from "../models/comment";

const getAllComments = () => commentModel.find();

const getCommentById = (id) => commentModel.findById(id);

const getCommentsByPostId = (post) => commentModel.find({ post });

const addNewComment = (comment: IComment) => commentModel.create(comment);

const updateCommentById = (id: string, { message, post, user }) =>
  commentModel.findByIdAndUpdate(id, { message, post, user }, { new: true });

const deleteCommentById = (id: string) => commentModel.findByIdAndDelete(id);

export {
  getAllComments,
  getCommentById,
  addNewComment,
  updateCommentById,
  deleteCommentById,
  getCommentsByPostId,
};
