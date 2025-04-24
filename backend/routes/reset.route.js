import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { sendOtpEmail } from "../utils/email.js";

const resetRouter = express.Router();

// a) Request OTP
resetRouter.post("/forgot-password/request-otp", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now

    user.resetOTP = otp;
    user.resetOTPExpiry = otpExpiry;
    await user.save();
    await sendOtpEmail(email, otp);
    res.status(200).json({ success: true, message: "OTP sent to email" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
  res.json({ message: "If that email exists, you’ll receive an OTP shortly." });
});

// b) Verify OTP & Reset Password
resetRouter.post("/forgot-password/reset", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Check OTP and expiry
    else if (
      user.resetOTP !== otp ||
      !user.resetOTPExpiry ||
      user.resetOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export { resetRouter };
