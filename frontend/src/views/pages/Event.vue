<template>
  <vue-scroll class="page-vuechartist" style="background:white;">
  <div style="background:white;">
    <h1 style="margin-bottom:0px;margin-top:20px;text-align:center;">{{info.name}} </h1>
    <div v-if="info.max_capacity" style="text-align:center;margin:10px">Capacity: {{info.current_capacity}} / {{info.max_capacity}}  </div>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin-right:10px">
        <el-button v-if="manageInfo.status" title="Edit" type="primary" @click="onEdit"> {{manageInfo.edit}} Event </el-button>
        <el-button v-else-if="followInfo.status" @click="unfollow" type="primary" plain title="Unfollow">{{followInfo.following}}</el-button>
        <el-button v-else @click="follow" type="primary" title="Follow">{{followInfo.follow}}</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-left:10px">
        
        <div v-if="manageInfo.status">
          
          <el-button title="Announcement" type="primary" @click="dialogVisible = true"> {{manageInfo.announcement}} </el-button>

          <el-dialog
            
            title="Post an announcement"
            :visible.sync="dialogVisible"
            width="30%">

            <el-input
              id="post"
              type="textarea"
              :rows="2"
              placeholder="Message here"
              clearable
              v-model="postMessage">
            </el-input>

            <span slot="footer" class="dialog-footer">
              <el-button @click="onCancel">Cancel</el-button>
              <el-button type="primary" @click="onPost">Post</el-button>
            </span>

          </el-dialog>

        </div>

        <el-button v-else-if="attendInfo.status" @click="unattend" type="primary" plain title="Unattend">{{attendInfo.attending}}</el-button>
        <el-button v-else-if="waitlist" title="Unwaitlist" @click="unlist" plain type="primary"> Waitlisted </el-button>
        <el-button v-else-if="info.current_capacity === info.max_capacity" @click="list" title="Waitlist" type="primary"> Add to Waitlist </el-button>
        <el-button v-else @click="attend" type="primary" title="Attend">{{attendInfo.attend}}</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin:10px">
      Location: {{info.location}}
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin:10px;">
      <p>Start Date: {{info.start_time}}</p>
      <p>End Date: {{info.end_time}}</p>
      </el-col>
    </el-row>
    <hr>
    <p>Description<p>
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
                <p>Start Date: {{seminar.start_time}} </p>
                <p>End Date: {{seminar.end_time}} </p>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="Organizers" name="organizers">
        <div v-for="(organizer,key) in info.organizers" :key="key">
          {{organizer.first_name}} {{ organizer.middle_name }} {{organizer.last_name}}
         </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="Conflict Found!"
      :visible.sync="conflictDialog"
      width="50%">
      <span>Oh no! You are attending another event at that time. <br>
        Are you sure you want to attend this event?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelConflictDialog">Cancel</el-button>
        <el-button type="primary" @click="attend">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
    </vue-scroll>
</template>

<script>
import { createApolloFetch } from "apollo-fetch"
import * as moment from 'moment'
import {followAndAttend, unfollowAndUnattend, loadSeminars} from './helper'

