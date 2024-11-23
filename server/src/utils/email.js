import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendOTPEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject: 'Email Verification OTP',
      text: `Your OTP for email verification is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Your OTP for email verification is:</p>
          <h1 style="color: #4CAF50; font-size: 32px;">${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};