import express from "express";
import User from "../models/user.model.js";
import { encryptCard, decryptCard } from "../cryptoUtils.js";
const cardRouter = express.Router();

cardRouter.get("/cards/email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "cards"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Decrypt each cardNumber
    // decrypt each saved cardNumber before returning
    const decryptedCards = user.cards.map(c => ({
      _id: c._id,
      cardName: c.cardName,
      cardExpire: c.cardExpire,
      cardSecurity: c.cardSecurity,
      cardNetwork: c.cardNetwork,
      cardType: c.cardType,
      cardBrand: c.cardBrand,
      date: c.date,
      cardNumber: decryptCard(c.cardNumber, c.iv)
    }));

    res.json(decryptedCards);
  } catch (error) {
    console.error("Error fetching cards by email:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

cardRouter.post("/cards/email/:email", async (req, res) => {
  try {
    const {
      cardNumber,
      cardName,
      cardExpire,
      cardSecurity,
      cardNetwork,
      cardType,
      cardBrand,
    } = req.body;
    const email = req.params.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Encrypt the card number
    const { iv, data } = encryptCard(cardNumber);

    // Build encrypted card object
    const encryptedCard = {
      cardNumber: data, // encrypted hex string
      iv, // iv hex string
      cardName,
      cardExpire,
      cardSecurity,
      cardNetwork,
      cardType,
      cardBrand,
    };

    // Save and respond
    user.cards.push(encryptedCard);
    await user.save();

    res.status(200).json({ message: "Card saved successfully" });
  } catch (err) {
    console.error("Error saving card:", err);
    res.status(500).json({ message: "Server error" });
  }
});

cardRouter.delete("/cards/email/:email/:cardId", async (req, res) => {
  const { email, cardId } = req.params;

  try {
    const result = await User.updateOne(
      { email },
      {
        $pull: {
          cards: { _id: cardId },
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Card or user not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export { cardRouter };
