<template>
  <vue-scroll>
    <div>
      <el-tabs type="border-card" style="width:100%" @tab-click="changeTab"> 
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
                  :follow="user.follow.filter(event => event.id === item.id && event.__typename === 'Seminar').length>0"
                  :attend="user.attend.filter(event => event.id === item.id && event.__typename === 'Seminar').length>0"
                  :waitlist="user.waitlist.filter(event => event.id === item.id && event.__typename === 'Seminar').length>0"
                />
              <event-card v-else 
                @click.native="loadEvent(item.id)"
                :item="item"
                :follow="user.follow.filter(element => element.id === item.id && element.__typename === 'Event').length>0"
                :attend="user.attend.filter(element => element.id === item.id && element.__typename === 'Event').length>0"
                :waitlist="user.waitlist.filter(element => element.id === item.id && element.__typename === 'Event').length>0"
               /> 
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
                :follow="user.follow.filter(event => event.id === item.id && event.__typename === 'Seminar').length>0"
                :attend="user.attend.filter(event => event.id === item.id && event.__typename === 'Seminar').length>0"
                :waitlist="user.waitlist.filter(event => event.id === item.id && event.__typename === 'Seminar').length>0"
              />
              <event-card v-else 
                @click.native="loadEvent(item.id)"
                :item="item"
                :follow="user.follow.filter(event => event.id === item.id && event.__typename === 'Event').length>0"
                :attend="user.attend.filter(event => event.id === item.id && event.__typename === 'Event').length>0"
                :waitlist="user.waitlist.filter(event => event.id === item.id && event.__typename === 'Event').length>0"
               /> 
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
                :follow="user.follow.filter(event => event.id === item.id && event.__typename === 'Seminar').length>0"
                :attend="user.attend.filter(event => event.id === item.id && event.__typename === 'Seminar').length>0"
                :waitlist="user.waitlist.filter(event => event.id === item.id && event.__typename === 'Seminar').length>0"
              />
              <event-card v-else 
                @click.native="loadEvent(item.id)"
                :item="item" 
                :follow="user.follow.filter(event => event.id === item.id && event.__typename === 'Event').length>0"
                :attend="user.attend.filter(event => event.id === item.id && event.__typename === 'Event').length>0"
                :waitlist="user.waitlist.filter(event => event.id === item.id && event.__typename === 'Event').length>0"
              /> 
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
import {loadSeminars,loadEvents} from './helper'
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default {
  name: 'MyEventsPage',
   data() {
      return {
        activeName: 'All',
        filter: "None",
        currentList:[],
        user: this.$store.state.user,
      };
    },
     mounted() {
      this.getAll()
    },
    methods: {
      getAll(){
       console.log(this.user.attend)
        console.log(this.user.attend.filter(event => event.id === 3 && event.__typename === 'Event'))
        console.log((this.user.attend.filter(event => event.id === 3 && event.__typename === 'Event').length)>0)
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
            getMyEventsAndSeminars(userID: ${this.user.id}${call}) {
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
          if(res.data.getMyEventsAndSeminars){
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
            getMyEventsAndSeminars(userID: ${this.user.id}${call}) {
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
            getMyEventsAndSeminars(userID: ${this.user.id}${call}) {
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
            info.start_time =  moment(parseInt(info.start_time,10)).format("MMM Do YYYY, h:mm a")
            info.end_time =  moment(parseInt(info.end_time,10)).format("MMM Do YYYY, h:mm a")
            fetch({
                query: `{
                 getEventByID(id:${info.event_id}){
                    name
                  }
                }`
              })
              .then(nameRes => {
                if(nameRes.data){
                  info.event_name = nameRes.data.getEventByID.name
                } else {
                  info.event_name = "Event Name Not Found"
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
            info.start_time =  moment(parseInt(info.start_time,10)).format("MMM Do YYYY, h:mm a")
            info.end_time =  moment(parseInt(info.end_time,10)).format("MMM Do YYYY, h:mm a")
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
      changeTab(tab) {
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
        loadEvents(id).then(function(result) {
          if (result){
            this.$router.push("event")
          } else{
            console.log("something went wrong")
          }
        }.bind(this))
      },
      loadSeminar(id){
        loadSeminars(id).then(function(result) {
          if (result){
            this.$router.push("seminar")
          } else{
            console.log("something went wrong")
          }
        }.bind(this))
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

