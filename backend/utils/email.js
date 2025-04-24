import nodemailer from "nodemailer";
// import { EMAIL_USER, EMAIL_PASS } from '../config';

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export async function sendOtpEmail(to, otp) {
  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Password Reset OTP",
    html: `
      <p>Your OTP is <strong>${otp}</strong>.</p>
      <p>It expires in 15 minutes.</p>
    `,
  });
}
