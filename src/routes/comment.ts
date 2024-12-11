import express, { Request, Response } from "express";
const router = express.Router();
import {
  getAllComments,
  getCommentById,
  addNewComment,
  updateCommentById,
  deleteCommentById,
  getCommentsByPostId,
} from "../controllers/comment";

router.get("/", async (req: Request, res: Response) => {
  const postId = req.query.postId;

  try {
    if (postId) res.status(200).send(await getCommentsByPostId(postId));
    else {
      res.status(200).send(await getAllComments());
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const comment = await getCommentById(id);
    if (!comment) res.status(404).json({ message: "Comment not found" });
    else res.status(200).send(comment);
  } catch (err) {
    res.status(400).send(err);
  }
});

//addComment
router.post("/", async (req: Request, res: Response) => {
  const comment = req.body;
  try {
    res.status(201).send(await addNewComment(comment));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = req.body;

  try {
    const updatedComment = await updateCommentById(id, comment);

    if (!updatedComment) res.status(404).json({ message: "Comment not found" });
    else res.status(200).send(updatedComment);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const commentId = req.params.id;
  try {
    res.status(200).send(await deleteCommentById(commentId));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
