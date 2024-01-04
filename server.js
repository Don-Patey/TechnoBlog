// server.js
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const sequelize = require('./config/connection');

require('dotenv').config();

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();
const PORT = process.env.PORT || 3306;

// Set up session and connect it to Sequelize
const sess = {
  secret: 'secrethehekey',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use your routes
app.use('/', userRoutes);
app.use('/', postRoutes);

// Explicitly define the order of model synchronization
sequelize.sync({ force: false, order: [User, Post, Comment] }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
