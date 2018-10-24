const { makeExecutableSchema } = require("graphql-tools");

// const { User, Event, Seminar, Capacity } = require("./types");
const { User } = require("./types");
const { rootResolvers } = require("./resolvers");
const { mutations } = require("./mutations");

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }

  # the schema allows the following query:
  type Query {
    login(email: String!, password: String!): User!
  }

  type Mutation {
    signUp(user: UserInput!): User!
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, User],
  resolvers: [rootResolvers, mutations]
});

module.exports = { schema };
