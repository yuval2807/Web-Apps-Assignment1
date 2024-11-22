const express = require("express");
const postRoutes = require("./src/routes/post");
const app = express();
const port = 3000;

app.use("/post", postRoutes);
// app.use("/comment", commentRoutes);

app.listen(port, () => {
  console.log(`lisening at http:/localhost:${port}`);
});
