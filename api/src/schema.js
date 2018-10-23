const { makeExecutableSchema } = require("graphql-tools");

// const { User, Event, Capacity } = require("./types");
const { User, Event, Capacity } = require("./types");
const { rootResolvers } = require("./resolvers");
const { mutations } = require("./mutations");

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }

  # the schema allows the following query:
  type Query {
    user(id: Int!): User
  }

  type Mutation {
    createEvent(event: EventInput!): Event!
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, User, Event, Capacity],
  resolvers: [rootResolvers]
});

module.exports = { schema };
