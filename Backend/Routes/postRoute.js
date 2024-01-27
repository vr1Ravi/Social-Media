import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
  getRandomPost,
} from "../Controllers/postController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { createRandomPosts } from "../Controllers/RandomPostController.js";
/* An Express Router is a middleware and routing system that allows you to define and organize your
 application's routes and middleware functions more cleanly and modularly. */
const router = express.Router(); // Here Router is an object

router
  .route("/post/upload")
  .post(isAuthenticated, upload.single("image"), createPost);
router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);
router.route("/posts").get(isAuthenticated, getPostOfFollowing);
router
  .route("/post/comment/:id")
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, deleteComment);
router
  .route("/random/posts")
  .get(isAuthenticated, getRandomPost)
  .post(upload.single("image"), createRandomPosts);
export { router };
