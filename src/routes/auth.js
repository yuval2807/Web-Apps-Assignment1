const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/auth");

router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    res.status(200).send(await login(email, password));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/logout", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // פורמט: "Bearer <token>"

  try {
    res.status(200).send(await logout(token));
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
