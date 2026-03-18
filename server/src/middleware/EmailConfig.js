import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();
// Configure these via .env (recommended) or fall back to convenient defaults.
// For Gmail: use an App Password (not your normal account password) and set
// `EMAIL_PORT=465` with `EMAIL_SECURE=true` or `EMAIL_PORT=587` with `EMAIL_SECURE=false`.
export const transporter = nodemailer.createTransport({
  host:  "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASS}`,
  },
});

