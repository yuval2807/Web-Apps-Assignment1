const express = require("express");
const router = express.Router();
const postModel = require("../models/post");
const {
  getPostBySender,
  getAllPosts,
  getPostById,
  addNewPost,
  updatePostById,
} = require("../controllers/post");

router.get("/", async (req, res) => {
  const sender = req.query.sender;

  try {
    if (sender) res.status(200).send(await getPostBySender(sender));
    else {
      res.status(200).send(await getAllPosts());
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:post_id", async (req, res) => {
  const id = req.params.post_id;

  try {
    const post = await getPostById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  const post = req.body;

  try {
    res.status(200).send(await addNewPost(post));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  try {
    const updatedPost = await updatePostById(id, post);

    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).send(updatedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
