const {
  insertNewEvent,
  updateEventParticipation,
  updateEventWaitlist
} = require("./event");
const {
  insertNewSeminar,
  updateSeminarParticipation,
  updateSeminarWaitlist
} = require("./seminar");
const {
  registerUser,
  editUserProfile,
  updateUserFollowing
} = require("./user");
const { insertNewAnnouncement } = require("./announcement");

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
        return new Error("Unable to remove user from event");
      }
    },
    async addUserToEventWaitlist(_, args) {
      try {
        const { userID, eventID } = args;
        return await updateEventWaitlist(userID, eventID);
      } catch (err) {
        console.log(err);
        return new Error("Unable to add user to event waitlist");
      }
    },
    async removeUserFromEventWaitlist(_, args) {
      try {
        const { userID, eventID } = args;
        return await updateEventWaitlist(userID, eventID, false);
      } catch (err) {
        console.log(err);
        return new Error("Unable to remove user from event waitlist");
      }
    },
    async addUserToSeminarWaitlist(_, args) {
      try {
        const { userID, seminarID } = args;
        return await updateSeminarWaitlist(userID, seminarID);
      } catch (err) {
        console.log(err);
        return new Error("Unable to add user to seminar waitlist");
      }
    },
    async removeUserFromSeminarWaitlist(_, args) {
      try {
        const { userID, seminarID } = args;
        return await updateSeminarWaitlist(userID, seminarID, false);
      } catch (err) {
        console.log(err);
        return new Error("Unable to remove user from seminar waitlist");
      }
    },
    async addUserToSeminar(_, args) {
      try {
        const { SeminarParticipation } = args;
        return await updateSeminarParticipation(SeminarParticipation);
      } catch (err) {
        console.log(err);
        return new Error("Unable to add user to Seminar");
      }
    },
    async removeUserFromSeminar(_, args) {
      try {
        const { SeminarParticipation } = args;
        return await updateSeminarParticipation(SeminarParticipation, false);
      } catch (err) {
        console.log(err);
        return new Error("Unable to remove user from Seminar");
      }
    },
    async createEventAnnouncement(_, args) {
      try {
        const { announcement } = args;
        const newAnnouncement = await insertNewAnnouncement(announcement);
        return newAnnouncement;
      } catch (err) {
        console.log(err);
        return new Error("Unable to create event announcement");
      }
    },
    async createSeminarAnnouncement(_, args) {
      try {
        const { announcement } = args;
        const newAnnouncement = await insertNewAnnouncement(
          announcement,
          "Seminar"
        );
        return newAnnouncement;
      } catch (err) {
        console.log(err);
        return new Error("Unable to create seminar announcement");
      }
    },
    async editProfile(_, args) {
      const { userID, user } = args;
      try {
        const updatedUser = await editUserProfile(userID, user);
        return updatedUser;
      } catch (err) {
        console.log(err);
        return new Error("Unable to update user profile");
      }
    },
    async followUser(_, args) {
      try {
        const { userID, followingID } = args;
        return await updateUserFollowing(userID, followingID);
      } catch (err) {
        console.log(err);
        return new Error("Unable to follow user");
      }
    },
    async unfollowUser(_, args) {
      try {
        const { userID, followingID } = args;
        return await updateUserFollowing(userID, followingID, false);
      } catch (err) {
        console.log(err);
        return new Error("Unable to unfollow user");
      }
    }
  }
};

module.exports = { mutations };
