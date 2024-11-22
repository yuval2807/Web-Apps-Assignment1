const express = require("express");
const app = express();
const port = 300
0;

app.get("/", (req, res) => {
  res.send("hhh");
});

app.listen(port, () => {
  console.log(`lisening at http:/localhost:${port}`);
});
