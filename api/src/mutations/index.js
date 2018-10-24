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
    }
  }
};

module.exports = { mutations };
