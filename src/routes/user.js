const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
} = require("../controllers/user");
const authenticateToken = require("../middleware/jwt");

router.use(authenticateToken);

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await getAllUsers());
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:user_id", async (req, res) => {
  const id = req.params.user_id;

  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  const user = req.body;

  try {
    res.status(200).send(await addNewUser(user));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  try {
    const updatedUser = await updateUserById(id, user);

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
