const { db } = require("../db");

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
    organizer_ids
  } = seminarInput;

  /*
  REVIEW: checks for capacity type
  Should I be setting current capacity = 0
  */
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

  max_capacity = max_capacity || null;
  location = location || null;
  description = description || null;
  picture_path = picture_path || null;

  organizer_ids = organizer_ids || [];

  const queryString = `INSERT INTO Seminar
    (event_id, name, description, start_time, end_time, capacity_type, 
    max_capacity, location, picture_path) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id;`;

  const vals = [
    event_id,
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
    id
  };
}

module.exports = { insertNewSeminar };
