import express from "express";

import { sendContactUsEmail } from "../utils/email.js";

const contactRouter = express.Router();
contactRouter.post("/us", async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res
        .status(400)
        .json({ error: "Email, subject, and message are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Send confirmation email to the user
    await sendContactUsEmail(normalizedEmail, subject, message);

    res
      .status(200)
      .json({
        success: true,
        message: "Your message has been sent successfully!",
      });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});

export { contactRouter };
