const express = require("express");
const router = express.Router();
const commentModel = require("../models/comment");

router.get("/", async (req, res) => {
  try {
    const comments = await commentModel.find().populate("post", "content");
    res.status(200).send(comments);
  } catch (err) {
    res.status(400).send(err);
  }
  //res.send("getAllComments");
});

// router.get("/:id", (req, res) => {
//   res.send("getPostById");
// });

//addComment
router.post("/", async (req, res) => {
  console.log(req.body);
  const comment = req.body;
  try {
    const newComment = await commentModel.create(comment);
    res.status(201).send(comment);
  } catch (err) {
    res.status(400).send(err);
  }
  //res.send("addComment");
});

router.put("/:id", (req, res) => {
  res.send("updateComment");
});

router.delete("/:id", (req, res) => {
  res.send("deleteComment");
});

module.exports = router;
