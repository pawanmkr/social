import express from "express";
import authenticateUser from "../controller/authenticate.js";
import { getUserProfile, followUser, unfollowUser } from "../controller/user.js";
import { authenticateJWT } from "../middleware/authjwt.js";
import { createPost, deletePost, doComment, likePost, unlikePost, getPost, getAllPost } from "../controller/post.js";
const router = express.Router();

router.post('/authenticate', authenticateUser);

router.get('/user', authenticateJWT, getUserProfile);

router.post('/follow/:id', authenticateJWT, followUser);
router.post('/unfollow/:id', authenticateJWT, unfollowUser);

router.post('/posts', authenticateJWT, createPost);

router.delete('/posts/:id', authenticateJWT, deletePost);

router.get('/posts/:id', authenticateJWT, getPost);
router.get('/all_posts', getAllPost);

router.post('/like/:id', authenticateJWT, likePost);
router.post('/unlike/:id', authenticateJWT, unlikePost);

router.post('/comment/:id', authenticateJWT, doComment);

export default router;