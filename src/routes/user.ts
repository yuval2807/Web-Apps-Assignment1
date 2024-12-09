import express, { Request, Response } from "express";
import userModel from "../models/user";
import {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
} from "../controllers/user";

import authenticateToken from "../middleware/jwt";
//const authenticateToken = require("../middleware/jwt");

const router = express.Router();

router.use(authenticateToken);

router.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send(await getAllUsers());
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:user_id", async (req: Request, res: Response) => {
  const id = req.params.user_id;

  try {
    const user = await getUserById(id);
    if (!user) res.status(404).json({ message: "User not found" });
    else res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

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

router.post("/", async (req: Request, res: Response) => {
  const user = req.body;

  try {
    res.status(200).send(await addNewUser(user));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.body;

  try {
    const updatedUser = await updateUserById(id, user);

    if (!updatedUser) res.status(404).json({ message: "User not found" });
    else res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
