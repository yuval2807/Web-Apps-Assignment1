const express = require("express");
const router = express.Router();
const { login } = require("../controllers/user");

router.get("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    res.status(200).send(await login(email, password));
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
