const bcrypt = require("bcrypt");
const { db } = require("../db");

function createSalt(len = 16) {
  return bcrypt.genSaltSync(len);
}

function hashPassword(rawPassword, salt) {
  return bcrypt.hashSync(rawPassword, salt);
}

async function registerUser(user) {
  const {
    email,
    password,
    first_name,
    last_name,
    middle_name,
    organization,
    linked_in,
    twitter,
    facebook,
    instagram,
    phone_number,
    privacy_settings
  } = user;

  const salt = createSalt();
  const hashedPassword = hashPassword(password, salt);
  let queryStringStart = `
    INSERT INTO doom_user
      (first_name, last_name, email, privacy_settings, password_hash, password_salt
  `;
  let queryStringEnd = `values (?, ?, ?, ?, ?, ?`;
  const vals = [
    first_name,
    last_name,
    email,
    privacy_settings,
    hashedPassword,
    salt
  ];

  if (middle_name) {
    queryStringStart = `${queryStringStart}, middle_name`;
    queryStringEnd = `${queryStringEnd}, ?`;
    vals.push(middle_name);
  }
  if (organization) {
    queryStringStart = `${queryStringStart}, organization`;
    queryStringEnd = `${queryStringEnd}, ?`;
    vals.push(organization);
  }
  if (linked_in) {
    queryStringStart = `${queryStringStart}, linked_in`;
    queryStringEnd = `${queryStringEnd}, ?`;
    vals.push(linked_in);
  }
  if (twitter) {
    queryStringStart = `${queryStringStart}, twitter`;
    queryStringEnd = `${queryStringEnd}, ?`;
    vals.push(twitter);
  }
  if (facebook) {
    queryStringStart = `${queryStringStart}, facebook`;
    queryStringEnd = `${queryStringEnd}, ?`;
    vals.push(facebook);
  }
  if (instagram) {
    queryStringStart = `${queryStringStart}, instagram`;
    queryStringEnd = `${queryStringEnd}, ?`;
    vals.push(instagram);
  }
  if (phone_number) {
    queryStringStart = `${queryStringStart}, phone_number`;
    queryStringEnd = `${queryStringEnd}, ?`;
    vals.push(phone_number);
  }

  queryStringStart = `${queryStringStart})`;
  queryStringEnd = `${queryStringEnd}) RETURNING id;`;

  const res = await db.raw(`${queryStringStart} ${queryStringEnd}`, vals);

  const { id } = res.rows[0];
  const newUser = {
    id,
    email,
    first_name,
    middle_name,
    last_name,
    organization,
    linked_in,
    twitter,
    facebook,
    instagram,
    phone_number,
    privacy_settings
  };

  // TODO: send email verification

  return newUser;
}

module.exports = { registerUser };
