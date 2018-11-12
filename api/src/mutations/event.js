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
    organizer_ids,
    website,
    location_link
  } = eventInput;

  const event_start_time = new Date(start_time);
  const event_end_time = new Date(end_time);
  if (event_start_time > event_end_time) {
    console.log("Invalid Start Time: Event cannot start after Event ends");
    return new Error(
      "Unable to create a Event: Invalid Start Time: Event cannot start after Event ends"
    );
  }

  if (capacity_type === "FFA") {
    max_capacity = null;
  }

  if (max_capacity == null && capacity_type != "FFA") {
    return new Error(
      "Unable to create a event: An Event with " +
        capacity_type +
        " capacity type must have a max capacity"
    );
  }

  current_capacity = 0;
  max_capacity = max_capacity || null;
  description = description || null;

  location = location || null;
  location_link = location_link || null;
  website = website || null;
  picture_path = picture_path || null;

  organizer_ids = organizer_ids || [];
  organizer_ids.push(creator_id);

  const queryString = `INSERT INTO Event
  (creator_id, name, description, start_time, end_time, capacity_type, 
    max_capacity, location, picture_path, current_capacity, website, location_link) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id;`;

  const vals = [
    creator_id,
    name,
    description,
    start_time,
    end_time,
    capacity_type,
    max_capacity,
    location,
    picture_path,
    current_capacity,
    website,
    location_link
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
    current_capacity,
    picture_path,
    id,
    website,
    location_link
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
