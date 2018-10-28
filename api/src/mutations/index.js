<<<<<<< HEAD
const { insertNewEvent, updateEventParticipation } = require("./event");
=======
const { insertNewEvent } = require("./event");
>>>>>>> c2971d69f3a5040a83b5564fc26a7376613ea395
const { insertNewSeminar } = require("./seminar");
const { registerUser } = require("./user");

const mutations = {
  Mutation: {
    async signUp(_, args) {
      const { user } = args;
      try {
        return await registerUser(user);
      } catch (err) {
        console.log(err);
        return new Error("A user with this email already exists");
      }
    },
    async createEvent(_, args) {
      try {
        const { event } = args;
        const newEvent = await insertNewEvent(event);
        return newEvent;
      } catch (err) {
        console.log(err);
        return new Error("Unable to create event");
      }
    },
    async createSeminar(_, args) {
      try {
        const { seminar } = args;
        const newSeminar = await insertNewSeminar(seminar);
        return newSeminar;
      } catch (err) {
        console.log(err);
        return new Error("Unable to create seminar");
      }
<<<<<<< HEAD
    },
    async addUserToEvent(_, args) {
      try {
        const { EventParticipation } = args;
        return await updateEventParticipation(EventParticipation);
      } catch (err) {
        console.log(err);
        return new Error("Unable to add user to event");
      }
    },
    async removeUserFromEvent(_, args) {
      try {
        const { EventParticipation } = args;
        return await updateEventParticipation(EventParticipation, false);
      } catch (err) {
        console.log(err);
        return new Error("Unable to remove user to event");
      }
=======
>>>>>>> c2971d69f3a5040a83b5564fc26a7376613ea395
    }
  }
};

module.exports = { mutations };
