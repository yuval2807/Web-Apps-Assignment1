const express = require("express");
const router = express.Router();
const postModel = require("../models/post");

router.get("/", async (req, res) => {
  const sender = req.query.sender;

  try {
    if (sender) {
      const posts = await postModel
        .find({ sender: sender })
        .populate("sender", "name");
      res.status(200).send(posts);
    } else {
      const posts = await postModel.find().populate("sender", "name");
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
router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const newPost = await postModel.create(post);
    res.status(201).send(newPost);
  } catch (err) {
    res.status(400).send(err);
  }
  //res.send("addPost");
});

router.put("/:id", (req, res) => {
  res.send("updatePost");
});

router.get("/", (req, res) => {
  res.send("hhh");
});

module.exports = router;
