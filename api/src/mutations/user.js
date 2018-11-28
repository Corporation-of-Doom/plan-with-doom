const bcrypt = require("bcrypt");
const { db } = require("../db");
const { getUser } = require("../resolvers/user");

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
    about_me,
    picture_path
  } = user;

  middle_name = middle_name || null;
  organization = organization || null;
  linked_in = linked_in || null;
  twitter = twitter || null;
  facebook = facebook || null;
  instagram = instagram || null;
  phone_number = phone_number || null;
  picture_path = picture_path || null;
  about_me = about_me || null;

  const salt = createSalt();
  const hashedPassword = hashPassword(password, salt);

  const queryString = `
    INSERT INTO doom_user
      (first_name, last_name, email, privacy_settings, password_hash,
       middle_name, organization, linked_in, twitter, facebook,
       instagram, phone_number, about_me, picture_path)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id, landing_page, menu_orientation;`;

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
    about_me,
    picture_path
  ];

  const res = await db.raw(`${queryString}`, vals);

  const { id, landing_page, menu_orientation } = res.rows[0];
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
    about_me,
    picture_path,
    landing_page,
    menu_orientation
  };
}

async function editUserProfile(userID, user) {
  if (Object.keys(user).length === 0) return getUser(userID);

  let queryString = `UPDATE doom_user SET`;
  let first = 1;
  const vals = [];

  for (var key in user) {
    if (user[key] !== null) {
      if (!first) queryString = `${queryString}, `;
      first = 0;
      queryString = `${queryString} ${key} = ?`;
      vals.push(user[key]);
    }
  }
  vals.push(userID);

  queryString = `${queryString} WHERE id = ? RETURNING *;`;

  const res = await db.raw(queryString, vals);

  return {
    id: res.rows[0].id,
    first_name: res.rows[0].first_name,
    middle_name: res.rows[0].middle_name,
    last_name: res.rows[0].last_name,
    email: res.rows[0].email,
    organization: res.rows[0].organization,
    linked_in: res.rows[0].linked_in,
    facebook: res.rows[0].facebook,
    instagram: res.rows[0].instagram,
    twitter: res.rows[0].twitter,
    phone_number: res.rows[0].phone_number,
    privacy_settings: res.rows[0].privacy_settings,
    picture_path: res.rows[0].picture_path,
    about_me: res.rows[0].about_me,
    landing_page: res.rows[0].landing_page,
    menu_orientation: res.rows[0].menu_orientation
  };
}

module.exports = { registerUser, editUserProfile };
