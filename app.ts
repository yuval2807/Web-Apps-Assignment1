import express, { Express } from "express";
import postRoutes from "./src/routes/post";
import commentRoutes from "./src/routes/comment";
import userRoutes from "./src/routes/user";
import loginRoutes from "./src/routes/login";
import connectToDatabase from "./src/config/db";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/user", userRoutes);
app.use("/login", loginRoutes);

app.listen(port, () => {
  console.log(`lisening at http:/localhost:${port}`);
});
