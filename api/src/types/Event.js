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

  # still need to add photo
  picture_path: String

  # Will deal with that when we have DB set up
}

input EventInput {
  creator_id: Int!
  name: String!
  description: String
  start_time: String!
  end_time: String!

  """ If the capacity_type is FCFS_P or  FCFS_P """
  capacity_type: capacity_type!
  max_capacity: Int
  organizer_ids: [Int!]
  location: String
  picture_path: String
}`;

module.exports = { Event };
