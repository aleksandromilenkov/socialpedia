import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createComment,
  getSmth,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/getAll", getSmth);
/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, createComment);

/* DELETE */
router.delete("/:id/delete", deletePost);

export default router;
