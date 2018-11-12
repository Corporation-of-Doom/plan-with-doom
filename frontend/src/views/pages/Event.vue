<template>
  <vue-scroll class="page-vuechartist" style="background:white;">
  <div style="background:white;">
    <h1 style="margin:10px; margin-top:20px;text-align:center;">{{info.name}} </h1>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin-right:10px">
        <el-button v-if="manageInfo.status" title="Edit" type="primary"> {{manageInfo.edit}} Event </el-button>
        <el-button v-else-if="followInfo.status" @click="unfollow" type="primary" plain title="Unfollow">{{followInfo.following}}</el-button>
        <el-button v-else @click="follow" type="primary" title="Follow">{{followInfo.follow}}</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-left:10px">
        <el-button v-if="manageInfo.status" title="Announcement" type="primary"> {{manageInfo.announcement}} </el-button>
        <el-button v-else-if="attendInfo.status" @click="unattend" type="primary" plain title="Unattend">{{attendInfo.attending}}</el-button>
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
import {followAndAttend, unfollowAndUnattend, loadSeminars} from './helper'

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
      manageInfo: {
        status: this.$store.state.event.manage,
        edit: "Edit",
        announcement: "Post Announcment"
      },
      activeName: "news",
      info:this.$store.state.event,
      user:this.$store.state.user
    };
  },
  methods: {
    follow() {
      followAndAttend('Event', 'FOLLOWING').then(function(result) {
        if (result){
          this.followInfo.status = true
        } else{
          this.followInfo.status = false
        }
      }.bind(this))
    },
    attend() {
      followAndAttend('Event', 'ATTENDING').then(function(result) {
        if (result){
          this.attendInfo.status = true
        } else{
          this.attendInfo.status = false
        }
      }.bind(this))
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
      console.log(this.user.attend)
      unfollowAndUnattend('Event', 'ATTENDING').then(function(result) {
        if (result){
          this.attendInfo.status = false
        } else{
          this.attendInfo.status = true
        }
      }.bind(this))
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

