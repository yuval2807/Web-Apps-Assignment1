import express, { Request, Response } from "express";
const router = express.Router();
import { login, logout, refresh } from "../controllers/auth";
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
  const refreshToken = authHeader && authHeader.split(" ")[1]; // פורמט: "Bearer <token>"

  try {
    res.status(200).send(await logout(refreshToken));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/refresh", async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1]; // פורמט: "Bearer <token>"

  try {
    res.status(200).send(await refresh(refreshToken));
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
