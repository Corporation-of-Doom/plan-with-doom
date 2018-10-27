const { insertNewEvent } = require("./event");
const { createSeminar } = require("./seminar");
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
				const newSeminar = await createSeminar(seminar);
				return newSeminar;
			} catch (err) {
				console.log(err);
				return new Error("Unable to create seminar");
			}
		}
	}
};

module.exports = { mutations };
