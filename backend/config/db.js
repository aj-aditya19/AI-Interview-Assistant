import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  console.log("Connecting to MongoDB...\n");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(`Error occur while connecting mongoDB.\nErorr: ${error}`);
    process.exit(1);
  }
};
