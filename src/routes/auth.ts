import express, { Request, Response } from "express";
const router = express.Router();
import { login, logout } from "../controllers/auth";
import { addNewUser } from "../controllers/user";

router.get("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    res.status(200).send(await login(email, password));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/logout", async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // פורמט: "Bearer <token>"

  try {
    res.status(200).send(await logout(token));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const user = req.body;

  try {
    res.status(200).send(await addNewUser(user));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
