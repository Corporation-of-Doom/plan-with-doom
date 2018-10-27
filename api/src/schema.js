const { makeExecutableSchema } = require("graphql-tools");

// const { User, Event, Capacity } = require("./types");
const { User, Event, Capacity, Seminar } = require("./types");
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
    getEventByID(id: Int!): Event!
    getSeminar(id: Int!): Seminar!
    searchUsersByName(searchString: String!): [User!]
  }

  type Mutation {
    signUp(user: UserInput!): User!
    createEvent(event: EventInput!): Event!
    createSeminar(seminar: SeminarInput!): Seminar!
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, User, Event, Capacity, Seminar],
  resolvers: [rootResolvers, mutations]
});

module.exports = { schema };
