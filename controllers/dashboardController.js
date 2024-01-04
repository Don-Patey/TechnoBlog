const { User, Post, Comment } = require('../models');

const dashboardController = {
  getDashboard: async (req, res) => {
    try {
      // Fetch user's blog posts from the database
      const userId = req.session.userId; // Assuming you store the user's ID in the session
      const userPosts = await Post.findAll({
        where: { userId },
      });

      res.render('dashboard', { userPosts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addPost: async (req, res) => {
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
  },

  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;

      // Delete the specified blog post
      await Post.destroy({
        where: { id: postId, userId: req.session.userId },
      });

      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, body } = req.body;

      // Update the specified blog post
      await Post.update(
        { title, body },
        { where: { id: postId, userId: req.session.userId } }
      );

      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = dashboardController;
