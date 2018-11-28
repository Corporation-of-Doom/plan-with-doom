const bcrypt = require("bcrypt");
const { db } = require("../db");
const { getUser, getFollowers, getFollowing } = require("../resolvers/user");

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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`;

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

  const { id } = res.rows[0];

  new_user = await getUser(id);
  new_user.followers = await getFollowers(id);
  new_user.following = await getFollowing(id);

  // TODO: send email verification
  return new_user;
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

  await db.raw(queryString, vals);
  new_user = await getUser(userID);
  new_user.followers = await getFollowers(userID);
  new_user.following = await getFollowing(userID);
  return new_user;
}

async function updateUserFollowing(userID, followingID, follow = true) {
  // check valid userid
  // validfollowingID
  user = await getUser(userID);
  followee = await getUser(followingID);
  const vals = [userID, followingID];
  var queryString = null;

  // check if already following
  // can't unfollow somone you're not following
  // can't refollow someone

  // check if following/unfollowing
  if (follow) {
    queryString = ` INSERT INTO user_following (user_id, following_user_id) VALUES (?,?)`;
  } else {
    queryString = ` delete from user_following where (user_id = ? and following_user_id = ?)`;
  }

  await db.raw(queryString, vals);

  user = await getUser(userID);
  user.followers = await getFollowers(userID);
  user.following = await getFollowing(userID);

  return user;
}

module.exports = { registerUser, editUserProfile, updateUserFollowing };
