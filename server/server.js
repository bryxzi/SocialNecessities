const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const { createServer } = require('http');
const { subscribe, execute } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path');

const resolvers = require('./schema');
const typeDefs = require('./schema/typeDefs');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI).then(() => {
  console.log('DB connected!!');
}).catch(err => console.log(err));

(async (typeDefs, resolvers) => {
  const app = express();
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const httpServer = createServer(app);
  const pubSub = new PubSub();

  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, '../client/dist')));

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req, pubSub }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        }
      }
    }],
  });

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    async onConnect() {
      console.log('Connected!');
      return {
        pubSub
      }
    },
    onDisconnect() {
      console.log('Disconnected!');
    }
  }, {
    server: httpServer,
    path: server.graphqlPath
  })

  await server.start();
  server.applyMiddleware({ app });

  // Handles any requests that don't match the ones above
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
  

  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
})(typeDefs, resolvers);
