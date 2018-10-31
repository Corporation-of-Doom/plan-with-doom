<template>
  <vue-scroll>
    <div>
      <el-tabs type="border-card" style="width:100%" @tab-click="handleClick">
        <!-- All seminars and event -->
        <el-tab-pane label="All">
            <el-input
              placeholder="Search"
              prefix-icon="el-icon-search"
              v-model="searchInput"
              @change="onChange"
            />
          <div class="block">
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
              @change="onChange"
            />
          <div class="block">
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
              @change="onChange"
            />
          <div class="block">
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
      };
    },
   mounted() {
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
          this.currentList = res.data.searchByName
          this.currentList.forEach((element,key) => {
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
                  console.log(result)
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
      fetch({
        query: `{
          getTotalSearchResults(searchString: "") 
        }`
      })
      .then(res=> {
        if(res.data){
          console.log(res.data)
          this.total = res.data.getTotalSearchResults;
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    methods: {
      handleClick(tab, event) {
        this.activeName = tab.label
        this.searchInput = ""
        if (tab.label === "All") {
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
              this.currentList = res.data.searchByName
              this.currentList.forEach((element,key) => {
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
          fetch({
            query: `{
              getTotalSearchResults(searchString: "") 
            }`
          })
          .then(res=> {
            if(res.data){
              console.log(res.data)
              this.total = res.data.getTotalSearchResults;
            }
          })
          .catch(err => {
            console.log(err)
          })
        } else if (tab.label === "Event"){
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
              this.currentList = res.data.searchByName
              this.currentList.forEach((element,key) => {
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
                  console.log(result)
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
          fetch({
            query: `{
              getTotalSearchResults(searchString: "", type:"event") 
            }`
          })
          .then(res=> {
            if(res.data){
              console.log(res.data)
              this.total = res.data.getTotalSearchResults;
            }
          })
          .catch(err => {
            console.log(err)
          })
        } else {
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
              this.currentList = res.data.searchByName
              this.currentList.forEach((element,key) => {
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
          fetch({
            query: `{
              getTotalSearchResults(searchString: "", type: "seminar") 
            }`
          })
          .then(res=> {
            if(res.data){
              console.log(res.data)
              this.total = res.data.getTotalSearchResults;
            }
          })
          .catch(err => {
            console.log(err)
          })
        }
      },
      loadEvent(id){
        // this.$store.commit(setEventID,id)
        // this.$router.push("event")
      },
      loadSeminar(id){
        // this.$store.commit(setEventID,id)
        // this.$router.push("event")
      },
      nextPage(event){
        console.log(event)
      }, 
      onChange(event){
        console.log(event, this.activeName)
        if(this.activeName === 'All'){
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
              this.currentList.forEach((element,key) => {
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
          fetch({
            query: `{
              getTotalSearchResults(searchString: "${event}") 
            }`
          })
          .then(res=> {
            if(res.data){
              console.log(res.data)
              this.total = res.data.getTotalSearchResults;
            }
          })
          .catch(err =>{
            console.log(err)
          })
        } else if (this.activeName === 'Event'){
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
              this.currentList = res.data.searchByName
              this.currentList.forEach((element,key) => {
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
              });
            } else {
              this.form.error = res.errors[0].message;
            }
          })
          .catch(err => {
            console.log(err);
          });
          fetch({
            query: `{
              getTotalSearchResults(searchString: "${event}") 
            }`
          })
          .then(res=> {
            if(res.data){
              console.log(res.data)
              this.total = res.data.getTotalSearchResults;
            }
          })
          .catch(err =>{
            console.log(err)
          })
        } else {
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
              this.currentList = res.data.searchByName
              this.currentList.forEach((element,key) => {
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
          fetch({
            query: `{
              getTotalSearchResults(searchString: "${event}", type: "seminar") 
            }`
          })
          .then(res=> {
            if(res.data){
              console.log(res.data)
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
