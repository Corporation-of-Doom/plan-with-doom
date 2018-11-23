const { db } = require("../db");
const bcrypt = require("bcrypt");

async function signIn(emailToFind, password) {
  // check if email exists
  const res = await db.raw("SELECT * FROM doom_user WHERE email = ?", [
    emailToFind
  ]);
  if (!res.rows.length) throw new Error("No user with this email");

  // TODO: check if account registration email has been verified

  const {
    password_hash: hashedPassword,
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
  } = res.rows[0];

  // check if password is correct
  if (bcrypt.compareSync(password, hashedPassword)) {
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
      privacy_settings
    };
  }

  throw new Error("Incorrect password");
}

async function searchUsers(searchString) {
  searchTokens = searchString.toLowerCase().split(" ");
  const users = [];

  let queryString = `
    SELECT  *
    FROM doom_user
    WHERE (LOWER(first_name) LIKE '%' || ? || '%' OR
           LOWER(middle_name) LIKE '%' || ? || '%' OR
           LOWER(last_name) LIKE '%' || ? || '%')`;
  const vals = [searchTokens[0], searchTokens[0], searchTokens[0]];
  searchTokens.shift();

  searchTokens.forEach(token => {
    queryString = `${queryString}
      AND (LOWER(first_name) LIKE '%' || ? || '%' OR
       LOWER(middle_name) LIKE '%' || ? || '%' OR
       LOWER(last_name) LIKE '%' || ? || '%')`;
    vals.push(token, token, token);
  });
  queryString = `${queryString};`;
  const res = await db.raw(queryString, vals);

  res.rows.forEach(user => {
    users.push({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      middle_name: user.middle_name,
      email: user.email,
      organization: user.organization,
      linked_in: user.linked_in,
      facebook: user.facebook,
      instagram: user.instagram,
      twitter: user.twitter,
      phone_number: user.phone_number,
      privacy_settings: user.privacy_settings
    });
  });

  return users;
}

async function isAttendingEvent(userid, eventid) {
  // Checks the Eventparticipation  table to see if user is attending the given event
  var queryString = null;
  queryString = `SELECT attending FROM event_participation WHERE event_id = ? AND user_id = ? LIMIT 1;`;
  vals = [eventid, userid];

  const res = await db.raw(`${queryString}`, vals);
  if (res.rows.length) {
    return res.rows[0].attending;
  } else {
    return false;
  }
}

async function alreadyAttendingEvent(userid, eventid) {
  //Will throw error is the user is already attending the Event
  if (await isAttendingEvent(userid, eventid)) {
    throw new Error(
      "User:" + userid + " is already attending Event:" + eventid
    );
  }
}

async function isAttendingSeminar(userid, seminarid) {
  // Checks the seminar participation  table to see if user is attending the given seminarid
  var queryString = null;
  queryString = `SELECT attending FROM seminar_participation WHERE seminar_id = ? AND user_id = ? LIMIT 1;`;
  vals = [seminarid, userid];

  const res = await db.raw(`${queryString}`, vals);
  if (res.rows.length) {
    return res.rows[0].attending;
  } else {
    return false;
  }
}

async function alreadyAttendingSeminar(userid, seminarid) {
  //Will throw error is the user is already attending the seminar
  if (await isAttendingSeminar(userid, seminarid)) {
    throw new Error(
      "User:" + userid + " is already attending Seminar:" + seminarid
    );
  }
}

module.exports = {
  signIn,
  searchUsers,
  isAttendingEvent,
  alreadyAttendingEvent,
  isAttendingSeminar,
  alreadyAttendingSeminar
};