const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });
export default {
  name: "EventPage",
  data() {
    return {
      postMessage: '',
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
      manageInfo: {
        status: this.$store.state.event.manage,
        edit: "Edit",
        announcement: "Post Announcment"
      },
      waitlist: this.$store.state.event.waitlist,
      activeName: "news",
      info:this.$store.state.event,
      user:this.$store.state.user,
      dialogVisible: false,
      postMessage: '',
      conflictDialog: false,
    };
  },
  methods: {
    onEdit() {
      this.$router.push('CreateEvent')    
    },
    cancelConflictDialog(){
      this.conflictDialog = false
    },
    onCancel() {
      this.dialogVisible = false
      this.postMessage = ''
    },
    onPost() {
      console.clear()
      if (this.postMessage) {
        fetch({
            query: ` mutation createEventAnnoucement($announcement: AnnouncementInput!) {
              createEventAnnouncement(announcement: $announcement) {
                  id
                  date_modified
                }
              }`,
            variables: {
              announcement: {		
                type_id: this.$store.state.event.id,
                message: this.postMessage
              }
            }
            }).then(res => {
            if (res.data) {
              console.log("Test: " + JSON.stringify(res.data.createEventAnnouncement));
              var temp =  moment(parseInt(res.data.createEventAnnouncement.date_modified,10)).format("MMMM Do YYYY, h:mm a")
              this.$store.commit("addAnnouncement", {type: "Event", message: this.postMessage, date_modified: temp})
              this.dialogVisible = false
              this.postMessage=''   
            } else {
              console.log(res.errors)
            }		
          }).catch(err => {
            console.log(err);
          }); 
      } else {
        alert("There is nothing to post.")
      }
    },
    follow() {
      followAndAttend('Event', 'FOLLOWING').then(function(result) {
        if (result){
          this.followInfo.status = true
        } else{
          this.followInfo.status = false
        }
      }.bind(this))
    },
    conflict(){
      var start_time = moment(parseInt(this.info.start_time_utc,10)).format('YYYY-MM-DD HH:mm')
      var end_time = moment(parseInt(this.info.end_time_utc,10)).format('YYYY-MM-DD HH:mm')
      fetch({ query: `{
        checkCalendarConflicts(userID: ${this.user.id}, type: "event", startDateTime: "${start_time}", endDateTime: "${end_time}")
      }`
      })
      .then(res => {
        if (res.data.checkCalendarConflicts) {
          this.conflictDialog = true
        } else {
          this.attend()
        }
      })
    },
    attend() {
      console.log(this.info.current_capacity !== this.info.max_capacity)
      console.log(this.info.current_capacity, this.info.max_capacity)
      console.log(this.info)
      if (this.info.current_capacity !== this.info.max_capacity) {
        followAndAttend('Event', 'ATTENDING').then(function(result) {
          if (result){
            this.attendInfo.status = true
          } else{
            this.waitlisted()
          }
        }.bind(this))        
      }
    },
    list(){
      this.waitlist = true
      fetch({
        query: `mutation addUserToEventWaitlist($user: Int!, $event: Int!) {
          addUserToEventWaitlist(userID: $user, eventID: $event) 
        }`,
        variables: {
            "user": this.user.id,
            "event": this.info.id,
        }
      })
      .then(res => {
        console.log(res)
        if(res.data){
          this.$store.commit("addToWaitlist",{__typename: 'Event', id: this.info.id})
        }
      })
    },
    loadSeminar(id) {
      loadSeminars(id).then(function(result) {
        console.log(result)
        if (result){
          this.$router.push("seminar")
        } else{
          console.log("something went wrong")
        }
      }.bind(this))
    },
    unfollow(){
      unfollowAndUnattend('Event', 'FOLLOWING').then(function(result) {
        if (result){
          this.followInfo.status = false
        } else{
          this.followInfo.status = true
        }
      }.bind(this))
    },
    unattend(){
      if (this.attendInfo.current_capacity !== 0) {        
        unfollowAndUnattend('Event', 'ATTENDING').then(function(result) {
          if (result){
            this.attendInfo.status = false
          } else{
            this.attendInfo.status = true
          }
        }.bind(this))
      }
    },
    unlist(){
      this.waitlist = false
      fetch({
        query: `mutation removeUserFromEventWaitlist($user: Int!, $event: Int!) {
          removeUserFromEventWaitlist(userID: $user, eventID: $event)
        }`,
        variables: {
            "user": this.user.id,
            "event": this.info.id,
        }
      })
      .then(res => {
        console.log(res)
        if(res.data){
          this.$store.commit("removeFromWaitlist",{__typename: 'Event', id: this.info.id})
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

