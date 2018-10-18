const { makeExecutableSchema } = require("graphql-tools");

// const { User, Event, Seminar, Capacity } = require("./types");
const { User } = require("./types");
const { rootResolvers } = require("./resolvers");
// const { mutations } = require("./mutations");

const SchemaDefinition = `
  schema {
    query: Query
  }

  # the schema allows the following query:
  type Query {
    users: [User!]
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, User],
  resolvers: [rootResolvers]
});

module.exports = { schema };
