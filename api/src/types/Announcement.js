const Announcement = `
type Announcement {
  # The id of the announcement in its respective table
  id: Int!
  
  # The id of the associated event/seminar
  type_id: Int!
  
  # message of the announcement
  message: String!
  
  date_created: String!
  date_modified: String!
  
  # will be "event_type" or "seminar_type"
  type: String
  
  # name of the event/seminar
  name: String!
}

input AnnouncementInput {
  # The associated seminar/event id
  type_id: Int!
  message: String!
}

`;

module.exports = { Announcement };
