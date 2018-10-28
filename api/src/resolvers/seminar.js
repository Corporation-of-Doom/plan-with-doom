const { db } = require("../db");

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

async function searchSeminars(searchString, limit = null, offset = null) {
  searchTokens = searchString.toLowerCase().split(" ");
  const seminars = [];

  let queryString = `
    SELECT  *
    FROM seminar
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

  res.rows.forEach(seminar => {
    seminars.push({
      id: seminar.id,
      event_id: seminar.event_id,
      name: seminar.name,
      description: seminar.description,
      start_time: seminar.start_time,
      end_time: seminar.end_time,
      capacity_type: seminar.capacity_type,
      max_capacity: seminar.max_capacity,
      current_capacity: seminar.current_capacity,
      location: seminar.location,
      picture_path: seminar.picture_path
    });
  });

  return seminars;
}

module.exports = { querySeminarByID, searchSeminars };
