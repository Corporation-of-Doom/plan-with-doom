const { createEvent } = require("./event");
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
				const newEvent = await createEvent(event);
				return newEvent;
			} catch (err) {
				console.log(err);
				return new Error("Unable to create event");
			}
		}
	}
};

module.exports = { mutations };
