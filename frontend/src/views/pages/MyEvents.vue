<template>
  <vue-scroll class="page-dashboard">
    <div>
      <el-tabs type="border-card" style="width:100%" @tab-click="handleClick"> 
        <el-tab-pane label="All">
          <el-row type="flex" class="row-bg">
            Fliter:
            <el-dropdown @command="changeFilter" style="margin-left:10px;margin-top:1px;" >
              <span class="el-dropdown-link">
                {{ filter }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="None">None</el-dropdown-item>
                <el-dropdown-item command="Attending">Attending</el-dropdown-item>
                <el-dropdown-item command="Following">Following</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
          <div v-for="(item,key) in currentList" :key="key">
            <div v-if="item" >
              <seminar-card v-if="item.event_id" 
                @click.native="loadSeminar(item.id)"
                  :item="item"
                />
              <event-card v-else 
              @click.native="loadEvent(item.id)"
              :item="item" /> 
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Event">
          <el-row type="flex" class="row-bg">
            Fliter:
            <el-dropdown @command="changeFilter" style="margin-left:10px;margin-top:1px;" >
              <span class="el-dropdown-link">
                {{ filter }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="None">None</el-dropdown-item>
                <el-dropdown-item command="Attending">Attending</el-dropdown-item>
                <el-dropdown-item command="Following">Following</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
            <div v-for="(item,key) in currentList" :key="key">
            <div v-if="item" >
              <seminar-card v-if="item.event_id" 
                @click.native="loadSeminar(item.id)"
                  :item="item"
                />
              <event-card v-else 
              @click.native="loadEvent(item.id)"
              :item="item" /> 
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Seminar">
          <el-row type="flex" class="row-bg">
            Fliter:
            <el-dropdown @command="changeFilter" style="margin-left:10px;margin-top:1px;" >
              <span class="el-dropdown-link">
                {{ filter }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="None">None</el-dropdown-item>
                <el-dropdown-item command="Attending">Attending</el-dropdown-item>
                <el-dropdown-item command="Following">Following</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
          <div v-for="(item,key) in currentList" :key="key">
            <div v-if="item" >
              <seminar-card v-if="item.event_id" 
                @click.native="loadSeminar(item.id)"
                  :item="item"
                />
              <event-card v-else 
              @click.native="loadEvent(item.id)"
              :item="item" /> 
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </vue-scroll>
</template>

<script>
import seminarCard from '@/components/seminarCard.vue'
import Search from '@/components/Search.vue'
import * as moment from 'moment'
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default {
  name: 'MyEventsPage',
   data() {
      return {
        activeName: 'All',
        filter: "None",
        currentList:[],
        userId: this.$store.state.user.id,
      };
    },
     mounted() {
      this.getAll()
    },
    methods: {
      getAll(){
        this.currentList = []
        var call
        if (this.filter === "None") {
          call = ''
        } else if (this.filter === "Attending") {
          call = ', participationType: ATTENDING '
        } else {
          call = ', participationType: FOLLOWING'
        }
        fetch({
          query: `{
            getMyEventsAndSeminars(userID: ${this.userId}${call}) {
              __typename
              ... on Event {
                id
              }
              ... on Seminar {
                id
              }
            }
          }`
        })
        .then(res =>{
          if(res.data){
            var result = res.data.getMyEventsAndSeminars
            result.forEach(element => {
              if (element.__typename === "Seminar") {
                this.formatSeminar(element.id)
              } else {
                this.formatEvent(element.id)
              }
            });
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      getEvent(){
        this.currentList = []
        var call
        if (this.filter === "None") {
          call = ''
        } else if (this.filter === "Attending") {
          call = ', participationType: ATTENDING '
        } else {
          call = ', participationType: FOLLOWING'
        }
        fetch({
          query: `{
            getMyEventsAndSeminars(userID: ${this.userId}${call}) {
              __typename
              ... on Event {
                id
              }
            }
          }`
        })
        .then(res =>{
          if(res.data){
            res.data.getMyEventsAndSeminars.forEach(event => {
              if (event.id) {
                this.formatEvent(event.id)                
              }
            })
          }
        })
      },
      getSeminar(){
        this.currentList = []
        var call
        if (this.filter === "None") {
          call = ''
        } else if (this.filter === "Attending") {
          call = ', participationType: ATTENDING '
        } else {
          call = ', participationType: FOLLOWING'
        }
        fetch({
          query: `{
            getMyEventsAndSeminars(userID: ${this.userId}${call}) {
              __typename
              ... on Seminar {
                id
              }
            }
          }`
        })
        .then(res =>{
          if(res.data){
            res.data.getMyEventsAndSeminars.forEach(event => {
              if (event.id) {
                this.formatSeminar(event.id)                
              }
            })
          }
        })
      },
      formatSeminar(id){
        fetch({
          query: `{
            getSeminarByID(id: ${id} ) {
              id
              start_time
              end_time
              name
              location
              event_id
            }
          }`
        })
        .then(res =>{
          if(res.data){
            var info = res.data.getSeminarByID;
            info.start_time =  moment(parseInt(info.start_time,10)).format("MMMM Do YYYY, h:mm a")
            info.end_time =  moment(parseInt(info.end_time,10)).format("MMMM Do YYYY, h:mm a")
            fetch({
                query: `{
                 getEventByID(id:${info.event_id}){
                    name
                  }
                }`
              })
              .then(nameRes => {
                if(nameRes.data){
                  info.event_id = nameRes.data.getEventByID.name
                } else {
                  info.event_id = "Event Name Not Found"
                }
                this.currentList.push(info)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      formatEvent(id){
        fetch({
          query: `{
            getEventByID(id: ${id} ) {
              id
              start_time
              end_time
              name
              creator_id
              event_location: location
            }
          }`
        })
        .then(res =>{
          if(res.data){
            var info = res.data.getEventByID;
            info.start_time =  moment(parseInt(info.start_time,10)).format("MMMM Do YYYY, h:mm a")
            info.end_time =  moment(parseInt(info.end_time,10)).format("MMMM Do YYYY, h:mm a")
            fetch({
              query: `{
                getEventByID(id:${info.id}){
                  organizers {
                    id
                    first_name
                    middle_name
                    last_name
                  }
                }
              }`
            })
            .then(organizerRes => {
              if(organizerRes.data){
                var result = organizerRes.data.getEventByID.organizers.filter(organizer => organizer.id === info.creator_id)[0]
                info.creator_id = null
                if (result.first_name) {
                  info.creator_id = result.first_name
                }
                if (result.middle_name) {
                  info.creator_id +=  " " + result.middle_name
                }
                if (result.last_name) {
                  info.creator_id +=  " " + result.last_name
                }
                this.currentList.push(info)
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      handleClick(tab) {
        this.activeName = tab.label
        this.filter = 'None'
        if (tab.label === "All") {
          this.getAll()
        } else if (tab.label === "Event") {
          this.getEvent()
        } else {
          this.getSeminar()
          
        }
      },
      changeFilter(command){
        this.filter = command;
        if (this.activeName === "All") {
          this.getAll()          
        } else if (this.activeName === "Event") {
          this.getEvent()
        } else {
          this.getSeminar()
        }
      },
      loadEvent(id){
        // gets all the information about an event
        fetch({
          query: `{
            getEventByID(id:${id}){
              name
              creator_id
              description
              start_time
              end_time
              location
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
            eventInfo.start_time =  moment(parseInt(eventInfo.start_time,10)).format("MMMM Do YYYY, h:mm a")
            eventInfo.end_time =  moment(parseInt(eventInfo.end_time,10)).format("MMMM Do YYYY, h:mm a")
            eventInfo.announcements.forEach(event => {
              event.date_modified =  moment(parseInt(event.date_modified,10)).format("MMMM Do YYYY, h:mm a")
            });
            eventInfo.seminars.forEach(seminar => {
              seminar.start_time =  moment(parseInt(seminar.start_time,10)).format("MMMM Do YYYY, h:mm a")
              seminar.end_time =  moment(parseInt(seminar.end_time,10)).format("MMMM Do YYYY, h:mm a")
            })
            eventInfo.organizers.forEach(organizer => {
              organizer.name = ''
              if (organizer.first_name) {
                organizer.name = organizer.first_name
              }
              if (organizer.middle_name) {
                organizer.name +=  " " + organizer.middle_name
              }
              if (organizer.last_name) {
                organizer.name +=  " " + organizer.last_name
              }
              
            })
            // checks to see if the user is following the event
            fetch({
              query: `{
                getMyEventsAndSeminars(userID:${this.$store.state.user.id}, participationType:FOLLOWING){
                  ...on Event{
                    id
                  }
                }
              }`
              })
            .then(res => {
              if (res.data.getMyEventsAndSeminars.length > 0) {
                var result = res.data.getMyEventsAndSeminars.filter(event => event.id === id)
                if (result.length>0) {
                  eventInfo.follow = true
                } else{
                  eventInfo.follow = false
                }
              } else {
                eventInfo.follow = false
              }
              // checks to see if the user is attending the vent
              fetch({
                query: `{
                  getMyEventsAndSeminars(userID:${this.$store.state.user.id}, participationType:ATTENDING){
                    ...on Event{
                      id
                    }
                  }
                }`
                })
              .then(res => {
                if (res.data.getMyEventsAndSeminars.length > 0) {
                  var result = res.data.getMyEventsAndSeminars.filter(event => event.id === id)
                  if (result.length>0) {
                    eventInfo.attend = true
                  } else{
                    eventInfo.attend = false
                  }
                } else {
                  eventInfo.attend = false
                }
                eventInfo.creator_id = eventInfo.organizers.filter(organizer => organizer.id === eventInfo.creator_id)[0].name
                eventInfo.id = id
                this.$store.commit("setEvent",eventInfo)
                this.$router.push("event")
              })
            })
          }
        })
          
      },
      loadSeminar(id){
        // gets all the information about a seminar
        fetch({
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
          if(res.data){
            var seminarInfo = res.data.getSeminarByID
            seminarInfo.start_time =  moment(parseInt(seminarInfo.start_time,10)).format("MMMM Do YYYY, h:mm a")
            seminarInfo.end_time =  moment(parseInt(seminarInfo.end_time,10)).format("MMMM Do YYYY, h:mm a")
            seminarInfo.announcements.forEach(seminar => {
              seminar.date_modified =  moment(parseInt(seminar.date_modified,10)).format("MMMM Do YYYY, h:mm a")
            });
            // get the event the semianr is rom
            fetch({
              query: `{
              getEventByID(id:${seminarInfo.event_id}){
                  name
                }
              }`
            })
            .then(nameRes => {
              if(nameRes.data){
                seminarInfo.event_id = nameRes.data.getEventByID.name
              }
              // chekcs if user is following the event
              fetch({
              query: `{
                getMyEventsAndSeminars(userID:${this.$store.state.user.id}, participationType:FOLLOWING){
                  ...on Seminar{
                    id
                  }
                }
              }`
              })
            .then(res => {
              if (res.data.getMyEventsAndSeminars.length > 0) {
                var result = res.data.getMyEventsAndSeminars.filter(event => event.id === id)
                if (result.length>0) {
                  seminarInfo.follow = true
                } else{
                  seminarInfo.follow = false
                }
              } else {
                seminarInfo.follow = false
              }
              // checks to see if the user is attending the event
              fetch({
                query: `{
                  getMyEventsAndSeminars(userID:${this.$store.state.user.id}, participationType:ATTENDING){
                    ...on Seminar{
                      id
                    }
                  }
                }`
                })
              .then(res => {
                if (res.data.getMyEventsAndSeminars.length > 0) {
                  var result = res.data.getMyEventsAndSeminars.filter(event => event.id === id)
                  if (result.length>0) {
                    seminarInfo.attend = true
                  } else{
                    seminarInfo.attend = false
                  }
                } else {
                  seminarInfo.attend = false
                }
                seminarInfo.id=id
                this.$store.commit("setSeminar",seminarInfo)
                this.$router.push("seminar")
                })
              })
            })
          }
        })
      },
    },
  components: {
    seminarCard, Search
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
@import '../../assets/scss/_mixins';

.msg-box {
	max-width: 240px;
	margin: 50px auto;

	h1 {
		@include text-bordered-shadow();
	}
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

