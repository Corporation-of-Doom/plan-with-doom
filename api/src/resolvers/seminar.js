const { db } = require("../db");
const { queryAnnouncementByTypeID } = require("./announcement");
const { queryOrganizerByTypeID } = require("./searchResults");

async function querySeminarByID(id) {
  return await db
    .raw("select * from Seminar where id = ?;", [id])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

async function querySeminarsByEventID(id, offset = null, limit = null) {
  var queryStringEnding = "";
  var vals = [id];
  if (limit) {
    queryStringEnding += "LIMIT ? ";
    vals.push(limit);
  }
  if (offset) {
    queryStringEnding += "OFFSET ? ";
    vals.push(offset);
  }

  var queryString = "select * from Seminar where event_id = ? ";

  if (queryStringEnding) {
    queryString += queryStringEnding;
  }

  queryString += ";";

  return await db
    .raw(queryString, vals)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

async function getSeminarByID(id) {
  try {
    const newSeminar = await querySeminarByID(id);
    newSeminar.announcements = await queryAnnouncementByTypeID(id, "Seminar");
    newSeminar.organizers = await queryOrganizerByTypeID(id, "Seminar");
    return newSeminar;
  } catch (err) {
    console.log(err);
    return new Error("Unable to retrieve seminar");
  }
}

module.exports = { querySeminarByID, querySeminarsByEventID, getSeminarByID };
