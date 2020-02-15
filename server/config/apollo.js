const  jwt  =  require('jsonwebtoken');
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("../api/schema");
let resolvers = require("../api/resolvers");
const { AuthDirective } = require("../api/custom-directives");

// Initialize Apollo Server
module.exports = ({ app, pgResource }) => {
  resolvers = resolvers(app);
  // wire up your schema to your resolvers:
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDirective
    }
  });
  // -------------------------------

  const apolloServer = new ApolloServer({
    context: ({ req }) => {
      const tokenName = app.get("JWT_COOKIE_NAME")
      const token = req ? req.cookies[tokenName] : undefined
      let user = null
      let loggedIn = false
      // -------------------------------
      try {
        console.log('apollo.js is there a token? ' + token)
        // If there is a token, verify that token to get user info and assign it to user variable
        if (token) {
          user = jwt.verify(token, app.get("JWT_SECRET")) //decode the user number
          console.log('user has token!!!!!! user.id:' + user.id)
          loggedIn = true
        }
        return {
          pgResource,
          req,
          user,
          loggedIn
        }
      } catch (e) {
        throw error
      }
    },
    schema,
  });

  apolloServer.applyMiddleware({
    app,
    // @TODO: Add the CORS_CONFIG from your application configuration
    cors: app.get("CORS_CONFIG"),
    // -------------------------------
  });
};
