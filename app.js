const express = require("express");
const postRoutes = require("./src/routes/post");
const commentRoutes = require("./src/routes/comment");
const userRoutes = require("./src/routes/user");
const loginRoutes = require("./src/routes/login");
const connectToDatabase = require("./src/config/db");
const app = express();
const port = 3000;
const env = require("dotenv").config();
const bodyParser = require("body-parser"); // needed for post request

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
