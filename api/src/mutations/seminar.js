const { db } = require("../db");
const { queryEventByID } = require("../resolvers/event");
const { queryOrganizerByTypeID } = require("../resolvers/searchResults");

async function insertNewSeminar(seminarInput) {
  let {
    event_id,
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
  } = seminarInput;

  if (capacity_type === "FFA") {
    max_capacity = null;
  }

  if (max_capacity == null && capacity_type != "FFA") {
    return new Error(
      "Unable to create Seminar: An seminar with " +
        capacity_type +
        " capacity type must have a max capacity"
    );
  }

  current_capacity = 0;
  max_capacity = max_capacity || null;
  location = location || null;
  location_link = location_link || null;
  website = website || null;
  description = description || null;
  picture_path = picture_path || null;

  // Populating organizer IDs to include the creator and organizers of the parent Event
  organizer_ids = organizer_ids || [];
  const organizers = await queryOrganizerByTypeID(event_id);
  organizers.forEach(user => {
    organizer_ids.push(user.id);
  });
  organizer_ids = new Set(organizer_ids);
  organizer_ids = Array.from(organizer_ids);

  // Validating the start time, end time
  const parentEvent = await queryEventByID(event_id);
  const sem_start_time = new Date(start_time);
  const sem_end_time = new Date(end_time);

  if (sem_start_time > sem_end_time) {
    console.log("Invalid Start Time: Seminar cannot start after Seminar ends");
    return new Error(
      "Unable to create a Seminar: Invalid Start Time: Seminar cannot start after Seminar ends"
    );
  }
  if (sem_start_time < parentEvent.start_time) {
    console.log("Invalid Start Time: Seminar cannot start before Event starts");
    return new Error(
      "Unable to create a Seminar: Invalid Start Time: Seminar cannot start before Event starts"
    );
  }
  if (sem_start_time > parentEvent.end_time) {
    console.log("Invalid Start Time: Seminar cannot start after Event ends");
    return new Error(
      "Unable to create a Seminar: Invalid Start Time: Seminar cannot start after Event ends"
    );
  }
  if (sem_end_time > parentEvent.end_time) {
    console.log("Invalid End Time: Seminar cannot end after Event ends");
    return new Error(
      "Unable to create a Seminar: Invalid End Time: Seminar cannot end after Event ends"
    );
  }

  // Inserting seminar into table
  const queryString = `INSERT INTO Seminar
    (event_id, name, description, start_time, end_time, capacity_type,
    max_capacity, location, picture_path,current_capacity,website,location_link)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id;`;

  const vals = [
    event_id,
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

  // Adding organizers to the organizer table
  for (var i = 0; i < organizer_ids.length; i++) {
    const queryString = `INSERT INTO Seminar_Organizer
    (user_id,seminar_id) VALUES (?, ?); `;
    await db.raw(`${queryString}`, [organizer_ids[i], id]);
  }

  return {
    name,
    event_id,
    description,
    start_time,
    end_time,
    capacity_type,
    max_capacity,
    location,
    picture_path,
    current_capacity,
    id,
    website,
    location_link
  };
}

async function updateSeminarParticipation(
  SeminarParticipationInput,
  adding = true
) {
  let { userid, seminarid, participationType } = SeminarParticipationInput;

  var queryString = null;

  if (participationType === "ATTENDING") {
    queryString = `INSERT INTO seminar_participation (user_id, seminar_id , attending ) VALUES( ? , ? , ?)
    ON CONFLICT (user_id , seminar_id ) do update set attending = excluded.attending;`;
  } else {
    queryString = `INSERT INTO seminar_participation (user_id, seminar_id , following ) VALUES( ? , ? , ?)
    ON CONFLICT (user_id , seminar_id ) do update set following = excluded.following;`;
  }

  const vals = [userid, seminarid, adding];

  await db.raw(`${queryString}`, vals);
  return true;
}

module.exports = { insertNewSeminar, updateSeminarParticipation };
