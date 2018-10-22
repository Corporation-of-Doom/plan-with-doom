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
  }
};

module.exports = { rootResolvers };
