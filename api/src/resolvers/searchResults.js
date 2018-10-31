const { db } = require("../db");

async function searchEventsAndSeminars(
  searchString,
  type = null,
  limit = null,
  offset = null
) {
  searchTokens = searchString.toLowerCase().split(" ");
  const searchResults = []; // returning to client
  var queryString;
  var whereClause;
  const vals = []; // to give to query db.raw()
  const likeVals = [];

  ``;

  if (!type) {
    queryString = `
    SELECT id AS id, name AS name, creator_id AS creator_id, NULL AS ??,
           description AS description, start_time AS start_time,
           end_time AS end_time, capacity_type AS capacity_type,
           max_capacity AS max_capacity, current_capacity AS current_capacity,
           location AS location, picture_path AS picture_path
    FROM ??`;
    vals.push("event_id", "event");
  } else {
    if (type.toLowerCase() !== "event" && type.toLowerCase() !== "seminar") {
      return new Error("Valid inputs for type are 'event' and 'seminar'");
    }
    queryString = `
    SELECT  *
    FROM ??`;
    vals.push(type);
  }
  whereClause = `WHERE LOWER(name) LIKE '%' || ? || '%'`;
  vals.push(searchTokens[0]);
  likeVals.push(searchTokens[0]);
  searchTokens.shift();

  searchTokens.forEach(token => {
    whereClause = `${whereClause}
      AND LOWER(name) LIKE '%' || ? || '%'`;
    vals.push(token);
    likeVals.push(token);
  });

  queryString = `${queryString} ${whereClause}`;

  if (!type) {
    queryString = `${queryString} UNION ALL
    SELECT id AS id, name AS name, NULL AS ??, event_id AS event_id,
           description AS description, start_time AS start_time,
           end_time AS end_time, capacity_type AS capacity_type,
           max_capacity AS max_capacity, current_capacity AS current_capacity,
           location AS location, picture_path AS picture_path
    FROM ??
    ${whereClause}`;
    vals.push("creator_id", "seminar");
    vals.push(...likeVals);
  }

  queryString = `${queryString} ORDER BY start_time`;

  if (limit) {
    queryString = `${queryString} LIMIT ?`;
    vals.push(limit);
  }
  if (offset) {
    queryString = `${queryString} OFFSET ?`;
    vals.push(offset);
  }
  queryString = `${queryString};`;

  // const temp = db.raw(queryString, vals).toString();
  // console.log(temp);

  const res = await db.raw(queryString, vals);

  res.rows.forEach(searchResult => {
    const eventOrSeminar = {
      id: searchResult.id,
      name: searchResult.name,
      description: searchResult.description,
      start_time: searchResult.start_time,
      end_time: searchResult.end_time,
      capacity_type: searchResult.capacity_type,
      max_capacity: searchResult.max_capacity,
      current_capacity: searchResult.current_capacity,
      location: searchResult.location,
      picture_path: searchResult.picture_path
    };

    if (searchResult.creator_id)
      eventOrSeminar.creator_id = searchResult.creator_id;
    if (searchResult.event_id) eventOrSeminar.event_id = searchResult.event_id;

    searchResults.push(eventOrSeminar);
  });

  return searchResults;
}

async function getTotalCount(type = null) {
  if (!type) {
    return await db
      .raw(
        `SELECT (SELECT COUNT(*) FROM event) +
                (SELECT COUNT(*) FROM seminar)
          AS total;`
      )
      .then(res => {
        return res.rows[0].total;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  } else {
    if (type.toLowerCase() !== "event" && type.toLowerCase() !== "seminar") {
      return new Error("Valid inputs for type are 'event' and 'seminar'");
    }
    return await db
      .raw(`SELECT COUNT(*) AS total from ??;`, [type])
      .then(res => {
        return res.rows[0].total;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = {
  searchEventsAndSeminars,
  getTotalCount
};