import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.model.js";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password || password.length < 8) {
  console.error(
    "Set ADMIN_EMAIL and ADMIN_PASSWORD (min 8 chars) in the environment.",
  );
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
let user = await User.findOne({ email: email.toLowerCase() });
if (user) {
  user.role = "admin";
  user.passwordHash = password;
  user.isVerified = true;
} else {
  user = new User({
    fullName: "Admin",
    email,
    passwordHash: password,
    role: "admin",
    isVerified: true,
  });
}
await user.save();
console.log(`Admin ready: ${email}`);
await mongoose.disconnect();
