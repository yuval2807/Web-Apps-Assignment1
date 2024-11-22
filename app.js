const express = require("express");
const postRoutes = require("./src/routes/post");
const app = express();
const port = 3000;
const env = require("dotenv").config();
//const bodyParser = require("body-parser"); // needed for post request

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use("/post", postRoutes);
// app.use("/comment", commentRoutes);

app.listen(port, () => {
  console.log(`lisening at http:/localhost:${port}`);
});
