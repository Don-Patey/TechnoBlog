const express = require('express');
const sequelize = require('./models'); // Assuming your models are in a folder called 'models'
const app = express();

// Other configurations...

// Connect to the database
sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
