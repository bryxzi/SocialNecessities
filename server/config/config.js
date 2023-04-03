const mongoose = require('mongoose');
require('dotenv').config();

//change to my database
const MONGODB_URI = "mongodb+srv://mainuser:Newuser1@clustersocialmedia0.93bcet0.mongodb.net/social_media_db?retryWrites=true&w=majority";


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
