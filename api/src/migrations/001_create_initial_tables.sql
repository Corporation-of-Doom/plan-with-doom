CREATE TYPE Capacity_Type AS ENUM ('FCFS_P', 'FCFS_E', 'FFA');
CREATE TYPE Menu_Orientation AS ENUM ('LEFT','RIGHT','TOP','BOTTOM');

CREATE TABLE IF NOT EXISTS Doom_User(
  ID          		      SERIAL,
  first_name 			      TEXT                NOT NULL,
  middle_name 		      TEXT,
  last_name 			      TEXT                NOT NULL,
  email 				        VARCHAR(254)        UNIQUE  NOT NULL,
  organization		      TEXT,
  linked_in	 		        TEXT,
  facebook			        TEXT,
  instagram			        TEXT,
  twitter	  		        TEXT,
  phone_number		      VARCHAR(15),
  privacy_settings	    TEXT                NOT NULL,
  picture_path		      TEXT,
  password_hash         TEXT                NOT NULL,
  confirmed             BOOL                DEFAULT FALSE,
  about_me              TEXT,
  website	  		        TEXT,
  landing_page          TEXT                DEFAULT 'myevents',
  menu_orientation      Menu_Orientation    DEFAULT 'LEFT',
  PRIMARY KEY (ID)
);


CREATE TABLE IF NOT EXISTS Event(
  ID          		      SERIAL,
  creator_id 			      INT                 NOT NULL,
  name 				          TEXT				        NOT NULL,
  description			      TEXT,
  start_time 			      TIMESTAMPTZ 		    NOT NULL,
  end_time 			        TIMESTAMPTZ 		    NOT NULL,
  capacity_type		      Capacity_Type,
  max_capacity	 		    INT,
  current_capacity      INT,
  location			        TEXT,
  location_link			    TEXT,
  picture_path		      TEXT,
  website	  		        TEXT,
  PRIMARY KEY (ID),
  FOREIGN KEY (creator_id) REFERENCES Doom_User (ID)
);

CREATE TABLE IF NOT EXISTS Seminar(
  ID          		      SERIAL,
  event_id 			        INT 				        NOT NULL,
  name 				          TEXT				        NOT NULL,
  description			      TEXT,
  start_time 			      TIMESTAMPTZ 		    NOT NULL,
  end_time 			        TIMESTAMPTZ 		    NOT NULL,
  capacity_type		      Capacity_Type,
  max_capacity	 		    INT,
  current_capacity      INT,
  location			        TEXT,
  location_link			    TEXT,
  picture_path		      TEXT,
  website	  		        TEXT,
  PRIMARY KEY (ID),
  FOREIGN KEY (event_id) REFERENCES Event (ID)
);

CREATE TABLE IF NOT EXISTS Event_Wait_list(
  user_id				        INT 				        NOT NULL,
  event_id 			        INT 				        NOT NULL,
  date_added 			      TIMESTAMPTZ 	    	NOT NULL,

  PRIMARY KEY (user_id, event_id),
  FOREIGN KEY (event_id) REFERENCES Event (ID),
  FOREIGN KEY (user_id) REFERENCES Doom_User (ID)
);

CREATE TABLE IF NOT EXISTS Seminar_Wait_list(
  user_id				        INT 			          NOT NULL,
  seminar_id 			      INT 				        NOT NULL,
  date_added 			      TIMESTAMPTZ 		    NOT NULL,

  PRIMARY KEY (user_id, seminar_id),
  FOREIGN KEY (seminar_id) REFERENCES Seminar (ID),
  FOREIGN KEY (user_id) REFERENCES Doom_User (ID)
);

CREATE TABLE IF NOT EXISTS User_Following(
  user_id					      INT 				        NOT NULL,
  following_user_id 		INT 				        NOT NULL,

  PRIMARY KEY (user_id, following_user_id),
  FOREIGN KEY (user_id) REFERENCES Doom_User (ID),
  FOREIGN KEY (following_user_id) REFERENCES Doom_User (ID)
);

CREATE TABLE IF NOT EXISTS Event_Participation(
  user_id				        INT 				        NOT NULL,
  event_id 			        INT 				        NOT NULL,
  attending			        BOOL,
  following			        BOOL,

  PRIMARY KEY (user_id, event_id),
  FOREIGN KEY (user_id) REFERENCES Doom_User (ID),
  FOREIGN KEY (event_id) REFERENCES Event (ID)
);


CREATE TABLE IF NOT EXISTS Seminar_Participation(
  user_id				        INT 				        NOT NULL,
  seminar_id 			      INT 				        NOT NULL,
  attending			        BOOL,
  following			        BOOL,

  PRIMARY KEY (user_id, seminar_id),
  FOREIGN KEY (user_id) REFERENCES Doom_User (ID),
  FOREIGN KEY (seminar_id) REFERENCES Seminar (ID)
);

CREATE TABLE IF NOT EXISTS Event_Announcement(
  ID          		      SERIAL,
  event_id 			        INT 				        NOT NULL,
  message				        TEXT				        NOT NULL,
  date_created 		      TIMESTAMPTZ 	    	NOT NULL,
  date_modified 		    TIMESTAMPTZ 		    NOT NULL,

  PRIMARY KEY (ID),
  FOREIGN KEY (event_id) REFERENCES Event (ID)
);


CREATE TABLE IF NOT EXISTS Seminar_Announcement(
  ID          		      SERIAL,
  seminar_id 			      INT 				        NOT NULL,
  message				        TEXT				        NOT NULL,
  date_created 		      TIMESTAMPTZ 	    	NOT NULL,
  date_modified 		    TIMESTAMPTZ 	    	NOT NULL,

  PRIMARY KEY (ID),
  FOREIGN KEY (seminar_id) REFERENCES Seminar (ID)
);


CREATE TABLE IF NOT EXISTS Event_Organizer(
  user_id				        INT 			        	NOT NULL,
    event_id 			      INT 				        NOT NULL,

    PRIMARY KEY (user_id, event_id),
   FOREIGN KEY (user_id) REFERENCES Doom_User (ID),
   FOREIGN KEY (event_id) REFERENCES Event (ID)
);


CREATE TABLE IF NOT EXISTS Seminar_Organizer(
  user_id				        INT 				        NOT NULL,
  seminar_id 			      INT 				        NOT NULL,

  PRIMARY KEY (user_id, seminar_id),
  FOREIGN KEY (user_id) REFERENCES Doom_User (ID),
  FOREIGN KEY (seminar_id) REFERENCES Seminar (ID)
);