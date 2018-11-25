const { makeExecutableSchema } = require("graphql-tools");

const { User, Event, Capacity, Seminar, Announcement } = require("./types");
const { rootResolvers } = require("./resolvers");
const { mutations } = require("./mutations");

// goes in query
// getMyAnnouncements(userID: Int!, type: String, limit: Int, offset: Int, participationType: participation_type): [SearchResult!]

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }

  union SearchResult = Event | Seminar

  # the schema allows the following queries:
  type Query {
    login(email: String!, password: String!): User!
    getUserById(userID: Int!): User

    getTotal(type: String): Int!
    getTotalSearchResults(searchString: String!, type: String): Int!

    """ time is returned as a utc time, you can convert it back using
    new Date(1571567400000)"""
    getEventByID(id: Int! offset: Int limit: Int): Event
    getSeminarByID(id: Int! offset: Int limit: Int): Seminar
    searchUsersByName(searchString: String!): [User!]

    """ Search for events of seminars by name """
    searchByName(searchString: String!, type: String, limit: Int, offset: Int): [SearchResult!]

    getMyEventsAndSeminars(userID: Int!, type: String, limit: Int, offset: Int, participationType: participation_type): [SearchResult!]
    getMyManagingEventsAndSeminars(userID: Int!, type: String, limit: Int, offset: Int): [SearchResult!]
    getMyWaitlistedEventsAndSeminars(userID: Int!, type: String, limit: Int, offset: Int): [SearchResult!]
    getMyAnnouncements(userID: Int!, limit: Int, offset: Int): [Announcement!]

    checkCalendarConflicts(userID: Int!, type: String!, startDateTime: String!, endDateTime: String!): Boolean
  }

  # The schema allows the following mutations:
  type Mutation {
    signUp(user: UserInput!): User!
    # Creates a new event
    createEvent(event: EventInput!): Event!
    createSeminar(seminar: SeminarInput!): Seminar!

    addUserToEvent(EventParticipation: EventParticipationInput!): Int!
    removeUserFromEvent(EventParticipation: EventParticipationInput!): Int!

    addUserToEventWaitlist(userID: Int!, eventID: Int!): Int!
    removeUserFromEventWaitlist(userID: Int!, eventID: Int!): Int!

    addUserToSeminar(SeminarParticipation: SeminarParticipationInput!): Int!
    removeUserFromSeminar(SeminarParticipation: SeminarParticipationInput!): Int!

    addUserToSeminarWaitlist(userID: Int!, seminarID: Int!): Int!
    removeUserFromSeminarWaitlist(userID: Int!, seminarID: Int!): Int!

    createEventAnnouncement(announcement: AnnouncementInput!): Announcement!
    createSeminarAnnouncement(announcement: AnnouncementInput!): Announcement!

    editProfile(userID: Int!, user: UserUpdateInput!): User!
   
    editEvent(eventID: Int!, event: EventUpdateInput!): Event!
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, User, Event, Capacity, Seminar, Announcement],
  resolvers: [rootResolvers, mutations]
});

module.exports = { schema };
