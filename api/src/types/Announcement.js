const Announcement = `
type Announcement {
  # The id of the announcement in its respective table
  id: Int!
  # The id of the associated event/seminar
  type_id: Int!
  message: String!
  
  date_created: String!
  date_modified: String!
  type: String
}

input AnnouncementInput {
  # The associated seminar/event id
  type_id: Int!
  message: String!
}

`;

module.exports = { Announcement };
