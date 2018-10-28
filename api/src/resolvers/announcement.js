const { db } = require("../db");

async function queryAnnouncementByTypeID(
  id,
  type = "Event",
  offset = null,
  limit = null
) {
  var queryStringEnding = "";
  var vals = [id];
  if (limit) {
    queryStringEnding += "LIMIT ?";
    vals.push(limit);
  }
  if (offset) {
    queryStringEnding += "OFFSET ? ";
    vals.push(offset);
  }

  var queryString = null;

  if (type === "Event") {
    queryString =
      "select * from Event_Announcement where event_id = ? ORDER BY date_modified DESC ";
  } else {
    queryString =
      "select * from Seminar_Announcement where seminar_id = ? ORDER BY date_modified DESC ";
  }

  if (queryStringEnding) {
    queryString += queryStringEnding;
  }

  queryString += ";";
  console.log(queryString);

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

module.exports = { queryAnnouncementByTypeID };
