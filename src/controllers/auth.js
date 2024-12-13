const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const { updateUserTokenById, getUserById, getUserByEmail } = require("./user");
const jwt = require("jsonwebtoken");

const updateRefreshToken = async (user, refreshToken) => {
  user.tokens.push(refreshToken);
  console.log(user.tokens);
  const updatedTokens = !!refreshToken ? user.tokens : [];
  await updateUserTokenById(user.id, updatedTokens);
};

const login = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error("User not found");

  if (password != user.password) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  updateRefreshToken(user, refreshToken);

  return { accessToken, refreshToken };
};

const logout = async (token) => {
  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, userInfo) => {
    if (err) throw new Error("Invalid or expired token");

    const user = await getUserById(userInfo.userId);

    if (!user) throw new Error("User not found");

    if (!user.tokens.includes(token)) {
      user.tokens = [];
      updateRefreshToken(user, null);
    }
    const removedToken = user.tokens.splice(user.tokens.indexOf(token), 1);
    updateUserTokenById(user.id, removedToken);
  });
};

module.exports = {
  login,
  logout,
};
