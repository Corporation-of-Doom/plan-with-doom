const bcrypt = require("bcrypt");
const { db } = require("../db");

function createSalt(len = 12) {
  return bcrypt.genSaltSync(len);
}

function hashPassword(rawPassword, salt) {
  return bcrypt.hashSync(rawPassword, salt);
}

async function registerUser(user) {
  let {
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
    privacy_settings,
    about_me
  } = user;

  middle_name = middle_name || null;
  organization = organization || null;
  linked_in = linked_in || null;
  twitter = twitter || null;
  facebook = facebook || null;
  instagram = instagram || null;
  phone_number = phone_number || null;

  const salt = createSalt();
  const hashedPassword = hashPassword(password, salt);

  const queryString = `
    INSERT INTO doom_user
      (first_name, last_name, email, privacy_settings, password_hash,
       middle_name, organization, linked_in, twitter, facebook,
       instagram, phone_number, about_me)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id;`;

  const vals = [
    first_name,
    last_name,
    email,
    privacy_settings,
    hashedPassword,
    middle_name,
    organization,
    linked_in,
    twitter,
    facebook,
    instagram,
    phone_number,
    about_me
  ];

  const res = await db.raw(`${queryString}`, vals);

  const { id } = res.rows[0];
  // TODO: send email verification

  return {
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
    privacy_settings,
    about_me
  };
}

module.exports = { registerUser };
