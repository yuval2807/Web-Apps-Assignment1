import jwt from "jsonwebtoken";
import { IUser, tUser } from "../models/user";
import {
  generateAccessToken,
  generateRefreshToken,
  updateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { updateUserTokenById, getUserById, getUserByEmail } from "./user";

export const login = async (
  email: IUser["email"],
  password: IUser["password"]
) => {
  const user: tUser = await getUserByEmail(email);
  if (!user) throw new Error("User not found");

  if (password != user.password) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  updateRefreshToken(user, refreshToken);

  return { accessToken, refreshToken };
};

export const logout = async (refreshToken) => {
  const user = await verifyRefreshToken(refreshToken);
  if (!user) throw new Error("User not found");

  return updateUserTokenById(
    user.id,
    user.tokens.filter((token) => token !== refreshToken)
  );
};

export const refresh = async (refreshToken) => {
  const user = await verifyRefreshToken(refreshToken);
  if (!user) throw new Error("User not found");

  const newToken = generateRefreshToken(user._id);
  return updateRefreshToken(user, newToken);
};
