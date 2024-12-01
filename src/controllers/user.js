const userModel = require("../models/user");

const getAllUsers = () => userModel.find();

const getUserById = (id) => userModel.findById(id);

const addNewUser = (user) => userModel.create(user);

const updateUserById = (id, { email, name, password }) =>
  userModel.findByIdAndUpdate(id, { email, name, password }, { new: true });

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
};
