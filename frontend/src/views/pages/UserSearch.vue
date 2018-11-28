<template>
  <vue-scroll class="page-dashboard">
    <div class="timeline-box card-base card-shadow--medium" style="height: auto; padding: 20px">
      <div style="height:20%" v-for="item in currentList" :key="item.id">
        <el-card shadow="always" style="text-align:center;padding:20px;margin-bottom:10px;height:20%" @click.native="loadUser(item.id)">
          <el-col> {{item.first_name}} {{item.middle_name}} {{item.last_name}} </el-col>
        </el-card>
      </div>
    </div>
  </vue-scroll>
</template>

<script>
import seminarCard from '@/components/seminarCard.vue'
import eventCard from '@/components/eventCard.vue'
import Search from '@/components/Search.vue'
import { createApolloFetch } from "apollo-fetch"
import * as moment from 'moment'
import {loadEvents, loadSeminars} from './helper'
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default {
  name: 'UserSearch',
   data() {
      return {
        searchInput: "",
        offSet: 0,
        currentList: [],
        total: 0,
        key: 0,
        user: this.$store.state.user
      };
    },
   mounted() {
    //  gets all the cards for events and seminars
      fetch({
        query: `{
          searchUsersByName(searchString: "") {
            id
            first_name
            middle_name
            last_name
          }
        }`
      })
      .then(res => {
        if (res.data) {
          this.currentList = res.data.searchUsersByName.filter(item => item.id != this.user.id)
        }
      })
      .catch(err => {
        console.log(err);
      });
      // gets the total number of cards and sets the total variable for pagination
      fetch({
        query: `{
          getTotalSearchResults(searchString: "") 
        }`
      })
      .then(res=> {
        if(res.data){
          this.total = res.data.getTotalSearchResults;
        }
      })
      .catch(err => {
        console.log(err)
      })
    },

    methods: {
      onSearch(event){
        // seach all events and semina based on key word
        fetch({
          query: `{
            searchByName(searchString: "${event}", limit: 10, offset: 0) {
              ... on Event {
                id
                start_time
                end_time
                name
                creator_id
                event_location: location
              }
              ... on Seminar {
                id
                start_time
                end_time
                name
                location
                event_id
              }
            }
          }`
        })
        .then(res => {
          if (res.data) {
            this.currentList = res.data.searchByName
            // formats each card
            this.currentList.forEach((element,key) => {
              element.start_time =  moment(parseInt(element.start_time,10)).format("MMMM Do YYYY, h:mm a")
              element.end_time =  moment(parseInt(element.end_time,10)).format("MMMM Do YYYY, h:mm a")
              // gets name of event the seminar is in
              if(element.event_id){
                fetch({
                  query: `{
                  getEventByID(id:${element.event_id}){
                      name
                    }
                  }`
                })
                .then(nameRes => {
                  if(nameRes.data){
                    element.event_id = nameRes.data.getEventByID.name
                  } else {
                    element.event_id = "Event Name Not Found"
                  }
                })
              } else {
                // get the name of the creator of the event
                fetch({
                  query: `{
                    getEventByID(id:${element.id}){
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
                    var result = organizerRes.data.getEventByID.organizers.filter(organizer => organizer.id === element.creator_id)[0]
                    // makes the name of creator more readable
                    element.creator_id = null
                    if (result.first_name) {
                      element.creator_id = result.first_name
                    }
                    if (result.middle_name) {
                      element.creator_id +=  " " + result.middle_name
                    }
                    if (result.last_name) {
                      element.creator_id +=  " " + result.last_name
                    }
                  }
                })
              }
            });
          } else {
            this.form.error = res.errors[0].message;
          }
        })
        .catch(err => {
          console.log(err);
        });
        // gets total number events and seminar for pagination
        fetch({
          query: `{
            getTotalSearchResults(searchString: "${event}") 
          }`
        })
        .then(res=> {
          if(res.data){
            this.total = res.data.getTotalSearchResults;
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      loadUser(id){
        fetch({
          query: `{
            getUserById(userID: ${id}){
              first_name
              middle_name
              last_name
              email
              organization
              linked_in
              twitter
              facebook
              instagram
              phone_number
              privacy_settings
              about_me
            } 
          }`
        })
        .then(res => {
          if(res.data.getUserById){
            this.$store.commit("loadUser",res.data.getUserById)
            this.$router.push("userprofile")
          } else {
            this.$message({
              message: "Something went wrong loading the user :("
            })
          }
        })
      }
    },
  components: {
    seminarCard,
    eventCard,
    Search
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
