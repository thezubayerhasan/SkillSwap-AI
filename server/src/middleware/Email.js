import {transporter} from "./EmailConfig.js";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"SkillSwap AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email",
      text: `Your OTP for email verification is: ${otp}`,
    });
    console.log("Verification email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};