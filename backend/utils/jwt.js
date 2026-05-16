import jwt from "jsonwebtoken";

export const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
