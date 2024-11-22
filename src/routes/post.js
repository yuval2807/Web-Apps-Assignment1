const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("getAllPosts");
});

router.get("/:id", (req, res) => {
  res.send("getPostById");
});

router.get("/search", (req, res) => {
  res.send("search");
});

//addPost
router.post("/", (req, res) => {
  res.send("addPost");
});

router.put("/:id", (req, res) => {
  res.send("updatePost");
});

router.get("/", (req, res) => {
  res.send("hhh");
});

module.exports = router;
