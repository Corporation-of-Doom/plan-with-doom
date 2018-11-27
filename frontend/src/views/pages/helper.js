import { createApolloFetch } from "apollo-fetch"
import * as moment from 'moment'
import store from '../../store'
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export function loadEvents(id){
    // gets all the information about an event
    return fetch({
      query: `{
        getEventByID(id:${id}){
          name
          creator_id
          description
          start_time
          end_time
          location
          max_capacity
					current_capacity
          announcements{
            date_modified
            message
          }
          seminars{
            id
            name
            description
            start_time
            end_time
            location
            organizers{
              id
              first_name
              middle_name
              last_name
            }
          }
          organizers{
            id
            first_name
            middle_name
            last_name
          }
        }
      }`
    })
    .then(res => {
        if(res.data){
        // formats event for Events page
        var eventInfo = res.data.getEventByID
        var user = store.getters.getUser
        eventInfo.start_time_utc = eventInfo.start_time
        eventInfo.end_time_utc = eventInfo.end_time
        eventInfo.start_time =  moment(parseInt(eventInfo.start_time,10)).format("MMMM Do YYYY, h:mm a")
        eventInfo.end_time =  moment(parseInt(eventInfo.end_time,10)).format("MMMM Do YYYY, h:mm a")
        eventInfo.announcements.forEach(event => {
            event.date_modified =  moment(parseInt(event.date_modified,10)).format("MMMM Do YYYY, h:mm a")
        });
        eventInfo.seminars.forEach(seminar => {
            seminar.start_time =  moment(parseInt(seminar.start_time,10)).format("MMMM Do YYYY, h:mm a")
            seminar.end_time =  moment(parseInt(seminar.end_time,10)).format("MMMM Do YYYY, h:mm a")
        })
        // checks to see if the user is following the event
        if(user.follow.filter(item => item.__typename === "Event" && item.id === id).length > 0){
            eventInfo.follow = true
        }else{
            eventInfo.follow = false
        }
        if(user.attend.filter(item => item.__typename === "Event" && item.id === id).length > 0){
            eventInfo.attend = true
        }else{
            eventInfo.attend = false
        }
        if(user.manage.filter(item => item.__typename === "Event" && item.id === id).length > 0){
            eventInfo.manage = true
        }else{
            eventInfo.manage = false
        }
        if(user.waitlist.filter(item => item.__typename === "Event" && item.id === id).length > 0){
            eventInfo.waitlist = true
        }else{
            eventInfo.waitlist = false
        }

        eventInfo.creator_id = eventInfo.organizers.filter(organizer => organizer.id === eventInfo.creator_id)[0].name
        eventInfo.id = id
        store.commit("setEvent",eventInfo)
        return true
        }
    })
}

export function loadSeminars(id){
    // gets all the information about a seminar
    return fetch({
        query: `{
          getSeminarByID(id:${id}){
            announcements{
              date_modified
              message
            }
            id
            name
            event_id
            description
            start_time
            end_time
						location
						max_capacity
						current_capacity
            organizers{
              id
              first_name
              middle_name
              last_name
            }
          }
        }`
      })
      .then(res => {
        // formats the seminars information
        var user = store.getters.getUser
        if(res.data){
          var seminarInfo = res.data.getSeminarByID
          seminarInfo.start_time_utc = seminarInfo.start_time
          seminarInfo.end_time_utc = seminarInfo.end_time
          seminarInfo.start_time =  moment(parseInt(seminarInfo.start_time,10)).format("MMMM Do YYYY, h:mm a")
          seminarInfo.end_time =  moment(parseInt(seminarInfo.end_time,10)).format("MMMM Do YYYY, h:mm a")
          seminarInfo.announcements.forEach(seminar => {
            seminar.date_modified =  moment(parseInt(seminar.date_modified,10)).format("MMMM Do YYYY, h:mm a")
          });
          // get the event the semianr is rom
          return fetch({
            query: `{
            getEventByID(id:${seminarInfo.event_id}){
                name
              }
            }`
          })
          .then(nameRes => {
            if(nameRes.data){
              console.log(nameRes.data.getEventByID.name)
              seminarInfo.event_name = nameRes.data.getEventByID.name
            }
            // chekcs if user is following the event
            if(user.follow.filter(item => item.__typename === "Seminar" && item.id === id).length > 0){
                seminarInfo.follow = true
            }else{
                seminarInfo.follow = false
            }
            if(user.manage.filter(item => item.__typename === "Seminar" && item.id === id).length > 0){
                seminarInfo.manage = true
            }else{
                seminarInfo.manage = false
            }
            if(user.attend.filter(item => item.__typename === "Event" && item.id === seminarInfo.event_id).length > 0){
                seminarInfo.hideAttend = false
                if(user.attend.filter(item => item.__typename === "Seminar" && item.id === id).length > 0){
                    seminarInfo.attend = true
                }else{
                    seminarInfo.attend = false
                }
                if(user.waitlist.filter(item => item.__typename === "Seminar" && item.id === id).length > 0){
                    seminarInfo.waitlist = true
                }else{
                    seminarInfo.waitlist = false
                }
            } else {
              seminarInfo.hideAttend = true
            }
            console.log('Follow: '+ seminarInfo.follow)
            console.log('Attend: '+ seminarInfo.attend)
            console.log('Manage: '+ seminarInfo.manage)
            console.log('Waitlist: '+ seminarInfo.waitlist)
            seminarInfo.id=id
            store.commit("setSeminar",seminarInfo)
            return true
          })
        }
      })

}

