import express from "express";
import {
  register,
  login,
  followOrUnfollowUser,
  logout,
  updatePassword,
  updateProfile,
  deleteProfile,
  getProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getBots,
} from "../Controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.route("/register").post(upload.single("profileImg"), register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated, logout);
router.route("/update/password").put(isAuthenticated, updatePassword);
router
  .route("/update/profile")
  .put(isAuthenticated, upload.single("profileImg"), updateProfile);
router.route("/delete/me").delete(isAuthenticated, deleteProfile);
router.route("/follow/:id").get(isAuthenticated, followOrUnfollowUser);
router.route("/me").get(isAuthenticated, getProfile);
router.route("/user/:id").get(isAuthenticated, getUserProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/users/bots").get(isAuthenticated, getBots);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
export { router };
