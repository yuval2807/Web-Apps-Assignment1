import userModel from "../models/user";
import { generateAccessToken } from "../utils/jwt";

const getAllUsers = () => userModel.find();

const getUserById = (id) => userModel.findById(id);

const addNewUser = (user) => userModel.create(user);

const updateUserById = (id, { email, name, password }) =>
  userModel.findByIdAndUpdate(id, { email, name, password }, { new: true });

const login = async (email: string, password: string) => {
  console.log(email, password);
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  if (password != user.password) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user._id);

  return { accessToken };
};

export { getAllUsers, getUserById, addNewUser, updateUserById, login };
