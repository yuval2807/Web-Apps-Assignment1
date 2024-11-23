const express = require("express");
const router = express.Router();
const postModel = require("../models/post");

router.get("/", async (req, res) => {
  const owner = req.query.owner;

  try {
    if (owner) {
      const posts = await postModel.find({ owner: owner });
      res.status(200).send(posts);
    } else {
      const posts = await postModel.find();
      res.status(200).send(posts);
    }
  } catch (err) {
    res.status(400).send(err);
  }
  //res.send("getAllPosts");
});

router.get("/:id", (req, res) => {
  res.send("getPostById");
});

router.get("/search", (req, res) => {
  res.send("search");
});

//addPost
router.post("/", (req, res) => {
  res.send("addPost");
});

router.put("/:id", (req, res) => {
  res.send("updatePost");
});

router.get("/", (req, res) => {
  res.send("hhh");
});

module.exports = router;
