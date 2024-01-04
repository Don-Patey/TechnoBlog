const router = require('express').Router();

// Import your Sequelize models
const { User, Post } = require('../models');

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.userId) {
      // If the user is not logged in, redirect to the homepage
      return res.redirect('/');
    }

    // Fetch the user's own blog posts
    const userPosts = await Post.findAll({
      where: { userId: req.session.userId },
    });

    res.render('dashboard', { userPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a new blog post
router.post('/dashboard/add', async (req, res) => {
  try {
    const { title, body } = req.body;

    // Create a new blog post
    const newPost = await Post.create({
      title,
      body,
      userId: req.session.userId, // Assuming you store the user's ID in the session
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a blog post
router.delete('/dashboard/:id/delete', async (req, res) => {
  try {
    const postId = req.params.id;

    // Delete the blog post
    await Post.destroy({
      where: { id: postId, userId: req.session.userId },
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
