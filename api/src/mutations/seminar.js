const { db } = require("../db");
const { queryEventByID } = require("../resolvers/event");
const { querySeminarByID } = require("../resolvers/seminar");
const { queryOrganizerByTypeID } = require("../resolvers/searchResults");
const {
  isAttendingEvent,
  alreadyAttendingSeminar
} = require("../resolvers/user");

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

async function updateCurrentCapacity(seminarid) {
  // Will recalculate and update the table's current capacity
  var queryString = `UPDATE "seminar" 
                      SET current_capacity =subquery.count
                    FROM (SELECT count(*) FROM seminar_participation WHERE seminar_id = ? AND attending = true) AS subquery
                    WHERE seminar.id=?
                    RETURNING current_capacity;`;
  const vals = [seminarid, seminarid];

  const res = await db.raw(`${queryString}`, vals);
  return res.rows[0].current_capacity;
}

async function getWaitlistTop(seminarid) {
  // Returns the id of the user who's at the top of the waitlist given an seminarid
  var queryString = null;
  queryString = `SELECT user_id FROM seminar_wait_list WHERE seminar_id=? ORDER BY date_added LIMIT 1;`;
  vals = [seminarid];
  const res = await db.raw(`${queryString}`, vals);
  if (res.rows.length) {
    return res.rows[0].user_id;
  }
  return false;
}

async function updateSeminarWaitlist(userid, seminarid, adding = true) {
  var queryString = null;
  var vals = [];
  let { current_capacity, max_capacity } = await querySeminarByID(seminarid);

  //throws error if user already attending seminar
  if (adding) {
    await alreadyAttendingSeminar(userid, seminarid);
    // Checks if there is capacity in the Seminar
    if (current_capacity < max_capacity) {
      var msg = "Seminar currently has space, user should be added to Seminar";
      console.log(msg);
      return new Error(msg);
    }

    var date = new Date();
    queryString = `INSERT INTO Seminar_Wait_list(user_id, Seminar_id, date_added) VALUES(?, ?, ?);`;
    vals = [userid, seminarid, date];
  } else {
    queryString = `DELETE FROM Seminar_Wait_list WHERE user_id = ? and Seminar_id = ?;`;
    vals = [userid, seminarid];
  }

  await db.raw(`${queryString}`, vals);
  return true;
}

async function updateSeminarParticipation(
  SeminarParticipationInput,
  adding = true
) {
  // Adds/removes user from the event
  let { userid, seminarid, participationType } = SeminarParticipationInput;

  var queryString = null;
  let { current_capacity, max_capacity, event_id } = await querySeminarByID(
    seminarid
  );

  if (!(await isAttendingEvent(userid, event_id))) {
    return new Error("User must be attending event of this seminar");
  }

  if (participationType.toUpperCase() == "ATTENDING") {
    // throws if error user already attending when trying to add to a seminar
    if (adding) {
      await alreadyAttendingSeminar(userid, seminarid);
    }
    // Checking if user can be added to event or should be added to waitlist
    if (max_capacity && current_capacity == max_capacity && adding) {
      return new Error(
        "Seminar is currently at max capacity, user should be added to waitlist"
      );
    } else if (max_capacity && current_capacity > max_capacity) {
      throw new Error(
        "Wack: Current capacity(" +
          current_capacity +
          ") of seminar " +
          seminarid +
          " is greater than max capacity(" +
          max_capacity +
          ")"
      );
    }

    queryString = `INSERT INTO seminar_participation (user_id, seminar_id , attending ) VALUES( ? , ? , ?)
      ON CONFLICT (user_id , seminar_id ) DO UPDATE SET attending = excluded.attending;`;
  } else {
    queryString = `INSERT INTO seminar_participation (user_id, seminar_id , following ) VALUES( ? , ? , ?)
      ON CONFLICT (user_id , seminar_id ) DO UPDATE SET following = excluded.following;`;
  }
  const vals = [userid, seminarid, adding];
  await db.raw(`${queryString}`, vals);
  var newCapacity = await updateCurrentCapacity(seminarid);

  if (participationType.toUpperCase() === "ATTENDING") {
    /* Checks if user unattended event, meaning there's space on the waitlist
    Moves participant off waitinglist */
    if (current_capacity == max_capacity && newCapacity < current_capacity) {
      var top = await getWaitlistTop(seminarid);
      if (top) {
        await updateSeminarWaitlist(top, seminarid, false);
        await updateSeminarParticipation({
          userid: top,
          participationType: "ATTENDING",
          seminarid: seminarid
        });
      }
    }
  }

  return true;
}

module.exports = {
  insertNewSeminar,
  updateSeminarParticipation,
  updateSeminarWaitlist
};
