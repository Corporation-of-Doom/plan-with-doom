const { signIn, searchUsers } = require("./user");
const { queryEventByID } = require("./event");
const { querySeminarByID, querySeminarsByEventID } = require("./seminar");
const {
  queryAnnouncementByTypeID,
  queryMyAnnouncements
} = require("./announcement");
const {
  searchEventsAndSeminars,
  getTotalCount,
  getMySchedule,
  queryOrganizerByTypeID,
  getMyManagingSchedule
} = require("./searchResults");

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
        newEvent.organizers = await queryOrganizerByTypeID(
          id,
          "Event",
          offset,
          limit
        );
        newEvent.seminars = await querySeminarsByEventID(id, offset, limit);
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
        newSeminar.organizers = await queryOrganizerByTypeID(
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
    },
    async getMyEventsAndSeminars(_, args) {
      const { userID, type, limit, offset, participationType } = args;
      try {
        return await getMySchedule(
          userID,
          type,
          limit,
          offset,
          participationType
        );
      } catch (err) {
        console.log(err);
        if (!type) return new Error("Unable to My Events and My Seminars.");
        return new Error(`Unable to get My ${type}s.`);
      }
    },
    async getMyManagingEventsAndSeminars(_, args) {
      const { userID, type, limit, offset } = args;
      try {
        return await getMyManagingSchedule(userID, type, limit, offset);
      } catch (err) {
        console.log(err);
        if (!type)
          return new Error("Unable to Managing Events and Managing Seminars.");
        return new Error(`Unable to get Managing ${type}s.`);
      }
    },
    async getMyAnnouncements(_, args) {
      try {
        const { userID, type, offset, limit } = args;
        const announcements = await queryMyAnnouncements(
          userID,
          type,
          offset,
          limit
        );
        return announcements;
      } catch (err) {
        console.log(err);
        return new Error("Unable to retrieve announcements");
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
    phone_number: ({ phone_number }) => phone_number,
    about_me: ({ about_me }) => about_me
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
    announcements: ({ announcements }) => announcements,
    organizers: ({ organizers }) => organizers,
    seminars: ({ seminars }) => seminars
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
    announcements: ({ announcements }) => announcements,
    organizers: ({ organizers }) => organizers
  },
  Announcement: {
    id: ({ id }) => id,
    type_name: ({ type_name }) => type_name,
    type_id: ({ type_id }) => type_id,
    message: ({ message }) => message,
    date_created: ({ date_created }) => date_created,
    date_modified: ({ date_modified }) => date_modified,
    type: ({ type }) => type
  }
};

module.exports = { rootResolvers };
