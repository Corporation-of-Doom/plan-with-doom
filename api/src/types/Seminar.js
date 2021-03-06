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
    location_link: String
    picture_path: Int
    website: String
    announcements: [Announcement!]
    organizers: [User!]
    
  }
  
  input SeminarInput {
    event_id: Int!
    name: String!
    description: String
    """ Must be formatted as 2019-10-20 10:30 YYYY-MM-DD HH:MM"""
    start_time: String!
    
    """ Must be formatted as 2019-10-20 10:30 YYYY-MM-DD HH:MM"""
    end_time: String!
    capacity_type: capacity_type!
    max_capacity: Int
    organizer_ids: [Int!]
    location: String
    location_link: String
    picture_path: String
    website: String
  }

input SeminarParticipationInput {
  userid: Int!
  seminarid: Int!
  participationType: participation_type!

}

`;

module.exports = { Seminar };
