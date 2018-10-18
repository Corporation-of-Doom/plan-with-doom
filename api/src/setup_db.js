require("dotenv").config();
const pgtools = require("pgtools");

const {
  DEV_DB: db_name,
  DEV_DB_USER: user,
  DEV_DB_PASSWORD: password,
  DEV_DB_PORT: port,
  DEV_DB_HOST: host
} = process.env;

const config = {
  user,
  password,
  port,
  host
};

pgtools.createdb(config, db_name, function(err, res) {
  if (err) {
    console.error(err);
    process.exit(0);
  }
  console.log(res);
});
