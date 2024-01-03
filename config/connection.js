const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost', // Change this if your database is on a different host
    dialect: 'mysql',
    port: 3306, // Change this if your MySQL server is running on a different port
  }
);

module.exports = sequelize;
