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
  <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="text-align: center; color: #4a90e2;">Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password. Please use the OTP below to proceed:</p>
    <div style="margin: 20px 0; padding: 15px; background-color: #eaf4ff; border-left: 5px solid #4a90e2; font-size: 20px; text-align: center; font-weight: bold; letter-spacing: 2px;">
      ${otp}
    </div>
    <p style="color: #555;">This OTP is valid for <strong>15 minutes</strong>. Please do not share this code with anyone.</p>
    <p>If you didn't request a password reset, you can safely ignore this email.</p>
    <br>
    <p style="text-align: center; font-size: 14px; color: #999;">Thank you,<br>Support Team,<br>SmartCardManager</p>
  </div>
`,
  });
}
