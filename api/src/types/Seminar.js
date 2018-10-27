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
  start_time: String!
  end_time: String!
  capacity_type: capacity_type!
  max_capacity: Int
  organizer_ids: [Int!]
  location: String
  picture_path: String
}

`;

module.exports = { Seminar };
