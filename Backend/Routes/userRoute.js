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
} from "../Controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated, logout);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/me").delete(isAuthenticated, deleteProfile);
router.route("/follow/:id").get(isAuthenticated, followOrUnfollowUser);
router.route("/me").get(isAuthenticated, getProfile);
router.route("/user/:id").get(isAuthenticated, getUserProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
export { router };
