const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

module.exports = (SECRET_KEY) => {
  function generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  }

  function checkAuth(context) {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];

      if (token) {
        try {
          const user = jwt.verify(token, SECRET_KEY);
          return user;
        } catch (err) {
          throw new AuthenticationError('Invalid/Expired token');
        }
      }

      throw new Error("Authentication token must be 'Bearer [token]'");
    }

    throw new Error('Authorization header must be provided');
  }

  return {
    generateToken,
    checkAuth,
  };
};
