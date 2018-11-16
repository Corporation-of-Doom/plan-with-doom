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

async function checkConflicts(userID, eventID, startDateTime, endDateTime) {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  var userEventsAndSeminars = await getMySchedule(
    userID,
    null,
    null,
    null,
    "ATTENDING"
  );

  for (var i = 0; i < userEventsAndSeminars.length; i++) {
    if (eventID && userEventsAndSeminars[i].id === eventID) continue;

    var currStart = new Date(userEventsAndSeminars[i].start_time);
    var currEnd = new Date(userEventsAndSeminars[i].end_time);

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

module.exports = { signIn, searchUsers, checkConflicts };
