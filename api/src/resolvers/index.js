const { getUser } = require("./user");

const rootResolvers = {
  Query: {
    async user(_, args) {
      const id = args.id;
      const res = await getUser(id);

      return res[0];
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
    capacity: ({ capacity }) => capacity,
    location: ({ location }) => location,
    picture_path: ({ picture_path }) => picture_path
  }
};

module.exports = { rootResolvers };
