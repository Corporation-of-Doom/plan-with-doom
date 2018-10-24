const { createEvent } = require("./event");

const mutations = {
	Mutation: {
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
