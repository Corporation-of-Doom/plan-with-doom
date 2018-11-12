const Event = `
type Event {

  id: Int!
  creator_id: Int!
  name: String!
  description: String
  
  start_time: String!
  end_time: String!
  
  """ If the capacity_type is FCFS_P or  FCFS_P """
  capacity_type: capacity_type!
  max_capacity: Int
  current_capacity: Int
  location: String
  website: String
  
  # still need to add photo
  picture_path: String
  
  #Testing attaching announcements to an event
  announcements: [Announcement!]
  organizers: [User!]
  seminars: [Seminar!]
  
}

input EventInput {
  creator_id: Int!
  name: String!
  description: String
  
  """ Must be formatted as 2019-10-20 10:30 YYYY-MM-DD HH:MM"""
  start_time: String!
  
  """ Must be formatted as 2019-10-20 10:30 YYYY-MM-DD HH:MM"""
  end_time: String!
  
  """ If the capacity_type is FCFS_P or  FCFS_P """
  capacity_type: capacity_type!
  max_capacity: Int
  organizer_ids: [Int!]
  location: String
  picture_path: String
  website: String
}


input EventParticipationInput {
  userid: Int!
  eventid: Int!
  participationType: participation_type!

}


`;

module.exports = { Event };
