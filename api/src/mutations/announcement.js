const { db } = require("../db");

async function insertNewAnnouncement(announcementInput, type = "Event") {
  let { type_id, message } = announcementInput;
  var queryString = null;

  if (type === "Event") {
    queryString = `INSERT INTO Event_Announcement (event_id, message, date_created, date_modified)
    VALUES (?, ?, ?, ?) RETURNING id;`;
  } else {
    queryString = `INSERT INTO Seminar_Announcement (seminar_id, message, date_created, date_modified) 
    VALUES (?, ?, ?, ?) RETURNING id;`;
  }

  const date_created = (date_modified = new Date());

  const vals = [type_id, message, date_created, date_modified];

  const res = await db.raw(`${queryString}`, vals);
  const { id } = res.rows[0];

  return {
    type_id,
    message,
    date_created,
    date_modified,
    id
  };
}

module.exports = {
  insertNewAnnouncement
};
