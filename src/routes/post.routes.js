import express from 'express';
import { getAllPosts, createPost, updatePost, deletePost } from '../controllers/post.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllPosts);

router.post('/', protectRoute, createPost);
router.patch('/:id', protectRoute, updatePost);
router.delete('/:id', protectRoute, deletePost);

export default router;