import express, { Request, Response } from "express";
const router = express.Router();
import { login } from "../controllers/user";

router.get("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    res.status(200).send(await login(email, password));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
