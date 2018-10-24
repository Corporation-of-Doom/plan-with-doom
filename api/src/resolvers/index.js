const { signIn } = require("./user");

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
  }
};

module.exports = { rootResolvers };
