import express, { Request, Response } from "express";
import {
  getPostBySender,
  getAllPosts,
  getPostById,
  addNewPost,
  updatePostById,
} from "../controllers/post";
import authenticateToken from "../middleware/jwt";
//const authenticateToken = require("../middleware/jwt");

const router = express.Router();

router.use(authenticateToken);

router.get("/", async (req: Request, res: Response) => {
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

router.get("/:post_id", async (req: Request, res: Response) => {
  const id = req.params.post_id;

  try {
    const post = await getPostById(id);
    if (!post) res.status(404).send({ message: "Post not found" });
    else res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const post = req.body;

  try {
    res.status(200).send(await addNewPost(post));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = req.body;

  try {
    const updatedPost = await updatePostById(id, post);

    if (!updatedPost) res.status(404).json({ message: "Post not found" });
    else res.status(200).send(updatedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
