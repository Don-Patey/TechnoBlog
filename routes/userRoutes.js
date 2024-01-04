const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');
const { Post } = require('../models/Post');
const userController = require('../controllers/userController');




router.get('/dashboard', userController.getDashboard);
router.post('/dashboard/add', userController.addPost);
router.post('/dashboard/:id/delete', userController.deletePost);
router.post('/dashboard/:id/update', userController.updatePost);

module.exports = router;
