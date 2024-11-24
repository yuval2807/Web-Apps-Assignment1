const express = require("express");
const router = express.Router();
const commentModel = require("../models/comment");
const {
  getAllComments,
  getCommentById,
  addNewComment,
  updateCommentById,
  deleteCommentById,
} = require("../controllers/comment");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await getAllComments());
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const comment = await getCommentById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    res.status(200).send(comment);
  } catch (err) {
    res.status(400).send(err);
  }
});

//addComment
router.post("/", async (req, res) => {
  const comment = req.body;
  try {
    res.status(201).send(await addNewComment(comment));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const comment = req.body;

  try {
    const updatedComment = await updateCommentById(id, comment);

    if (!updatedComment)
      return res.status(404).json({ message: "Comment not found" });

    res.status(200).send(updatedComment);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  const commentId = req.params.id;
  try {
    res.status(200).send(await deleteCommentById(commentId));
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
