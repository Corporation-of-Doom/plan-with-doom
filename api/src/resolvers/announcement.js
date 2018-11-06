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
// TODO: add functionality for filtering by following/attending + event/seminar
async function queryMyAnnouncements(
  id,
  type = null,
  offset = null,
  limit = null
) {
  const results = [];
  var queryStringEnding = "";
  var vals = [id, id];
  if (limit) {
    queryStringEnding += "LIMIT ?";
    vals.push(limit);
  }
  if (offset) {
    queryStringEnding += "OFFSET ? ";
    vals.push(offset);
  }

  var queryString = `SELECT *, 'event_type' as type FROM (Event_Announcement inner join Event_Participation on Event_Announcement.event_id = Event_Participation.event_id ) inner join Event on Event.id = Event_Participation.event_id  where user_id = ? and ("attending" = true or "following" = true) 
union
SELECT *, 'seminar_type' as type FROM(Seminar_Announcement inner join Seminar_Participation on Seminar_Announcement.seminar_id = Seminar_Participation.seminar_id) inner join seminar on seminar.id = Seminar_Participation.seminar_id where user_id = ? and("attending" = true or "following" = true) order by date_modified desc 
`;

  if (queryStringEnding) {
    queryString += queryStringEnding;
  }

  queryString += ";";

  const res = await db.raw(queryString, vals);

  res.rows.forEach(result => {
    const announcement = {
      id: result.id,
      event_id: result.type_id,
      message: result.message,
      date_created: result.date_created,
      date_modified: result.date_modified,
      type: result.type,
      name: result.name
    };

    results.push(announcement);
  });

  return results;
}

module.exports = { queryAnnouncementByTypeID, queryMyAnnouncements };
