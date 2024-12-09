import jwt from "jsonwebtoken";

const generateAccessToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const verifyeAccessToken = (user, token) =>
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new Error("Invalid or expired token");
    }
  });

const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

export { generateAccessToken, verifyeAccessToken, generateRefreshToken };
