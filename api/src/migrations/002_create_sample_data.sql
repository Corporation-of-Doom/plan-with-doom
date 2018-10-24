-- User insertion
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Vivian','Ng','vng05@uoguelph.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Bhavanthy','Mod','bmodchal@uoguelph.ca', 'Public',' $2b$12$Yk.24WAbgXMLmtCJY5EtEe8FaQc9bhauiwsS4ehMV1afZyglscgBC');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Alliyya','Mo','alliyya@uoguelph.ca', 'Public','$2b$12$UlcVFYuda1MuMTkXcLwE/e7s9DRHvOVbCTOIVErUIVW86344T1Wee');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Tamara','Charchoghlyan','tamaracharch@gmail.com', 'Private','$2b$12$V2hu3U6yjz2CQGsRy8Nz1O.NjyH6WzT7cb1ER18XUE4awupQcK62i');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Tom','Riddle','alliyyamo.dev@gmail.com', 'Private','$2b$12$oOaIeH6wBt0J8HWNCoQLhuRNWplsHO18jLZf3DWSQiU8uKaMivGca');


-- 3 events
insert into Event (creator_id, name, start_time, end_time, capacity_type, capacity) values (3,'CUSEC',TIMESTAMP '2019-10-23 8:30:00+02', TIMESTAMP '2019-11-27 10:30:00+02', 'FCFS_E',6);
insert into Event (creator_id, name, start_time, end_time, capacity_type, capacity) values (2,'Animefest',TIMESTAMP '2019-10-21 12:30:00+02', TIMESTAMP '2019-11-29 10:30:00+02', 'FCFS_P',3);
insert into Event (creator_id, name, start_time, end_time, capacity_type) values (1,'Doomsday convention',TIMESTAMP '2019-10-19 10:30:00+02', TIMESTAMP '2019-11-24 10:30:00+02', 'FFA');

insert into Event_Organizer (user_id, event_id) values (3,1);
insert into Event_Organizer (user_id, event_id) values (2,2);
insert into Event_Organizer (user_id, event_id) values (1,3);


-- 3 Seminars
insert into Seminar (event_id, name, start_time, end_time, capacity_type) values (3,'Preparing for your doom',TIMESTAMP '2019-10-20 10:30:00+02', TIMESTAMP '2019-11-20 12:30:00+02', 'FFA');
insert into Seminar (event_id, name, start_time, end_time, capacity_type, capacity) values (2,'How to Weeb',TIMESTAMP '2019-10-22 12:30:00+02', TIMESTAMP '2019-11-22 13:30:00+02', 'FCFS_E',2);
insert into Seminar (event_id, name, start_time, end_time, capacity_type, capacity) values (1,'Hackathon',TIMESTAMP '2019-10-24 8:30:00+02', TIMESTAMP '2019-11-24 10:30:00+02', 'FCFS_P',6);

insert into Seminar_Organizer (user_id, seminar_id) values (2,2);
insert into Seminar_Organizer (user_id, seminar_id) values (3,1);
insert into Seminar_Organizer (user_id, seminar_id) values (4,3);

insert into Event_Participation (user_id, event_id, attending) values (2,2,True);
insert into Event_Participation (user_id, event_id, attending) values (5,2,True);


insert into Seminar_Participation (user_id, seminar_id, attending) values (2,2,True);
insert into Seminar_Participation (user_id, seminar_id, attending) values (5,2,True);
insert into Seminar_Participation (user_id, seminar_id, following) values (3,2,True);
insert into Seminar_Wait_list (user_id, seminar_id,date_added) values (3,2, TIMESTAMP '2019-10-23 8:30:00+02');


-- 2 Annoucements
insert into Event_Announcement (event_id, message, date_created, date_modified) values (3,'The end is nigh, remember your wallet',TIMESTAMP '2019-10-23 8:30:00+02', TIMESTAMP '2019-10-23 8:30:00+02');
insert into Seminar_Announcement (seminar_id, message, date_created, date_modified) values (3,'Reminder to participants to bring laptops',TIMESTAMP '2019-10-23 8:30:00+02', TIMESTAMP '2019-10-23 8:30:00+02');


-- One user following
insert into User_Following (user_id, following_user_id) values (4,1);
