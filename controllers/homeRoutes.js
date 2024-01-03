const router = require('express').Router();

// Import your Sequelize models
const { User, Post, Comment } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Fetch existing blog posts from the database
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    res.render('home', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// View a specific blog post
router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Fetch the specific blog post and its comments
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.render('post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a new comment to a blog post
router.post('/post/:id/comment', async (req, res) => {
  try {
    const postId = req.params.id;
    const { body } = req.body;

    // Create a new comment
    const newComment = await Comment.create({
      body,
      postId,
      userId: req.session.userId, // Assuming you store the user's ID in the session
    });

    res.redirect(`/post/${postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
