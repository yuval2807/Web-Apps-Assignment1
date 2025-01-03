import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type Payload = {
  _id: string;
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // פורמט: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(400).send("Server Error");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    const userId = (user as Payload)._id;
    req.params.userId = userId; // הוספת פרטי המשתמש לבקשה
    next();
  });
};

export default authenticateToken;
