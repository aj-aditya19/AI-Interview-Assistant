import dotenv from "dotenv";

const result = dotenv.config();

console.log(result);
console.log("KEY =", process.env.GROQ_API_KEY);
