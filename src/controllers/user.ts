import userModel from "../models/user";

export const getAllUsers = () => userModel.find();

export const getUserById = (id) => userModel.findById(id);

const getUserByEmail = (email) => userModel.findOne({ email });

export const addNewUser = (user) => userModel.create(user);

export const updateUserById = (id, { email, name, password }) =>
  userModel.findByIdAndUpdate(id, { email, name, password }, { new: true });

export const updateUserTokenById = (id, newRefreshToken) =>
  userModel.findByIdAndUpdate(id, { tokens: newRefreshToken }, { new: true });
