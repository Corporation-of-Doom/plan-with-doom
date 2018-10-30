require("dotenv").config();
const express = require("express");
const express_graphql = require("express-graphql");
const { schema } = require("./schema");
const { API_PORT: port } = process.env;
const cors = require('cors');

// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors())
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
