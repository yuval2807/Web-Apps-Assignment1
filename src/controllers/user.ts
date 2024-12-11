import userModel from "../models/user";
import { generateAccessToken } from "../utils/jwt";

export const getAllUsers = () => userModel.find();

export const getUserById = (id) => userModel.findById(id);

export const addNewUser = (user) => userModel.create(user);

export const updateUserById = (id, { email, name, password }) =>
  userModel.findByIdAndUpdate(id, { email, name, password }, { new: true });

export const login = async (email: string, password: string) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  if (password != user.password) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user._id);

  return { accessToken };
};
