import express from 'express';
import { authMid } from '../middlewares/auth';
import PostController from './post.controller';
import PostService from './post.service';
import validate from '../middlewares/validator';
import { PostInput, PostQuery } from './post.validator';

const router = express.Router();
const postController = new PostController(PostService);

// Get all posts
router.get('/api/v1/posts', validate(PostQuery), postController.getAllPosts.bind(postController));
// Get single post
router.get('/api/v1/post/:id', postController.getSinglePost.bind(postController));
// Create a new post - Only authenticated user
router.post('/api/v1/post', authMid, validate(PostInput), postController.createPost.bind(postController));
// Update post
router.patch('/api/v1/post/:id', postController.updatePost.bind(postController));
// Delete post
router.delete('/api/v1/post/:id', postController.deletePost.bind(postController));

export default router;
