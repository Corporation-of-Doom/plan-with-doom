const { makeExecutableSchema } = require("graphql-tools");

const { User, Event, Capacity, Seminar, Announcement } = require("./types");
const { rootResolvers } = require("./resolvers");
const { mutations } = require("./mutations");

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }

  # the schema allows the following queries:
  type Query {
    login(email: String!, password: String!): User!

""" time is returned as a utc time, you can convert it back using
    new Date(1571567400000)"""
    getEventByID(id: Int! offset: Int limit: Int): Event
    getSeminarByID(id: Int! offset: Int limit: Int): Seminar
    searchUsersByName(searchString: String!): [User!]
  }

  # The schema allows the following mutations:
  type Mutation {
    signUp(user: UserInput!): User!
    # Creates a new event
    createEvent(event: EventInput!): Event!
    createSeminar(seminar: SeminarInput!): Seminar!
    addUserToEvent(EventParticipation: EventParticipationInput!): Int!
    removeUserFromEvent(EventParticipation: EventParticipationInput!): Int!

    addUserToSeminar(SeminarParticipation: SeminarParticipationInput!): Int!
    removeUserFromSeminar(SeminarParticipation: SeminarParticipationInput!): Int!

    createEventAnnouncement(announcement: AnnouncementInput!): Announcement!
    createSeminarAnnouncement(announcement: AnnouncementInput!): Announcement!
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, User, Event, Capacity, Seminar, Announcement],
  resolvers: [rootResolvers, mutations]
});

module.exports = { schema };
