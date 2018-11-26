const { db } = require("../db");
const { queryEventByID, getEventByID } = require("../resolvers/event");
const { querySeminarsByEventID } = require("../resolvers/seminar");
const { alreadyAttendingEvent } = require("../resolvers/user");
const {
  updateSeminarWaitlist,
  updateSeminarParticipation
} = require("./seminar");

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

/* 
NOTE: Remember she'll always give me the whole object

*/
async function updateEvent(eventid, event) {
  let {
    name,
    description,
    location,
    picture_path,
    website,
    location_link,
    start_time,
    end_time,
    capacity_type,
    max_capacity,
    organizer_ids
  } = event;

  let simpleEvent = {
    name,
    description,
    location,
    picture_path,
    website,
    location_link
  };

  if (Object.keys(simpleEvent).length === 0) return;

  let queryString = `UPDATE event SET`;
  let first = 1;

  // Adding basic properties of simpleEvent to queryString
  for (var key in simpleEvent) {
    if (simpleEvent[key] !== null && simpleEvent[key] !== undefined) {
      if (!first) queryString = `${queryString}, `;
      first = 0;
      queryString = `${queryString} ${key} = '${simpleEvent[key]}'`;
    }
  }
  originalEvent = await getEventByID(eventid);

  // Validating the event start time with its end time
  const event_start_time = new Date(start_time);
  const event_end_time = new Date(end_time);

  if (event_start_time > event_end_time) {
    console.log("Invalid Start Time: Event cannot start after Event ends");
    return new Error(
      "Unable to create a Event: Invalid Start Time: Event cannot start after Event ends"
    );
  }
  // Validating the event start time/end time with its seminar's start/end
  earliestStart = null;
  latestEnd = null;
  firstSem = null;
  lastSem = null;
  originalEvent["seminars"].forEach(seminar => {
    if (
      earliestStart == null ||
      Date.parse(seminar.start_time) < earliestStart
    ) {
      earliestStart = seminar.start_time;
      firstSem = seminar.name;
    }
    if (latestEnd == null || Date.parse(seminar.end_time) > latestEnd) {
      latestEnd = seminar.end_time;
      lastSem = seminar.name;
    }
  });

  if (event_start_time > Date.parse(earliestStart)) {
    return new Error(
      "Invalid Event start date: First Seminar: ",
      firstSem,
      " starts at ",
      earliestStart,
      ", event must start prior"
    );
  }
  if (event_end_time < Date.parse(latestEnd)) {
    return new Error(
      "Invalid Event end date: Last Seminar: " +
        lastSem +
        " ends at " +
        latestEnd +
        "+ event must end after"
    );
  }
  if (max_capacity < originalEvent["current_capacity"]) {
    return new Error("Max Capacity cannot be less than Current Capacity");
  }
  queryString = `${queryString}, start_time = '${event_start_time.toISOString()}'`;
  queryString = `${queryString}, end_time = '${event_end_time.toISOString()}'`;
  queryString = `${queryString}, capacity_type = '${capacity_type}'`;

  if (capacity_type == "FFA") {
    max_capacity = null;
    queryString = `${queryString}, max_capacity = ${max_capacity}`;
  } else {
    queryString = `${queryString}, max_capacity = '${max_capacity}'`;
  }
  queryString = `${queryString} WHERE id = ? RETURNING *;`;
  await db.raw(queryString, [eventid]);
  // Check if there are people on the waitlist and updates accordingly
  if (
    (max_capacity > originalEvent["max_capacity"] &&
      originalEvent["max_capacity"] == originalEvent["current_capacity"]) ||
    max_capacity == null
  ) {
    var top = await getWaitlistTop(eventid);
    var newCapacity = await updateCurrentCapacity(eventid);
    while (
      (top && newCapacity < max_capacity) ||
      (top && max_capacity == null)
    ) {
      if (top) {
        await updateEventWaitlist(top, eventid, false);
        await updateEventParticipation({
          userid: top,
          participationType: "ATTENDING",
          eventid: eventid
        });
      }
      top = await getWaitlistTop(eventid);
      newCapacity = await updateCurrentCapacity(eventid);
    }
  }
  await updateCurrentCapacity(eventid);

  var oldOrganizerIDs = [];
  originalEvent["organizers"].forEach(organizer => {
    oldOrganizerIDs.push(organizer.id);
  });

  // NOTE: revise this method to make use of set operations
  // Simplest sol'n atm was remove all organizers then add them all back
  // Cannot remove creator of event
  for (var i = 0; i < oldOrganizerIDs.length; i++) {
    const queryString = `delete from event_organizer where user_id = ? and event_id = ?; `;
    if (originalEvent["creator_id"] != oldOrganizerIDs[i]) {
      await db.raw(`${queryString}`, [oldOrganizerIDs[i], eventid]);
    }
  }

  for (var i = 0; i < organizer_ids.length; i++) {
    const queryString = `INSERT INTO Event_Organizer
    (user_id,event_id) VALUES (?, ?); `;
    if (originalEvent["creator_id"] != organizer_ids[i]) {
      await db.raw(`${queryString}`, [organizer_ids[i], eventid]);
    }
  }
  return;
}

