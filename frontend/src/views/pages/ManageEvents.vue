<template>

<vue-scroll class="page-dashboard">
  <div>
    <el-tabs type="border-card" style="width:100%" @tab-click="changeTab">
      <el-tab-pane label="All">
        <add-event/>
        <add-seminar/>
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
        <add-event/>
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
        <add-seminar/>
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
import addEvent from '@/components/addEvent.vue'
import addSeminar from '@/components/addSeminar.vue'
import {loadSeminars,loadEvents} from './helper'
import * as moment from 'moment'
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default {
  name: 'ManageEventsPage',
   data() {
      return {
        activeName: 'all',
        filter: "None",
        currentList: [],
        user: this.$store.state.user
      };
    },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll(){
      fetch({
        query: `{
          getMyManagingEventsAndSeminars(userID: ${this.user.id}) {
            __typename
            ... on Event {
              id
              creator_id
            }
            ... on Seminar {
              id
            }
          }
        }`
      })
      .then(res =>{
        if(res.data){
          var result = []
          res.data.getMyManagingEventsAndSeminars.forEach(element => {
            if (element.creator_id === this.user.id){
              result.push(element)
            } else if ( element.__typename === "Seminar") {
              result.push(element)
            }
          })
        
          result.forEach(element => {
            if (element.__typename === "Seminar") {
              this.formatSeminar(element.id)
            } else {
              this.formatEvent(element.id)
            }
          })
        }
      })
      .catch(err =>{
        console.log(err)
      })
    },
    getEvent(){
      fetch({
        query: `{
          getMyManagingEventsAndSeminars(userID: ${this.user.id}) {
            __typename
            ... on Event {
              id
              creator_id
            }
          }
        }`
      })
      .then(res =>{
        if(res.data){
          res.data.getMyManagingEventsAndSeminars.forEach(event => {
            if (event.id && event.creator_id === this.user.id) {
              this.formatEvent(event.id)                
            }
          })
        }
      })
    },
    getSeminar(){
      fetch({
        query: `{
          getMyManagingEventsAndSeminars(userID: ${this.user.id}) {
            __typename
            ... on Seminar {
              id
            }
          }
        }`
      })
      .then(res =>{
        if(res.data){
          res.data.getMyManagingEventsAndSeminars.forEach(event => {
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
    changeTab(tab) {
      this.currentList = []
      if (tab.label === "All") {
        this.getAll()
      } else if (tab.label === "Event") {
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
    seminarCard, 
    addEvent,
    addSeminar
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


