const { db } = require("../db");
const { querySeminarsByEventID } = require("./seminar");
const { queryAnnouncementByTypeID } = require("./announcement");
const { queryOrganizerByTypeID } = require("./searchResults");
async function queryEventByID(id) {
  return await db
    .raw("select * from Event where id = ?;", [id])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

async function getEventByID(id) {
  try {
    const newEvent = await queryEventByID(id);
    newEvent.announcements = await queryAnnouncementByTypeID(id, "Event");
    newEvent.organizers = await queryOrganizerByTypeID(id, "Event");
    newEvent.seminars = await querySeminarsByEventID(id);
    return newEvent;
  } catch (err) {
    console.log(err);
    return new Error("Unable to retrieve event");
  }
}

module.exports = { queryEventByID, getEventByID };
