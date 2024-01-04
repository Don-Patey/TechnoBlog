const path = require('path');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');
const { Post } = require('../models/Post');

const homeController = {
  getHome: async (req, res) => {
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
  },

  viewPost: async (req, res) => {
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
  },

  addComment: async (req, res) => {
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
  },
};

module.exports = homeController;
