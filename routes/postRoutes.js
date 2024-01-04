const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/post', postController.getPost);
router.get('/post/:id', postController.viewPost);
router.post('/post/:id/comment', postController.addComment);

module.exports = router;
