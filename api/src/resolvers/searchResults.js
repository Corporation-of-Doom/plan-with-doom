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

  queryString = `${queryString} ORDER BY start_time DESC`;

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

async function getMySchedule(
  userID,
  type = null,
  limit = null,
  offset = null,
  participationType = null
) {
  if (
    type &&
    type.toLowerCase() !== "event" &&
    type.toLowerCase() !== "seminar"
  ) {
    return new Error("Valid inputs for type are 'event' and 'seminar'");
  }

  const results = [];
  const vals = [];
  var queryString = `
  SELECT ??.id AS id, ??.name AS name,
         ??.description AS description, ??.start_time AS start_time,
         ??.end_time AS end_time, ??.capacity_type AS capacity_type,
         ??.max_capacity AS max_capacity, ??.current_capacity AS current_capacity,
         ??.location AS location, ??.picture_path AS picture_path, ? AS creator_id, ? AS event_id
  FROM ?? JOIN ?? ON (??.?? = ??.id)
  WHERE ??.user_id = ?`;

  if (!participationType) {
    queryString = `${queryString} AND (??.following IS TRUE OR ??.attending IS TRUE)`;
  } else if (participationType === "FOLLOWING") {
    queryString = `${queryString} AND ??.following IS TRUE`;
  } else if (participationType === "ATTENDING") {
    queryString = `${queryString} AND ??.attending IS TRUE`;
  }

  if (!type || type.toLowerCase() === "event") {
    // do both types. Start w/ event and UION ALL w/ seminar
    for (let i = 0; i < 10; i++) {
      vals.push("event");
    }
    vals.push(
      "event.creator_id",
      "NULL",
      "event_participation",
      "event",
      "event_participation",
      "event_id",
      "event",
      "event_participation",
      userID,
      "event_participation"
    );

    if (!participationType) {
      vals.push("event_participation");
    }
  }

  if (!type) {
    queryString = `${queryString} UNION ALL ${queryString}`;
  }

  if (!type || type.toLowerCase() === "seminar") {
    // do both types. Start w/ event and UION ALL w/ seminar
    for (let i = 0; i < 10; i++) {
      vals.push("seminar");
    }
    vals.push(
      "NULL",
      "seminar.event_id",
      "seminar_participation",
      "seminar",
      "seminar_participation",
      "seminar_id",
      "seminar",
      "seminar_participation",
      userID,
      "seminar_participation"
    );
    if (!participationType) {
      vals.push("seminar_participation");
    }
  }

  queryString = `${queryString} ORDER BY start_time DESC`;

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

  res.rows.forEach(result => {
    const eventOrSeminar = {
      id: result.id,
      name: result.name,
      description: result.description,
      start_time: result.start_time,
      end_time: result.end_time,
      capacity_type: result.capacity_type,
      max_capacity: result.max_capacity,
      current_capacity: result.current_capacity,
      location: result.location,
      picture_path: result.picture_path
    };

    if (result.creator_id) eventOrSeminar.creator_id = result.creator_id;
    if (result.event_id) eventOrSeminar.event_id = result.event_id;

    results.push(eventOrSeminar);
  });

  return results;
}

async function queryOrganizerByTypeID(
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
      "select * from Event_Organizer join doom_user on event_organizer.user_id = doom_user.id where event_organizer.event_id = ?";
  } else {
    queryString =
      "select * from Seminar_Organizer join doom_user on seminar_organizer.user_id = doom_user.id where seminar_organizer.seminar_id = ?";
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

async function getMyManagingSchedule(
  userID,
  type = null,
  limit = null,
  offset = null
) {
  if (
    type &&
    type.toLowerCase() !== "event" &&
    type.toLowerCase() !== "seminar"
  ) {
    return new Error("Valid inputs for type are 'event' and 'seminar'");
  }

  const results = [];
  const vals = [];
  var queryString = `
    SELECT *, ? AS type
    FROM ??
      JOIN ?? ON (??.?? = ??.id)
    WHERE user_id = ?`;

  if (!type || type.toLowerCase() === "event") {
    // do both types. Start w/ event and UION ALL w/ seminar
    vals.push(
      "event_type",
      "event_organizer",
      "event",
      "event_organizer",
      "event_id",
      "event",
      userID
    );
  }

  if (!type) {
    queryString = `${queryString} UNION ALL ${queryString}`;
  }

  if (!type || type.toLowerCase() === "seminar") {
    vals.push(
      "seminar_type",
      "seminar_organizer",
      "seminar",
      "seminar_organizer",
      "seminar_id",
      "seminar",
      userID
    );
  }

  queryString = `${queryString} ORDER BY start_time DESC`;

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

  res.rows.forEach(result => {
    const eventOrSeminar = {
      id: result.id,
      name: result.name,
      description: result.description,
      start_time: result.start_time,
      end_time: result.end_time,
      capacity_type: result.capacity_type,
      max_capacity: result.max_capacity,
      current_capacity: result.current_capacity,
      location: result.location,
      picture_path: result.picture_path
    };

    if (result.type === "event_type")
      eventOrSeminar.creator_id = result.creator_id;
    else if (result.type === "seminar_type")
      eventOrSeminar.event_id = result.event_id;

    results.push(eventOrSeminar);
  });

  return results;
}

module.exports = {
  searchEventsAndSeminars,
  getTotalCount,
  getMySchedule,
  queryOrganizerByTypeID,
  getMyManagingSchedule
};
