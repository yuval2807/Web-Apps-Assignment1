const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.get("/:id", (req, res) => {
//   res.send("getPostById");
// });

//addUser
router.post("/", async (req, res) => {
  console.log(req.body);
  const user = req.body;
  try {
    const newUser = await userModel.create(user);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.put("/:id", (req, res) => {
//   res.send("updateComment");
// });

// router.delete("/:id", (req, res) => {
//   res.send("deleteComment");
// });

module.exports = router;
