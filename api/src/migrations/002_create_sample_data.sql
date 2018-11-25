-- User INSERTion
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Vivian','Ng','vng05@uoguelph.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Bhavanthy','Mod','bmodchal@uoguelph.ca', 'Public','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Alliyya','Mo','alliyya@uoguelph.ca', 'Public','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Tamara','Charchoghlyan','tamaracharch@gmail.com', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Denis','Nikitenko','dnikiten@uoguelph.ca', 'Public','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Tom','Riddle','alliyyamo.dev@gmail.com', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Tony','Stark','ironman@avengers.ca', 'Public','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Steve','Rogers','captamerica@avengers.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Bucky','Barnes','wintersoldier@hydra.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Thor','Odinson','thundergod@asgard.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');
INSERT INTO doom_user (first_name, last_name, email, privacy_settings, password_hash) VALUES ('Loki','Laufeyson','mischief@jotunheim.ca', 'Private','$2b$12$rF.modokh7SuBpRHdg/xA.KN/zYvx0HmaxasTXmzWIiWcLPlhfWH2');


-- 3 events
insert into Event (creator_id, name, start_time, end_time, capacity_type, max_capacity, current_capacity, website, location_link) values (3,'CUSEC',TIMESTAMP '2019-10-23 8:30:00+02', TIMESTAMP '2019-11-27 10:30:00+02', 'FCFS_E',6,0,'http://2018.cusec.net/','https://goo.gl/maps/w38KNq2BNLB2');
INSERT INTO Event (creator_id, name, start_time, end_time, capacity_type, max_capacity) VALUES (2,'Animefest',TIMESTAMP '2019-10-21 12:30:00+02', TIMESTAMP '2019-11-29 10:30:00+02', 'FCFS_P',3);
INSERT INTO Event (creator_id, name, start_time, end_time, capacity_type) VALUES (1,'Doomsday convention',TIMESTAMP '2018-09-04 1:00:00', TIMESTAMP '2018-12-13 10:30:00', 'FFA');
INSERT INTO Event (creator_id, name, start_time, end_time, capacity_type,max_capacity) VALUES (6,'Avenger Meetup',TIMESTAMP '2019-05-03 10:30:00', TIMESTAMP '2019-11-24 10:30:00', 'FCFS_E',5);
INSERT INTO Event (creator_id, name, start_time, end_time, capacity_type,max_capacity) VALUES (5,'Wizarding War',TIMESTAMP '2018-11-03 10:30:00', TIMESTAMP '2019-12-24 10:30:00', 'FCFS_P',10);


insert into Event_Organizer (user_id, event_id) values (3,1);
insert into Event_Organizer (user_id, event_id) values (2,2);
insert into Event_Organizer (user_id, event_id) values (1,3);
insert into Event_Organizer (user_id, event_id) values (6,4);
insert into Event_Organizer (user_id, event_id) values (7,4);
insert into Event_Organizer (user_id, event_id) values (1,4);
insert into Event_Organizer (user_id, event_id) values (3,4);
insert into Event_Organizer (user_id, event_id) values (5,5);



INSERT INTO Seminar (event_id, name, start_time, end_time, capacity_type) VALUES (3,'Preparing for your doom',TIMESTAMP '2018-09-10 10:30:00+02', TIMESTAMP '2018-10-22 12:30:00+02', 'FFA');
INSERT INTO Seminar (event_id, name, start_time, end_time, capacity_type, max_capacity) VALUES (2,'How to Weeb',TIMESTAMP '2019-10-22 12:30:00+02', TIMESTAMP '2019-11-22 13:30:00+02', 'FCFS_E',2);
INSERT INTO Seminar (event_id, name, start_time, end_time, capacity_type, max_capacity) VALUES (1,'Hackathon',TIMESTAMP '2019-10-24 8:30:00+02', TIMESTAMP '2019-11-24 10:30:00+02', 'FCFS_P',6);
INSERT INTO Seminar (event_id, name, start_time, end_time, capacity_type, max_capacity) VALUES (3,'Alpha Demo',TIMESTAMP '2018-10-31 14:50:00', TIMESTAMP '2018-10-31 15:00:00', 'FCFS_P',5);
INSERT INTO Seminar (event_id, name, start_time, end_time, capacity_type, max_capacity) VALUES (3,'RC Demo',TIMESTAMP '2018-11-28 14:50:00', TIMESTAMP '2018-11-28 15:00:00', 'FCFS_P',5);

