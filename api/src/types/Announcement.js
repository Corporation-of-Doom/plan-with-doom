// CREATE TABLE IF NOT EXISTS Event_Announcement(
//     ID          		      SERIAL,
//     event_id 			        INT 				        NOT NULL,
//     message				        TEXT				        NOT NULL,
//     date_created 		      TIMESTAMPTZ 	    	NOT NULL,
//     date_modified 		    TIMESTAMPTZ 		    NOT NULL,

//     PRIMARY KEY(ID),
//     FOREIGN KEY(event_id) REFERENCES Event(ID)
// );
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
