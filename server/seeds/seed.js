const db = require('../config/config');
const { User, Post } = require('../models');
const userData = require('./techData.json').users;
const postData = require('./techData.json').posts;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Database connected');

  try {
    await User.deleteMany({});
    await Post.deleteMany({});

    await User.insertMany(userData);
    await Post.insertMany(postData);

    console.log('Seed data inserted');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
