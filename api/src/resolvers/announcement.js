const { db } = require("../db");

async function queryAnnouncementByTypeID(
  id,
  type = "Event",
  offset = null,
  limit = null
) {
  var queryStringEnding = "";
  var vals = [id];
  const results = [];
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
      "SELECT Event_Announcement.event_id as type_id, Event_Announcement.id as id,Event_Announcement.message as message, Event_Announcement.date_created as date_created, Event_Announcement.date_modified as date_modified, Event.name as type_name, 'event_type' as type FROM(Event_Announcement INNER JOIN Event ON Event_Announcement.event_id = Event.id) WHERE Event_Announcement.event_id = ? ORDER BY date_modified DESC; ";
  } else {
    queryString =
      "SELECT Seminar_Announcement.seminar_id as type_id, Seminar_Announcement.id as id,Seminar_Announcement.message as message, Seminar_Announcement.date_created as date_created, Seminar_Announcement.date_modified as date_modified, Seminar.name as type_name, 'event_type' as type FROM(Seminar_Announcement INNER JOIN Seminar ON Seminar_Announcement.seminar_id = Seminar.id) WHERE Seminar_Announcement.seminar_id = ? ORDER BY date_modified DESC; ";
  }

  if (queryStringEnding) {
    queryString += queryStringEnding;
  }

  queryString += ";";

  console.log(queryString);

  const res = await db.raw(queryString, vals);

  res.rows.forEach(result => {
    const announcement = {
      id: result.id,
      type_id: result.type_id,
      message: result.message,
      date_created: result.date_created,
      date_modified: result.date_modified,
      type: result.type,
      type_name: result.type_name
    };

    results.push(announcement);
  });

  return results;
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

  var queryString = `
SELECT Event_Announcement.event_id as type_id, Event_Announcement.id as id,Event_Announcement.message as message, 
    Event_Announcement.date_created as date_created, Event_Announcement.date_modified as date_modified, Event.name as type_name,'event_type' as type 
	FROM (Event_Announcement INNER JOIN Event_Participation ON Event_Announcement.event_id = Event_Participation.event_id ) 
		INNER JOIN Event ON Event.id = Event_Participation.event_id  
	WHERE user_id = ? AND ("attending" = true or "following" = true) 
UNION
SELECT Seminar_Announcement.seminar_id as type_id, Seminar_Announcement.id as id,Seminar_Announcement.message as message, 
    Seminar_Announcement.date_created as date_created, Seminar_Announcement.date_modified as date_modified, Seminar.name as type_name, 'seminar_type' as type 
	FROM(Seminar_Announcement INNER JOIN Seminar_Participation ON Seminar_Announcement.seminar_id = Seminar_Participation.seminar_id) 
		INNER JOIN seminar ON seminar.id = Seminar_Participation.seminar_id 
	WHERE user_id = ? AND("attending" = true or "following" = true) 
    
order by date_modified desc 
  `;

  if (queryStringEnding) {
    queryString += queryStringEnding;
  }

  queryString += ";";

  const res = await db.raw(queryString, vals);

  res.rows.forEach(result => {
    const announcement = {
      id: result.id,
      type_id: result.type_id,
      message: result.message,
      date_created: result.date_created,
      date_modified: result.date_modified,
      type: result.type,
      type_name: result.type_name
    };

    results.push(announcement);
  });

  return results;
}

module.exports = { queryAnnouncementByTypeID, queryMyAnnouncements };
