const Announcement = `
type Announcement {

  id: Int!
  type_id: Int!
  message: String!
  
  date_created: String!
  date_modified: String!
}

input AnnouncementInput {
  # The associated seminar/event id
  type_id: Int!
  message: String!
}

`;

module.exports = { Announcement };
