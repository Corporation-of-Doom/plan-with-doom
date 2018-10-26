const { signIn, searchUsers } = require("./user");
const { getEvent } = require("./event");
const { getSeminar } = require("./seminar");

const rootResolvers = {
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
    async getEvent(_, args) {
      try {
        const { id } = args;
        const newEvent = await getEvent(event);
        return newEvent;
      } catch (err) {
        console.log(err);
        return new Error("Unable to retrieve event");
      }
    },
    async getSeminar(_, args) {
      try {
        const { id } = args;
        const newSeminar = await getSeminar(seminar);
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
    picture_path: ({ picture_path }) => picture_path
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
    picture_path: ({ picture_path }) => picture_path
  }
};

module.exports = { rootResolvers };