INSERT INTO Seminar_Organizer (user_id, seminar_id) VALUES (3,1);
INSERT INTO Seminar_Organizer (user_id, seminar_id) VALUES (2,2);
INSERT INTO Seminar_Organizer (user_id, seminar_id) VALUES (4,3);
INSERT INTO Seminar_Organizer (user_id, seminar_id) VALUES (5,4);
INSERT INTO Seminar_Organizer (user_id, seminar_id) VALUES (5,5);

-- Adding users to events
insert into Event_Participation (user_id, event_id, attending) values (10,1,True);

INSERT INTO Event_Participation (user_id, event_id, attending) VALUES (1,2,True);
INSERT INTO Event_Participation (user_id, event_id, attending) VALUES (3,2,True);
INSERT INTO Event_Participation (user_id, event_id, attending) VALUES (5,2,True);

INSERT INTO Event_Participation (user_id, event_id, attending) VALUES (10,3,True);
INSERT INTO Event_Participation (user_id, Event_id, attending) VALUES (1,3,True);
INSERT INTO Event_Participation (user_id, Event_id, attending) VALUES (2,3,True);
INSERT INTO Event_Participation (user_id, Event_id, attending) VALUES (3,3,True);
INSERT INTO Event_Participation (user_id, Event_id, attending) VALUES (4,3,True);
INSERT INTO Event_Participation (user_id, Event_id, attending) VALUES (5,3,True);

INSERT INTO Event_Participation (user_id, event_id, attending) VALUES (3,4,True);
INSERT INTO Event_Participation (user_id, event_id, attending) VALUES (7,4,True);
INSERT INTO Event_Participation (user_id, event_id, attending) VALUES (8,4,True);
INSERT INTO Event_Participation (user_id, event_id, attending) VALUES (9,4,True);
INSERT INTO Event_Participation (user_id, event_id, following) VALUES (10,4,True);

-- Adding users to seminars
INSERT INTO Seminar_Participation (user_id, seminar_id, attending) VALUES (2,2,True);
INSERT INTO Seminar_Participation (user_id, seminar_id, following) VALUES (3,2,True);
INSERT INTO Seminar_Participation (user_id, seminar_id, attending) VALUES (5,2,True);

INSERT INTO Seminar_Participation (user_id, seminar_id, following) VALUES (3,4,True);

INSERT INTO Seminar_Participation (user_id, seminar_id, attending) VALUES (1,5,True);
INSERT INTO Seminar_Participation (user_id, seminar_id, attending) VALUES (2,5,True);
INSERT INTO Seminar_Participation (user_id, seminar_id, attending) VALUES (3,5,True);
INSERT INTO Seminar_Participation (user_id, seminar_id, attending) VALUES (4,5,True);
INSERT INTO Seminar_Participation (user_id, seminar_id, attending) VALUES (5,5,True);

INSERT INTO Seminar_Wait_list (user_id, seminar_id,date_added) VALUES (3,2, TIMESTAMP '2019-10-23 8:30:00+02');
INSERT INTO Event_Wait_list (user_id, event_id,date_added) VALUES (10,2, TIMESTAMP '2019-10-29 8:30:00+02');


-- 2 Annoucements
INSERT INTO Event_Announcement (event_id, message, date_created, date_modified) VALUES (3,'The end is nigh, remember your wallet',TIMESTAMP '2018-10-31 8:30:00', TIMESTAMP '2018-10-31 19:00:00');
INSERT INTO Event_Announcement (event_id, message, date_created, date_modified) VALUES (3,'Remember your doom',TIMESTAMP '2018-10-31 8:30:00', TIMESTAMP '2018-11-01 8:45:00');
INSERT INTO Seminar_Announcement (seminar_id, message, date_created, date_modified) VALUES (4,'Bug Fixing Party',TIMESTAMP '2018-10-31 8:30:00', TIMESTAMP '2018-10-13 8:30:00');
INSERT INTO Seminar_Announcement (seminar_id, message, date_created, date_modified) VALUES (3,'Reminder to participants to bring laptops',TIMESTAMP '2018-10-23 8:30:00+02', TIMESTAMP '2018-10-23 8:30:00+02');


-- One user following
INSERT INTO User_Following (user_id, following_user_id) VALUES (4,1);

-- Updating current capacity of the events in the DB
DO
$do$
BEGIN
    FOR i IN 1..5 LOOP
    
    
        UPDATE "event" 
            SET current_capacity =subquery.count
        FROM
            (SELECT count(*)
            FROM event_participation
            WHERE event_id = i AND attending = true) AS subquery
        WHERE event.id=i;
    
        UPDATE "seminar" 
            SET current_capacity =subquery.count
        FROM
            (SELECT count(*)
            FROM seminar_participation
            WHERE seminar_id = i AND attending = true) AS subquery
        WHERE seminar.id=i;



   END LOOP;
END
$do$;


