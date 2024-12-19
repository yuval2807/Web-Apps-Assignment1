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

export const logout = async (token) => {
  // jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, userInfo) => {
  //   if (err) throw new Error("Invalid or expired token");

  //   const user = await getUserById(userInfo.userId);

  //   if (!user) throw new Error("User not found");

  //   if (!user.tokens.includes(token)) {
  //     user.tokens = [];
  //     updateRefreshToken(user, null);
  //   }
  const user = await verifyRefreshToken(token);
  // const removedToken = user.tokens.splice(user.tokens.indexOf(token), 1);
  // updateUserTokenById(user.id, removedToken);
  // });
};
