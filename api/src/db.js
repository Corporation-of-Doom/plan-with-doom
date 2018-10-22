require("dotenv").config();

const {
  DEV_DB: db_name,
  DEV_DB_USER: user,
  DEV_DB_PASSWORD: password,
  DEV_DB_PORT: port,
  DEV_DB_HOST: host
} = process.env;

const options = {
  client: "pg",
  connection: {
    host,
    user,
    password,
    database: db_name
  }
};

const db = require("knex")(options);

module.exports = { db };
