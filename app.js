const express = require("express");
const postRoutes = require("./src/routes/post");
const connectToDatabase = require("./src/config/db");
const app = express();
const port = 3000;
const env = require("dotenv").config();
//const bodyParser = require("body-parser"); // needed for post request

connectToDatabase();

app.use("/post", postRoutes);
// app.use("/comment", commentRoutes);

app.listen(port, () => {
  console.log(`lisening at http:/localhost:${port}`);
});
