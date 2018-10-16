var express = require("express");
var express_graphql = require("express-graphql");

const { makeExecutableSchema } = require("graphql-tools");
const { SchemaDefinition, Author, Post } = require("./schema");
const { rootResolvers } = require("./resolvers");
const { mutations } = require("./mutations");

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Author, Post],
  resolvers: [rootResolvers, mutations]
});

// Create an express server and a GraphQL endpoint
var app = express();
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
