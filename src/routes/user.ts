import express, { Request, Response } from "express";
import userModel from "../models/user";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
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
router.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  const user = req.body;
  try {
    const newUser = await userModel.create(user);
    res.status(201).send(newUser);
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

export default router;
