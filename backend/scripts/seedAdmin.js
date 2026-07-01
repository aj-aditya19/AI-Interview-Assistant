// Run this once with: node scripts/seedAdmin.js
// It sets up the admin account for ajaditya1908@gmail.com

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

dotenv.config();

const ADMIN_EMAIL = "ajaditya1908@gmail.com";
const ADMIN_PASSWORD = "AkiJ1907";
const ADMIN_NAME = "Aditya Jaiswal";

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const existingUser = await User.findOne({ email: ADMIN_EMAIL });

    if (existingUser) {
      // Update the existing account to admin role and reset password
      existingUser.role = "admin";
      existingUser.passwordHash = hashedPassword;
      existingUser.fullName = ADMIN_NAME;
      // We bypass the pre-save hook by updating directly so it doesn't double-hash
      await User.updateOne(
        { email: ADMIN_EMAIL },
        {
          $set: {
            role: "admin",
            passwordHash: hashedPassword,
            fullName: ADMIN_NAME,
          },
        }
      );
      console.log(`Admin role assigned to existing user: ${ADMIN_EMAIL}`);
    } else {
      // Create a fresh admin user
      await User.create({
        fullName: ADMIN_NAME,
        email: ADMIN_EMAIL,
        passwordHash: hashedPassword,
        role: "admin",
        isVerified: true,
      });
      // Since we pre-hashed above and the pre-save hook will hash again,
      // we need to update directly after creation to avoid double hashing
      await User.updateOne(
        { email: ADMIN_EMAIL },
        { $set: { passwordHash: hashedPassword } }
      );
      console.log(`Admin user created: ${ADMIN_EMAIL}`);
    }

    console.log("Seed complete.");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seedAdmin();
