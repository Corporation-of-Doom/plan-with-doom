const { db } = require("../db");
const bcrypt = require("bcrypt");
const { getMySchedule } = require("./searchResults");

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
    privacy_settings,
    about_me,
    picture_path
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
      privacy_settings,
      about_me,
      picture_path
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
      privacy_settings: user.privacy_settings,
      about_me: user.about_me,
      picture_path: user.picture_path
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

async function checkConflicts(userID, type, startDateTime, endDateTime) {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  let userEventsOrSeminars;

  if (type.toLowerCase() === "event") {
    userEventsOrSeminars = await getMySchedule(
      userID,
      "event",
      null,
      null,
      "ATTENDING"
    );
  } else if (type.toLowerCase() === "seminar") {
    userEventsOrSeminars = await getMySchedule(
      userID,
      "seminar",
      null,
      null,
      "ATTENDING"
    );
  }

  for (var i = 0; i < userEventsOrSeminars.length; i++) {
    var currStart = new Date(userEventsOrSeminars[i].start_time);
    var currEnd = new Date(userEventsOrSeminars[i].end_time);

    if (
      (currStart >= start && currStart <= end) ||
      (currEnd >= start && currEnd <= end)
    ) {
      // conflict found
      return true;
    } else if (
      (start >= currStart && start <= currEnd) ||
      (end >= currStart && end <= currEnd)
    ) {
      // conflict found
      return true;
    }
  }

  // no conflict found
  return false;
}

async function getUser(userID) {
  const queryString = `SELECT * from doom_user WHERE id = ?;`;
  const res = await db.raw(queryString, [userID]);

  if (!res.rows.length) return null;

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
    about_me: res.rows[0].about_me
  };
}

module.exports = {
  signIn,
  searchUsers,
  checkConflicts,
  getUser,
  isAttendingEvent,
  alreadyAttendingEvent,
  isAttendingSeminar,
  alreadyAttendingSeminar
};
