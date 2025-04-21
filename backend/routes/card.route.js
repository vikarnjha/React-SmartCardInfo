import express from "express";
import User from "../models/user.model.js";
const cardRouter = express.Router();

cardRouter.get("/cards/email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "cards"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.cards);
  } catch (error) {
    console.error("Error fetching cards by email:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export { cardRouter };
