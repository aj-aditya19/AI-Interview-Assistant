import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOtpEmail(to, otp, name = "") {
  await transporter.sendMail({
    from: `"Finance Dashboard" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Verification OTP",
    text: `${otp} is your verification code. Do not share this OTP with anyone.`,
  });
}

export async function sendReminderEmail(to, name, medicines) {
  const medList = medicines
    .map(
      (m) =>
        `<li style="margin:6px 0;color:#2d3748;"><strong>${m.medicineName}</strong> ${m.dosage} — ${m.time}</li>`,
    )
    .join("");

  await transporter.sendMail({
    from: `"Finance Dashboard" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Reminder",
    text: `Hi ${name}, reminder: ${medicines
      .map((m) => `${m.medicineName} ${m.dosage} at ${m.time}`)
      .join(", ")}`,
    html: `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Reminder:</p>
      <ul>${medList}</ul>
    `,
  });
}
