const path = require('path');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');
const { Post } = require('../models/Post');

const userController = {
  getDashboard: async (req, res) => {
    try {
      const userId = req.session.userId;

      // Make sure Post model is available before using it
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

      const newPost = await Post.create({
        title,
        body,
        userId: req.session.userId,
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

module.exports = userController;
