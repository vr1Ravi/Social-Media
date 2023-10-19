import { User } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  try {
    // extracting token from cookies
    const { token } = req.cookies;

    // Validating
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // Decoding token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
