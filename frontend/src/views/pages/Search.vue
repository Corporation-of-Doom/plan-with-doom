<template>
  <vue-scroll>
    <div>
      <el-tabs type="border-card" style="width:100%" @tab-click="changeTab">
        <!-- All seminars and event -->
        <el-tab-pane label="All">
            <el-input
              placeholder="Search"
              prefix-icon="el-icon-search"
              v-model="searchInput"
              @change="onSearch"
            />
          <div>
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

              <el-pagination
                  :page-size="10"
                  layout="prev, pager, next"
                  :total="total">
                >
              </el-pagination>
          </div>
        </el-tab-pane>

        <!-- Events only -->
        <el-tab-pane label="Event">
           <el-input
              placeholder="Search"
              prefix-icon="el-icon-search"
              v-model="searchInput"
              @change="onSearch"
            />
          <div>
              <div v-for="(item,key) in currentList" :key="key">
                <div v-if="item" >
                  
                  <event-card
                  @click.native="loadEvent(item.id)"
                  :item="item" /> 
                </div>
              </div>

              <el-pagination
                  :page-size="10"
                  layout="prev, pager, next"
                  :total="total">
                >
              </el-pagination>
          </div>
        </el-tab-pane>
        <!-- Seminar only -->
        <el-tab-pane label="Seminar">
           <el-input
              placeholder="Search"
              prefix-icon="el-icon-search"
              v-model="searchInput"
              @change="onSearch"
            />
          <div>
              <div v-for="(item,key) in currentList" :key="key">
                <div v-if="item" >
                  <seminar-card
                    @click.native="loadSeminar(item.id)"
                      :item="item"
                    />
                </div>
              </div>

              <el-pagination
                  :page-size="10"
                  layout="prev, pager, next"
                  :total="total">
                >
              </el-pagination>
          </div>
        </el-tab-pane>       
      </el-tabs>
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
  name: 'SearchPage',
   data() {
      return {
        activeName: 'All',
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
          searchByName(searchString: "") {
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
          this.currentList.forEach((element,key) => {
            element.start_time =  moment(parseInt(element.start_time,10)).format("MMMM Do YYYY, h:mm a")
            element.end_time =  moment(parseInt(element.end_time,10)).format("MMMM Do YYYY, h:mm a")
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
      changeTab(tab, event) {
        this.activeName = tab.label
        this.searchInput = ""
        if (tab.label === "All") {
          // get cards for the "All" section of the search page
          fetch({
            query: `{
              searchByName(searchString: "", limit: 10, offset: 0) {
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
              // formating the cards
              this.currentList = res.data.searchByName
              this.currentList.forEach((element,key) => {
                element.start_time =  moment(parseInt(element.start_time,10)).format("MMMM Do YYYY, h:mm a")
                element.end_time =  moment(parseInt(element.end_time,10)).format("MMMM Do YYYY, h:mm a")
                if(element.event_id){
                  // adding event names to seminars
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
                  // getting creator of the events
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

          // Getting total number of cards for pagination
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
        } else if (tab.label === "Event"){
          // gets all the events for thr "Events" tb on search
          fetch({
            query: `{
              searchByName(searchString: "", type:"event", limit: 10, offset: 0) {
                ... on Event {
                  id
                  start_time
                  end_time
                  name
                  creator_id
                  event_location: location
                }
              }
            }`
          })
          .then(res => {
            if (res.data) {
              // formats the cards
              this.currentList = res.data.searchByName
              this.currentList.forEach((element,key) => {
                element.start_time =  moment(parseInt(element.start_time,10)).format("MMMM Do YYYY, h:mm a")
                element.end_time =  moment(parseInt(element.end_time,10)).format("MMMM Do YYYY, h:mm a")
                // gets the event organizors names
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
                    // formats creator id into something readable
                    var result = organizerRes.data.getEventByID.organizers.filter(organizer => organizer.id === element.creator_id)[0]
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
              });
            } else {
              this.form.error = res.errors[0].message;
            }
          })
          .catch(err => {
            console.log(err);
          });
          // get total number of evetns for pagination
          fetch({
            query: `{
              getTotalSearchResults(searchString: "", type:"event") 
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
        } else {
          // gets all the seminars
          fetch({
            query: `{
              searchByName(searchString: "", type:"seminar", limit: 10, offset: 0) {
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
              // formats the semianr cards
              this.currentList = res.data.searchByName
              this.currentList.forEach((element,key) => {
                element.start_time =  moment(parseInt(element.start_time,10)).format("MMMM Do YYYY, h:mm a")
                element.end_time =  moment(parseInt(element.end_time,10)).format("MMMM Do YYYY, h:mm a")
                // gets events name
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
              });
            } else {
              this.form.error = res.errors[0].message;
            }
          })
          .catch(err => {
            console.log(err);
          });
          // gets total number of seminars for pagination
          fetch({
            query: `{
              getTotalSearchResults(searchString: "", type: "seminar") 
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
      nextPage(event){
        console.log(event, this.keyword)
        // simailar to onSearch
        // use key word 
      }, 
      onSearch(event){
        if(this.activeName === 'All'){
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
        } else if (this.activeName === 'Event'){
          // gets events when searched by key word
          fetch({
            query: `{
              searchByName(searchString: "${event}", type:"event" limit: 10, offset: 0) {
                ... on Event {
                  id
                  start_time
                  end_time
                  name
                  creator_id
                  event_location: location
                }
              }
            }`
          })
          .then(res => {
            if (res.data) {
              // fomats event
              this.currentList = res.data.searchByName
              this.currentList.forEach((element,key) => {
                element.start_time =  moment(parseInt(element.start_time,10)).format("MMMM Do YYYY, h:mm a")
                element.end_time =  moment(parseInt(element.end_time,10)).format("MMMM Do YYYY, h:mm a")
                // gets cerator name 
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
                    // formats creator name
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
              });
            } else {
              this.form.error = res.errors[0].message;
            }
          })
          .catch(err => {
            console.log(err);
          });
          // gets total events for pagination
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
        } else {
          // gets all the semianrs based on key word
          fetch({
            query: `{
              searchByName(searchString: "${event}", type:"seminar" limit: 10, offset: 0) {
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
              // formats the semianrs
              this.currentList = res.data.searchByName
              this.currentList.forEach((element,key) => {
                element.start_time =  moment(parseInt(element.start_time,10)).format("MMMM Do YYYY, h:mm a")
                element.end_time =  moment(parseInt(element.end_time,10)).format("MMMM Do YYYY, h:mm a")
                // get the event the seminar is from
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
              });
            } else {
              this.form.error = res.errors[0].message;
            }
          })
          .catch(err => {
            console.log(err);
          });
          // gets totsl for pagination
          fetch({
            query: `{
              getTotalSearchResults(searchString: "${event}", type: "seminar") 
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
        }
        
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
