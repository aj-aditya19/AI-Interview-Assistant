import nodemailer from "nodemailer";

// Create a reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use Gmail App Password, not your real password
  },
});

// Send a password reset email with a link containing the token
const sendPasswordResetEmail = async (toEmail, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: `"InterviewIQ" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your InterviewIQ password",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #157a6e;">Password Reset Request</h2>
        <p>You asked to reset your password for InterviewIQ. Click the button below to create a new password.</p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #157a6e; color: #fff; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Reset Password
        </a>
        <p style="color: #6b7280; font-size: 14px;">This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export { sendPasswordResetEmail };
