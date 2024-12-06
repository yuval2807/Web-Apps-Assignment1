const userModel = require("../models/user");
const { generateAccessToken } = require("../utils/jwt");

const getAllUsers = () => userModel.find();

const getUserById = (id) => userModel.findById(id);

const addNewUser = (user) => userModel.create(user);

const updateUserById = (id, { email, name, password }) =>
  userModel.findByIdAndUpdate(id, { email, name, password }, { new: true });

const login = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  if (password != user.password) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user._id);

  return { accessToken };
};

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
  login,
};
