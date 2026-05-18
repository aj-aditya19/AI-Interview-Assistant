import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", true);

export const connectDb = async () => {
  const mongoUri = process.env.MONGO_URI;

  console.log("Connecting to MongoDB...\n");
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(`Error occurred while connecting to MongoDB.\nError: ${error}`);
    process.exit(1);
  }
};
