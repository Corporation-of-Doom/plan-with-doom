const Announcement = `
type Announcement {
  # The id of the announcement in its respective table
  id: Int!

  # name of the event/seminar
  type_name: String!

  # The id of the associated event/seminar
  type_id: Int!

  # message of the announcement
  message: String!

  date_created: String!
  date_modified: String!

  # will be "event_type" or "seminar_type"
  type: String
}

input AnnouncementInput {
  # The associated seminar/event id
  type_id: Int!
  message: String!
}

`;

module.exports = { Announcement };
