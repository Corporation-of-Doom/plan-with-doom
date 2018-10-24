const { db } = require("../db");

async function createEvent(eventInput) {
  console.log("hello");
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

  // TODO add checks for capacity type
  /*
  ffa --> maxcapacity & current capacity = null

  Error
  FCFS(p/e) --> max capacity
    throw error needs max capacity
*/

  max_capacity = max_capacity || null;
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
    picture_path,
    id
  };
}

module.exports = { createEvent };
