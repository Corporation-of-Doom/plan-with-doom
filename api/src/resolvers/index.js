const { signIn, searchUsers } = require("./user");
const { queryEventByID } = require("./event");
const { querySeminarByID } = require("./seminar");
const { queryAnnouncementByTypeID } = require("./announcement");
const { searchEventsAndSeminars, getTotalCount } = require("./searchResults");

const rootResolvers = {
  SearchResult: {
    __resolveType(obj) {
      if (obj.creator_id) {
        return "Event";
      }
      return "Seminar";
    }
  },
  Query: {
    async login(_, args) {
      const { email, password } = args;
      try {
        const user = await signIn(email, password);
        return user;
      } catch (err) {
        console.log(err);
        return new Error("Incorrect password or email");
      }
    },
    async getTotal(_, args) {
      const { type } = args;
      try {
        return await getTotalCount(type);
      } catch (err) {
        console.log(err);
        if (!type)
          return new Error("Could not get total number of events and seminar");
        return new Error(`Could not get total number of ${type}s`);
      }
    },
    async getTotalSearchResults(_, args) {
      const { searchString, type } = args;
      try {
        const searchResults = await searchEventsAndSeminars(searchString, type);
        return searchResults.length;
      } catch (err) {
        console.log(err);
        if (!type)
          return new Error(
            "Could not get total number of search results for events and seminar"
          );
        return new Error(
          `Could not get total number of search results for ${type}s`
        );
      }
    },
    async getEventByID(_, args) {
      try {
        const { id, offset, limit } = args;
        const newEvent = await queryEventByID(id);
        newEvent.announcements = await queryAnnouncementByTypeID(
          id,
          "Event",
          offset,
          limit
        );
        return newEvent;
      } catch (err) {
        console.log(err);
        return new Error("Unable to retrieve event");
      }
    },
    async getSeminarByID(_, args) {
      try {
        const { id, offset, limit } = args;
        const newSeminar = await querySeminarByID(id);
        newSeminar.announcements = await queryAnnouncementByTypeID(
          id,
          "Seminar",
          offset,
          limit
        );
        return newSeminar;
      } catch (err) {
        console.log(err);
        return new Error("Unable to retrieve seminar");
      }
    },
    async searchUsersByName(_, args) {
      const { searchString } = args;
      try {
        return await searchUsers(searchString);
      } catch (err) {
        console.log(err);
        return new Error("Unable to search users");
      }
    },
    async searchByName(_, args) {
      const { searchString, type, limit, offset } = args;
      try {
        return await searchEventsAndSeminars(searchString, type, limit, offset);
      } catch (err) {
        console.log(err);
        if (!type) return new Error("Unable to search events and seminars.");
        return new Error(`Unable to search ${type}s.`);
      }
    }
  },
  User: {
    id: ({ id }) => id,
    email: ({ email }) => email,
    first_name: ({ first_name }) => first_name,
    last_name: ({ last_name }) => last_name,
    middle_name: ({ middle_name }) => middle_name,
    privacy_settings: ({ privacy_settings }) => privacy_settings,
    organization: ({ organization }) => organization,
    linked_in: ({ linked_in }) => linked_in,
    twitter: ({ twitter }) => twitter,
    facebook: ({ facebook }) => facebook,
    instagram: ({ instagram }) => instagram,
    phone_number: ({ phone_number }) => phone_number
  },
  Event: {
    id: ({ id }) => id,
    creator_id: ({ creator_id }) => creator_id,
    name: ({ name }) => name,
    description: ({ description }) => description,
    start_time: ({ start_time }) => start_time,
    end_time: ({ end_time }) => end_time,
    capacity_type: ({ capacity_type }) => capacity_type,
    max_capacity: ({ max_capacity }) => max_capacity,
    current_capacity: ({ current_capacity }) => current_capacity,
    location: ({ location }) => location,
    picture_path: ({ picture_path }) => picture_path,
    announcements: ({ announcements }) => announcements
  },
  Seminar: {
    id: ({ id }) => id,
    event_id: ({ event_id }) => event_id,
    name: ({ name }) => name,
    description: ({ description }) => description,
    start_time: ({ start_time }) => start_time,
    end_time: ({ end_time }) => end_time,
    capacity_type: ({ capacity_type }) => capacity_type,
    max_capacity: ({ max_capacity }) => max_capacity,
    current_capacity: ({ current_capacity }) => current_capacity,
    location: ({ location }) => location,
    picture_path: ({ picture_path }) => picture_path,
    announcements: ({ announcements }) => announcements
  }
};

module.exports = { rootResolvers };
