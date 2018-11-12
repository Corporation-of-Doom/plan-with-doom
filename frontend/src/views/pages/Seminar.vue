<template> 
  <vue-scroll style="background:white;">
    <h1 style="margin-bottom:5px; margin-top:20px;text-align:center;">{{info.name}} </h1>
    <p style="margin:10px;margin-top:0px;text-align:center;">  {{info.event_name}} </p>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin-right:10px">
        <el-button v-if="manageInfo.status" title="Edit" type="primary"> {{manageInfo.edit}} Seminar </el-button>
        <el-button v-else-if="followInfo.status" @click="unfollow" type="primary" plain title="Unfollow">{{followInfo.following}}</el-button>
        <el-button v-else @click="follow" type="primary" title="Follow">{{followInfo.follow}}</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-left:10px">
        <el-button v-if="hideAttend" @click="attend" type="primary" title="Must attend the event" disabled>{{attendInfo.attend}}</el-button>
        <el-button v-else-if="manageInfo.status" title="Post Announcement" type="primary"> {{manageInfo.announcement}} </el-button>
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
    <p> {{info.discription}} </p>
    <el-tabs v-model="activeName" @tab-click="changeTab">
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
      <el-tab-pane label="Organizers" name="organizers" >
        <div v-for="(organizer,key) in info.organizers" :key="key">
          {{organizer.first_name}} {{organizer.last_name}}
        </div>
      </el-tab-pane>
    </el-tabs>
  </vue-scroll>
</template>

<script>
import { createApolloFetch } from "apollo-fetch"
import {followAndAttend, unfollowAndUnattend} from './helper'
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default {
  name: "SeminarPage",
  data() {
    return {
      followInfo: {
        status: this.$store.state.seminar.follow,
        follow: "Follow",
        following: "Following"
      },
      attendInfo: {
        status: this.$store.state.seminar.attend,
        attend: "Attend",
        attending: "Attending"
      }, 
      manageInfo: {
        status: this.$store.state.seminar.manage,
        edit: "Edit",
        announcement: "Post Announcment"
      },
      hideAttend: this.$store.state.seminar.hideAttend,
      activeName:'news',
      info: this.$store.state.seminar,
      userid:this.$store.state.user.id
    };
  },
  methods: {
    follow() {
      followAndAttend('Seminar', 'FOLLOWING').then(function(result) {
        if (result){
          this.followInfo.status = true
        } else{
          this.followInfo.status = false
        }
      }.bind(this))
    },
    attend() {
      followAndAttend('Seminar', 'ATTENDING').then(function(result) {
        if (result){
          this.attendInfo.status = true
        } else{
          this.attendInfo.status = false
        }
      }.bind(this))
    },
    changeTab(tab, event) {
        console.log(tab, event);
      },
    unfollow(){
      unfollowAndUnattend('Seminar', 'FOLLOWING').then(function(result) {
        if (result){
          this.followInfo.status = false
        } else{
          this.followInfo.status = true
        }
      }.bind(this))
    },
    unattend(){
      unfollowAndUnattend('Seminar', 'ATTENDING').then(function(result) {
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

