require("dotenv").config();

const {
  DEV_DB: database,
  DEV_DB_USER: user,
  DEV_DB_PASSWORD: password,
  DEV_DB_HOST: host,
  DEV_DB_PORT: port
} = process.env;

const options = {
  client: "pg",
  connection: {
    host,
    port,
    user,
    password,
    database
  }
};

const db = require("knex")(options);

module.exports = { db };
