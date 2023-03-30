const { UserInputError, AuthenticationError } = require('apollo-server-express');
const { Post, User } = require('../models');
const { checkAuth, generateToken } = require('../auth/auth');

const resolvers = {
  Query: {
    // ...
  },
  Mutation: {
    // ...
  },
};

module.exports = resolvers;