export function followAndAttend(type, partType){
    var user = store.getters.getUser
    var event = store.getters.getEvent
    var seminar = store.getters.getSeminar
    var call

    if (type === 'Event') {
        call = {
            query: `mutation addUserToEvent($newUser: EventParticipationInput!) {
                addUserToEvent(EventParticipation: $newUser)   
            }`,
            variables: {
                newUser: {
                    userid: user.id,
                    eventid: event.id,
                    participationType: partType
                }
            }    
            ,
            id: event.id
        }
    } else if(type === 'Seminar') {
        call = {
            query: `mutation addUserToSeminar($newUser: SeminarParticipationInput!) {
                addUserToSeminar(SeminarParticipation: $newUser)
              }`,
            variables: {
                newUser: {
                    userid: user.id,
                    seminarid: seminar.id,
                    participationType: partType
                }
            }, 
            id: seminar.id
        }
    }

    return fetch({query: call.query,
        variables: call.variables
    })
    .then(res =>{
        console.log(res, call)
        if(res.data){
            var payload = {
              __typename: type,
              id: call.id
            }
            if (partType === 'FOLLOWING') {
                store.commit("addToFollow", payload)
            } else if ([artType === 'ATTENDING']) {
                store.commit("addToAttend", payload)
            }
            return true
        } else {
            console.log("not following")
            return false
        }
    })
    .catch(err =>{
        console.log(err)
        return false
    })
}

export function unfollowAndUnattend(type, partType){
    var user = store.getters.getUser
    var event = store.getters.getEvent
    var seminar = store.getters.getSeminar
    var call

    if (type === 'Event') {
        call = {
            query: `mutation removeUserFromEvent($newUser: EventParticipationInput!) {
                removeUserFromEvent(EventParticipation: $newUser)   
              }`,
            variables: {
                newUser: {
                    userid: user.id,
                    eventid: event.id,
                    participationType: partType
                }
            },
            id: event.id
        }
    } else if(type === 'Seminar') {
        call = {
            query: `mutation removeUserFromSeminar($newUser: SeminarParticipationInput!) {
                removeUserFromSeminar(SeminarParticipation: $newUser)
            }`,
            variables: {
                newUser: {
                    userid: user.id,
                    seminarid: seminar.id,
                    participationType: partType
                }
            }, 
            id: seminar.id
        }
    }

    return fetch({query: call.query,
        variables: call.variables
    })
    .then(res =>{
        if(res.data){
            var payload = {
              __typename: type,
              id: call.id
            }
            if (partType === 'FOLLOWING') {
                store.commit("removeFromFollow", payload)
            } else if ([artType === 'ATTENDING']) {
                store.commit("removeFromAttend", payload)
            }
            return true
        } else {
            console.log("not following")
            return false
        }
    })
    .catch(err =>{
        console.log(err)
        return false
    })
}