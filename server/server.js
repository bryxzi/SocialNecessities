const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
require('dotenv').config();

const typeDefs = require("./schema/typedefs");
const resolvers = require("./schema/resolvers");
const db = require("./config/config");

const PORT = process.env.PORT || 3001;
const app = express();

const auth = require('./auth/auth')(process.env.JWT_SECRET);
const { generateToken, checkAuth } = auth;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, user: checkAuth(req) }),

});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  req.headers.authorization = req.headers.authorization || '';
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  });
  

startApolloServer()
  .catch((error) => {
    console.error("Error starting Apollo Server:", error);
  });