async function updateCurrentCapacity(eventid) {
  // Will recalculate and update the table's current capacity
  var queryString = `UPDATE "event" 
                      SET current_capacity =subquery.count
                    FROM (SELECT count(*) from event_participation where event_id = ? and attending = true) AS subquery
                    WHERE event.id=?
                    RETURNING current_capacity;`;
  const vals = [eventid, eventid];

  const res = await db.raw(`${queryString}`, vals);
  return res.rows[0].current_capacity;
}

async function getWaitlistTop(eventid) {
  // Returns the id of the user who's at the top of the waitlist given an eventid
  var queryString = null;
  var userid = null;
  queryString = `SELECT user_id FROM event_wait_list WHERE event_id=? ORDER BY date_added LIMIT 1;`;
  vals = [eventid];
  const res = await db.raw(`${queryString}`, vals);
  if (res.rows.length) {
    return res.rows[0].user_id;
  }
  return false;
}

async function updateEventWaitlist(userid, eventid, adding = true) {
  var queryString = null;
  var vals = [];
  let { current_capacity, max_capacity } = await queryEventByID(eventid);

  //check if user is already attending event
  await alreadyAttendingEvent(userid, eventid);

  if (adding) {
    // Checks if there is capacity in the event
    if (current_capacity < max_capacity) {
      return new Error(
        "Event currently has space, user should be added to event"
      );
    }

    var date = new Date();
    queryString = `INSERT INTO Event_Wait_list(user_id, event_id, date_added) VALUES(?, ?, ?);`;
    vals = [userid, eventid, date];
  } else {
    queryString = `DELETE FROM Event_Wait_list WHERE user_id = ? and event_id = ?;`;
    vals = [userid, eventid];
  }

  await db.raw(`${queryString}`, vals);
  return true;
}

async function getSeminars(eventid) {
  var seminars = await querySeminarsByEventID(eventid);
  var seminar_ids = [];

  seminars.forEach(seminar => {
    seminar_ids.push(seminar.id);
  });

  return seminar_ids;
}

async function unattendSeminars(userid, eventid) {
  seminar_ids = await getSeminars(eventid);
  for (let index = 0; index < seminar_ids.length; index++) {
    await updateSeminarWaitlist(userid, seminar_ids[index], false);
    await updateSeminarParticipation(
      {
        userid: userid,
        participationType: "ATTENDING",
        seminarid: seminar_ids[index]
      },
      false
    );
  }
}

async function updateEventParticipation(
  EventParticipationInput,
  adding = true
) {
  let { userid, eventid, participationType } = EventParticipationInput;
  // Adds/removes user from the event
  var queryString = null;
  let { current_capacity, max_capacity } = await queryEventByID(eventid);
  if (participationType.toUpperCase() === "ATTENDING") {
    // Checking if user can be added to event or should be added to waitlist
    if (max_capacity && current_capacity == max_capacity) {
      if (adding) {
        return new Error(
          "Event is currently at max capacity, user should be added to waitlist"
        );
      }
    } else if (max_capacity && current_capacity > max_capacity) {
      throw new Error(
        "Wack: Current capacity(" +
          current_capacity +
          ") of event " +
          eventid +
          " is greater than max capacity(" +
          max_capacity +
          ")"
      );
    }
    queryString = `INSERT INTO event_participation (user_id, event_id , attending ) VALUES( ? , ? , ?)
        ON CONFLICT (user_id , event_id ) DO UPDATE SET attending = excluded.attending;`;
  } else {
    queryString = `INSERT INTO event_participation (user_id, event_id , following ) VALUES( ? , ? , ?)
        ON CONFLICT (user_id , event_id ) DO UPDATE SET following = excluded.following;`;
  }
  // Must unattend seminars & seminarwaitlist prior to leaving event
  await unattendSeminars(userid, eventid);

  const vals = [userid, eventid, adding];
  await db.raw(`${queryString}`, vals);

  var newCapacity = await updateCurrentCapacity(eventid);

  if (participationType.toUpperCase() === "ATTENDING") {
    /* Checks if user unattended event, meaning there's space on the waitlist
    Moves participant off waitinglist */
    if (current_capacity == max_capacity && newCapacity < current_capacity) {
      var top = await getWaitlistTop(eventid);
      if (top) {
        await updateEventWaitlist(top, eventid, false);
        await updateEventParticipation({
          userid: top,
          participationType: "ATTENDING",
          eventid: eventid
        });
      }
    }
  }

  return true;
}

module.exports = {
  insertNewEvent,
  updateEventParticipation,
  updateEventWaitlist,
  updateEvent
};
