import jwt from "jsonwebtoken";
import User from "../models/auth.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (req.user.status === "inactive") {
      return res.status(403).json({ message: "Account inactive" });
    }

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
