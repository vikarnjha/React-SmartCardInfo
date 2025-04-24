import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expiresAt: Date,
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const PasswordReset = mongoose.model(
  "PasswordReset",
  passwordResetSchema
);
