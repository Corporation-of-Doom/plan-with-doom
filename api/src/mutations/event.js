const { db } = require("../db");
const { queryEventByID } = require("../resolvers/event");

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
  userid = res.rows[0].user_id;
  return userid;
}

/* 
mutation addUserToEventWaitlist($mylife:EventParticipationInput!) {
  addUserToEventWaitlist(EventParticipation: $mylife)
}

mutation removeUserFromEventWaitlist($mylife:EventParticipationInput!) {
  removeUserFromEventWaitlist(EventParticipation: $mylife)
}
mutation addUserToEvent($mylife:EventParticipationInput!) {
  addUserToEvent(EventParticipation: $mylife)
}
mutation removeUserFromEvent($mylife:EventParticipationInput!) {
  removeUserFromEvent(EventParticipation: $mylife)
}

*/

async function updateEventWaitlist(userid, eventid, adding = true) {
  var queryString = null;
  var vals = [];
  let { current_capacity, max_capacity } = await queryEventByID(eventid);

  // Checks if there is capacity in the event
  if (adding) {
    if (current_capacity < max_capacity) {
      console.log("Event currently has space, user should be added to event");
      return new Error(
        "Event currently has space, user should be added to event"
      );
    }
  }
  if (adding) {
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

async function updateEventParticipation(
  EventParticipationInput,
  adding = true
) {
  let { userid, eventid, participationType } = EventParticipationInput;
  var updateWaitlist = false;

  let { current_capacity, max_capacity } = await queryEventByID(eventid);
  // Checking if user can be added to event or should be added to waitlist
  if (max_capacity && current_capacity == max_capacity) {
    if (adding) {
      console.log(userid + ":" + eventid);
      console.log(
        "Event is currently at max capacity, user should be added to waitlist"
      );
      return new Error(
        "Event is currently at max capacity, user should be added to waitlist"
      );
    }
  } else if (current_capacity > max_capacity) {
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

  // Adds/removes user from the event
  var queryString = null;
  if (participationType.toUpperCase() === "ATTENDING") {
    queryString = `INSERT INTO event_participation (user_id, event_id , attending ) VALUES( ? , ? , ?)
        ON CONFLICT (user_id , event_id ) DO UPDATE SET attending = excluded.attending;`;
  } else {
    queryString = `INSERT INTO event_participation (user_id, event_id , following ) VALUES( ? , ? , ?)
        ON CONFLICT (user_id , event_id ) DO UPDATE SET following = excluded.following;`;
  }
  const vals = [userid, eventid, adding];
  await db.raw(`${queryString}`, vals);

  var newCapacity = await updateCurrentCapacity(eventid);

  // Checks if user unattended event, meaning there's space on the waitlist
  // Moves participant off waitinglist
  if (current_capacity == max_capacity && newCapacity < current_capacity) {
    var top = await getWaitlistTop(eventid);
    updateEventWaitlist(top, eventid, false);
    updateEventParticipation({
      userid: top,
      participationType: "ATTENDING",
      eventid: eventid
    });
  }

  return true;
}

module.exports = {
  insertNewEvent,
  updateEventParticipation,
  updateEventWaitlist
};
