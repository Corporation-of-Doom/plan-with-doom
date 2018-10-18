require("dotenv").config();
const express = require("express");
const express_graphql = require("express-graphql");
const { schema } = require("./schema");

const { API_PORT: port } = process.env;

// Create an express server and a GraphQL endpoint
var app = express();
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    graphiql: true
  })
);
app.listen(port, () =>
  console.log(`Express GraphQL Server Now Running On localhost:${port}/graphql`)
);
