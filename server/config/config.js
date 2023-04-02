const mongoose = require('mongoose');
require('dotenv').config();

//change to my database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mainuser:<password>@clustersocialmedia0.93bcet0.mongodb.net/test';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${MONGODB_URI}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
  });
});

module.exports = mongoose.connection;

