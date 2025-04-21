import express from "express";
const cardRouter = express.Router();
const User = require("../models/user.model");

cardRouter.get("/cards/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("cards");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = cardRouter;
