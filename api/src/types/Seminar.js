const Seminar = `
type Seminar {
    id: Int!
    event_id: Int!
    name: String!
    description: String
    start_time: String!
    end_time: String!
    capacity_type: capacity_type!
    max_capacity: Int
    current_capacity: Int
    location: Int
    picture_path: Int

  }

input SeminarInput {
  event_id: Int!
  name: String!
  description: String
<<<<<<< HEAD
  """ Must be formatted as 2019-10-20 10:30 YYYY-MM-DD HH:MM"""
=======
>>>>>>> c2971d69f3a5040a83b5564fc26a7376613ea395
  start_time: String!
  
  """ Must be formatted as 2019-10-20 10:30 YYYY-MM-DD HH:MM"""
  end_time: String!
  capacity_type: capacity_type!
  max_capacity: Int
  organizer_ids: [Int!]
  location: String
  picture_path: String
}

input SeminarParticipationInput {
  userid: Int!
  eventid: Int!
  participationType: participation_type!

}

`;

module.exports = { Seminar };
