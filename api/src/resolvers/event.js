const { db } = require("../db");

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

async function searchEvents(searchString, limit = null, offset = null) {
  searchTokens = searchString.toLowerCase().split(" ");
  const events = [];

  let queryString = `
    SELECT  *
    FROM event
    WHERE LOWER(name) LIKE '%' || ? || '%'`;
  const vals = [searchTokens[0]];
  searchTokens.pop();

  searchTokens.forEach(token => {
    queryString = `${queryString}
      AND LOWER(name) LIKE '%' || ? || '%'`;
    vals.push(token);
  });

  if (limit) {
    queryString = `${queryString} LIMIT ?`;
    vals.push(limit);
  }
  if (offset) {
    queryString = `${queryString} OFFSET ?`;
    vals.push(offset);
  }
  queryString = `${queryString};`;

  const res = await db.raw(queryString, vals);

  res.rows.forEach(event => {
    events.push({
      id: event.id,
      creator_id: event.creator_id,
      name: event.name,
      description: event.description,
      start_time: event.start_time,
      end_time: event.end_time,
      capacity_type: event.capacity_type,
      max_capacity: event.max_capacity,
      current_capacity: event.current_capacity,
      location: event.location,
      picture_path: event.picture_path
    });
  });

  return events;
}

/*async function getMyEvents(user_id, event_type = null) {
  var querystring;
  if (event_type) {
  } else {
    querystring = "select * from Event where id = ?;";
  }
  return await db
    .raw(querystring, [id])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

*/
module.exports = { queryEventByID, searchEvents };
