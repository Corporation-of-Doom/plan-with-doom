-- User insertion
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Vivian','Ng','vng05@uoguelph.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Bhavanthy','Mod','bmodchal@uoguelph.ca', 'Public','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Alliyya','Mo','alliyya@uoguelph.ca', 'Public','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Tamara','Charchoghlyan','tamaracharch@gmail.com', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Tom','Riddle','alliyyamo.dev@gmail.com', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Tony','Stark','ironman@avengers.ca', 'Public','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Steve','Rogers','captamerica@avengers.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Bucky','Barnes','wintersoldier@hydra.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Thor','Odinson','thundergod@asgard.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
insert into doom_user (first_name, last_name, email, privacy_settings, password_hash) values ('Loki','Laufeyson','mischief@jotunheim.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');


-- 3 events
insert into Event (creator_id, name, start_time, end_time, capacity_type, max_capacity, current_capacity) values (3,'CUSEC',TIMESTAMP '2019-10-23 8:30:00+02', TIMESTAMP '2019-11-27 10:30:00+02', 'FCFS_E',6,0);
insert into Event (creator_id, name, start_time, end_time, capacity_type, max_capacity, current_capacity) values (2,'Animefest',TIMESTAMP '2019-10-21 12:30:00+02', TIMESTAMP '2019-11-29 10:30:00+02', 'FCFS_P',3,2);
insert into Event (creator_id, name, start_time, end_time, capacity_type) values (1,'Doomsday convention',TIMESTAMP '2018-10-30 1:00:00', TIMESTAMP '2018-11-02 10:30:00', 'FFA');
insert into Event (creator_id, name, start_time, end_time, capacity_type,max_capacity, current_capacity) values (6,'Avenger Meetup',TIMESTAMP '2019-05-03 10:30:00', TIMESTAMP '2019-11-24 10:30:00', 'FCFS_E',5,0);
insert into Event (creator_id, name, start_time, end_time, capacity_type,max_capacity, current_capacity) values (5,'Wizarding War',TIMESTAMP '2018-11-03 10:30:00', TIMESTAMP '2019-12-24 10:30:00', 'FCFS_P',10,0);


insert into Event_Organizer (user_id, event_id) values (3,1);
insert into Event_Organizer (user_id, event_id) values (2,2);
insert into Event_Organizer (user_id, event_id) values (1,3);
insert into Event_Organizer (user_id, event_id) values (6,4);
insert into Event_Organizer (user_id, event_id) values (7,4);
insert into Event_Organizer (user_id, event_id) values (5,5);


-- 3 Seminars
insert into Seminar (event_id, name, start_time, end_time, capacity_type) values (3,'Preparing for your doom',TIMESTAMP '2019-10-20 10:30:00+02', TIMESTAMP '2019-11-20 12:30:00+02', 'FFA');
insert into Seminar (event_id, name, start_time, end_time, capacity_type, max_capacity, current_capacity) values (2,'How to Weeb',TIMESTAMP '2019-10-22 12:30:00+02', TIMESTAMP '2019-11-22 13:30:00+02', 'FCFS_E',2,2);
insert into Seminar (event_id, name, start_time, end_time, capacity_type, max_capacity, current_capacity) values (1,'Hackathon',TIMESTAMP '2019-10-24 8:30:00+02', TIMESTAMP '2019-11-24 10:30:00+02', 'FCFS_P',6,0);
insert into Seminar (event_id, name, start_time, end_time, capacity_type, max_capacity, current_capacity) values (3,'Alpha Demo',TIMESTAMP '2018-10-31 14:50:00', TIMESTAMP '2018-10-31 15:00:00', 'FCFS_P',5,0);

insert into Seminar_Organizer (user_id, seminar_id) values (2,2);
insert into Seminar_Organizer (user_id, seminar_id) values (3,1);
insert into Seminar_Organizer (user_id, seminar_id) values (4,3);

insert into Event_Participation (user_id, event_id, attending) values (2,2,True);
insert into Event_Participation (user_id, event_id, attending) values (5,2,True);
insert into Event_Participation (user_id, event_id, attending) values (3,2,True);
insert into Event_Participation (user_id, event_id, attending) values (3,3,True);
insert into Event_Participation (user_id, event_id, attending) values (10,3,True);

insert into Event_Participation (user_id, event_id, attending) values (3,4,True);
insert into Event_Participation (user_id, event_id, attending) values (7,4,True);
insert into Event_Participation (user_id, event_id, attending) values (8,4,True);
insert into Event_Participation (user_id, event_id, attending) values (9,4,True);
insert into Event_Participation (user_id, event_id, following) values (10,4,True);


insert into Seminar_Participation (user_id, seminar_id, attending) values (2,2,True);
insert into Seminar_Participation (user_id, seminar_id, attending) values (5,2,True);
insert into Seminar_Participation (user_id, seminar_id, following) values (3,2,True);
insert into Seminar_Participation (user_id, seminar_id, following) values (3,4,True);
insert into Seminar_Wait_list (user_id, seminar_id,date_added) values (3,2, TIMESTAMP '2019-10-23 8:30:00+02');


-- 2 Annoucements
insert into Event_Announcement (event_id, message, date_created, date_modified) values (3,'The end is nigh, remember your wallet',TIMESTAMP '2018-10-31 8:30:00', TIMESTAMP '2018-10-31 19:00:00');
insert into Event_Announcement (event_id, message, date_created, date_modified) values (3,'Remember your doom',TIMESTAMP '2018-10-31 8:30:00', TIMESTAMP '2018-11-01 8:45:00');
insert into Seminar_Announcement (seminar_id, message, date_created, date_modified) values (4,'Bug Fixing Party',TIMESTAMP '2018-10-31 8:30:00', TIMESTAMP '2018-10-13 8:30:00');
insert into Seminar_Announcement (seminar_id, message, date_created, date_modified) values (3,'Reminder to participants to bring laptops',TIMESTAMP '2018-10-23 8:30:00+02', TIMESTAMP '2018-10-23 8:30:00+02');


-- One user following
insert into User_Following (user_id, following_user_id) values (4,1);
