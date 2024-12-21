import express from 'express';
import { authenticate } from '../middleware/authmiddleware'; // Import middleware
import { createBlog, getBlogs, updateBlog, deleteBlog,getBlogById } from '../controller/blogcontroller';
import { get } from 'http';

const router = express.Router();

router.post('/blogs', authenticate, createBlog);        // Protected route
router.get('/blogs', getBlogs);  
router.get('/blogs/:id',getBlogById);                      // Public route
router.put('/blogs/:id', authenticate, updateBlog);     // Protected route
router.delete('/blogs/:id', authenticate, deleteBlog);  // Protected route

export default router;
