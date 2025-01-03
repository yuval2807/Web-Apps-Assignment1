import express, { Request, Response } from "express";
import {
  getPostBySender,
  getAllPosts,
  getPostById,
  addNewPost,
  updatePostById,
} from "../controllers/post";
import authenticateToken from "../middleware/jwt";

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: The posts API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *       Post:
 *           type: object
 *           properties:
 *               _id:
 *                   type: string
 *               title:
 *                   type: string
 *               content:
 *                   type: string
 *               sender:
 *                   type: string
 *           example:
 *              _id: 'hgsfjhskljslkgl2kgldjd'
 *              title: 'example title'
 *              content: 'example content'
 *              owner: 'adraaggayajala'
 *       PostBody:
 *           type: object
 *           required:
 *              - title
 *           properties:
 *               title:
 *                   type: string
 *               content:
 *                   type: string
 *           example:
 *              title: 'example title'
 *              content: 'example content'
 *       UpdatePostBody:
 *           type: object
 *           required:
 *           properties:
 *               title:
 *                   type: string
 *               content:
 *                   type: string
 *               sender:
 *                   type: string
 *           example:
 *              title: 'example title'
 *              content: 'example content'
 *              sender: '123ggg5f6h7js8ee'
 */

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * /post:
 *   get:
 *       summary: Retrieve a list of all posts
 *       tags: [Posts]
 *       security:
 *           - bearerAuth: []
 *       responses:
 *           200:
 *               description: A list of posts
 *               content:
 *                   application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
 *           400:
 *              description: Bad request
 */
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

/**
 * @swagger
 * /post/{post_id}:
 *   get:
 *       summary: Retrieve a post by id
 *       tags: [Posts]
 *       security:
 *           - bearerAuth: []
 *       parameters:
 *          - name: post_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *           200:
 *               description: A specific post
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */
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

/**
 * @swagger
 * /post:
 *   post:
 *       summary: Create a new post
 *       tags: [Posts]
 *       security:
 *           - bearerAuth: []
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/PostBody'
 *       responses:
 *           200:
 *               description: New post created
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *           400:
 *              description: Bad request
 *           401:
 *              description: Unauthorized
 */
router.post("/", async (req: Request, res: Response) => {
  const post = req.body;

  try {
    res.status(200).send(await addNewPost(post));
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /post/{id}:
 *   put:
 *       summary: Update a post
 *       tags: [Posts]
 *       security:
 *           - bearerAuth: []
 *       parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/UpdatePostBody'
 *       responses:
 *           200:
 *               description: Post updated
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *           400:
 *              description: Bad request
 *           401:
 *              description: Unauthorized
 *           404:
 *              description: Not Found
 */
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
