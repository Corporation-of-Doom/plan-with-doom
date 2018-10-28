const { db } = require("../db");

async function insertNewEvent(eventInput) {
  let {
    creator_id,
    name,
    description,
    start_time,
    end_time,
    capacity_type,
    max_capacity,
    location,
    picture_path,
    organizer_ids
  } = eventInput;

  /*
  REVIEW: checks for capacity type
  Should I be setting current capacity = 0
  */
  if (capacity_type === "FFA") {
    max_capacity = null;
  }

  if (max_capacity == null && capacity_type != "FFA") {
    return new Error(
      "Unable to create event: An Event with " +
        capacity_type +
        " capacity type must have a max capacity"
    );
  }

  max_capacity = max_capacity || null;
  description = description || null;

  location = location || null;
  picture_path = picture_path || null;

  organizer_ids = organizer_ids || [];
  organizer_ids.push(creator_id);

  const queryString = `INSERT INTO Event
    (creator_id, name, description, start_time, end_time, capacity_type, 
    max_capacity, location, picture_path) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id;`;

  const vals = [
    creator_id,
    name,
    description,
    start_time,
    end_time,
    capacity_type,
    max_capacity,
    location,
    picture_path
  ];

  const res = await db.raw(`${queryString}`, vals);
  const { id } = res.rows[0];

  for (var i = 0; i < organizer_ids.length; i++) {
    const queryString = `INSERT INTO Event_Organizer
    (user_id,event_id) VALUES (?, ?); `;
    await db.raw(`${queryString}`, [organizer_ids[i], id]);
  }

  return {
    creator_id,
    name,
    description,
    start_time,
    end_time,
    capacity_type,
    max_capacity,
    location,
    // if (capacity_type.equal("FFA")) {
    //   max_capacity = null;
    // current_capacity = 0;
    // }

    picture_path,
    id
  };
}

async function updateEventParticipation(
  EventParticipationInput,
  adding = true
) {
  let { userid, eventid, participationType } = EventParticipationInput;

  var queryString = null;

  if (participationType === "ATTENDING") {
    queryString = `INSERT INTO event_participation (user_id, event_id , attending ) VALUES( ? , ? , ?)
    ON CONFLICT (user_id , event_id ) do update set attending = excluded.attending;`;
  } else {
    queryString = `INSERT INTO event_participation (user_id, event_id , following ) VALUES( ? , ? , ?)
    ON CONFLICT (user_id , event_id ) do update set following = excluded.following;`;
  }

  const vals = [userid, eventid, adding];

  await db.raw(`${queryString}`, vals);
  return true;
}

module.exports = {
  insertNewEvent,
  updateEventParticipation
};
