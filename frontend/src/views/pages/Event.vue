<template>
  <vue-scroll class="page-vuechartist" style="background:white;">
  <div style="background:white;">
    <h1 style="margin:10px; margin-top:20px;text-align:center;">{{info.name}} </h1>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin-right:10px">
        <el-button v-if="followInfo.status" @click="unfollow" type="primary" plain>{{followInfo.following}}</el-button>
        <el-button v-else @click="follow" type="primary">{{followInfo.follow}}</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-left:10px">
        <el-button v-if="attendInfo.status" @click="unattend" type="primary" plain>{{attendInfo.attending}}</el-button>
        <el-button v-else @click="attend" type="primary">{{attendInfo.attend}}</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin:10px;">
      Date: {{info.start_time}} - {{info.end_time}}
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin:10px">
      Location: {{info.location}}
      </el-col>
    </el-row>
    <hr>
    <p>Discription<p>
    <p> {{info.description}} </p>
    <el-tabs v-model="activeName">
      <el-tab-pane label="News" name="news">
        <el-card v-for="(announcement,key) in info.announcements" :key="key" class="box-card" style="margin:10px" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{announcement.date_modified}}</span>
        </div>
        <div>
          {{announcement.message}}
        </div>
      </el-card>
      </el-tab-pane>
      <el-tab-pane label="Seminars" name="seminars">
        <el-card class="box-card" style="margin:10px" v-for="(seminar,key) in info.seminars" :key="key" @click.native="loadSeminar(seminar.id)" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{seminar.name}}</span>
          </div>
          <div>
            Description<br>
            {{seminar.description}} <br>
            <!-- Organizer(s) 
            <div v-for="(organizer,key) in seminar.organizers" :key="key">
              {{organizer}}
            </div> -->
            <el-row >
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <p>Location: {{seminar.location}}</p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <p>Date: {{seminar.start_time}} - {{seminar.end_time}} </p>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="Organizers" name="organizers">
        <div v-for="(organizer,key) in info.organizers" :key="key">
          {{organizer.name}}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
    </vue-scroll>
</template>

<script>
import { createApolloFetch } from "apollo-fetch"
import * as moment from 'moment'

const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });
export default {
  name: "EventPage",
  data() {
    return {
      followInfo: {
        status: this.$store.state.event.follow,
        follow: "Follow",
        following: "Following"
      },
      attendInfo: {
        status: this.$store.state.event.attend,
        attend: "Attend",
        attending: "Attending"
      },
      activeName: "news",
      info:this.$store.state.event,
      userid:this.$store.state.user.id
    };
  },
  methods: {
    follow() {
      console.log(this.userid,this.info.id)
      fetch({query: `mutation addUserToEvent($newUser: EventParticipationInput!) {
              addUserToEvent(EventParticipation: $newUser)   
            }`,
          variables: {
            newUser: {
              userid: this.userid,
              eventid: this.info.id,
              participationType: "FOLLOWING"
            }
          }
        })
      .then(res =>{
        if(res.data){
          this.followInfo.status = !this.followInfo.status
        } else {
          console.log("not following")
        }
      })
      .catch(err =>{
        console.log(err)
      })
    },
    attend() {
      fetch({query: `mutation addUserToEvent($newUser: EventParticipationInput!) {
              addUserToEvent(EventParticipation: $newUser)   
            }`,
          variables: {
            newUser: {
              userid: this.userid,
              eventid: this.info.id,
              participationType: "ATTENDING"
            }
          }
        })
      .then(res =>{
        if(res.data){
          this.attendInfo.status = !this.attendInfo.status;     
        }
      })
    },
    loadSeminar(id) {
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
          if(res.data){
            var seminarInfo = res.data.getSeminarByID
            seminarInfo.event_id = this.info.name
            seminarInfo.id=id
            seminarInfo.start_time =  moment(parseInt(seminarInfo.start_time,10)).format("MMMM Do YYYY, h:mm a")
            seminarInfo.end_time =  moment(parseInt(seminarInfo.end_time,10)).format("MMMM Do YYYY, h:mm a")
            seminarInfo.announcements.forEach(seminar => {
              seminar.date_modified =  moment(parseInt(seminar.date_modified,10)).format("MMMM Do YYYY, h:mm a")
            });
            this.$store.commit("setSeminar",seminarInfo)
            this.$router.push("seminar")
          }
        })
    },
    unfollow(){
      fetch({query: `mutation removeUserFromEvent($newUser: EventParticipationInput!) {
              removeUserFromEvent(EventParticipation: $newUser)   
            }`,
          variables: {
            newUser: {
              userid: this.userid,
              eventid: this.info.id,
              participationType: "FOLLOWING"
            }
          }
        })
      .then(res =>{
        if(res.data){
          this.followInfo.status = !this.followInfo.status
        }
      })
    },
    unattend(){
      fetch({query: `mutation removeUserFromEvent($newUser: EventParticipationInput!) {
              removeUserFromEvent(EventParticipation: $newUser)   
            }`,
          variables: {
            newUser: {
              userid: this.userid,
              eventid: this.info.id,
              participationType: "ATTENDING"
            }
          }
        })
      .then(res =>{
        if(res.data){
          this.attendInfo.status = !this.attendInfo.status;     
        }
      })
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables";
@import "../../assets/scss/_mixins";

.msg-box {
  max-width: 240px;
  margin: 50px auto;

  h1 {
    @include text-bordered-shadow();
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

