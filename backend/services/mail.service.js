import nodemailer from "nodemailer";

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are not configured");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const sendOtpEmail = async (toEmail, otp) => {
  console.log(`Sending OTP to ${toEmail} otp ${otp}`);

  const transporter = createTransporter();

  const mailOptions = {
    from: `"InterviewIQ" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "InterviewIQ password reset OTP",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; background: #f8fafc; padding: 24px; border-radius: 12px;">
        <h2 style="color: #157a6e; margin-bottom: 16px;">Password Reset OTP</h2>
        <p style="color: #1f2937; line-height: 1.6;">You requested to reset your InterviewIQ password. Use the OTP below to continue.</p>
        <div style="margin: 24px 0; padding: 18px 20px; background: #ffffff; border: 1px solid #dbe7e5; border-radius: 10px; text-align: center; font-size: 32px; letter-spacing: 8px; font-weight: 700; color: #157a6e;">
          ${otp}
        </div>
        <p style="color: #6b7280; font-size: 14px;">This code expires in 10 minutes. If you did not request this, you can ignore this email.</p>
      </div>
    `,
  };

  await transporter.verify();
  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (toEmail, resetToken) => {
  const transporter = createTransporter();
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: `"InterviewIQ" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your InterviewIQ password",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #157a6e;">Password Reset Request</h2>
        <p>You asked to reset your password for InterviewIQ. Click the button below to create a new password.</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #157a6e; color: #fff; text-decoration: none; border-radius: 6px; margin: 16px 0;">Reset Password</a>
        <p style="color: #6b7280; font-size: 14px;">This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  };

  await transporter.verify();
  await transporter.sendMail(mailOptions);
};

export { sendPasswordResetEmail, sendOtpEmail };
